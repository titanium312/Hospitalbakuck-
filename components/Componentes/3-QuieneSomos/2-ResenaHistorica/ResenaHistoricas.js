import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
  import '../../herramienta/lectopdf.js';

  class ResenaHistorica extends LitElement {
    // light DOM para que Tachyons aplique dentro del componente
    createRenderRoot() { return this; }

    render() {
      return html`
        <style>
          /* Fondo SIEMPRE blanco en todo el bloque */
          .surface { background:#fff; }

          /* Tarjeta con borde y sombra suaves en azules */
          .card {
            border: 1px solid rgba(37, 99, 235, 0.14);
            transition: box-shadow 200ms ease, transform 200ms ease;
          }
          .card:hover, .card:focus-within {
            box-shadow: 0 1rem 2rem rgba(37, 99, 235, 0.08);
            transform: translateY(-2px);
          }

          /* Barra/acento azul sutil para identidad hospitalaria */
          .accent {
            height: .35rem;
            width: 5rem;
            margin: .25rem auto 0 auto;
            border-radius: 9999px;
            background: linear-gradient(90deg, #0ea5e9, #3b82f6);
          }

          /* Tipografía y legibilidad */
          .copy p { line-height: 1.65; }
          .max-measure { max-width: 62ch; }

          /* Animación elegante y discreta */
          .fade-in { opacity: 0; transform: translateY(8px); animation: fadeInUp 380ms ease-out forwards; }
          @keyframes fadeInUp { to { opacity:1; transform: translateY(0); } }

          /* A11y focus */
          .focus-ring:focus-visible {
            outline: 3px solid rgba(14,165,233,.55);
            outline-offset: 2px;
            border-radius: .5rem;
          }

          /* Contenedor del visor PDF coherente con la tarjeta */
          lectot-wie {
            display:block;
            min-height:520px;
            border:1px solid rgba(37, 99, 235, 0.14);
            border-radius:.75rem;
            overflow:hidden;
            background:#fff;
          }
        </style>

        <section class="surface w-100">
          <div class="mw8 center ph3 pv4 pv5-ns">
            <!-- Tarjeta principal: título + texto (texto íntegro) -->
            <article class="card bg-white br3 shadow-4 pv3 ph4 pv4-ns ph5-ns fade-in" aria-label="Reseña histórica">
              <header class="tc">
                <h1 class="f2 f1-ns dark-blue mv2">¡Reseña Historica</h1>
                <div class="accent"></div>
              </header>

              <div class="copy black-80 mt4 center max-measure">
                <p>
  

El Hospital San Jorge de Ayapel, ubicado en el sur del departamento de Córdoba, ha sido desde sus inicios una institución esencial para garantizar el derecho a la salud de la población ayapelense y de las comunidades aledañas.

Su origen se remonta a mediados del siglo XX, cuando, impulsado por la necesidad de contar con servicios médicos permanentes, el municipio gestionó la creación de un centro hospitalario básico. En sus primeros años, el hospital se dedicó principalmente a la atención de urgencias, partos y enfermedades comunes, constituyéndose en un punto de apoyo vital para una región caracterizada por dificultades de acceso geográfico y social.

Con el paso del tiempo y la consolidación del Sistema General de Seguridad Social en Salud en Colombia, el Hospital San Jorge de Ayapel se transformó en una Entidad Social del Estado (ESE) de primer nivel de complejidad, fortaleciendo su infraestructura, ampliando sus servicios y promoviendo programas de promoción de la salud y prevención de la enfermedad.

A lo largo de su historia, ha enfrentado retos relacionados con la dispersión poblacional, los riesgos epidemiológicos propios de la región y la necesidad de garantizar atención oportuna en zonas rurales de difícil acceso. Sin embargo, el compromiso de su talento humano, la participación comunitaria y el respaldo de las autoridades territoriales han permitido que la institución se mantenga como referente de atención integral y humanizada.

Hoy, el Hospital San Jorge de Ayapel se consolida como una institución pública integral, centrada en el paciente y su familia, reconocida por su compromiso con la calidad, la seguridad del paciente, la competitividad y la innovación en modelos de atención. Su misión trasciende lo asistencial, pues también se proyecta como gestora de conocimiento y promotora del bienestar de toda la comunidad ayapelense y del sur de Córdoba.</p>

              </div>
            </article>

            <!-- Tarjeta del anexo PDF -->
            <section class="mt4 mt5-ns">
              <div class="card bg-white br3 shadow-4 pa3 pa4-ns fade-in">
                <h2 class="f4 dark-blue ma0 mb3 tc">Anexo PDF</h2>
                <lectot-wie
                  class="focus-ring"
                  urlpdf="https://img1.wsimg.com/blobby/go/2a2c3ae8-dfb2-48fa-9fcf-4e2478b682dc/Anexo%20Rese%C3%B1a%20Hist%C3%B3rica.pdf">
                </lectot-wie>
              </div>
            </section>
          </div>
        </section>
      `;
    }
  }

  customElements.define('resena-historica', ResenaHistorica);