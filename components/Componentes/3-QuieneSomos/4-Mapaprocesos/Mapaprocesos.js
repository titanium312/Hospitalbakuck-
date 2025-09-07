import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

/**
 * <mapa-de-procesos>
 * — Componente Lit con estilos basados en Tachyons + un poco de CSS propio.
 * — Paleta amigable hospitalaria (azules + blanco), fondo siempre blanco.
 * — Ocupa todo el ancho disponible, con layout limpio y animaciones suaves.
 * — Mantiene la integridad EXACTA del texto proporcionado.
 *
 * Requisito: cargar Tachyons en la página contenedora
 * <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css">
 */
export class MapaDeProcesosElement extends LitElement {
  // Usar light DOM para que Tachyons aplique sin Shadow DOM
  createRenderRoot() { return this; }

  render() {
    return html`
      ${this.#styles()}
      <section class="w-100 bg-white">
        <!-- Banner superior con gradiente azul y animación de entrada -->
        <div class="hsja-banner w-100 pv4 pv5-ns ph3 ph4-ns animate-fade-in">
          <div class="center w-100">
            <h2 class="hsja-titulo f2 f1-ns fw7 ma0 tc">Mapa de Procesos</h2>
            <p class="white-90 f5 tc mt3 mb0">Organización clara, segura y centrada en el paciente</p>
          </div>
        </div>

        <!-- Contenido principal en tarjeta amplia -->
        <div class="w-100 ph3 ph5-ns pv4">
          <article class="hsja-card w-100 pa3 pa4-ns center animate-slide-up">
            <!-- Texto exacto, integridad respetada -->
            <p class="dark-gray f5 lh-copy mt0 mb3">
        El Mapa de Procesos del Hospital San Jorge de Ayapel organiza la gestión institucional 
        en procesos estratégicos, misionales, de apoyo y de evaluación.
            </p>
            <p class="dark-gray f5 lh-copy mt0 mb3">
        Su propósito es garantizar una atención segura, integral y centrada en el paciente. 
        Integra el enfoque por procesos y la gestión del riesgo bajo el Modelo MIPG.
            </p>
            <p class="dark-gray f5 lh-copy mt0 mb4">
        Descubre la belleza de <strong>HOSPITAL SAN JORGE AYAPEL</strong> a través de nuestra galería de fotos 
        impresionantes y momentos memorables.
            </p>

            <!-- Imagen responsiva en marco suave -->
            <figure class="ma0">
              <div class="hsja-img-wrap">
                <img class="db w-100" 
                  src="https://img1.wsimg.com/isteam/ip/2a2c3ae8-dfb2-48fa-9fcf-4e2478b682dc/Anexo%20Mapa%20de%20procesos.png" 
                  alt="Mapa de procesos del Hospital San Jorge de Ayapel" />
              </div>
              <figcaption class="mt2 mid-gray f6 tc">Mapa de procesos del Hospital San Jorge de Ayapel</figcaption>
            </figure>
          </article>
        </div>
      </section>
    `;
  }

  #styles() {
    return html`
      <style>
        /* Paleta hospitalaria */
        :root {
          --hsja-azul-800: #0f3a6b;
          --hsja-azul-700: #144f9b;
          --hsja-azul-500: #1f7ae0;
          --hsja-azul-200: #cfe7ff;
          --hsja-azul-100: #eef6ff;
          --hsja-blanco:   #ffffff;
        }
        .bg-white{ background: var(--hsja-blanco); }

        /* Banner con gradiente y patrón sutil */
        .hsja-banner {
          background: linear-gradient(90deg, var(--hsja-azul-700), var(--hsja-azul-500));
          position: relative;
          overflow: hidden;
        }
        .hsja-banner::after {
          content: "";
          position: absolute; inset: 0;
          background: radial-gradient(1200px 300px at 10% 120%, rgba(255,255,255,0.08), transparent),
                      radial-gradient(800px 200px at 90% -20%, rgba(255,255,255,0.10), transparent);
          pointer-events: none;
        }
        .hsja-titulo { color: #fff; text-shadow: 0 2px 12px rgba(0,0,0,0.18); }

        /* Tarjeta principal */
        .hsja-card {
          max-width: 1200px; /* usa ancho amplio */
          background: var(--hsja-blanco);
          border-radius: 1rem;
          box-shadow: 0 8px 28px rgba(20, 79, 155, 0.10);
          border: 1px solid rgba(31, 122, 224, 0.10);
        }

        /* Marco de imagen con borde y sombra suave */
        .hsja-img-wrap {
          border-radius: 0.75rem;
          overflow: hidden;
          background: var(--hsja-azul-100);
          border: 1px solid rgba(31, 122, 224, 0.15);
          box-shadow: 0 6px 24px rgba(15, 58, 107, 0.08);
          transition: transform .4s ease, box-shadow .4s ease;
        }
        .hsja-img-wrap:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(15, 58, 107, 0.12);
        }

        /* Animaciones elegantes */
        @keyframes fadeIn {
          from { opacity: 0 } to { opacity: 1 }
        }
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0 } to { transform: translateY(0); opacity: 1 }
        }
        .animate-fade-in { animation: fadeIn .8s ease both; }
        .animate-slide-up { animation: slideUp .6s ease .1s both; }

        /* Tipografía legible y amable */
        p { letter-spacing: .01em; }
        strong { color: var(--hsja-azul-800); }
      </style>
    `;
  }
}

customElements.define('mapa-de-procesos', MapaDeProcesosElement);
