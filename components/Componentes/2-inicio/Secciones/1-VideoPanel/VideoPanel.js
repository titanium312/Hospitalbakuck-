import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

class VideoPanel extends LitElement {
  static styles = css`
    :host { display:block; }
    .hero {
      position: relative;
      width: 100%;
      min-height: 78vh;
      background: #fff;
      color: #0b2a5b; /* azul texto */
      isolation: isolate;
    }
    @media (min-width: 768px) {
      .hero { min-height: 86vh; }
    }
    @media (min-width: 1024px) {
      .hero { min-height: 94vh; }
    }

    /* Video full-bleed */
    .hero__video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Overlays para legibilidad */
    .overlay-grad {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(6,14,40,0.65), rgba(14,35,85,0.45), rgba(15,53,120,0.35));
      pointer-events: none;
    }
    .overlay-radial {
      position: absolute;
      inset: 0;
      background: radial-gradient(1200px 600px at 80% -10%, rgba(255,255,255,0.18), transparent);
      pointer-events: none;
    }
    .overlay-lines {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0) 40%, rgba(255,255,255,0.08));
      pointer-events: none;
    }

    /* Contenido */
    .hero__inner {
      position: relative;
      z-index: 1;
      max-width: 84rem; /* ≈ 1344px */
      margin-inline: auto;
      padding-inline: 1rem;
    }
    @media (min-width: 640px) { .hero__inner { padding-inline: 1.5rem; } }
    @media (min-width: 1024px) { .hero__inner { padding-inline: 2rem; } }

    .hero__content {
      min-height: 78vh;
      display: flex;
      align-items: center;
    }
    @media (min-width: 768px) { .hero__content { min-height: 86vh; } }
    @media (min-width: 1024px) { .hero__content { min-height: 94vh; } }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: .5rem;
      padding: .25rem .75rem;
      border-radius: 9999px;
      border: 1px solid rgba(255,255,255,.2);
      background: rgba(255,255,255,.08);
      color: #eaf2ff;
      font-size: .9rem;
      backdrop-filter: blur(4px);
    }

    .title {
      margin-top: .75rem;
      font-weight: 800;
      line-height: 1.15;
      color: #fff;
      text-shadow: 0 8px 24px rgba(0,0,0,.25);
      font-size: 2rem;
    }
    @media (min-width: 768px) { .title { font-size: 3rem; } }

    .underline {
      position: relative;
      display: inline-block;
    }
    .underline::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: .25rem;
      height: .5rem;
      background: rgba(147,197,253,.55); /* azul claro translúcido */
      border-radius: .375rem;
      z-index: -1;
    }

    .subtitle {
      margin-top: .9rem;
      max-width: 56rem;
      color: rgba(245,247,255,.95);
      font-weight: 300;
      font-size: 1.1rem;
    }
    @media (min-width: 768px) { .subtitle { font-size: 1.35rem; } }

    /* Botones */
    .actions {
      margin-top: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: .75rem;
      justify-content: center;
    }
    @media (min-width: 768px) { .actions { justify-content: flex-start; } }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: .8rem 1.4rem;
      border-radius: 9999px;
      font-weight: 600;
      text-decoration: none;
      transition: transform .15s ease, background .15s ease, box-shadow .15s ease, border-color .15s ease;
      border: 1px solid transparent;
      backdrop-filter: blur(4px);
    }
    .btn--primary {
      background: #3b82f6; /* azul */
      color: #fff;
      box-shadow: 0 10px 24px rgba(59,130,246,.25);
    }
    .btn--primary:hover { background: #2563eb; transform: translateY(-1px); }
    .btn--ghost {
      background: rgba(255,255,255,.08);
      border-color: rgba(255,255,255,.6);
      color: #fff;
    }
    .btn--ghost:hover { background: rgba(255,255,255,.18); }

    /* Stats */
    .stats {
      margin-top: 1.6rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: .75rem;
      color: rgba(245,247,255,.95);
    }
    @media (min-width: 640px) { .stats { grid-template-columns: repeat(3, 1fr); } }

    .stat {
      border-radius: 1rem;
      background: rgba(255,255,255,.1);
      border: 1px solid rgba(255,255,255,.15);
      padding: 1rem;
      backdrop-filter: blur(4px);
    }
    .stat__value { font-size: 1.6rem; font-weight: 800; }
    .stat__label { font-size: .9rem; opacity: .95; }

    /* Vignette inferior para transición a la siguiente sección */
    .vignette {
      position: absolute;
      left: 0; right: 0; bottom: 0;
      height: 6rem;
      background: linear-gradient(to top, #fff, transparent);
      pointer-events: none;
    }

    /* Accesibilidad: reduce motion */
    @media (prefers-reduced-motion: reduce) {
      .hero__video { animation: none !important; }
    }

    /* Alineaciones responsivas */
    .text-center { text-align: center; }
    @media (min-width: 768px) { .md-text-left { text-align: left; } }
  `

  render() {
    return html`
      <section class="hero" aria-label="Presentación Hospital San Rafael">
        <!-- Video full-bleed -->
        <video
          class="hero__video"
          autoplay
          loop
          muted
          playsinline
          preload="metadata"
          poster="/poster-hospital.jpg"
        >
          <source
            src="https://cdn.pixabay.com/video/2025/06/01/282995_large.mp4"
            type="video/webm"
          />
          Tu navegador no soporta video.
        </video>

        <!-- Overlays -->
        <div class="overlay-grad"></div>
        <div class="overlay-radial"></div>
        <div class="overlay-lines"></div>

        <!-- Contenido -->
        <div class="hero__inner">
          <div class="hero__content">
            <div class="w-full text-center md-text-left">
              <div class="badge" aria-hidden="true">Excelencia clínica • Trato humano</div>

              <h1 class="title">
                Cuidado de la salud <span class="underline">con excelencia</span>
              </h1>

              <p class="subtitle">
                Atención integral para toda la familia, 24/7. Tecnología moderna y un equipo
                comprometido con tu bienestar.
              </p>

              <div class="actions">
                <a href="/pacientes/citas" class="btn btn--primary">Agendar cita</a>
                <a href="https://wa.me/573001112233" target="_blank" rel="noopener noreferrer" class="btn btn--ghost">WhatsApp</a>
                <a href="tel:123" class="btn btn--ghost">Emergencias 24/7</a>
              </div>

              <div class="stats">
                <div class="stat">
                  <p class="stat__value">15+</p>
                  <p class="stat__label">Especialidades médicas</p>
                </div>
                <div class="stat">
                  <p class="stat__value">12k</p>
                  <p class="stat__label">Pacientes atendidos</p>
                </div>
                <div class="stat">
                  <p class="stat__value">4.8/5</p>
                  <p class="stat__label">Satisfacción promedio</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Vignette inferior -->
        <div class="vignette"></div>
      </section>
    `
  }
}

customElements.define('video-panel', VideoPanel)
