import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Cartaaltratodigno extends LitElement {
  createRenderRoot() { return this; } // Light DOM

  static properties = {
    pdfUrl: { type: String, attribute: 'pdf-url' },
    _isLeyendo: { state: true },
    _isPaused: { state: true },
    _q: { state: true },
    _font: { state: true },
    _narrow: { state: true },
    _focusMode: { state: true },
    _hits: { state: true },
  };

  constructor() {
    super();
    this.pdfUrl = '';
    this._isLeyendo = false;
    this._isPaused = false;
    this._utterance = null;
    this._voicesReady = false;
    this._ttsTick = null;
    this._onVoicesChanged = null;

    // UX state
    this._q = '';
    this._font = parseFloat(localStorage.getItem('carta.font') || '16');
    this._narrow = localStorage.getItem('carta.narrow') === '1';
    this._focusMode = localStorage.getItem('carta.focus') === '1';
    this._hits = 0;
  }

  // ---------- Lifecycle ----------
  async firstUpdated() {
    const root = this.querySelector('.literal');
    if (root) {
      this._autoLinkify(root);
      // restaurar scroll
      const y = parseInt(localStorage.getItem('carta.scroll') || '0', 10);
      if (!isNaN(y) && y > 0) requestAnimationFrame(()=>window.scrollTo({ top:y, behavior:'instant' }));
    }

    await this._ensureVoices();

    if (!this._ttsTick) {
      this._ttsTick = setInterval(() => {
        const synth = window.speechSynthesis;
        if (this._isLeyendo && synth && !synth.speaking && !this._isPaused) {
          this._resetTTS();
        }
      }, 900);
    }

    // Guardar posición
    window.addEventListener('scroll', this._saveScroll, { passive:true });
    // Atajos
    window.addEventListener('keydown', this._hotkeys);
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    try { window.speechSynthesis?.cancel(); } catch {}
    if (this._ttsTick) { clearInterval(this._ttsTick); this._ttsTick = null; }
    if (this._onVoicesChanged) {
      try { window.speechSynthesis.onvoiceschanged = null; } catch {}
      this._onVoicesChanged = null;
    }
    window.removeEventListener('scroll', this._saveScroll);
    window.removeEventListener('keydown', this._hotkeys);
  }

  // ---------- Persistencia ----------
  _saveScroll = () => {
    localStorage.setItem('carta.scroll', String(window.scrollY|0));
  }

  // ---------- Voces ----------
  async _ensureVoices() {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const get = () => synth.getVoices?.() ?? [];
    let voices = get();
    if (voices.length) { this._voicesReady = true; return; }
    await new Promise((res) => {
      this._onVoicesChanged = () => {
        voices = get();
        if (voices.length) { this._voicesReady = true; res(); }
      };
      try { synth.onvoiceschanged = this._onVoicesChanged; } catch { res(); }
      setTimeout(res, 1000);
    });
  }

  _pickSpanishVoice() {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    return (
      voices.find(v => /es-CO/i.test(v.lang) || /colom/i.test(v.name)) ||
      voices.find(v => /^es(-|_)/i.test(v.lang)) ||
      voices[0] || null
    );
  }

  // ---------- TTS ----------
  _startLectura = () => {
    const synth = window.speechSynthesis;
    if (!synth) { alert('La síntesis de voz no está disponible en este navegador'); return; }

    const texto = (this.querySelector('.literal')?.innerText || '').trim();
    if (!texto) { alert('No hay texto para leer'); return; }

    synth.cancel();
    const utt = new SpeechSynthesisUtterance(texto);
    const v = this._pickSpanishVoice();
    if (v) utt.voice = v;
    utt.lang = v?.lang || 'es-ES';
    utt.rate = 0.95; utt.pitch = 1; utt.volume = 1;

    utt.onstart = () => {
      this._isLeyendo = true; this._isPaused = false;
      this._setButtons('reading');
      this._announce('Reproducción iniciada');
    };
    utt.onend = () => { this._resetTTS(); };
    utt.onerror = () => { this._resetTTS(); alert('Error en la síntesis de voz'); };

    this._utterance = utt;
    try { synth.speak(utt); } catch(e) { this._resetTTS(); alert('Error al iniciar la síntesis: ' + e.message); }
  };

  _pauseResume = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (!this._isLeyendo) { this._startLectura(); return; }
    if (this._isPaused) {
      try { synth.resume(); } catch {}
      this._isPaused = false;
      this._setButtons('reading');
      this._announce('Reanudado');
    } else {
      try { synth.pause(); } catch {}
      this._isPaused = true;
      this._setButtons('paused');
      this._announce('Pausado');
    }
  };

  _stopLectura = () => {
    const synth = window.speechSynthesis;
    try { synth?.cancel(); } catch {}
    this._resetTTS();
    this._announce('Detenido');
  };

  _resetTTS() {
    this._isLeyendo = false; this._isPaused = false; this._utterance = null;
    this._setButtons('idle');
  }

  _setButtons(state) {
    const btnPlay = this.querySelector('#btnTTSPlay');
    const btnStop = this.querySelector('#btnTTSStop');
    if (!btnPlay || !btnStop) return;

    if (state === 'reading') {
      btnPlay.textContent = '⏸️ Pausar'; btnPlay.className = 'utility-btn reading'; btnPlay.title = 'Pausar lectura';
      btnStop.disabled = false;
    } else if (state === 'paused') {
      btnPlay.textContent = '▶️ Reanudar'; btnPlay.className = 'utility-btn paused'; btnPlay.title = 'Reanudar lectura';
      btnStop.disabled = false;
    } else {
      btnPlay.textContent = '🔊 Audio'; btnPlay.className = 'utility-btn'; btnPlay.title = 'Audio/Text-to-Speech';
      btnStop.disabled = true;
    }
  }

  _announce(msg){
    const live = this.querySelector('#ttsLive');
    if (live) { live.textContent = ''; setTimeout(() => (live.textContent = msg), 30); }
  }

  // ---------- Autolink ----------
  _autoLinkify(container) {
    const AVOID = new Set(['A','BUTTON','SCRIPT','STYLE','NOSCRIPT','CODE','PRE']);
    const urlRe  = /(https?:\/\/[^\s]+)/gi;
    const mailRe = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const telRe  = /(?:(?:\+?\d{1,3}\s?)?(?:\(\d{1,4}\)\s?|\d{1,4}\s?)?)\d{3,4}[\s.-]?\d{3,4}/g;

    const walk = (el) => {
      for (let n = el.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3) {
          const text = n.nodeValue;
          if (!text) continue;
          const parts = [];
          let last = 0;
          const matches = [];
          text.replace(urlRe,  (m, _1, idx) => matches.push({ m, idx, type:'url' }));
          text.replace(mailRe, (m, _1, idx) => matches.push({ m, idx, type:'mail' }));
          text.replace(telRe,  (m, _1, idx) => matches.push({ m, idx, type:'tel' }));
          matches.sort((a,b) => a.idx - b.idx);
          if (!matches.length) continue;

          matches.forEach(({ m, idx, type }) => {
            if (idx > last) parts.push(document.createTextNode(text.slice(last, idx)));
            const looksLikeHour = /:/.test(m) || /\b(?:a\.m\.|p\.m\.)\b/i.test(m);
            if (type === 'url') {
              const a = document.createElement('a');
              a.textContent = m; a.href = m; a.target = '_blank'; a.rel = 'noopener';
              parts.push(a);
            } else if (type === 'mail') {
              const a = document.createElement('a');
              a.textContent = m; a.href = `mailto:${m}`;
              parts.push(a);
            } else if (type === 'tel' && !looksLikeHour) {
              const a = document.createElement('a');
              a.textContent = m;
              a.href = `tel:${m.replace(/[\s().-]/g,'')}`;
              parts.push(a);
            } else {
              parts.push(document.createTextNode(m));
            }
            last = idx + m.length;
          });
          if (last < text.length) parts.push(document.createTextNode(text.slice(last)));
          const frag = document.createDocumentFragment();
          parts.forEach(p => frag.appendChild(p));
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && !AVOID.has(n.nodeName)) {
          walk(n);
        }
      }
    };
    walk(container);
  }

  // ---------- Búsqueda y utilidades ----------
  _onSearch = (e) => {
    this._q = (e.target.value || '').trim();
    this._applyHighlight();
  }

  _applyHighlight() {
    // limpia previos
    const host = this.querySelector('.literal');
    if (!host) return;
    host.normalize();
    host.querySelectorAll('mark._hit').forEach(m => {
      const t = document.createTextNode(m.textContent);
      m.parentNode.replaceChild(t, m);
    });

    if (!this._q) { this._hits = 0; return; }

    const sel = window.getSelection();
    sel?.removeAllRanges();

    const walk = document.createTreeWalker(host, NodeFilter.SHOW_TEXT, null);
    const q = this._q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(q, 'gi');
    let count = 0;

    while (walk.nextNode()) {
      const node = walk.currentNode;
      if (!node.nodeValue.trim()) continue;
      const frag = document.createDocumentFragment();
      let last = 0;
      const text = node.nodeValue;
      let m;
      let changed = false;
      while ((m = re.exec(text))) {
        const before = text.slice(last, m.index);
        if (before) frag.appendChild(document.createTextNode(before));
        const mark = document.createElement('mark');
        mark.className = '_hit';
        mark.textContent = m[0];
        frag.appendChild(mark);
        last = m.index + m[0].length;
        count++;
      }
      if (count && last < text.length) {
        frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
        changed = true;
      }
      if (!changed && count && last === text.length) {
        node.parentNode.replaceChild(frag, node);
      }
    }

    this._hits = count;
    if (count) {
      // desplazar al primer resultado
      const first = host.querySelector('mark._hit');
      first?.scrollIntoView({ behavior:'smooth', block:'center' });
    }
  }

  _fontPlus = () => {
    this._font = Math.min(this._font + 1, 22);
    localStorage.setItem('carta.font', String(this._font));
  }
  _fontMinus = () => {
    this._font = Math.max(this._font - 1, 12);
    localStorage.setItem('carta.font', String(this._font));
  }
  _toggleWidth = () => {
    this._narrow = !this._narrow;
    localStorage.setItem('carta.narrow', this._narrow ? '1' : '0');
  }
  _toggleFocus = () => {
    this._focusMode = !this._focusMode;
    localStorage.setItem('carta.focus', this._focusMode ? '1' : '0');
  }

  _copyContacts = async () => {
    const txt = (this.querySelector('.literal')?.innerText || '');
    const start = txt.indexOf('Mecanismos de atención');
    const chunk = start >= 0 ? txt.slice(start) : txt;
    try {
      await navigator.clipboard.writeText(chunk.trim());
      this._announce('Contactos copiados');
    } catch {
      this._announce('No se pudo copiar');
    }
  }

  _hotkeys = (e) => {
    const isMod = e.ctrlKey || e.metaKey;
    if (e.key === '/' && !isMod) {
      e.preventDefault();
      this.querySelector('#q')?.focus();
      return;
    }
    if (e.key === 'Escape') {
      if (this._q) { this._q=''; this.requestUpdate(); setTimeout(()=>this._applyHighlight(), 0); }
      return;
    }
    if ((e.key === '=' || e.key === '+') && isMod) { e.preventDefault(); this._fontPlus(); return; }
    if (e.key === '-' && isMod) { e.preventDefault(); this._fontMinus(); return; }
    if (e.key.toLowerCase() === 'f' && isMod) { e.preventDefault(); this.querySelector('#q')?.focus(); return; }
  }

  // ---------- Render ----------
  render() {
    return html`
      <style>
        :root {
          --azul-900:#0F1E47;
          --azul-700:#1E3A8A;
          --azul-600:#2563EB;
          --azul-300:#BFD7FF;
          --azul-200:#DBEAFE;
          --azul-100:#EFF6FF;
          --blanco:#FFFFFF;
          --borde:#E6EEF8;
          --texto:#1F2937;
          --muted:#6B7280;
          --shadow: 0 10px 30px rgba(17, 24, 39, 0.08);
          --ring: 0 0 0 6px rgba(37, 99, 235, .15);
          --ring-strong: 0 0 0 6px rgba(37, 99, 235, .25);
        }

        .outer {
          display:grid;
          place-items:center;
          padding: clamp(12px, 2.5vw, 28px);
          background:
            radial-gradient(1000px 500px at -10% -20%, #F0F6FF 0%, transparent 70%),
            radial-gradient(1000px 500px at 110% 0%, #F8FBFF 0%, transparent 70%);
        }

        .wrap {
          width:min(1100px, 96vw);
          background: color-mix(in srgb, var(--blanco) 92%, transparent);
          border: 1px solid var(--borde);
          border-radius: 18px;
          box-shadow: var(--shadow);
          overflow:hidden;
          backdrop-filter: saturate(140%) blur(8px);
        }

        .ribbon {
          height: 6px;
          background: linear-gradient(90deg, var(--azul-600), var(--azul-200));
        }

        .head {
          display:flex; gap:16px; align-items:center; justify-content:space-between;
          padding: clamp(14px, 2.2vw, 22px) clamp(16px, 2.6vw, 28px);
          background: linear-gradient(180deg, var(--azul-100), #fff 55%);
          border-bottom:1px solid var(--borde);
        }

        .title {
          margin:0;
          font-size: clamp(1.25rem, 1.3vw + 1rem, 1.8rem);
          line-height:1.2;
          color: var(--azul-700);
          letter-spacing: -0.01em;
        }

        .meta { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
        .badge {
          display:inline-flex; align-items:center; gap:.5ch;
          font-size:.8rem; font-weight:600;
          color: var(--azul-700);
          background: var(--azul-100);
          border: 1px solid var(--borde);
          padding: .35rem .6rem;
          border-radius: 999px;
        }
        .subtle { color: var(--muted); font-size: .95rem; }

        .actions { display:flex; gap:10px; flex-wrap:wrap; }

        .btn, .utility-btn, .btn-link {
          appearance:none; border-radius: 12px; padding: 10px 14px;
          font-size: 15px; line-height: 1; cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, background-color .18s ease;
          user-select:none; outline: none; border:1px solid var(--borde); background: var(--blanco); color: var(--azul-700);
        }
        .btn:hover, .utility-btn:hover, .btn-link:hover { box-shadow: var(--ring); transform: translateY(-1px); }
        .utility-btn.reading{ background: #EF4444; color:#fff; border-color: transparent; }
        .utility-btn.paused{ background: #F59E0B; color:#fff; border-color: transparent; }
        .utility-btn:disabled{ opacity:.55; transform:none; cursor:not-allowed; }
        .btn[aria-pressed="true"]{ box-shadow: var(--ring-strong); border-color: var(--azul-300); }

        .toolbar {
          display:flex; gap:10px; align-items:center; flex-wrap:wrap;
          padding: 10px 16px; border-bottom:1px solid var(--borde); background:#fff;
        }
        .field {
          position: relative; display:flex; align-items:center;
        }
        .field input {
          border:1px solid var(--borde); border-radius: 12px; padding: 10px 12px 10px 34px;
          font-size: 15px; outline:none; min-width: 220px; background: var(--azul-100);
        }
        .field input:focus { box-shadow: var(--ring); background:#fff; }
        .field .icon {
          position:absolute; left:10px; pointer-events:none; opacity:.65;
        }
        .hits { font-size: 12px; color: var(--muted); }

        .body {
          padding: clamp(16px, 2.6vw, 28px);
          background: var(--blanco);
        }
        .reader {
          margin: 0 auto;
          max-width: var(--reader-w, 72ch);
          transition: max-width .2s ease;
        }
        .reader.narrow { --reader-w: 62ch; }
        .reader.focus { filter: drop-shadow(0 0 0 rgba(0,0,0,0)); background: #fff; padding: 16px 18px; border-radius: 14px; border:1px solid var(--borde); }

        .literal {
          white-space: pre-wrap;
          color: var(--texto);
          line-height: 1.7;
        }
        .literal a {
          color: var(--azul-600);
          text-decoration: none;
          border-bottom: 1px dashed color-mix(in srgb, var(--azul-600) 40%, transparent);
        }
        .literal a:hover { text-decoration: underline; }
        mark._hit { background: #fff3c4; padding:0 .15em; border-radius: 4px; }

        /* Print */
        @media print {
          .outer { background: #fff; padding:0; }
          .toolbar,.actions,.ribbon { display:none !important; }
          .wrap { border:none; box-shadow:none; }
        }
      </style>

      <section class="outer">
        <div class="wrap">
          <div class="ribbon"></div>

          <header class="head">
            <div>
              <div class="meta">
                <span class="badge">Carta al trato digno</span>
                <span class="subtle" aria-hidden="true">Hospital San Jorge de Ayapel</span>
              </div>
              <h1 class="title">Carta al trato digno</h1>
            </div>

            <div class="actions">
              <a class="btn" href=${this.pdfUrl || 'javascript:void(0)'}
                 target=${this.pdfUrl ? '_blank' : '_self'}
                 rel=${this.pdfUrl ? 'noopener' : ''}
                 download
                 aria-disabled=${!this.pdfUrl ? "true" : "false"}
                 title="Descargar PDF oficial">📄 PDF</a>

              <button class="btn" type="button" title="Copiar contactos" @click=${this._copyContacts}>📋 Copiar contactos</button>
              <button class="utility-btn" type="button" title="Imprimir" @click=${() => window.print()}>🖨️ Imprimir</button>
              <button class="utility-btn" id="btnTTSPlay" type="button"
                      @click=${this._pauseResume}
                      @keydown=${(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); this._pauseResume(); } }}
                      title="Audio / Texto a voz">🔊 Audio</button>
              <button class="utility-btn" id="btnTTSStop" type="button"
                      @click=${this._stopLectura}
                      title="Detener lectura" disabled>⏹️ Detener</button>
              <span id="ttsLive" class="visually-hidden" aria-live="polite"></span>
            </div>
          </header>

          <!-- Herramientas de lectura -->
          <div class="toolbar">
            <div class="field">
              <span class="icon">🔎</span>
              <input id="q" type="search" placeholder="Buscar en el texto ( / )"
                     @input=${this._onSearch} .value=${this._q || ''} />
            </div>
            <span class="hits">${this._hits ? `${this._hits} coincidencia(s)` : ''}</span>

            <div style="flex:1"></div>

            <button class="btn" @click=${this._fontMinus} title="Reducir tamaño (Ctrl/Cmd −)">A−</button>
            <button class="btn" @click=${this._fontPlus} title="Aumentar tamaño (Ctrl/Cmd +)">A+</button>
            <button class="btn" @click=${this._toggleWidth} aria-pressed=${this._narrow?'true':'false'} title="Ancho cómodo">
              ↔️ Ancho
            </button>
            <button class="btn" @click=${this._toggleFocus} aria-pressed=${this._focusMode?'true':'false'} title="Modo foco">
              🎯 Foco
            </button>
          </div>

          <<div class="literal">
  <header>
    <h1>Carta al Trato Digno</h1>
    <p class="subtle">Hospital San Jorge de Ayapel</p>
  </header>

  <section id="presentacion">
    <h2>Presentación</h2>
    <p>
      El Hospital San Jorge de Ayapel, a través de sus colaboradores, reconoce y garantiza los
      derechos constitucionales y legales de todas las personas naturales y jurídicas. En consecuencia,
      expide y divulga la presente <strong>“Carta de Trato Digno al Paciente”</strong>, en la que se
      reiteran los derechos que les corresponden a todas las personas usuarias de nuestros servicios y
      se establecen los canales de atención habilitados para garantizarlos.
    </p>
  </section>

  <section id="derechos">
    <h2>Derechos de las personas usuarias</h2>
    <ul>
      <li>Recibir atención oportuna, digna, segura y respetuosa.</li>
      <li>Acceder a información clara sobre su estado de salud, diagnósticos y tratamientos.</li>
      <li>Confidencialidad y manejo reservado de la historia clínica.</li>
      <li>Elegir entre las opciones terapéuticas disponibles y solicitar segunda opinión.</li>
      <li>Ser informado sobre costos y servicios prestados.</li>
      <li>Presentar quejas, reclamos y sugerencias por canales oficiales, sin represalias.</li>
      <li>Recibir acompañamiento y trato humano durante todo el proceso de atención.</li>
    </ul>
  </section>

  <section id="deberes">
    <h2>Deberes de las personas</h2>
    <p class="subtle">Conforme a lo establecido en el artículo 6° de la Ley 1437 de 2011.</p>
    <ul>
      <li>Cuidar su salud, la de su familia y su comunidad.</li>
      <li>Cumplir las indicaciones y recomendaciones del personal de salud.</li>
      <li>Suministrar información veraz y completa para el adecuado manejo clínico.</li>
      <li>Respetar turnos, protocolos y normas internas del hospital.</li>
      <li>Conservar y entregar la documentación requerida para trámites.</li>
      <li>Colaborar con las medidas de bioseguridad y seguridad del paciente.</li>
      <li>Asumir los costos o aportes correspondientes cuando apliquen, conforme a su capacidad.</li>
    </ul>
  </section>

  <section id="canales">
    <h2>Mecanismos de atención al usuario</h2>

    <article id="canal-presencial">
      <h3>Canal presencial</h3>
      <p><strong>Ventanilla Única — Servicio de Información y Atención al Usuario</strong></p>
      <p><strong>Horario:</strong></p>
      <ul>
        <li>Lunes a viernes: <time datetime="07:00">7:00 a.m.</time> – <time datetime="12:00">12:00 m</time> / <time datetime="14:00">2:00 p.m.</time> – <time datetime="18:00">6:00 p.m.</time></li>
      </ul>
    </article>

    <article id="canal-telefonico">
      <h3>Canal telefónico / WhatsApp</h3>
      <ul>
        <li>Conmutador: <a href="tel:+576047705083">(604) 7705083</a></li>
        <li>Línea transparencia.</li>
      </ul>
    </article>

    <article id="canal-virtual">
      <h3>Canal virtual</h3>
      <ul>
        <li>Sitio web: <a href="https://hospitalsanjorgeayapel.com/">https://hospitalsanjorgeayapel.com/</a></li>
        <li>Gerencia: <a href="mailto:principal_gerencia@hospitalayapel.gov.co">principal_gerencia@hospitalayapel.gov.co</a></li>
        <li>General: <a href="mailto:esesanjorgedeayapel@gmail.com">esesanjorgedeayapel@gmail.com</a></li>
      </ul>
    </article>

    <article id="canal-escrito">
      <h3>Canal escrito</h3>
      <ul>
        <li>Buzón físico en Ventanilla Única.</li>
        <li>Radicación presencial o formulario en línea.</li>
      </ul>
    </article>
  </section>
</div>

      </section>
    `;
  }
}

customElements.define('cartaaltratodigno-view', Cartaaltratodigno);
