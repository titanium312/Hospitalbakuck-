import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

/**
 * <comunicaciones-x>
 * — Componente Lit con base en Tachyons (azules + blanco), amigable y profesional para hospital.
 * — Mantiene la integridad EXACTA del texto proporcionado.
 * — Fondo siempre blanco, ocupa todo el ancho disponible, con animaciones suaves.
 *
 * Requisito: cargar Tachyons en la página contenedora
 * <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css">
 */
export class Comunicaciones extends LitElement {
  createRenderRoot() { return this; } // Light DOM para que Tachyons aplique

  render() {
    const enlaces = [
      {
        nombre: 'Procedimiento para el Chatbot de Respuesta Automática',
        url: 'https://hospitalsanjorgeayapel.info/LectorPdf/viewer.html?file=.%2Fpdfs%2FProcedimiento%20para%20el%20Chatbot%20de%20Respuesta%20Autom%C3%A1tica.pdf'
      },
      {
        nombre: 'Anexo Evaluando',
        url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Evaluando.pdf'
      },
      {
        nombre: 'Procedimiento Identidad Visual',
        url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Procedimiento%20Identidad%20Visual.pdf'
      },
      {
        nombre: 'Anexo Comunicaciones de las entidades de gobierno MSPS INS INVIMA',
        url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Comunicaciones%20de%20las%20entidades%20de%20gobierno%20MSPS%20INS%20INVIMA.pdf'
      },
      {
        nombre: 'Formato de Aprobación de Publicación',
        url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/formato_aprobacion_publicacion.pdf'
      },
      {
        nombre: 'Anexo Formato de Postulación de Información a Publicar en la Página WEB',
        url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Formato%20de%20Aprobaci%C3%B3n%20de%20informaci%C3%B3n%20a%20Publicar%20en%20Pag.%20WEB.pdf'
      },
      {
        nombre: 'Anexo Formato de Aprobación de información a Publicar en Pag. WEB',
        url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Formato%20de%20Aprobaci%C3%B3n%20de%20informaci%C3%B3n%20a%20Publicar%20en%20Pag.%20WEB.pdf'
      },
      {
        nombre: 'Protocolo de Comunicaciones Para Publicación de noticias',
        url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Protocolo%20de%20Comunicaciones%20Para%20Publicaci%C3%B3n%20de%20noticias%20en%20la.pdf'
      },
      {
        nombre: 'Procedimiento Acceso',
        url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Procedimiento%20Acceso.pdf'
      }
    ];

    return html`
      ${this.#styles()}
      <section class="w-100 bg-white">
        <!-- Banner superior con gradiente y animación -->
        <div class="cx-banner w-100 pv4 pv5-ns ph3 ph4-ns animate-fade-in">
          <div class="center w-100">
            <h2 class="cx-title f2 f1-ns fw7 ma0 tc">Comunicaciones</h2>
            <p class="white-90 f5 tc mt3 mb0">Identidad, acceso a la información y transparencia</p>
          </div>
        </div>

        <!-- Contenido principal en tarjeta amplia -->
        <div class="w-100 ph3 ph5-ns pv4">
          <article class="cx-card w-100 pa3 pa4-ns center animate-slide-up">
            <!-- Texto exacto (integridad respetada) -->
            <p class="lh-copy dark-gray mt0 mb3">
El Hospital San Jorge de Ayapel fortalece su identidad institucional a través de una imagen visual coherente en su portal web.
          Ofrece un acceso fácil y transparente a la información de servicios, trámites y directorios.
          Además, dispone de un espacio de noticias y boletines para mantener informada a la comunidad sobre campañas y novedades en salud.
            </p>

            <h2 class="f5 mt4 mb3 dark-blue">Documentos de Comunicaciones</h2>

            <!-- Lista en rejilla: usa todo el ancho, azules suaves -->
            <ul class="cx-grid list pl0 ma0">
              ${enlaces.map(item => html`
                <li class="cx-item">
                  <a class="cx-link db no-underline" href="${item.url}" target="_blank" rel="noopener">
                    <span class="cx-docname">${item.nombre}</span>
                    <span class="cx-cta">Abrir documento</span>
                  </a>
                </li>
              `)}
            </ul>
          </article>
        </div>
      </section>
    `;
  }

  #styles() {
    return html`
      <style>
        /* Paleta amable hospitalaria */
        :root {
          --cx-azul-800: #0f3a6b;
          --cx-azul-700: #144f9b;
          --cx-azul-500: #1f7ae0;
          --cx-azul-200: #cfe7ff;
          --cx-azul-100: #eef6ff;
          --cx-blanco:   #ffffff;
        }
        .bg-white { background: var(--cx-blanco); }

        /* Banner superior */
        .cx-banner {
          background: linear-gradient(90deg, var(--cx-azul-700), var(--cx-azul-500));
          position: relative; overflow: hidden;
        }
        .cx-banner::after{
          content:""; position:absolute; inset:0;
          background: radial-gradient(1100px 280px at 8% 115%, rgba(255,255,255,0.10), transparent),
                      radial-gradient(800px 220px at 92% -10%, rgba(255,255,255,0.12), transparent);
          pointer-events:none;
        }
        .cx-title{ color:#fff; text-shadow:0 2px 12px rgba(0,0,0,0.18); }

        /* Tarjeta principal */
        .cx-card{
          max-width: 1200px; /* ancho amplio */
          background: var(--cx-blanco);
          border-radius: 1rem;
          box-shadow: 0 10px 28px rgba(20,79,155,0.10);
          border: 1px solid rgba(31,122,224,0.10);
        }

        /* Rejilla de documentos (usa todo el ancho) */
        .cx-grid{
          display:grid; gap: 1rem; list-style:none;
          grid-template-columns: 1fr;
        }
        @media (min-width:48em){ /* ~768px */
          .cx-grid{ grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width:75em){ /* ~1200px */
          .cx-grid{ grid-template-columns: repeat(3, 1fr); }
        }

        .cx-item{ background: var(--cx-azul-100); border:1px solid rgba(31,122,224,0.18); border-radius:.75rem; overflow:hidden; }
        .cx-link{ padding: 1rem 1.25rem; }
        .cx-docname{ display:block; color: var(--cx-azul-800); font-weight:600; line-height:1.35; }
        .cx-cta{ display:inline-block; margin-top:.35rem; font-size:.875rem; color: var(--cx-azul-700); text-decoration:underline; }

        .cx-item{ transition: transform .25s ease, box-shadow .25s ease, background .25s ease; }
        .cx-item:hover{ transform: translateY(-3px); box-shadow: 0 12px 32px rgba(15,58,107,.15); background:#fff; }

        /* Animaciones elegantes */
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(10px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .animate-fade-in { animation: fadeIn .8s ease both; }
        .animate-slide-up { animation: slideUp .6s ease .1s both; }

        /* Afinado tipográfico accesible */
        p{ letter-spacing:.01em; }
        .dark-blue{ color: var(--cx-azul-800); }
      </style>
    `;
  }
}

customElements.define('comunicaciones-x', Comunicaciones);
