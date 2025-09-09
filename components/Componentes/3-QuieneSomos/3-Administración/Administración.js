import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../../herramienta/lectopdf.js';

/**
 * AdministracionElement
 * — Componente Lit que usa Tachyons para estilos (azules + blanco, amigable hospital).
 * — Mantiene la integridad del texto tal cual fue entregado.
 * — Ocupa todo el ancho disponible y presenta visores PDF en una grilla fluida.
 *
 * Requisitos externos: cargar Tachyons en la página contenedora:
 * <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css">
 */
export class AdministracionElement extends LitElement {
  // Usamos light DOM para que Tachyons aplique sin encapsulado Shadow
  createRenderRoot() { return this; }

  render() {
    return html`
      <section class="w-100">
        ${this.#styles()}
        <!-- Banda superior en gradiente azul -->
        <header class="hsja-banner w-100 pv4 pv5-ns ph3 ph4-ns">
          <div class="center w-100">
            <h1 class="hsja-titulo f2 f1-ns fw6 ma0 tc">Administración – Hospital San Jorge de Ayapel</h1>
            <p class="white-90 f5 tc mt3 mb0">Estructura clara, amable y humana <span class="white-60">(azules & blanco)</span></p>
          </div>
        </header>

        <main class="w-100 ph3 ph5-ns pv4">
          <section class="hsja-card w-100 pa3 pa4-ns">
            <div class="flex items-center justify-between mb3">
              <h2 class="dark-blue fw7 f3 ma0">Administración</h2>
              <span class="br-pill ph3 pv2 bg-washed-blue dark-blue fw6">HSJA</span>
            </div>
            <div class="hsja-divider mb3" role="presentation"></div>

            <!-- Texto: integridad exacta -->
            <article class="dark-gray f5 lh-copy">
              <p class="mt0 mb3">
El organigrama del Hospital San Jorge de Ayapel refleja la estructura jerárquica y funcional de la entidad, organizada para garantizar una gestión eficiente y la prestación de servicios de salud con calidad. En la parte directiva se ubican la Junta Directiva y la Gerencia, apoyadas por asesores y la oficina de Control Interno.
              </p>
              <p class="mt0 mb4">
La estructura se articula en áreas estratégicas como Gestión de la Calidad, Prestación de Servicios, Talento Humano, Finanzas, Información y Comunicación, Servicios Generales y Seguridad y Salud en el Trabajo, cada una con equipos profesionales, técnicos y asistenciales que aseguran la atención integral al paciente.
              </p>
            </article>

            <section aria-label="Documentos y anexos" class="mt3">
              <h3 class="fw6 dark-blue f4 mb3">Documentos relacionados</h3>
              <div class="hsja-pdf-grid">
                <div class="hsja-card pa2">
                  <lectot-wie aria-label="Conformación por nivel de la ESE HSJA"
                    urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Organigrama%20Institucional%20HSJA.pdf"></lectot-wie>
                </div>
                <div class="hsja-card pa2">
                  <lectot-wie aria-label="Anexo Junta Directiva"
                    urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Junta%20Directiva.pdf"></lectot-wie>
                </div>
                <div class="hsja-card pa2">
                  <lectot-wie aria-label="Conformación por nivel de la ESE HSJA (duplicado)"
                    urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Conformaci%C3%B3n%20por%20nivel%20de%20la%20ESE%20HSJA.pdf"></lectot-wie>
                </div>
              </div>
            </section>
          </section>
        </main>
      </section>
    `;
  }

  #styles() {
    return html`
      <style>
        /* Paleta amigable hospitalaria */
        :root {
          --hsja-azul-900: #0b2a59;  /* profundo */
          --hsja-azul-700: #144f9b;  /* primario */
          --hsja-azul-500: #1f7ae0;  /* vibrante */
          --hsja-azul-300: #8ec5ff;  /* claro */
          --hsja-azul-100: #eaf4ff;  /* fondo suave */
          --hsja-blanco:   #ffffff;
        }
        body { background: var(--hsja-blanco); }

        .hsja-banner {
          background: linear-gradient(90deg, var(--hsja-azul-700), var(--hsja-azul-500));
        }
        .hsja-titulo { color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.15); }

        .hsja-card {
          background: var(--hsja-blanco);
          border-radius: 1rem;
          box-shadow: 0 6px 24px rgba(13, 71, 161, 0.08);
          border: 1px solid rgba(20, 79, 155, 0.08);
        }
        .hsja-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(20,79,155,0.25), transparent);
        }

        /* Rejilla fluida: usa todo el ancho disponible */
        .hsja-pdf-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 48em) { /* ~768px */
          .hsja-pdf-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 75em) { /* ~1200px */
          .hsja-pdf-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* Asegurar que el visor PDF aproveche el alto: */
        lectot-wie {
          display: block;
          width: 100%;
          height: 72vh; /* alto generoso para lectura */
          border-radius: 0.75rem;
          overflow: hidden;
          background: var(--hsja-azul-100);
          border: 1px solid rgba(31, 122, 224, 0.15);
        }
      </style>
    `;
  }
}

customElements.define('administracion-element', AdministracionElement);
