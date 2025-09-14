import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../../herramienta/dictador.js';

/**
 * <mapa-de-procesos>
 * — Paleta celestes + blanco (Tachyons + CSS propio).
 * — 2 dictadores: header (estratégico) y FAB flotante (esquina inferior derecha).
 * — Botones especificados: tokens .btn + variantes, accesibles y con foco visible.
 *
 * Requisito: Tachyons en la página:
 * <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css">
 */
export class MapaDeProcesosElement extends LitElement {
  createRenderRoot(){ return this; }

  // ======== Estado dictado ========
  #utterance = null;
  #isSpeaking = false;

  connectedCallback(){
    super.connectedCallback();
    window.speechSynthesis?.getVoices?.();
  }

  // ======== Adaptador dictador.js/Fallback ========
  _tryDictadorSpeak(text){
    try {
      if (window.Dictador?.speak) { window.Dictador.speak(text); return true; }
      if (window.Dictador?.leer)  { window.Dictador.leer(text);  return true; }
      if (window.dictador?.speak) { window.dictador.speak(text); return true; }
      if (typeof window.dictar === 'function') { window.dictar(text); return true; }
      window.dispatchEvent?.(new CustomEvent('dictar-texto', { detail:{ texto:text } }));
      return false;
    } catch(_) { return false; }
  }
  _tryDictadorStop(){
    try { if (window.Dictador?.stop)     { window.Dictador.stop();     return true; } } catch(_){}
    try { if (window.Dictador?.detener)  { window.Dictador.detener();  return true; } } catch(_){}
    try { if (window.Dictador?.cancel)   { window.Dictador.cancel();   return true; } } catch(_){}
    try { if (window.Dictador?.cancelar) { window.Dictador.cancelar(); return true; } } catch(_){}
    try { if (window.dictador?.stop)     { window.dictador.stop();     return true; } } catch(_){}
    try { if (window.dictador?.detener)  { window.dictador.detener();  return true; } } catch(_){}
    try { if (window.dictador?.cancel)   { window.dictador.cancel();   return true; } } catch(_){}
    try { if (window.dictador?.cancelar) { window.dictador.cancelar(); return true; } } catch(_){}
    try { window.dispatchEvent?.(new CustomEvent('detener-dictado')); } catch(_){}
    return false;
  }

  _dictar(text){
    if (this._tryDictadorSpeak(text)) return;
    if (!('speechSynthesis' in window)){
      alert('Tu navegador no soporta síntesis de voz. Usa Chrome, Edge o Safari.');
      return;
    }
    this._detener();
    const u = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis?.getVoices?.() || [];
    const v = voices.find(v => /spanish.*colom|es-CO/i.test(`${v.name} ${v.lang}`))
             || voices.find(v => /es-|spanish/i.test(`${v.name} ${v.lang}`));
    if (v) u.voice = v;
    u.rate = 1; u.pitch = 1; u.volume = 1;
    u.onend = () => { this.#isSpeaking = false; this.requestUpdate(); };
    u.onerror = () => { this.#isSpeaking = false; this.requestUpdate(); };
    this.#utterance = u;
    this.#isSpeaking = true;
    window.speechSynthesis.speak(u);
    this.requestUpdate();
  }

  _detener(){
    this._tryDictadorStop();
    if ('speechSynthesis' in window){
      try {
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
        window.speechSynthesis.cancel();
      } catch(_){}
    }
    this.#utterance = null;
    this.#isSpeaking = false;
    this.requestUpdate();
  }

  // ======== Textos ========
  get #tBanner(){
    return 'Mapa de procesos. Presentación clara, segura y centrada en el paciente.';
  }
  get #tIntro(){
    return (
      'El Mapa de Procesos del Hospital San Jorge de Ayapel organiza la gestión institucional en procesos ' +
      'estratégicos, misionales, de apoyo y de evaluación. Su objetivo es asegurar atención segura, integral ' +
      'y centrada en el paciente, integrando el enfoque por procesos y la gestión del riesgo bajo el Modelo MIPG.'
    );
  }
  get #tGaleria(){
    return 'Mapa de procesos del Hospital San Jorge de Ayapel. Imagen de referencia a continuación.';
  }
  get #tTodo(){
    return [this.#tBanner, this.#tIntro, this.#tGaleria].join(' ');
  }

  // ======== Botón estratégico (header) ========
  #botonEstrategico(texto){
    return html`
      <button
        class="btn btn--primary ml3"
        @click=${() => this._dictar(texto)}
        aria-label="Escuchar introducción"
        title="Escuchar introducción"
      >
        <span class="btn__icon" aria-hidden="true">🔊</span>
        <span class="btn__label">Escuchar</span>
      </button>
    `;
  }

  // ======== FAB flotante (esquina) ========
  #fab(){
    const speaking = this.#isSpeaking;
    return html`
      <div class="fab-wrapper">
        <button
          class="btn btn--fab ${speaking ? 'is-on' : ''}"
          @click=${() => speaking ? this._detener() : this._dictar(this.#tTodo)}
          aria-label="${speaking ? 'Detener lectura' : 'Dictar todo'}"
          title="${speaking ? 'Detener lectura' : 'Dictar todo'}"
          data-state="${speaking ? 'speaking' : 'idle'}"
        >
          ${speaking ? '⏹️' : '🔊'}
        </button>
      </div>
    `;
  }

  // ======== Render ========
  render(){
    return html`
      ${this.#styles()}
      <section class="w-100 bg-white">
        <!-- HERO -->
        <div class="hsja-hero w-100 pv5 ph3 ph4-ns">
          <div class="center w-100">
            <h2 class="hsja-title f2 f1-ns fw7 ma0 tc">Mapa de Procesos</h2>
            <p class="hsja-subtitle f5 tc mt3 mb0">Organización clara, segura y centrada en el paciente</p>
            <div class="tc mt3">
              ${this.#botonEstrategico('Introducción. ' + this.#tIntro)}
            </div>
          </div>
          <div class="hsja-wave" aria-hidden="true"></div>
        </div>

        <!-- CONTENIDO -->
        <div class="w-100 ph3 ph5-ns pv4">
          <article class="hsja-card w-100 pa3 pa4-ns center animate-slide-up">
            <p class="dark-gray f5 lh-copy mt0 mb3">
              El Mapa de Procesos del Hospital San Jorge de Ayapel organiza la gestión institucional
              en procesos <strong>estratégicos, misionales, de apoyo y de evaluación</strong>.
            </p>
            <p class="dark-gray f5 lh-copy mt0 mb3">
              Su propósito es garantizar una atención segura, integral y centrada en el paciente.
              Integra el enfoque por procesos y la gestión del riesgo bajo el <strong>Modelo MIPG</strong>.
            </p>
            <p class="dark-gray f5 lh-copy mt0 mb4">
              Explora el <strong>Mapa de Procesos</strong> en alta calidad a continuación.
            </p>

            <figure class="ma0">
              <div class="hsja-img-wrap">
                <img
                  class="db w-100"
                  src="https://img1.wsimg.com/isteam/ip/2a2c3ae8-dfb2-48fa-9fcf-4e2478b682dc/Anexo%20Mapa%20de%20procesos.png"
                  alt="Mapa de procesos del Hospital San Jorge de Ayapel"
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <figcaption class="mt2 mid-gray f6 tc">
                Mapa de procesos del Hospital San Jorge de Ayapel.
              </figcaption>
            </figure>
          </article>
        </div>

        <!-- FAB -->
        ${this.#fab()}
      </section>
    `;
  }

  // ======== Estilos (tokens de botón + layout) ========
  #styles(){
    return html`
      <style>
        :root{
          --celeste-900:#0d3b66;
          --celeste-700:#156099;
          --celeste-600:#1a77c6;
          --celeste-500:#1f7ae0;
          --celeste-300:#a8d8ff;
          --celeste-200:#d6ecff;
          --celeste-100:#f1f8ff;
          --blanco:#ffffff;
          --danger:#ff5a5f;

          --shadow-1:0 6px 18px rgba(17,80,127,.15);
          --shadow-2:0 10px 30px rgba(17,80,127,.18);
          --border:1px solid rgba(31,122,224,.15);
          --radius:1rem;
          --ring:#87c6ff; /* focus ring accesible */
        }

        /* ========== HERO ========== */
        .hsja-hero{
          position:relative; color:#fff; overflow:hidden;
          background: linear-gradient(135deg, var(--celeste-600), var(--celeste-500));
        }
        .hsja-hero::before{
          content:""; position:absolute; inset:-20% -30% auto auto;
          width:70vmax; height:70vmax;
          background: radial-gradient(closest-side, rgba(255,255,255,.12), transparent 70%);
          filter: blur(10px); pointer-events:none;
        }
        .hsja-title{ text-shadow:0 2px 10px rgba(0,0,0,.18) }
        .hsja-subtitle{ color: rgba(255,255,255,.9); }
        .hsja-wave{
          position:absolute; left:0; right:0; bottom:-1px; height:50px;
          background:
            radial-gradient(50px 25px at 10% 0, var(--blanco) 98%, transparent 100%),
            radial-gradient(60px 30px at 35% 0, var(--blanco) 98%, transparent 100%),
            radial-gradient(55px 28px at 60% 0, var(--blanco) 98%, transparent 100%),
            radial-gradient(70px 35px at 85% 0, var(--blanco) 98%, transparent 100%),
            linear-gradient(var(--blanco), var(--blanco));
        }

        /* ========== CARD ========== */
        .hsja-card{
          max-width:1100px; background:var(--blanco);
          border-radius:var(--radius); border:var(--border); box-shadow:var(--shadow-2);
        }
        .hsja-img-wrap{
          border-radius:.9rem; overflow:hidden; background:var(--celeste-100); border:var(--border);
          transition: transform .3s ease, box-shadow .3s ease;
          box-shadow: 0 8px 24px rgba(13,59,102,.10);
        }
        .hsja-img-wrap:hover{ transform:translateY(-2px); box-shadow: 0 14px 36px rgba(13,59,102,.16); }

        /* ========== BOTONES (ESPECIFICADOS) ========== */
        /**
         * Reglas base (token):
         * - Altura táctil mínima: 44px
         * - Padding cómodo: 0 16px
         * - Tipografía clara y legible
         * - Foco visible accesible (outline + ring)
         * - Transiciones respetuosas (motion-safe)
         */
        .btn{
          --btn-h: 44px;
          --btn-px: 1rem; /* ~16px */
          display:inline-flex; align-items:center; justify-content:center;
          min-height:var(--btn-h); padding:0 var(--btn-px);
          border-radius:.5rem; border:1px solid transparent;
          font-weight:600; line-height:1; letter-spacing:.01em;
          cursor:pointer; user-select:none; -webkit-tap-highlight-color: transparent;
          transition: transform .15s ease, box-shadow .15s ease, background .15s ease, border-color .15s ease;
        }
        .btn:disabled{ opacity:.6; cursor:not-allowed; }
        .btn:focus-visible{
          outline:2px solid var(--ring);
          outline-offset:2px;
          box-shadow:0 0 0 4px color-mix(in oklab, var(--ring) 45%, transparent);
        }
        .btn__icon{ margin-right:.5rem }
        .btn__label{ white-space:nowrap }

        /* Variante primaria (header) */
        .btn--primary{
          background: var(--blanco);
          color: var(--celeste-700);
          border-color: rgba(31,122,224,.25);
          box-shadow: var(--shadow-1);
        }
        .btn--primary:hover{
          transform: translateY(-1px);
          background: #fafdff;
          border-color: rgba(31,122,224,.35);
          box-shadow: 0 12px 28px rgba(17,80,127,.22);
        }
        .btn--primary:active{ transform: translateY(0) }

        /* FAB (flotante, esquina) */
        .fab-wrapper{
          position:fixed; right:1rem; bottom:1rem; z-index:9999;
        }
        .btn--fab{
          width:56px; height:56px; border-radius:9999px; font-size:22px;
          background: var(--celeste-500); color:#fff; box-shadow: 0 10px 30px rgba(31,122,224,.35);
        }
        .btn--fab:hover{ transform: translateY(-2px); box-shadow: 0 16px 36px rgba(31,122,224,.4); }
        .btn--fab:active{ transform: translateY(0) }
        .btn--fab.is-on{ background: var(--danger); } /* estado “leyendo” */

        /* Reducción de movimiento */
        @media (prefers-reduced-motion: reduce){
          .btn, .hsja-img-wrap{ transition: none; }
        }
        /* Contraste alto */
        @media (prefers-contrast: more){
          .btn--primary{ border-color:#1c5faa }
          .btn--fab{ box-shadow: 0 0 0 3px rgba(255,255,255,.6), 0 0 0 6px rgba(31,122,224,.45) }
        }

        /* TIPOGRAFÍA */
        p{ letter-spacing:.01em }
        strong{ color: var(--celeste-900); }
        .bg-white{ background: var(--blanco); } /* compat Tachyons */
        
        /* Animación entrada */
        @keyframes slideUp{ from { transform: translateY(10px); opacity:0 } to { transform: translateY(0); opacity:1 } }
        .animate-slide-up{ animation: slideUp .5s ease .05s both; }
      </style>
    `;
  }
}

customElements.define('mapa-de-procesos', MapaDeProcesosElement);
