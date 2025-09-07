import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class GaleriaEstreno extends LitElement {
  static properties = {
    slides: { type: Array },
    idx: { type: Number, state: true },
    paused: { type: Boolean, state: true },
    progress: { type: Number, state: true },
  };

  static styles = css`
    :host { display:block; }
    .wrap {
      max-width: 84rem; /* ~ 1344px */
      margin-inline: auto;
      padding-inline: 1rem;
    }
    @media (min-width: 640px){ .wrap{ padding-inline: 1.5rem; } }
    @media (min-width: 1024px){ .wrap{ padding-inline: 2rem; } }

    .card {
      position: relative;
      overflow: hidden;
      border-radius: 1.25rem;
      border: 1px solid rgba(30, 64, 175, .2);
      background: linear-gradient(180deg, #eff6ff, #ffffff, #eff6ff);
      box-shadow: 0 20px 60px rgba(30, 58, 138, .15);
    }

    /* Barra de progreso superior */
    .progress {
      position: absolute; inset-inline: 0; top: 0; z-index: 20;
      display: flex; gap: .375rem; padding: .75rem;
    }
    .progress-track {
      height: .375rem; flex: 1; overflow: hidden; border-radius: 9999px; background: #bfdbfe;
    }
    .progress-fill {
      height: 100%; width: 0%; background: linear-gradient(90deg, #60a5fa, #2563eb);
      transition: width 100ms linear;
    }

    /* Badge */
    .badge {
      position: absolute; z-index: 20; left: 1rem; top: 1rem;
      display:inline-block; padding: .25rem .75rem; border-radius: 9999px;
      font: 600 12px/1.2 system-ui, sans-serif; letter-spacing: .06em; text-transform: uppercase;
      color: #1e3a8a; backdrop-filter: blur(6px);
      background: rgba(37, 99, 235, .12); border: 1px solid rgba(147, 197, 253, .5);
    }

    /* Media 16:9 + Ken Burns */
    .media { position: relative; aspect-ratio: 16/9; }
    .media img {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; user-select: none; -webkit-user-drag: none;
      will-change: transform;
      animation: kenburns 18s ease-in-out infinite;
    }
    @keyframes kenburns {
      0%   { transform: scale(1) translate(0,0); }
      50%  { transform: scale(1.06) translate(-1.5%, -1.5%); }
      100% { transform: scale(1) translate(0,0); }
    }

    /* Lavado/gradientes para legibilidad */
    .wash   { position:absolute; inset:0; background: rgba(30, 58, 138, .12); mix-blend: multiply; pointer-events:none; }
    .vg-btm { position:absolute; inset:0; background: linear-gradient(0deg, rgba(15,23,42,.55), rgba(15,23,42,.0) 55%); pointer-events:none; }
    .vg-side{ position:absolute; inset:0; background: linear-gradient(90deg, rgba(15,23,42,.35), transparent 45%, transparent 55%, rgba(15,23,42,.35)); pointer-events:none; }

    /* Texto vidrio */
    .glass-wrap {
      position: absolute; inset: 0; z-index: 10; display: flex; align-items: end;
      pointer-events: none;
    }
    .glass {
      width: 100%; padding: 1.25rem;
    }
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

    .title {
      margin: 0; font-weight: 800; letter-spacing: -.02em; line-height: 1.15;
      font-size: 1.75rem;
    }
    @media (min-width: 768px){ .title{ font-size: 2.25rem; } }

    .caption {
      margin: .4rem 0 0; color: rgba(232,238,255,.9);
      font-size: .95rem;
    }
    @media (min-width: 768px){ .caption{ font-size: 1.05rem; } }

    .cta {
      margin-top: .9rem;
      display: inline-flex; align-items: center; gap: .5rem;
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
      background: rgba(255,255,255,.85); color: #1e3a8a; border: none;
      box-shadow: 0 10px 24px rgba(2,6,23,.12); cursor: pointer;
    }
    .nav-btn:hover { background: #fff; }
    .prev { left: .75rem; }
    .next { right: .75rem; }

    /* Dots */
    .dots {
      position: absolute; left: 0; right: 0; bottom: 1rem; z-index: 20;
      display: flex; justify-content: center; gap: .5rem;
    }
    .dot {
      height: .625rem; width: .625rem; border-radius: 9999px; border: none; cursor: pointer;
      background: #93c5fd; transition: all .15s ease;
    }
    .dot[aria-current="true"]{ width: 1.75rem; background: #2563eb; }

    /* Interacción */
    .no-select{ user-select: none; -webkit-user-select: none; }
  `;

  constructor() {
    super();
    this.idx = 0;
    this.paused = false;
    this.progress = 0;
    this._tick = null;
    // Slides por defecto (puedes pasarlos como atributo .slides también)
    this.slides = [
      {
        src: 'https://images.unsplash.com/photo-1580281657527-47e6ba6dbf9b?q=80&w=1600',
        title: 'Cuidado de la salud',
        caption: 'Atención médica excepcional para toda la familia',
        badge: 'Salud',
        ctaHref: 'https://wa.me/573001112233',
        ctaLabel: 'Contáctanos',
      },
      {
        src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600',
        title: 'Resultados en línea',
        caption: 'Consulta tus exámenes de laboratorio desde casa',
        badge: 'Nuevo',
        ctaHref: '/pacientes/resultados',
        ctaLabel: 'Ver resultados',
      },
      {
        src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1600',
        title: 'Citas disponibles',
        caption: 'Agenda tu consulta externa en minutos',
        badge: 'Hoy',
        ctaHref: '/pacientes/citas',
        ctaLabel: 'Agendar',
      },
    ];
  }

  // === Ciclo de vida ===
  connectedCallback() {
    super.connectedCallback();
    this._startAutoplay();
    this._onKey = (e) => {
      if (e.key === 'ArrowRight') this._goTo((this.idx + 1) % this.slides.length);
      if (e.key === 'ArrowLeft')  this._goTo((this.idx - 1 + this.slides.length) % this.slides.length);
    };
    window.addEventListener('keydown', this._onKey);
  }

  disconnectedCallback() {
    this._stopAutoplay();
    window.removeEventListener('keydown', this._onKey);
    super.disconnectedCallback();
  }

  // === Autoplay/Progreso ===
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
  _stopAutoplay() {
    if (this._tick) clearInterval(this._tick);
    this._tick = null;
  }

  // === Navegación ===
  _goTo(n) { this.idx = n; this.progress = 0; }
  _prev()  { this._goTo((this.idx - 1 + this.slides.length) % this.slides.length); }
  _next()  { this._goTo((this.idx + 1) % this.slides.length); }

  // === Touch (swipe) ===
  _touchStartX = null;
  _onTouchStart(e){ this._touchStartX = e.touches?.[0]?.clientX ?? null; }
  _onTouchEnd(e){
    if (this._touchStartX == null) return;
    const dx = (e.changedTouches?.[0]?.clientX ?? 0) - this._touchStartX;
    if (Math.abs(dx) > 40) this._goTo((this.idx + (dx < 0 ? 1 : -1) + this.slides.length) % this.slides.length);
    this._touchStartX = null;
  }

  renderProgress() {
    return html`
      <div class="progress">
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
      <section class="wrap">
        <div
          class="card no-select"
          @mouseenter=${()=>{ this.paused = true; }}
          @mouseleave=${()=>{ this.paused = false; }}
          @touchstart=${this._onTouchStart}
          @touchend=${this._onTouchEnd}
          aria-live="polite"
        >
          ${this.renderProgress()}

          ${s?.badge ? html`<span class="badge">${s.badge}</span>` : null}

          <div class="media">
            <img src=${s.src} alt=${s.title} loading="lazy" decoding="async" />
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

          <button class="nav-btn prev" aria-label="Anterior" @click=${this._prev}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
          <button class="nav-btn next" aria-label="Siguiente" @click=${this._next}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>

          <div class="dots">
            ${this.slides.map((_, i) => html`
              <button class="dot" aria-label=${`Ir al slide ${i+1}`} aria-current=${i===this.idx} @click=${()=>this._goTo(i)}></button>
            `)}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('galeria-estreno', GaleriaEstreno);
