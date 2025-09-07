import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Preguntasfrecuentes extends LitElement {
  // Usamos light DOM para que Tachyons funcione y podamos incluir un <style> global del componente
  createRenderRoot () { return this; }

  render () {
    return html`
    <!-- JSON-LD para SEO (FAQPage) -->
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '¿Cómo puedo agendar una cita?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puedes agendar por teléfono, en ventanilla o a través del portal web (si tu asegurador lo permite). Ten a la mano tu documento de identidad y datos de contacto. Para especialidades, puede requerirse remisión.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Dónde consulto resultados de Ayudas Diagnósticas?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'En el portal de resultados de Ayudas Diagnósticas (si aplica) o presencialmente en la sede indicada. Verifica horarios y requisitos en la sección de Resultados del sitio.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Cómo solicito copia de la historia clínica?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'La historia clínica es un documento reservado. Debes radicar la solicitud con tu identificación; terceros necesitan autorización y soportes de parentesco. Consulta la sección “Historia clínica” para requisitos.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Qué hago en caso de urgencia?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Acudir directamente al servicio de Urgencias más cercano. La atención no requiere autorización previa. Lleva tu documento y, si es posible, información clínica relevante (alergias, medicamentos).'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Cómo radico una PQRSDF?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puedes usar nuestro canal en línea o radicar presencialmente. Recibirás un número de radicado para seguimiento. Conserva ese número y consulta el estado en el mismo canal.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Qué documentos debo llevar a mi cita?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Documento de identidad del paciente; si es menor de edad, del acudiente. En algunos servicios, soporte de afiliación y/o remisión del profesional tratante.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Cuál es el horario de atención?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Horario administrativo habitual: lunes a viernes 7:00 a. m. – 5:00 p. m. Consultar cada servicio (laboratorio, imágenes, consulta externa) pues pueden variar.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Dónde están ubicadas las sedes?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Revisa la sección “Sedes y contacto” para direcciones, mapas y rutas de transporte. También puedes llamar a nuestra central telefónica para orientación.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Quién emite certificados y constancias?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Estos documentos se expiden por el servicio tratante. Verifica requisitos, tiempos de entrega y si requieren pago de copagos o estampillas según normativa vigente.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Cómo reporto un acto de corrupción?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Usa la Línea de transparencia: tienes opciones por teléfono, formulario web y correo. El reporte puede ser confidencial y anónimo.'
          }
        }
      ]
    })}</script>

    <style>
      /* --------- Estilos del componente --------- */
      :host, .faq-wrap { color: #0f172a; }
      .faq-card { background: #ffffff; border: 1px solid rgba(2, 8, 23, 0.06); border-radius: 1rem; box-shadow: 0 4px 24px rgba(2, 8, 23, 0.06); }
      .faq-title { font-weight: 700; letter-spacing: -0.01em; }
      .faq-intro { color: #334155; }
      details { border-top: 1px solid rgba(2,8,23,0.06); }
      details[open] summary .chev { transform: rotate(180deg); }
      summary { list-style: none; cursor: pointer; }
      summary::-webkit-details-marker { display: none; }
      .chev { transition: transform .2s ease; }
      .answer { color: #334155; }
      .cta a { text-decoration: none; }
      .cta a:focus-visible { outline: 3px solid #94a3b8; outline-offset: 3px; border-radius: .5rem; }
      /* Modo alto-contraste opcional */
      @media (prefers-contrast: more) {
        .faq-card { border-color: #0f172a; }
      }
    </style>

    <section class="faq-wrap mw8 center pa3 pa4-ns">
      <header class="mb3 mb4-ns">
        <h2 class="faq-title f3 f2-ns mt0 mb2">Preguntas frecuentes</h2>
        <p class="faq-intro f5 measure lh-copy mv0">
          Encuentra aquí respuestas a las dudas más comunes sobre nuestros servicios, trámites y canales de atención.
          Si no hallas lo que necesitas, al final encontrarás opciones para contactarnos o radicar una solicitud.
        </p>
      </header>

      <article class="faq-card br3">
        ${this._item(
          '¿Cómo puedo agendar una cita?',
          'Puedes agendar por teléfono, en ventanilla o a través del portal web (si tu asegurador lo permite). Ten a la mano tu documento de identidad y datos de contacto. Para especialidades, puede requerirse remisión.'
        )}
        ${this._item(
          '¿Dónde consulto resultados de Ayudas Diagnósticas?',
          'En el portal de resultados de Ayudas Diagnósticas (si aplica) o presencialmente en la sede indicada. Verifica horarios y requisitos en la sección de Resultados del sitio.'
        )}
        ${this._item(
          '¿Cómo solicito copia de la historia clínica?',
          'La historia clínica es un documento reservado. Debes radicar la solicitud con tu identificación; terceros necesitan autorización y soportes de parentesco. Consulta la sección “Historia clínica” para requisitos.'
        )}
        ${this._item(
          '¿Qué hago en caso de urgencia?',
          'Acudir directamente al servicio de Urgencias más cercano. La atención no requiere autorización previa. Lleva tu documento y, si es posible, información clínica relevante (alergias, medicamentos).'
        )}
        ${this._item(
          '¿Cómo radico una PQRSDF?',
          'Puedes usar nuestro canal en línea o radicar presencialmente. Recibirás un número de radicado para seguimiento. Conserva ese número y consulta el estado en el mismo canal.'
        )}
        ${this._item(
          '¿Qué documentos debo llevar a mi cita?',
          'Documento de identidad del paciente; si es menor de edad, del acudiente. En algunos servicios, soporte de afiliación y/o remisión del profesional tratante.'
        )}
        ${this._item(
          '¿Cuál es el horario de atención?',
          'Horario administrativo habitual: lunes a viernes 7:00 a. m. – 5:00 p. m. Consultar cada servicio (laboratorio, imágenes, consulta externa) pues pueden variar.'
        )}
        ${this._item(
          '¿Dónde están ubicadas las sedes?',
          'Revisa la sección “Sedes y contacto” para direcciones, mapas y rutas de transporte. También puedes llamar a nuestra central telefónica para orientación.'
        )}
        ${this._item(
          '¿Quién emite certificados y constancias?',
          'Estos documentos se expiden por el servicio tratante. Verifica requisitos, tiempos de entrega y si requieren pago de copagos o estampillas según normativa vigente.'
        )}
        ${this._item(
          '¿Cómo reporto un acto de corrupción?',
          'Usa la Línea de transparencia: tienes opciones por teléfono, formulario web y correo. El reporte puede ser confidencial y anónimo.'
        )}
      </article>

      <div class="cta mt4 flex flex-column flex-row-ns items-stretch items-center-ns gap2">
        <a href="#radicar" class="w-100 w-auto-ns tc pv3 ph4 br2 bg-dark-blue white b mr0 mr2-ns">RADICAR PQRSDF</a>
        <a href="#contacto" class="w-100 w-auto-ns tc pv3 ph4 br2 ba b--black-10 bg-near-white dark-blue">CONTACTO / TELÉFONOS</a>
      </div>
    </section>
    `;
  }

  /**
   * Renderiza un item FAQ como <details> con estilos accesibles
   */
  _item (q, a) {
    return html`
      <details class="pa3 pa4-ns">
        <summary class="flex items-center justify-between">
          <span class="f5 f4-ns b pr3">${q}</span>
          <svg class="chev" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 14.5l-6-6 1.4-1.4L12 11.7l4.6-4.6L18 8.5z" fill="currentColor"></path>
          </svg>
        </summary>
        <div class="answer mt2 lh-copy measure-wide">
          ${a}
        </div>
      </details>
    `;
  }
}

customElements.define('preguntasfrecuentes-view', Preguntasfrecuentes);
