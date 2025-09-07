import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Historiaclinica extends LitElement {
  // Light DOM para que apliquen estilos globales (p.ej. Tachyons)
  createRenderRoot(){ return this; }

  static properties = {
    _isLeyendo: { state: true },
    _isPaused: { state: true },
  };

  constructor(){
    super();
    this._isLeyendo = false;
    this._isPaused = false;
    this._utterance = null;
  }

  // ====== TTS (Texto a voz) ======
  toggleLectura = () => {
    const synth = window.speechSynthesis;
    if(!synth){ alert('La síntesis de voz no está disponible en este navegador'); return; }

    // Fix Chrome: detener cualquier lectura previa
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
      this._resetButton();
      return;
    }

    // Iniciar nueva lectura (leer el contenido visible principal)
    const root = this.querySelector('#miDiv2') || this.querySelector('.container') || this.querySelector('main') || document.body;
    const texto = (root?.innerText || '').trim();
    if(!texto){ alert('No hay texto para leer'); return; }

    const utt = new SpeechSynthesisUtterance(texto);
    utt.lang = 'es-ES';
    utt.rate = 0.9; utt.pitch = 1; utt.volume = 1;

    // Seleccionar voz en español si existe
    const voices = synth.getVoices();
    const spanish = voices.find(v => (v.lang || '').toLowerCase().startsWith('es'));
    if(spanish) utt.voice = spanish;

    utt.onstart = () => {
      this._isLeyendo = true; this._isPaused = false;
      if(btn){ btn.innerHTML = '⏹️'; btn.className = 'utility-btn reading'; btn.title = 'Detener lectura'; }
    };
    utt.onend = () => this._resetButton();
    utt.onerror = () => { this._resetButton(); alert('Error en la síntesis de voz'); };

    this._utterance = utt;
    // Fix Chrome: speak con pequeño retardo
    setTimeout(() => {
      try { synth.speak(utt); } catch(e){ this._resetButton(); alert('Error al iniciar la síntesis: ' + e.message); }
    }, 100);
  };

  _resetButton(){
    const btn = this.querySelector('#btnTTS');
    this._isLeyendo = false; this._isPaused = false;
    if(btn){ btn.innerHTML = '🔊'; btn.className = 'utility-btn'; btn.title = 'Audio/Text-to-Speech'; }
  }

  firstUpdated(){
    // Cargar voces (algunos navegadores las emiten asincrónicamente)
    if(window.speechSynthesis?.onvoiceschanged !== undefined){
      window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
    }
    // Observa si se detiene externamente
    this._interval = setInterval(() => {
      const synth = window.speechSynthesis;
      if(this._isLeyendo && synth && !synth.speaking && !this._isPaused) this._resetButton();
    }, 1000);
  }

  disconnectedCallback(){
    super.disconnectedCallback?.();
    if(this._interval) clearInterval(this._interval);
    try { window.speechSynthesis?.cancel(); } catch {}
  }

  render(){
    // Paleta
    const c = { blue:'#24c8f1', blueDeep:'#1976d2', soft:'#e3f2fd', soft2:'#bbdefb' };

    return html`
      <style>
        *{ box-sizing:border-box; }
        .container{ max-width:1200px; margin:0 auto; padding:20px; }
        .breadcrumbs{ font-size:14px; color:${c.blue}; margin-bottom:20px; }
        .breadcrumbs a{ color:${c.blue}; text-decoration:none; }
        .breadcrumbs a:hover{ text-decoration:underline; }

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

        .accessibility-links{ margin-bottom:40px; }
        .accessibility-link{
          display:block; color:#000; text-decoration:none; font-size:18px; margin-bottom:15px;
          padding:15px 20px; background:${c.soft}; border-radius:8px; border-left:4px solid ${c.blue};
          transition:all .3s ease;
        }
        .accessibility-link:hover{ background:${c.soft2}; transform:translateX(5px); }

        .page-footer{ display:flex; justify-content:space-between; align-items:flex-end; margin-top:40px; padding-top:20px; border-top:1px solid #eee; }
        .footer-left{ display:flex; gap:15px; }
        .utility-btn{
          background:none; border:none; font-size:24px; cursor:pointer; padding:10px; border-radius:6px; color:${c.blue};
          transition:background-color .2s ease;
        }
        .utility-btn:hover{ background:${c.soft}; }
        .utility-btn.reading{ background:#ff6b6b !important; color:#fff !important; }
        .utility-btn.paused{ background:#feca57 !important; color:#fff !important; }

        @media (max-width:768px){
          .main-title{ flex-direction:column; gap:20px; text-align:center; }
          .title-actions{ justify-content:center; }
          .banner-image{ height:300px; }
        }
      </style>

      <div id="miDiv2">
        <div class="container">
          <header>
            <h1 class="main-title">
              Accesibilidad
              <div class="title-actions">
                <a href="#" class="action-btn" aria-label="Compartir">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path>
                  </svg>
                  Compartir
                </a>
                <a href="#" class="action-btn" aria-label="Buscar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                  </svg>
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
            </section>
          </main>

          <footer class="page-footer">
            <div class="footer-left">
              <button class="utility-btn" title="Imprimir página" onclick="window.print()" aria-label="Imprimir">🖨️</button>
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
