import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Cartaaltratodigno extends LitElement {
  createRenderRoot() { return this; } // Light DOM

  static properties = {
    pdfUrl: { type: String, attribute: 'pdf-url' },
    _isLeyendo: { state: true },
    _isPaused: { state: true },
  };

  constructor() {
    super();
    this.pdfUrl = '';           // p.ej. '/Comunicaciones/Carta-al-trato-digno.pdf'
    this._isLeyendo = false;
    this._isPaused = false;
    this._utterance = null;
  }

  firstUpdated() {
    // Autolink en el bloque literal sin cambiar palabras
    const root = this.querySelector('.literal');
    if (root) this._autoLinkify(root);

    // Carga de voces (algunos navegadores las exponen asincrónicamente)
    if (window.speechSynthesis?.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }

    // Si el TTS se corta externamente, resetea el botón
    this._ttsTick = setInterval(() => {
      const synth = window.speechSynthesis;
      if (this._isLeyendo && synth && !synth.speaking && !this._isPaused) this._resetTTSButton();
    }, 900);
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    try { window.speechSynthesis?.cancel(); } catch {}
    if (this._ttsTick) clearInterval(this._ttsTick);
  }

  // ----- TTS -----
  toggleLectura = () => {
    const synth = window.speechSynthesis;
    if (!synth) { alert('La síntesis de voz no está disponible en este navegador'); return; }

    const btn = this.querySelector('#btnTTS');

    // Detener/pausar/reanudar
    if (this._isLeyendo && !this._isPaused) {
      synth.pause();
      this._isPaused = true;
      if (btn) { btn.innerHTML = '⏸️'; btn.className = 'utility-btn paused'; btn.title = 'Reanudar lectura'; }
      return;
    }
    if (this._isPaused) {
      synth.resume();
      this._isPaused = false;
      if (btn) { btn.innerHTML = '⏹️'; btn.className = 'utility-btn reading'; btn.title = 'Detener lectura'; }
      return;
    }
    if (this._isLeyendo) {
      synth.cancel();
      this._resetTTSButton();
      return;
    }

    // Nueva lectura: el contenido literal visible
    synth.cancel(); // Chrome fix
    const texto = (this.querySelector('.literal')?.innerText || '').trim();
    if (!texto) { alert('No hay texto para leer'); return; }

    const utt = new SpeechSynthesisUtterance(texto);
    utt.lang = 'es-ES';
    utt.rate = 0.95; utt.pitch = 1; utt.volume = 1;

    const voices = synth.getVoices();
    const spanish = voices.find(v => (v.lang || '').toLowerCase().startsWith('es'));
    if (spanish) utt.voice = spanish;

    utt.onstart = () => {
      this._isLeyendo = true; this._isPaused = false;
      if (btn) { btn.innerHTML = '⏹️'; btn.className = 'utility-btn reading'; btn.title = 'Detener lectura'; }
    };
    utt.onend = () => this._resetTTSButton();
    utt.onerror = () => { this._resetTTSButton(); alert('Error en la síntesis de voz'); };

    this._utterance = utt;
    setTimeout(() => {
      try { synth.speak(utt); } catch(e) { this._resetTTSButton(); alert('Error al iniciar la síntesis: ' + e.message); }
    }, 80);
  };

  _resetTTSButton() {
    const btn = this.querySelector('#btnTTS');
    this._isLeyendo = false; this._isPaused = false;
    if (btn) { btn.innerHTML = '🔊'; btn.className = 'utility-btn'; btn.title = 'Audio/Text-to-Speech'; }
  }

  // ----- Autolink sin cambiar palabras -----
  _autoLinkify(container) {
    const AVOID = new Set(['A','BUTTON','SCRIPT','STYLE','NOSCRIPT','CODE','PRE']);
    const urlRe = /(https?:\/\/[^\s]+)/gi;
    const mailRe = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

    const walk = (el) => {
      for (let n = el.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3) {
          const text = n.nodeValue;
          if (!text) continue;

          const parts = [];
          let last = 0;

          // Combina detección de URL y email sin perder orden
          const matches = [];
          text.replace(urlRe, (m, _1, idx) => matches.push({ m, idx, type:'url' }));
          text.replace(mailRe, (m, _1, idx) => matches.push({ m, idx, type:'mail' }));
          matches.sort((a,b) => a.idx - b.idx);

          if (!matches.length) continue;

          matches.forEach(({ m, idx, type }) => {
            if (idx > last) parts.push(document.createTextNode(text.slice(last, idx)));
            const a = document.createElement('a');
            a.textContent = m;
            if (type === 'url') { a.href = m; a.target = '_blank'; a.rel = 'noopener'; }
            else { a.href = `mailto:${m}`; }
            parts.push(a);
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

  render() {
    return html`
      <style>
        .wrap {
          background: #fff;
          border: 1px solid #D6F0FA;
          border-radius: 1rem;
          box-shadow: 0 8px 28px rgba(0,0,0,0.06);
        }
        .ribbon {
          background: #E6F7FD;
          height: .5rem;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          border-bottom: 1px solid #D6F0FA;
        }
        .literal {
          white-space: pre-wrap;
          color: #333;
        }

        /* Acciones */
        .actions {
          display:flex; gap:.5rem; align-items:center; flex-wrap:wrap;
        }
        .utility-btn {
          background:none; border:1px solid rgba(0,0,0,.08); font-size:16px; cursor:pointer;
          padding:8px 12px; border-radius:8px; color:#1976d2; transition:background-color .2s ease;
        }
        .utility-btn:hover{ background:#E6F7FD; }
        .utility-btn.reading{ background:#ff6b6b !important; color:#fff !important; border-color:transparent; }
        .utility-btn.paused{ background:#feca57 !important; color:#fff !important; border-color:transparent; }
        .btn-link {
          text-decoration:none; display:inline-flex; align-items:center; gap:.5rem;
          border:1px solid rgba(0,0,0,.08); padding:8px 12px; border-radius:8px; color:#1976d2; background:#F9FCFF;
        }
        .btn-link[aria-disabled="true"]{ opacity:.5; pointer-events:none; }

        @media (max-width:768px){
          .actions{ justify-content:flex-start; }
        }
      </style>

      <section class="pa3 pa4-ns">
        <div class="wrap">
          <div class="ribbon"></div>
          <div class="pa3 pa4-ns">
            <div class="flex items-center justify-between mb3">
              <h1 class="f3 f2-ns fw7 ma0 dark-blue">Carta al trato digno</h1>
              <div class="actions">
                <a class="btn-link"
                   href=${this.pdfUrl || 'javascript:void(0)'}
                   target=${this.pdfUrl ? '_blank' : '_self'}
                   rel=${this.pdfUrl ? 'noopener' : ''}
                   download
                   aria-disabled=${!this.pdfUrl ? "true" : "false"}
                   title="Descargar PDF oficial">
                  📄 Descargar PDF
                </a>
                <button class="utility-btn" title="Imprimir" @click=${() => window.print()}>🖨️ Imprimir</button>
                <button class="utility-btn" id="btnTTS"
                        @click=${this.toggleLectura}
                        @keydown=${(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); this.toggleLectura(); } }}
                        title="Audio / Texto a voz">🔊 Audio</button>
              </div>
            </div>

            <!-- Texto oficial (sin cambios) -->
            <div class="literal lh-copy f5">
Carta al trato digno
Compartir
Buscar
El Hospital San Jorge de Ayapel a través de sus colaboradores, reconoce y garantiza los derechos constitucionales y legales de todas las personas naturales y jurídicas. En consecuencia, expide y divulga la presente "Carta de Trato Digno al Paciente", en la que se reiteran los derechos que les corresponden a todas las personas usuarias de nuestros servicios y se establecen los diferentes canales de atención habilitados para garantizarlos.

Derechos de los usuarios:
Recibir atención oportuna, digna, segura y respetuosa.
Acceder a información clara sobre su estado de salud, diagnósticos y tratamientos.
Confidencialidad y manejo reservado de la historia clínica.
Elegir entre las opciones terapéuticas disponibles cuando proceda y recibir segunda opinión si lo desea.
Ser informado sobre costos y servicios prestados.
Presentar quejas, reclamos y sugerencias a través de los canales oficiales sin represalias.
Recibir acompañamiento y trato humano durante todo el proceso de atención.

Deberes de las personas:
Asi mismo es importante divulgar, de conformidad con lo establecido en el artículo 6° de la ley 1437 de 2011, los deberes de las personas:

Cuidar su salud, la de su familia y su comunidad.
Cumplir las indicaciones y recomendaciones del personal de salud.
Suministrar información veraz y completa para el adecuado manejo clínico.
Respetar turnos, protocolos y normas internas del hospital.
Conservar y entregar la documentación requerida para trámites.
Colaborar con las medidas de bioseguridad y seguridad del paciente.
Asumir los costos o aportes correspondientes cuando apliquen, conforme a su capacidad.

Mecanismos de atención al usuario.
CANALES DE ATENCIÓN

CANAL PRESENCIAL
Ventanilla Única — Servicio de Información y Atención al Usuario.
Horario: Lunes a viernes: 7:00 a.m. – 12:00 m / 2:00 p.m. – 6:00 p.m.

CANAL TELEFÓNICO / WHATSAPP:
(604) 7705083
Línea transparencia

CANAL VIRTUAL
https://hospitalsanjorgeayapel.com/
principal_gerencia@hospitalayapel.gov.co
esesanjorgedeayapel@gmail.com

CANAL ESCRITO
Buzón físico en Ventanilla Única — Radicación presencial o formulario en línea.
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('cartaaltratodigno-view', Cartaaltratodigno);
