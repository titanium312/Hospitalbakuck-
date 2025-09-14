import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class GaleriaEstreno extends LitElement {
  static properties = {
    slides: { type: Array },
    idx: { type: Number, state: true },
    paused: { type: Boolean, state: true },
    progress: { type: Number, state: true },
    speaking: { type: Boolean, state: true }, // Audio TTS
  };

  static styles = css`
    :host { display:block; }

    /* ===== Control de tamaño por atributo ===== */
    :host{ --gal-max: 84rem; --title-scale: 1; --caption-scale: 1; --media-ratio: 16/9; }
    :host([size="sm"]){
      --gal-max: 60rem;               /* ~30% menos ancho en desktop */
      --title-scale: .9;              /* tipografía un poco menor */
      --caption-scale: .92;
      --media-ratio: 16/8.6;          /* un pelín más bajita */
    }

    .wrap { max-width: var(--gal-max); margin-inline: auto; padding-inline: 1rem; }
    @media (min-width: 640px){ .wrap{ padding-inline: 1.5rem; } }
    @media (min-width: 1024px){ .wrap{ padding-inline: 2rem; } }

    .card {
      position: relative; overflow: hidden; border-radius: 1.25rem;
      border: 1px solid rgba(30, 64, 175, .2);
      background: linear-gradient(180deg, #eff6ff, #ffffff, #eff6ff);
      box-shadow: 0 20px 60px rgba(30, 58, 138, .15);
      outline: none;
    }

    /* Barra de progreso superior */
    .progress { position: absolute; inset-inline: 0; top: 0; z-index: 20; display: flex; gap: .375rem; padding: .75rem; }
    .progress-track { height: .375rem; flex: 1; overflow: hidden; border-radius: 9999px; background: #bfdbfe; }
    .progress-fill { height: 100%; width: 0%; background: linear-gradient(90deg, #60a5fa, #2563eb); transition: width 100ms linear; }

    /* Badge */
    .badge {
      position: absolute; z-index: 20; left: 1rem; top: calc(1rem + env(safe-area-inset-top,0px));
      display:inline-block; padding: .25rem .75rem; border-radius: 9999px;
      font: 600 12px/1.2 system-ui, sans-serif; letter-spacing: .06em; text-transform: uppercase;
      color: #1e3a8a; backdrop-filter: blur(6px);
      background: rgba(37, 99, 235, .12); border: 1px solid rgba(147, 197, 253, .5);
    }

    /* Media + Ken Burns */
    .media { position: relative; aspect-ratio: var(--media-ratio); }
    .media img {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; user-select: none; -webkit-user-drag: none;
      will-change: transform; animation: kenburns 18s ease-in-out infinite;
    }
    @keyframes kenburns {
      0%   { transform: scale(1) translate(0,0); }
      50%  { transform: scale(1.06) translate(-1.5%, -1.5%); }
      100% { transform: scale(1) translate(0,0); }
    }

    /* Lavados/gradientes */
    .wash   { position:absolute; inset:0; background: rgba(30, 58, 138, .10); mix-blend: multiply; pointer-events:none; }
    .vg-btm { position:absolute; inset:0; background: linear-gradient(0deg, rgba(15,23,42,.52), rgba(15,23,42,0) 55%); pointer-events:none; }
    .vg-side{ position:absolute; inset:0; background: linear-gradient(90deg, rgba(15,23,42,.28), transparent 45%, transparent 55%, rgba(15,23,42,.28)); pointer-events:none; }

    /* Texto vidrio */
    .glass-wrap { position: absolute; inset: 0; z-index: 10; display: flex; align-items: end; pointer-events: none; }
    .glass { width: 100%; padding: 1.25rem; }
    @media (min-width: 768px){ .glass{ padding: 2rem; } }
    .glass-card {
      max-width: 56rem; border-radius: 1rem;
      background: rgba(255,255,255,.15);
      border: 1px solid rgba(255,255,255,.25);
      backdrop-filter: blur(10px);
      color: #e8eeff; padding: 1rem 1.25rem; box-shadow: 0 8px 30px rgba(2,6,23,.25);
      pointer-events: auto;
    }
    @media (min-width: 768px){ .glass-card{ padding: 1.25rem 1.5rem; } }

    .title { margin: 0; font-weight: 800; letter-spacing: -.02em; line-height: 1.15; font-size: calc(1.75rem * var(--title-scale)); }
    @media (min-width: 768px){ .title{ font-size: calc(2.25rem * var(--title-scale)); } }

    .caption { margin: .4rem 0 0; color: rgba(232,238,255,.92); font-size: calc(.95rem * var(--caption-scale)); }
    @media (min-width: 768px){ .caption{ font-size: calc(1.05rem * var(--caption-scale)); } }

    .cta {
      margin-top: .9rem; display: inline-flex; align-items: center; gap: .5rem;
      padding: .6rem 1.1rem; border-radius: 9999px; font-weight: 600;
      color: #fff; text-decoration: none;
      background: linear-gradient(90deg, #3b82f6, #2563eb);
      box-shadow: 0 10px 24px rgba(59,130,246,.25);
      transition: transform .15s ease, filter .15s ease;
    }
    .cta:hover { transform: translateY(-1px); filter: brightness(1.02); }

    /* Flechas */
    .nav-btn {
      position: absolute; top: 50%; transform: translateY(-50%);
      z-index: 20; padding: .5rem; border-radius: 9999px;
      background: rgba(255,255,255,.9); color: #1e3a8a; border: none;
      box-shadow: 0 10px 24px rgba(2,6,23,.12); cursor: pointer;
    }
    .nav-btn:hover { background: #fff; }
    .prev { left: .75rem; }
    .next { right: .75rem; }
    @media (max-width:640px){
      .nav-btn{ top:auto; bottom: calc(2.6rem + env(safe-area-inset-bottom, 0px)); transform:none; }
      .prev{ left:.5rem; } .next{ right:.5rem; }
    }

    /* Dots */
    .dots { position: absolute; left: 0; right: 0; bottom: calc(1rem + env(safe-area-inset-bottom, 0px)); z-index: 20; display: flex; justify-content: center; gap: .5rem; }
    .dot  { height: .625rem; width: .625rem; border-radius: 9999px; border: none; cursor: pointer; background: #93c5fd; transition: all .15s ease; }
    .dot[aria-current="true"]{ width: 1.75rem; background: #2563eb; }

    /* Acciones (Audio) */
    .actions { position:absolute; right:1rem; top: calc(1rem + env(safe-area-inset-top, 0px)); z-index:22; display:flex; gap:.45rem; }
    .action  { display:inline-flex; align-items:center; justify-content:center; gap:.45rem; height:36px; min-width:36px; padding:0 .7rem; border-radius:9999px; cursor:pointer; background:rgba(255,255,255,.92); color:#1e3a8a; border:1px solid rgba(2,6,23,.08); font:700 .88rem/1 system-ui,sans-serif; box-shadow:0 10px 24px rgba(2,6,23,.12); }
    .action[aria-pressed="true"]{ filter:brightness(1.03); }

    /* Accesibilidad */
    .no-select{ user-select: none; -webkit-user-select: none; }
    .focus-ring:focus-visible{ outline: 3px solid rgba(56,189,248,.6); outline-offset: 2px; }

    /* ====== AJUSTES MÓVIL: foto por encima del texto (menos opaco y texto compacto) ====== */
    @media (max-width: 640px){
      .vg-btm { background: linear-gradient(0deg, rgba(15,23,42,.35), rgba(15,23,42,0) 45%); }
      .vg-side{ background: linear-gradient(90deg, rgba(15,23,42,.18), transparent 40%, transparent 60%, rgba(15,23,42,.18)); }

      .glass{ padding: .9rem; }
      .glass-card{
        padding: .65rem .8rem;
        max-width: 90%;
        margin-inline: auto;
        background: rgba(255,255,255,.13); /* un pelín menos de vidrio, deja respirar la foto */
      }
      .title  { font-size: calc(1.2rem * var(--title-scale)); }
      .caption{ font-size: calc(.85rem * var(--caption-scale)); line-height: 1.25; }
      .cta    { padding: .5rem .9rem; }
    }

    @media (prefers-reduced-motion: reduce){
      .media img{ animation:none; }
      .progress-fill{ transition:none; }
    }
  `;

  constructor() {
    super();
    this.idx = 0;
    this.paused = false;
    this.progress = 0;
    this.speaking = false;
    this._tick = null;
    this._voices = null;

    // Slides de ejemplo (puedes sobrescribir con .slides)
    this.slides = [
          { src: 'https://hospitalsanjorgeayapel.info/LectorPdf/Img/Urgencias.jpeg', title: 'Urgencias', caption: 'Atención inmediata y especializada las 24 horas.' },
                { src: 'https://hospitalsanjorgeayapel.info/LectorPdf/Img/Laboratorio.jpeg', title: 'Laboratorio', caption: 'Resultados confiables y tecnología moderna a tu alcance.' },
      { src: 'https://hospitalsanjorgeayapel.info/LectorPdf/Img/Apoyos%20Servicios%20Generales.jpeg', title: 'Apoyos y Servicios Generales', caption: 'Un respaldo esencial para el funcionamiento integral del hospital.' },
      { src: 'https://hospitalsanjorgeayapel.info/LectorPdf/Img/Nuestra%20Gente.jpeg', title: 'Nuestra Gente', caption: 'El talento humano que hace posible un servicio de calidad.' },
      { src: 'https://hospitalsanjorgeayapel.info/LectorPdf/Img/Nuestras%20Acciones%20en%20Salud.jpeg', title: 'Nuestras Acciones en Salud', caption: 'Compromiso constante con el bienestar de la comunidad.' },

      { src: 'https://hospitalsanjorgeayapel.info/LectorPdf/Img/Odontologia.jpeg', title: 'Odontología', caption: 'Sonrisas saludables con atención profesional.' },
    ];
  }

  /* === Ciclo de vida === */
  connectedCallback() {
    super.connectedCallback();
    this._bindVoices();
    this._startAutoplay();
    this._onKey = (e) => { if (e.key === 'ArrowRight') this._next(); if (e.key === 'ArrowLeft')  this._prev(); };
    window.addEventListener('keydown', this._onKey);
    this._onVisibility = () => { this.paused = document.hidden || this.speaking; };
    document.addEventListener('visibilitychange', this._onVisibility);
  }
  disconnectedCallback() {
    this._stopAutoplay();
    window.removeEventListener('keydown', this._onKey);
    document.removeEventListener('visibilitychange', this._onVisibility);
    this._stopSpeak();
    super.disconnectedCallback();
  }

  /* === Autoplay/Progreso === */
  _startAutoplay() {
    this._stopAutoplay();
    const DURATION_MS = 5000;
    const TICK_MS = 50;
    const step = (TICK_MS / DURATION_MS) * 100;

    this._tick = setInterval(() => {
      if (this.paused || this.slides.length <= 1) return;
      const next = this.progress + step;
      if (next >= 100) {
        this.idx = (this.idx + 1) % this.slides.length;
        this.progress = 0;
      } else {
        this.progress = next;
      }
      this.requestUpdate();
    }, TICK_MS);
  }
  _stopAutoplay() { if (this._tick) clearInterval(this._tick); this._tick = null; }

  /* === Navegación === */
  _goTo(n) { this.idx = n; this.progress = 0; }
  _prev()  { this._goTo((this.idx - 1 + this.slides.length) % this.slides.length); }
  _next()  { this._goTo((this.idx + 1) % this.slides.length); }

  /* === Touch (swipe) === */
  _touchStartX = null;
  _onTouchStart(e){ this._touchStartX = e.touches?.[0]?.clientX ?? null; }
  _onTouchEnd(e){
    if (this._touchStartX == null) return;
    const dx = (e.changedTouches?.[0]?.clientX ?? 0) - this._touchStartX;
    if (Math.abs(dx) > 40) this._goTo((this.idx + (dx < 0 ? 1 : -1) + this.slides.length) % this.slides.length);
    this._touchStartX = null;
  }

  /* === Voz (TTS) === */
  _bindVoices(){
    if(!('speechSynthesis' in window)) return;
    const load = ()=>{ this._voices = window.speechSynthesis.getVoices(); };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  }
  _chooseVoice(){
    if(!this._voices || !this._voices.length) return null;
    return (
      this._voices.find(v=>/es[-_]CO/i.test(v.lang)) ||
      this._voices.find(v=>/es[-_]/i.test(v.lang)) ||
      this._voices[0]
    );
  }
  _toggleSpeak(){
    if(!('speechSynthesis' in window)) return;
    if(this.speaking){ this._stopSpeak(); return; }

    const s = this.slides[this.idx];
    const texto = [s?.title, s?.caption].filter(Boolean).join('. ');
    const msg = new SpeechSynthesisUtterance(texto);
    const v = this._chooseVoice();
    if(v) msg.voice = v;
    msg.lang = v?.lang ?? 'es-ES';
    msg.rate = 1.0; msg.pitch = 1.0;

    msg.onstart = ()=>{ this.speaking = true; this.paused = true; this.requestUpdate(); };
    msg.onend   = ()=>{ this.speaking = false; this.paused = document.hidden; this.requestUpdate(); };
    msg.onerror = ()=>{ this.speaking = false; this.paused = false; };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  }
  _stopSpeak(){ if(!('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); this.speaking = false; this.paused = false; }

  /* === UI === */
  renderProgress() {
    return html`
      <div class="progress" aria-hidden="true">
        ${this.slides.map((_, i) => html`
          <div class="progress-track">
            <div class="progress-fill" style=${`width:${i===this.idx? this.progress.toFixed(3)+'%' : (i<this.idx?'100%':'0%')}`}></div>
          </div>
        `)}
      </div>
    `;
  }

  render() {
    if (!this.slides?.length) return null;
    const s = this.slides[this.idx];

    return html`
      <section class="wrap" aria-roledescription="carrusel">
        <div
          class="card no-select focus-ring"
          tabindex="0"
          aria-live="polite"
          @mouseenter=${()=>{ this.paused = true; }}
          @mouseleave=${()=>{ if(!this.speaking) this.paused = false; }}
          @touchstart=${this._onTouchStart}
          @touchend=${this._onTouchEnd}
        >
          ${this.renderProgress()}

          <!-- Acciones -->
          <div class="actions">
            <button class="action focus-ring" @click=${this._toggleSpeak} aria-pressed=${this.speaking} title=${this.speaking?'Detener audio':'Escuchar'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style="display:block">
                ${this.speaking
                  ? html`<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>`
                  : html`<path d="M3 10v4h4l5 5V5L7 10H3zM14 10a3 3 0 010 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>`}
              </svg>
              <span>Audio</span>
            </button>
          </div>

          ${s?.badge ? html`<span class="badge">${s.badge}</span>` : null}

          <div class="media" role="group" aria-label=${s?.title ?? 'imagen'}>
            <img src=${s.src} alt=${s.title ?? ''} loading="lazy" decoding="async" />
            <div class="wash"></div>
            <div class="vg-btm"></div>
            <div class="vg-side"></div>
          </div>

          <div class="glass-wrap">
            <div class="glass">
              <div class="glass-card">
                <h3 class="title">${s.title}</h3>
                ${s?.caption ? html`<p class="caption">${s.caption}</p>` : null}
                ${s?.ctaHref && s?.ctaLabel ? html`
                  <a class="cta" href=${s.ctaHref} target="_blank" rel="noopener">
                    ${s.ctaLabel}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style="display:block">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </a>
                `: null}
              </div>
            </div>
          </div>

          <button class="nav-btn prev focus-ring" aria-label="Anterior" @click=${this._prev}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
          <button class="nav-btn next focus-ring" aria-label="Siguiente" @click=${this._next}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>

          <div class="dots">
            ${this.slides.map((_, i) => html`
              <button class="dot focus-ring" aria-label=${`Ir al slide ${i+1}`} aria-current=${i===this.idx} @click=${()=>this._goTo(i)}></button>
            `)}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('galeria-estreno', GaleriaEstreno);
