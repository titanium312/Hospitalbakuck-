import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../../herramienta/lectopdf.js';

/**
 * <x-normatividad>
 * — Componente Lit con estilos basados en Tachyons (azules + blanco), amigable para hospital.
 * — Mantiene la integridad EXACTA del texto proporcionado.
 * — Usa animaciones suaves y ocupa todo el ancho disponible.
 *
 * Requisito: cargar Tachyons en la página contenedora
 * <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css">
 */
export class XNormatividad extends LitElement {
  // Usar light DOM para que Tachyons aplique sin Shadow DOM
  createRenderRoot() { return this; }

  render() {
    return html`
      ${this.#styles()}
      <section class="w-100 bg-white">
        <!-- Banner superior -->
        <div class="hsja-banner w-100 pv4 pv5-ns ph3 ph4-ns animate-fade-in">
          <div class="center w-100">
            <h2 class="hsja-titulo f2 f1-ns fw7 ma0 tc">Normatividad</h2>
            <p class="white-90 f5 tc mt3 mb0">Consulta, descarga y acceso ágil al SUIN</p>
          </div>
        </div>

        <!-- Contenido principal: tarjeta amplia -->
        <div class="w-100 ph3 ph5-ns pv4">
          <article class="hsja-card w-100 pa3 pa4-ns center animate-slide-up">
            <!-- Texto exacto (integridad respetada) -->
            <p class="dark-gray f5 lh-copy mt0 mb4">
Normatividad:
 Encontraras la normatividad relacionada a traves   de un normograma, un documento con las principales normas por componente y un   boton de enlace con la plataforma SUIN     
            </p>

            <!-- Acceso rápido a SUIN -->
            <div class="tc mb4">
              <a class="no-underline br3 ph4 pv3 white fw6 bg-blue grow" target="_blank" rel="noopener"
                 href="https://www.suin-juriscol.gov.co/">Ir a la plataforma SUIN</a>
            </div>

            <!-- Visor PDF -->
            <div class="hsja-pdf-wrap">
              <lectot-wie aria-label="Normatividad SUIN"
                urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Normatividad%20SUIN.pdf"></lectot-wie>
            </div>
          </article>
        </div>
      </section>
    `;
  }

  #styles() {
    return html`
      <style>
        /* Paleta amigable hospitalaria */
        :root {
          --hsja-azul-800: #0f3a6b;
          --hsja-azul-700: #144f9b;
          --hsja-azul-500: #1f7ae0;
          --hsja-azul-100: #eef6ff;
          --hsja-blanco:   #ffffff;
        }
        .bg-white{ background: var(--hsja-blanco); }

        /* Banner con gradiente y brillo sutil */
        .hsja-banner {
          background: linear-gradient(90deg, var(--hsja-azul-700), var(--hsja-azul-500));
          position: relative; overflow: hidden;
        }
        .hsja-banner::after {
          content: ""; position: absolute; inset: 0;
          background: radial-gradient(1000px 280px at 10% 110%, rgba(255,255,255,0.10), transparent),
                      radial-gradient(700px 200px at 90% -20%, rgba(255,255,255,0.12), transparent);
          pointer-events: none;
        }
        .hsja-titulo { color: #fff; text-shadow: 0 2px 12px rgba(0,0,0,0.18); }

        /* Tarjeta principal */
        .hsja-card {
          max-width: 1200px; /* ancho generoso */
          background: var(--hsja-blanco);
          border-radius: 1rem;
          box-shadow: 0 8px 28px rgba(20,79,155,0.10);
          border: 1px solid rgba(31,122,224,0.10);
        }

        /* Contenedor del visor PDF */
        .hsja-pdf-wrap {
          border-radius: 0.75rem; overflow: hidden;
          background: var(--hsja-azul-100);
          border: 1px solid rgba(31,122,224,0.15);
          box-shadow: 0 6px 24px rgba(15,58,107,0.08);
        }
        lectot-wie { display: block; width: 100%; height: 75vh; }

        /* Animaciones suaves */
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(10px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .animate-fade-in { animation: fadeIn .8s ease both; }
        .animate-slide-up { animation: slideUp .6s ease .1s both; }

        /* Afinado general */
        p { letter-spacing: .01em; }
        a.bg-blue { background: var(--hsja-azul-500); }
        a.bg-blue:hover { filter: brightness(1.05); }
      </style>
    `;
  }
}

customElements.define('x-normatividad', XNormatividad);
