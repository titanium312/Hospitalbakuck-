import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Cuidadodelpaciente extends LitElement {
  // Light DOM para que Tachyons funcione
  createRenderRoot() { return this; }

  render() {
    return html`
      <style>
        /* ====== Cuidado del Paciente (cdp-) ====== */
        :root {
          --cdp-bg: #ffffff;
          --cdp-surface: #f8fafc;
          --cdp-text: #0f172a;
          --cdp-muted: #475569;
          --cdp-accent: #0ea5e9;
          --cdp-accent-strong: #0284c7;
          --cdp-border: #e2e8f0;
          --cdp-success: #16a34a;
          --cdp-warning: #f59e0b;
        }
        .cdp-wrap {
          background: var(--cdp-bg);
          color: var(--cdp-text);
          border-radius: 1rem;
          border: 1px solid var(--cdp-border);
          box-shadow: 0 8px 24px rgba(2, 8, 23, 0.04);
          overflow: hidden;
        }
        .cdp-header {
          background: linear-gradient(180deg, #e0f2fe, #f8fafc);
          border-bottom: 1px solid var(--cdp-border);
        }
        .cdp-title {
          letter-spacing: -0.02em;
        }
        .cdp-kicker {
          font-weight: 600;
          color: var(--cdp-accent-strong);
          text-transform: uppercase;
          letter-spacing: .08em;
        }
        .cdp-section {
          background: var(--cdp-bg);
          border: 1px solid var(--cdp-border);
          border-radius: .75rem;
          transition: transform .12s ease, box-shadow .12s ease;
        }
        .cdp-section:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(2, 8, 23, 0.06);
        }
        .cdp-badge {
          display: inline-block;
          border-radius: 999px;
          padding: .25rem .6rem;
          font-size: .75rem;
          font-weight: 600;
          background: #e2f6ff;
          color: var(--cdp-accent-strong);
          border: 1px solid #cdefff;
        }
        .cdp-list li + li { margin-top: .5rem; }
        .cdp-muted { color: var(--cdp-muted); }
        .cdp-cta {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          border-radius: .75rem;
          border: 1px solid var(--cdp-border);
          padding: .75rem 1rem;
          text-decoration: none;
          font-weight: 600;
          transition: background .12s ease, border-color .12s ease, transform .06s ease;
          background: #fff;
        }
        .cdp-cta:hover { background: #f1f5f9; border-color: #cbd5e1; }
        .cdp-cta:active { transform: translateY(1px); }
        .cdp-cta--primary {
          background: var(--cdp-accent);
          color: #fff;
          border-color: var(--cdp-accent);
        }
        .cdp-cta--primary:hover { background: var(--cdp-accent-strong); border-color: var(--cdp-accent-strong); }

        .cdp-help {
          background: var(--cdp-surface);
          border: 1px dashed var(--cdp-border);
          border-radius: .75rem;
        }
        .cdp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 40rem) { /* ~640px */
          .cdp-grid { grid-template-columns: repeat(3, 1fr); }
          .cdp-grid-2 { grid-template-columns: repeat(2, 1fr); }
        }
        .cdp-icon {
          inline-size: 1.25rem;
          block-size: 1.25rem;
        }
        /* Accesibilidad: foco visible */
        .cdp-cta:focus-visible,
        a:focus-visible,
        button:focus-visible {
          outline: 3px solid #94d9ff;
          outline-offset: 2px;
          border-radius: .75rem;
        }
      </style>

      <section class="cdp-wrap pa4 pa5-ns">
        <!-- Encabezado -->
        <header class="cdp-header br3 pa4 mb4">
          <p class="cdp-kicker mb2">Guía rápida</p>
          <h1 class="cdp-title f2 f1-ns lh-title ma0">
            Cuidado del paciente
          </h1>
          <p class="cdp-muted mt3 f5 f4-ns measure">
            Orientación práctica para pacientes y cuidadores: seguridad, autocuidado y acompañamiento durante la atención.
            La información es general y no reemplaza las indicaciones del equipo tratante.
          </p>
        </header>

        <!-- Tarjetas: Seguridad / Autocuidado / Rol del cuidador -->
        <div class="cdp-grid mb4">
          <article class="cdp-section pa3 pa4-ns">
            <span class="cdp-badge mb2">Seguridad del paciente</span>
            <ul class="cdp-list pl3">
              <li>Verifica tu identificación antes de cualquier procedimiento o medicación.</li>
              <li>Informa alergias, medicamentos y antecedentes relevantes.</li>
              <li>Mantén timbre o medio de llamado a la mano; pide apoyo para movilizarte si lo requieres.</li>
              <li>Respeta las señalizaciones y normas del servicio.</li>
            </ul>
          </article>

          <article class="cdp-section pa3 pa4-ns">
            <span class="cdp-badge mb2">Autocuidado durante la atención</span>
            <ul class="cdp-list pl3">
              <li>Higiene de manos frecuente (paciente y acompañante).</li>
              <li>Pregunta por efectos secundarios y signos de alarma.</li>
              <li>Verifica horarios de medicación y dietas indicadas.</li>
            </ul>
          </article>

          <article class="cdp-section pa3 pa4-ns">
            <span class="cdp-badge mb2">Rol del cuidador / acompañante</span>
            <ul class="cdp-list pl3">
              <li>Apoyar la comunicación con el equipo de salud y registrar indicaciones.</li>
              <li>Respetar la privacidad y el descanso del paciente y de otros usuarios.</li>
              <li>Seguir normas de bioseguridad y horarios del servicio.</li>
            </ul>
          </article>
        </div>

        <!-- Canales de orientación -->
        <div class="cdp-help pa3 pa4-ns mb4">
          <h2 class="f4 ma0 mb2">Canales de orientación</h2>
          <p class="ma0 cdp-muted">
            Teléfono: <strong>(+00) 000 0000</strong> • Correo: <a class="link dim underline" href="mailto:contacto@tuhospital.gov.co">contacto@tuhospital.gov.co</a>
          </p>
        </div>

        <!-- CTAs -->
        <div class="cdp-grid cdp-grid-2 mb3">
          <div class="cdp-section pa3 pa4-ns">
            <h3 class="f5 ma0 mb2">Guía del cuidador</h3>
            <p class="cdp-muted mt0 mb3">Recomendaciones generales de apoyo y seguimiento en casa.</p>
            <a class="cdp-cta" href="#guia-cuidador" aria-label="Ver guía del cuidador">
              <svg class="cdp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 19.5V5.5A2.5 2.5 0 0 1 6.5 3H15l4 4v12.5A2.5 2.5 0 0 1 16.5 22h-10A2.5 2.5 0 0 1 4 19.5Z" stroke-width="2" />
                <path d="M15 3v4h4" stroke-width="2"/>
              </svg>
              Ver guía
            </a>
          </div>

          <div class="cdp-section pa3 pa4-ns">
            <h3 class="f5 ma0 mb2">Consentimiento informado</h3>
            <p class="cdp-muted mt0 mb3">Información clave para la toma de decisiones.</p>
            <a class="cdp-cta" href="#consentimiento" aria-label="Leer más sobre consentimiento informado">
              <svg class="cdp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-width="2"/>
                <path d="M12 8v8M12 6v0" stroke-width="2"/>
              </svg>
              Leer más
            </a>
          </div>

          <div class="cdp-section pa3 pa4-ns">
            <h3 class="f5 ma0 mb2">Derechos y deberes</h3>
            <p class="cdp-muted mt0 mb3">Marco de relación entre usuarios y la institución.</p>
            <a class="cdp-cta" href="#derechos" aria-label="Consultar derechos y deberes">
              <svg class="cdp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 4h14v16H5z" stroke-width="2"/>
                <path d="M9 8h6M9 12h6M9 16h4" stroke-width="2"/>
              </svg>
              Consultar
            </a>
          </div>

          <div class="cdp-section pa3 pa4-ns">
            <h3 class="f5 ma0 mb2">Radicar PQRSDF</h3>
            <p class="cdp-muted mt0 mb3">Canal para peticiones, quejas, reclamos, sugerencias o denuncias.</p>
            <a class="cdp-cta cdp-cta--primary" href="#pqrsdf" aria-label="Radicar PQRSDF">
              <svg class="cdp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" stroke-width="2"/>
              </svg>
              RADICAR
            </a>
          </div>
        </div>

        <!-- Nota final -->
        <p class="i cdp-muted f6 mt3">
          Esta guía no reemplaza la valoración clínica. Sigue siempre las indicaciones del equipo tratante.
        </p>
      </section>
    `;
  }
}

customElements.define('cuidadodelpaciente-view', Cuidadodelpaciente);
