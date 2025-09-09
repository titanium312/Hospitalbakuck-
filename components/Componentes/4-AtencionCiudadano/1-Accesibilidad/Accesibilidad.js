import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Historiaclinica extends LitElement {
  // Light DOM para que apliquen estilos globales (Tachyons)
  createRenderRoot(){ return this; }

  static properties = {
    _isLeyendo: { state: true },
    _isPaused: { state: true },
    _utterance: { state: false },
    zoom: { type: Number, reflect: false },
    pdfUrl: { type: String, attribute: 'pdf-url' }
  };

  constructor(){
    super();
    this._isLeyendo = false;
    this._isPaused = false;
    this._utterance = null;

    // Zoom (persistente). 1.0 = 100%, máx 2.0 = 200%
    const saved = Number(localStorage.getItem('acces.zoom') || '1');
    this.zoom = this._clampZoom(isFinite(saved) && saved > 0 ? saved : 1);

    // PDF evidencia
    this.pdfUrl = '#';
  }

  // ====== Ciclo de vida ======
  firstUpdated(){
    // Aplica zoom global por font-size raíz (sin distorsión)
    this._applyZoom();

    // TTS: algunos navegadores emiten voces tarde
    if(window.speechSynthesis?.onvoiceschanged !== undefined){
      window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
    }

    // Observa si se detiene externamente
    this._ttsTick = setInterval(() => {
      const synth = window.speechSynthesis;
      if(this._isLeyendo && synth && !synth.speaking && !this._isPaused) this._resetTTSButton();
    }, 800);

    // Reemplazo de terminología (una vez + cambios posteriores en esta sección)
    const target = this.querySelector('#acces-root') || this;
    this._replaceTerminology(target);
    this._mo = new MutationObserver(() => {
      // throttle simple
      clearTimeout(this._moT); this._moT = setTimeout(() => this._replaceTerminology(target), 50);
    });
    this._mo.observe(target, { childList:true, characterData:true, subtree:true });
  }

  disconnectedCallback(){
    super.disconnectedCallback?.();
    try { window.speechSynthesis?.cancel(); } catch {}
    if (this._ttsTick) clearInterval(this._ttsTick);
    if (this._mo) this._mo.disconnect();
  }

  // ====== Zoom ======
  _clampZoom(z){ return Math.min(2, Math.max(1, Number(z || 1))); }
  _applyZoom(){
    const base = 16; // px
    const size = (base * this.zoom).toFixed(2) + 'px';
    document.documentElement.style.setProperty('--acces-zoom', String(this.zoom));
    document.documentElement.style.fontSize = size;
    localStorage.setItem('acces.zoom', String(this.zoom));
    const live = this.querySelector('#zoom-live');
    if (live) { live.textContent = `Zoom ${Math.round(this.zoom*100)}%`; }
  }
  _incZoom(delta){
    this.zoom = this._clampZoom((this.zoom + delta));
    this._applyZoom();
  }
  _resetZoom(){
    this.zoom = 1;
    this._applyZoom();
  }

  // ====== TTS (Texto a voz) ======
  toggleLectura = () => {
    const synth = window.speechSynthesis;
    if(!synth){ alert('La síntesis de voz no está disponible en este navegador'); return; }

    // Detener cualquier lectura previa “enganchada” (Chrome fix)
    synth.cancel();

    const btn = this.querySelector('#btnTTS');

    if(this._isLeyendo && !this._isPaused){
      synth.pause();
      this._isPaused = true;
      if(btn){ btn.innerHTML = '⏸️'; btn.className = 'utility-btn paused'; btn.title = 'Reanudar lectura'; }
      return;
    }

    if(this._isPaused){
      synth.resume();
      this._isPaused = false;
      if(btn){ btn.innerHTML = '⏹️'; btn.className = 'utility-btn reading'; btn.title = 'Detener lectura'; }
      return;
    }

    if(this._isLeyendo){
      synth.cancel();
      this._resetTTSButton();
      return;
    }

    // Iniciar nueva lectura (contenido visible principal)
    const root = this.querySelector('#acces-root') || this.querySelector('.container') || this.querySelector('main') || document.body;
    const texto = (root?.innerText || '').trim();
    if(!texto){ alert('No hay texto para leer'); return; }

    const utt = new SpeechSynthesisUtterance(texto);
    utt.lang = 'es-ES';
    utt.rate = 0.95; utt.pitch = 1; utt.volume = 1;

    // Voz en español si existe
    const voices = synth.getVoices();
    const spanish = voices.find(v => (v.lang || '').toLowerCase().startsWith('es'));
    if(spanish) utt.voice = spanish;

    utt.onstart = () => {
      this._isLeyendo = true; this._isPaused = false;
      if(btn){ btn.innerHTML = '⏹️'; btn.className = 'utility-btn reading'; btn.title = 'Detener lectura'; }
    };
    utt.onend = () => this._resetTTSButton();
    utt.onerror = () => { this._resetTTSButton(); alert('Error en la síntesis de voz'); };

    this._utterance = utt;
    setTimeout(() => {
      try { synth.speak(utt); } catch(e){ this._resetTTSButton(); alert('Error al iniciar la síntesis: ' + e.message); }
    }, 80);
  };

  _resetTTSButton(){
    const btn = this.querySelector('#btnTTS');
    this._isLeyendo = false; this._isPaused = false;
    if(btn){ btn.innerHTML = '🔊'; btn.className = 'utility-btn'; btn.title = 'Audio/Text-to-Speech'; }
  }

  // ====== Terminología ======
  _replaceTerminology(root){
    const AVOID = new Set(['SCRIPT','STYLE','NOSCRIPT','CODE','PRE','TEXTAREA','INPUT','SELECT']);
    const replaceText = (node) => {
      // Reemplazos cuidadosos (singular y plural)
      const r1 = /\bdiscapacidades\b/gi;
      const r2 = /\bdiscapacidad\b/gi;
      let t = node.nodeValue;
      if (!t || (!r1.test(t) && !r2.test(t))) return;
      t = t.replace(r1, 'diversidades funcionales').replace(r2, 'diversidad funcional');
      node.nodeValue = t;
    };
    const walk = (el) => {
      if (!el || AVOID.has(el.nodeName)) return;
      for (let n = el.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3) replaceText(n);
        else if (n.nodeType === 1) walk(n);
      }
    };
    walk(root);
  }

  render(){
    // Paleta
    const c = { blue:'#24c8f1', blueDeep:'#1976d2', soft:'#e3f2fd', soft2:'#bbdefb' };

    return html`
      <style>
        *{ box-sizing:border-box; }
        .container{ max-width:1200px; margin:0 auto; padding:20px; }
        .main-title{
          font-size:36px; font-weight:700; color:#000; margin-bottom:30px;
          border-bottom:4px solid ${c.blue}; padding-bottom:15px;
          display:flex; justify-content:space-between; align-items:center;
        }
        .title-actions{ display:flex; gap:20px; }
        .action-btn{ display:flex; align-items:center; gap:8px; color:${c.blue}; text-decoration:none; font-weight:500; }
        .action-btn:hover{ text-decoration:underline; }

        .banner-section{ margin-bottom:40px; position:relative; }
        .banner-image{ width:100%; height:400px; overflow:hidden; border-radius:12px; position:relative; }
        .banner-image img{ width:100%; height:100%; object-fit:cover; border-radius:12px; }
        .banner-logo{
          position:absolute; bottom:20px; left:20px; background:rgba(255,255,255,.95);
          color:${c.blueDeep}; padding:15px 20px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,.15);
        }
        .logo-main{ font-size:18px; font-weight:700; color:${c.blueDeep}; }

        .accessibility-links{ margin: 0 0 40px 0; }
        .accessibility-link{
          display:block; color:#000; text-decoration:none; font-size:18px; margin-bottom:15px;
          padding:15px 20px; background:${c.soft}; border-radius:8px; border-left:4px solid ${c.blue};
          transition:all .3s ease;
        }
        .accessibility-link:hover{ background:${c.soft2}; transform:translateX(5px); }

        .page-footer{ display:flex; justify-content:space-between; align-items:flex-end; margin-top:40px; padding-top:20px; border-top:1px solid #eee; }
        .footer-left{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; }

        .utility-btn{
          background:none; border:1px solid rgba(0,0,0,.08); font-size:18px; cursor:pointer;
          padding:8px 10px; border-radius:6px; color:${c.blue}; transition:background-color .2s ease;
        }
        .utility-btn:hover{ background:${c.soft}; }
        .utility-btn.reading{ background:#ff6b6b !important; color:#fff !important; border-color:transparent; }
        .utility-btn.paused{ background:#feca57 !important; color:#fff !important; border-color:transparent; }

        .zoom-chip{ font-size:12px; padding:4px 8px; border-radius:9999px; background:${c.soft}; color:#084b83; border:1px solid rgba(0,0,0,.08); }

        @media (max-width:768px){
          .main-title{ flex-direction:column; gap:20px; text-align:center; }
          .title-actions{ justify-content:center; }
          .banner-image{ height:300px; }
        }
      </style>

      <div id="acces-root">
        <div class="container">
          <header>
            <h1 class="main-title">
              Accesibilidad
              <div class="title-actions">
                <a href="#" class="action-btn" aria-label="Compartir">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg>
                  Compartir
                </a>
                <a href="#" class="action-btn" aria-label="Buscar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                  Buscar
                </a>
              </div>
            </h1>
          </header>

          <main>
            <section class="banner-section">
              <div class="banner-image">
                <img src="https://d2kd1atb170pxv.cloudfront.net/var/site/storage/images/1/4/7/0/50741-3-esl-ES/5d918631669e-AdobeStock_833477820-1-1-.jpg"
                     alt="Equipo médico del Hospital San Jorge de Ayapel">
                <div class="banner-logo">
                  <div class="logo-main">E.S.E Hospital San Jorge Ayapel</div>
                </div>
              </div>
            </section>

            <section class="accessibility-links">
              <a href="https://www.convertic.gov.co/641/w3-channel.html" class="accessibility-link" target="_blank" rel="noopener">
                🔧 Herramientas del proyecto Convertic - Personas con diversidad funcional y visual
              </a>
              <a href="https://www.centroderelevo.gov.co/632/w3-channel.html" class="accessibility-link" target="_blank" rel="noopener">
                📞 Centro de relevo para diversidad funcional
              </a>
              <a href=${this.pdfUrl} class="accessibility-link" target="_blank" rel="noopener" download>
                📄 Procedimiento de Acceso (PDF) — Descargar evidencia
              </a>
            </section>
          </main>

          <footer class="page-footer">
            <div class="footer-left">
              <!-- ZOOM -->
              <button class="utility-btn" title="Disminuir zoom" aria-label="Disminuir zoom" @click=${() => this._incZoom(-0.25)}>A−</button>
              <button class="utility-btn" title="Restablecer zoom (100%)" aria-label="Restablecer zoom" @click=${() => this._resetZoom()}>100%</button>
              <button class="utility-btn" title="Aumentar zoom" aria-label="Aumentar zoom" @click=${() => this._incZoom(+0.25)}>A+</button>
              <span id="zoom-live" class="zoom-chip" aria-live="polite">Zoom ${Math.round(this.zoom*100)}%</span>

              <!-- Utilidades -->
              <button class="utility-btn" title="Imprimir página" @click=${() => window.print()} aria-label="Imprimir">🖨️</button>
              <button class="utility-btn" title="Audio/Text-to-Speech" id="btnTTS"
                      @click=${this.toggleLectura}
                      @keydown=${(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); this.toggleLectura(); } }}
                      aria-label="Leer contenido en voz alta">
                🔊
              </button>
            </div>
          </footer>
        </div>
      </div>
    `;
  }
}

customElements.define('accesibilidad-x', Historiaclinica);
