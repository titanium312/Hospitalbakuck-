import { LitElement, html, svg } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class ContenedorApp extends LitElement {
  createRenderRoot() {
    return this;
  }

  static properties = {
    selectedIndex: { type: Number },
  };

  constructor() {
    super();
    this.selectedIndex = null;

    const iconSize = 'width:3.5rem;height:3.5rem;';
    this.iconos = {
      talento: svg`<svg xmlns="http://www.w3.org/2000/svg" fill="none" style=${iconSize} stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      direccion: svg`<svg xmlns="http://www.w3.org/2000/svg" fill="none" style=${iconSize} viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 22V12l-6 2 9-12 9 12-6-2v10H9z"/></svg>`,
      valores: svg`<svg xmlns="http://www.w3.org/2000/svg" fill="none" style=${iconSize} viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M4 21V10m4 11V4m4 17v-6m4 6V8m4 13V2"/><path d="M20 18l2-2-2-2"/></svg>`,
      evaluacion: svg`<svg xmlns="http://www.w3.org/2000/svg" fill="none" style=${iconSize} viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
      info: svg`<svg xmlns="http://www.w3.org/2000/svg" fill="none" style=${iconSize} viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
      conocimiento: svg`<svg xmlns="http://www.w3.org/2000/svg" fill="none" style=${iconSize} viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/><path d="M12 12v.01M12 8v4l2 2"/></svg>`,
      control: svg`<svg xmlns="http://www.w3.org/2000/svg" fill="none" style=${iconSize} viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`
    };

    this.dimensiones = [
      {
        titulo: "Talento Humano",
        url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/1.%20TALENTO%20HUMANO.pdf",
        descripcion: "Garantiza servidores seleccionados, capacitados y motivados, con procesos de bienestar e integridad.",
        icono: "talento",
        politicas: ["Talento Humano", "Integridad"]
      },
      {
        titulo: "Direccionamiento Estratégico y Planeación",
        url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/2.%20Direccionamiento%20Estrat%C3%A9gico%20y%20Planeaci%C3%B3n.pdf",
        descripcion: "Define la misión, visión y objetivos institucionales, con planeación estratégica y uso eficiente de recursos.",
        icono: "direccion",
        politicas: ["Planeación Institucional", "Gestión Presupuestal y Eficiencia del Gasto Público"]
      },
      {
        titulo: "Gestión con Valores para Resultados",
        url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/3.%20Dimension%203%20con%20las%209%20politicas.pdf",
        descripcion: "Promueve la ética, integridad y eficiencia en la gestión pública, fortaleciendo procesos y servicios.",
        icono: "valores",
        politicas: ["Fortalecimiento organizacional", "Gobierno Digital", "Seguridad Digital", "Defensa Jurídica", "Servicio al Ciudadano", "Racionalización de Trámites", "Participación Ciudadana", "Mejora Normativa", "Gestión Ambiental (componente)"]
      },
      {
        titulo: "Evaluación de Resultados",
        url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/4.%20Dimension%204%20Evaluaci%C3%B3n%20de%20Resultados%20HSJ.pdf",
        descripcion: "Mide y evalúa la gestión institucional a través de indicadores y procesos de mejora continua.",
        icono: "evaluacion",
        politicas: ["Seguimiento y Evaluación del Desempeño Institucional"]
      },
      {
        titulo: "Información y Comunicación",
        url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/5.%20Dimensi%C3%B3n%205%20Informaci%C3%B3n%20y%20Comunicaci%C3%B3n.pdf",
        descripcion: "Garantiza transparencia, acceso a la información y comunicación con la ciudadanía.",
        icono: "info",
        politicas: ["Transparencia y Lucha contra la Corrupción", "Gestión Documental", "Gestión de la Información Estadística"]
      },
      {
        titulo: "Gestión del Conocimiento e Innovación",
        url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/6.%20Dimension%206%20Gesti%C3%B3n%20del%20Conocimiento%20y%20la%20Innovaci%C3%B3n.pdf",
        descripcion: "Promueve el aprendizaje organizacional, la innovación y la transferencia de conocimiento.",
        icono: "conocimiento",
        politicas: ["Gestión del Conocimiento e Innovación"]
      },
      {
        titulo: "Control Interno",
        url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/7.%20Dimension%207%20Gesti%C3%B3n%20del%20Control%20Interno.pdf",
        descripcion: "Garantiza la gestión de riesgos, auditorías y planes de mejoramiento institucional.",
        icono: "control",
        politicas: ["Control Interno"]
      }
    ];

    this._onKeydown = (e) => this.onKeydown(e);
  }

  firstUpdated() {
    const firstBtn = this.querySelector('[data-index="0"]');
    if (firstBtn) firstBtn.focus();
    this.addEventListener('keydown', this._onKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.removeEventListener('keydown', this._onKeydown);
  }

  seleccionar(i) {
    this.selectedIndex = i;
  }

  onKeydown(e) {
    const total = this.dimensiones.length;
    const current = this.selectedIndex ?? 0;
    if (e.key === 'ArrowRight') {
      const next = (current + 1) % total;
      this.seleccionar(next);
      this.focusButton(next);
    } else if (e.key === 'ArrowLeft') {
      const prev = (current - 1 + total) % total;
      this.seleccionar(prev);
      this.focusButton(prev);
    } else if (e.key === 'Enter' && this.selectedIndex == null) {
      this.seleccionar(0);
      this.focusButton(0);
    }
  }

  focusButton(i) {
    const btn = this.querySelector(`[data-index="${i}"]`);
    if (btn) btn.focus();
  }

  render() {
    const dim = this.selectedIndex != null ? this.dimensiones[this.selectedIndex] : null;

    return html`
      <div class="container pa4" role="application" aria-label="MIPG - Navegación por dimensiones">
        <h1 class="tc f2 fw7 mb3 title-blue">
          Modelo Integrado de Planeación y Gestión (MIPG)
        </h1>

        <div class="flex flex-wrap justify-center items-center mb3 btn-row" role="toolbar" aria-label="Dimensiones MIPG">
          ${this.dimensiones.map((d, i) => html`
            <button
              class="btn btn-primary ph3 pv2 br2 mh2 mv2 ${this.selectedIndex === i ? 'active' : ''}"
              @click=${() => this.seleccionar(i)}
              data-index=${i}
              aria-pressed=${this.selectedIndex === i}
              aria-label=${`Ver ${d.titulo}`}>
              ${d.titulo}
            </button>
          `)}
        </div>

        ${dim ? html`
          <div class="card pa4 rounded-xl" aria-live="polite">
            <div class="flex items-center mb3">
              <div class="mr3 icon-blue" aria-hidden="true">
                ${this.iconos[dim.icono]}
              </div>
              <div>
                <h2 class="f3 fw6 subtitle-blue ma0">${dim.titulo}</h2>
                <p class="mid-gray mt2 mb0">${dim.descripcion}</p>
              </div>
            </div>

            <div class="flex mt2 mb3">
              <a class="btn btn-success ph3 pv2 br2 no-underline"
                 href=${dim.url}
                 target="_blank"
                 rel="noopener"
                 aria-label=${`Abrir PDF: ${dim.titulo}`}>
                Ver Estructura (PDF)
              </a>
            </div>

            <div class="bg-near-white pa3 br3 ba b--black-05">
              <h3 class="f4 fw6 section-yellow mt0 mb2">Políticas</h3>
              <ul class="pl3 dark-gray">
                ${dim.politicas.map(p => html`<li class="lh-copy">${p}</li>`)}
              </ul>
            </div>
          </div>
        ` : html`
          <div class="card pa4 rounded-xl">
            <p class="ma0 mid-gray">
              Selecciona una dimensión para ver su descripción, políticas y el PDF correspondiente.
            </p>
          </div>
        `}
      </div>
    `;
  }
}

customElements.define('x-mipg', ContenedorApp);
