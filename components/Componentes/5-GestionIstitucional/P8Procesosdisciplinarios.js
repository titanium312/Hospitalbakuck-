import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

/**
 * <procesosdisciplinarios-view>
 * — Componente Lit con base en Tachyons (azules + blanco), elegante y amable para hospital.
 * — Mantiene la integridad EXACTA del texto (títulos y descripciones) tal como fue entregado.
 * — Usa animaciones suaves y ocupa todo el ancho; no depende de Tailwind.
 *
 * Requisito: cargar Tachyons en la página contenedora
 * <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css">
 */
export class Procesosdisciplinarios extends LitElement {
  createRenderRoot() { return this; } // Light DOM para aplicar Tachyons

  render() {
    const steps = this.steps; // mantiene el texto exacto

    return html`
      ${this.#styles()}
      <section class="w-100 bg-white">
        <!-- Encabezado con gradiente azul -->
        <header class="pd-banner w-100 pv4 pv5-ns ph3 ph4-ns tc animate-fade-in">
          <h1 class="pd-title f2 f1-ns fw7 ma0">Ruta de Procesos Disciplinarios</h1>
          <h2 class="white-90 f5 f4-ns fw6 mt2 mb0">Control Interno – Componente MIPG</h2>
        </header>

        <main class="w-100 ph3 ph5-ns pv4">
          <!-- Contenedor de pasos: usa todo el ancho -->
          <div class="flex flex-column items-center justify-center">
            <div class="pd-flow w-100 center">
              ${steps.map((step, index) => html`
                <div class="pd-node animate-slide-up">
                  <div class="pd-card pa3 pa4-ns tc">
                    <div class="f2 mb2">${step.icon}</div>
                    <h3 class="pd-h3 mt1 mb2">${step.title}</h3>
                    <p class="mid-gray f6 lh-copy ma0">${step.description}</p>
                  </div>
                  ${index < steps.length - 1 ? html`<div class="pd-arrow">➔</div>` : null}
                </div>
              `)}
            </div>
          </div>

          <footer class="tc mt5 mid-gray f6">
            <p class="ma0">E.S.E. Hospital San Jorge de Ayapel – Transparencia y Control Interno</p>
          </footer>
        </main>
      </section>
    `;
  }

  get steps() {
    return [
      { icon: '📄', title: '1. Recepción', description: 'Ingreso de queja o denuncia y registro en sistema documental.' },
      { icon: '🔎', title: '2. Verificación', description: 'Revisión de competencia y requisitos del caso.' },
      { icon: '🕵️', title: '3. Indagación', description: 'Recolección preliminar de pruebas.' },
      { icon: '⚖️', title: '4. Investigación', description: 'Notificación y práctica de pruebas.' },
      { icon: '📑', title: '5. Pliego de Cargos', description: 'Formulación formal y traslado al investigado.' },
      { icon: '🗣️', title: '6. Descargos', description: 'Defensa y contradicción de pruebas.' },
      { icon: '📜', title: '7. Fallo', description: 'Decisión motivada: sanción o absolución.' },
      { icon: '🔁', title: '8. Recursos', description: 'Revisión en segunda instancia.' },
      { icon: '✅', title: '9. Ejecución', description: 'Cumplimiento de sanción o archivo.' },
      { icon: '📦', title: '10. Cierre', description: 'Archivo definitivo y reporte institucional.' }
    ];
  }

  #styles() {
    return html`<style>
      /* Paleta hospitalaria (azules + blanco) */
      :root{
        --pd-azul-800:#0f3a6b; --pd-azul-700:#144f9b; --pd-azul-500:#1f7ae0; --pd-azul-300:#8ec5ff; --pd-azul-100:#eef6ff; --pd-blanco:#ffffff;
      }
      .bg-white{ background: var(--pd-blanco); }

      /* Banner */
      .pd-banner{ background: linear-gradient(90deg, var(--pd-azul-700), var(--pd-azul-500)); position:relative; overflow:hidden; }
      .pd-banner::after{ content:""; position:absolute; inset:0; background: radial-gradient(1100px 300px at 8% 115%, rgba(255,255,255,.10), transparent), radial-gradient(900px 240px at 92% -10%, rgba(255,255,255,.12), transparent); pointer-events:none; }
      .pd-title{ color:#fff; text-shadow:0 2px 12px rgba(0,0,0,.18); }

      /* Tarjeta de paso */
      .pd-card{ background:#fff; border-radius:1rem; box-shadow:0 10px 28px rgba(20,79,155,.10); border:1px solid rgba(31,122,224,.12); max-width: 18rem; }
      .pd-h3{ color:#00429d; font-weight:700; }

      /* Flujo de pasos: responsive y usando todo el ancho */
      .pd-flow{ display:grid; gap:1.25rem; grid-template-columns: 1fr; }
      @media (min-width:48em){ .pd-flow{ grid-template-columns: repeat(2, minmax(0,1fr)); } }
      @media (min-width:75em){ .pd-flow{ grid-template-columns: repeat(5, minmax(0,1fr)); } }

      /* Nodo con flecha entre tarjetas (solo en pantallas anchas para sensación de ruta) */
      .pd-node{ position:relative; display:flex; flex-direction:column; align-items:center; }
      .pd-arrow{ display:none; color:#3e67ae; font-size:2rem; margin-top:.5rem; }
      @media (min-width:75em){ .pd-node{ align-items:stretch; } .pd-arrow{ display:block; text-align:center; }
        /* Alinea flechas en filas de 5 */
        .pd-node:nth-child(5n) .pd-arrow{ display:none; }
      }

      /* Animaciones suaves */
      @keyframes fadeIn{ from{opacity:0} to{opacity:1} }
      @keyframes slideUp{ from{ transform:translateY(10px); opacity:0 } to{ transform:translateY(0); opacity:1 } }
      .animate-fade-in{ animation: fadeIn .8s ease both; }
      .animate-slide-up{ animation: slideUp .6s ease .1s both; }
    </style>`;
  }
}

customElements.define('procesosdisciplinarios-view', Procesosdisciplinarios);
