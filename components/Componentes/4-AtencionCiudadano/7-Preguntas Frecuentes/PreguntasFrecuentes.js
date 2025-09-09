import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Preguntasfrecuentes extends LitElement {
  static properties = {
    filter: { type: String },
  };

  createRenderRoot() { return this; } // Light DOM para Tachyons y estilos globales

  constructor() {
    super();
    this.filter = '';
    // Mantengo exactamente el mismo contenido de preguntas y respuestas
    this.faqs = [
      {
        q: '¿Cómo puedo agendar una cita?',
        a: 'Puedes agendar por teléfono, en ventanilla o a través del portal web (si tu asegurador lo permite). Ten a la mano tu documento de identidad y datos de contacto. Para especialidades, puede requerirse remisión.'
      },
      {
        q: '¿Dónde consulto resultados de Ayudas Diagnósticas?',
        a: 'En el portal de resultados de Ayudas Diagnósticas (si aplica) o presencialmente en la sede indicada. Verifica horarios y requisitos en la sección de Resultados del sitio.'
      },
      {
        q: '¿Cómo solicito copia de la historia clínica?',
        a: 'La historia clínica es un documento reservado. Debes radicar la solicitud con tu identificación; terceros necesitan autorización y soportes de parentesco. Consulta la sección “Historia clínica” para requisitos.'
      },
      {
        q: '¿Qué hago en caso de urgencia?',
        a: 'Acudir directamente al servicio de Urgencias más cercano. La atención no requiere autorización previa. Lleva tu documento y, si es posible, información clínica relevante (alergias, medicamentos).'
      },
      {
        q: '¿Cómo radico una PQRSDF?',
        a: 'Puedes usar nuestro canal en línea o radicar presencialmente. Recibirás un número de radicado para seguimiento. Conserva ese número y consulta el estado en el mismo canal.'
      },
      {
        q: '¿Qué documentos debo llevar a mi cita?',
        a: 'Documento de identidad del paciente; si es menor de edad, del acudiente. En algunos servicios, soporte de afiliación y/o remisión del profesional tratante.'
      },
      {
        q: '¿Cuál es el horario de atención?',
        a: 'Horario administrativo habitual: lunes a viernes 7:00 a. m. – 5:00 p. m. Consultar cada servicio (laboratorio, imágenes, consulta externa) pues pueden variar.'
      },
      {
        q: '¿Dónde están ubicadas las sedes?',
        a: 'Revisa la sección “Sedes y contacto” para direcciones, mapas y rutas de transporte. También puedes llamar a nuestra central telefónica para orientación.'
      },
      {
        q: '¿Quién emite certificados y constancias?',
        a: 'Estos documentos se expiden por el servicio tratante. Verifica requisitos, tiempos de entrega y si requieren pago de copagos o estampillas según normativa vigente.'
      },
      {
        q: '¿Cómo reporto un acto de corrupción?',
        a: 'Usa la Línea de transparencia: tienes opciones por teléfono, formulario web y correo. El reporte puede ser confidencial y anónimo.'
      }
    ];
  }

  // Slug para IDs accesibles/deeplinks
  _slug(str) {
    return str
      .toLowerCase()
      .normalize('NFD').replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  connectedCallback() {
    super.connectedCallback();
    this._onHashChange = this._onHashChange?.bind(this) || ((e) => this._focusFromHash());
    window.addEventListener('hashchange', this._onHashChange);
  }
  disconnectedCallback() {
    window.removeEventListener('hashchange', this._onHashChange);
    super.disconnectedCallback();
  }

  firstUpdated() { this._focusFromHash(); }

  _focusFromHash() {
    const id = (location.hash || '').replace('#', '');
    if (!id) return;
    const el = this.querySelector(`details#${CSS.escape(id)}`);
    if (el) {
      el.open = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // resaltar brevemente
      el.classList.add('highlight');
      setTimeout(() => el.classList.remove('highlight'), 1200);
    }
  }

  _filteredFaqs() {
    const f = (this.filter || '').toLowerCase();
    if (!f) return this.faqs;
    return this.faqs.filter(({ q, a }) =>
      q.toLowerCase().includes(f) || a.toLowerCase().includes(f)
    );
  }

  _onSearchInput(e) {
    this.filter = e.target.value;
  }

  _expandAll() {
    this.querySelectorAll('details').forEach(d => d.open = true);
  }

  _collapseAll() {
    this.querySelectorAll('details').forEach(d => d.open = false);
  }

  async _copyLink(id) {
    const url = `${location.origin}${location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      const live = this.querySelector('#live');
      if (live) { live.textContent = 'Enlace copiado: ' + url; setTimeout(() => (live.textContent = ''), 1500); }
    } catch (e) {
      console.warn('Clipboard no disponible');
    }
  }

  render() {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
      }))
    };

    return html`
      <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

      <style>
        /* Solo lo usado en este componente */
        :host, .faq-wrap { color: #0f172a; }
        .faq-card { background: #fff; border: 1px solid rgba(2,8,23,.06); border-radius: 1rem; box-shadow: 0 4px 24px rgba(2,8,23,.06); }
        .faq-title { font-weight: 700; letter-spacing: -0.01em; }
        .faq-intro, .answer { color: #334155; }
        details { border-top: 1px solid rgba(2,8,23,.06); }
        summary { list-style: none; cursor: pointer; }
        summary::-webkit-details-marker { display: none; }
        .chev { transition: transform .2s ease; }
        details[open] summary .chev { transform: rotate(180deg); }
        .highlight { outline: 3px solid #93c5fd; outline-offset: 2px; border-radius: .5rem; }
        .tools button { cursor: pointer; }
        .link-btn { border: 0; background: transparent; color: #1d4ed8; }
        .link-btn:hover { text-decoration: underline; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
      </style>

      <section class="faq-wrap w-100 pa3 pa4-ns">
        <header class="mb3 mb4-ns">
          <h2 class="faq-title f3 f2-ns mt0 mb2">Preguntas frecuentes</h2>
          <p class="faq-intro f5 measure lh-copy mv0">
            Encuentra aquí respuestas a las dudas más comunes sobre nuestros servicios, trámites y canales de atención.
            Si no hallas lo que necesitas, al final encontrarás opciones para contactarnos o radicar una solicitud.
          </p>
        </header>

        <div class="flex items-center flex-column flex-row-ns gap2 mb3">
          <label for="faq-search" class="sr-only">Buscar en preguntas frecuentes</label>
          <input id="faq-search" class="input-reset ba b--black-10 br2 pa2 w-100 w-50-ns" type="search" placeholder="Buscar (ej.: urgencias, historia clínica)" @input=${this._onSearchInput}>
          <div class="tools mt2 mt0-ns ml0 ml3-ns">
            <button class="mr2 pv2 ph3 br2 ba b--black-10 bg-near-white dark-blue" @click=${this._expandAll}>Expandir todo</button>
            <button class="pv2 ph3 br2 bg-dark-blue white b" @click=${this._collapseAll}>Contraer todo</button>
          </div>
        </div>

        <article class="faq-card br3">
          ${this._filteredFaqs().map(({ q, a }) => this._item(q, a))}
        </article>

        <div class="cta mt4 flex flex-column flex-row-ns items-stretch items-center-ns gap2">
          <a href="#radicar" class="w-100 w-auto-ns tc pv3 ph4 br2 bg-dark-blue white b mr0 mr2-ns">RADICAR PQRSDF</a>
          <a href="#contacto" class="w-100 w-auto-ns tc pv3 ph4 br2 ba b--black-10 bg-near-white dark-blue">CONTACTO / TELÉFONOS</a>
        </div>

        <div id="live" class="sr-only" aria-live="polite"></div>
      </section>
    `;
  }

  /** Renderiza un item FAQ como <details> con id linkeable y botón de copiar enlace */
  _item(q, a) {
    const id = this._slug(q);
    return html`
      <details id="${id}" class="pa3 pa4-ns">
        <summary class="flex items-center justify-between">
          <span class="f5 f4-ns b pr3">${q}</span>
          <div class="flex items-center">
            <button class="link-btn mr2" title="Copiar enlace a esta pregunta" @click=${(e) => { e.preventDefault(); e.stopPropagation(); this._copyLink(id); }}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.9 12a3.9 3.9 0 013.9-3.9h3v2h-3a1.9 1.9 0 100 3.8h3v2h-3A3.9 3.9 0 013.9 12zm6.2 1h3a1.9 1.9 0 100-3.8h-3v-2h3a3.9 3.9 0 110 7.8h-3v-2z"/></svg>
              <span class="sr-only">Copiar enlace</span>
            </button>
            <svg class="chev" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 14.5l-6-6 1.4-1.4L12 11.7l4.6-4.6L18 8.5z" fill="currentColor"></path>
            </svg>
          </div>
        </summary>
        <div class="answer mt2 lh-copy measure-wide">${a}</div>
      </details>
    `;
  }
}

customElements.define('preguntasfrecuentes-view', Preguntasfrecuentes);
