import { LitElement, html, svg, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../herramienta/dictador.js'; // ⬅️ ajusta la ruta si es distinta

class ContenedorApp extends LitElement {
  // ✅ Usamos Shadow DOM para encapsular estilos
  // (no sobreescribimos createRenderRoot)

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
      { titulo: "Talento Humano", url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/1.%20TALENTO%20HUMANO.pdf", descripcion: "Garantiza servidores seleccionados, capacitados y motivados, con procesos de bienestar e integridad.", icono: "talento", politicas: ["Talento Humano", "Integridad"] },
      { titulo: "Direccionamiento Estratégico y Planeación", url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/2.%20Direccionamiento%20Estrat%C3%A9gico%20y%20Planeaci%C3%B3n.pdf", descripcion: "Define la misión, visión y objetivos institucionales, con planeación estratégica y uso eficiente de recursos.", icono: "direccion", politicas: ["Planeación Institucional", "Gestión Presupuestal y Eficiencia del Gasto Público"] },
      { titulo: "Gestión con Valores para Resultados", url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/3.%20Dimension%203%20con%20las%209%20politicas.pdf", descripcion: "Promueve la ética, integridad y eficiencia en la gestión pública, fortaleciendo procesos y servicios.", icono: "valores", politicas: ["Fortalecimiento organizacional", "Gobierno Digital", "Seguridad Digital", "Defensa Jurídica", "Servicio al Ciudadano", "Racionalización de Trámites", "Participación Ciudadana", "Mejora Normativa", "Gestión Ambiental (componente)"] },
      { titulo: "Evaluación de Resultados", url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/4.%20Dimension%204%20Evaluaci%C3%B3n%20de%20Resultados%20HSJ.pdf", descripcion: "Mide y evalúa la gestión institucional a través de indicadores y procesos de mejora continua.", icono: "evaluacion", politicas: ["Seguimiento y Evaluación del Desempeño Institucional"] },
      { titulo: "Información y Comunicación", url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/5.%20Dimensi%C3%B3n%205%20Informaci%C3%B3n%20y%20Comunicaci%C3%B3n.pdf", descripcion: "Garantiza transparencia, acceso a la información y comunicación con la ciudadanía.", icono: "info", politicas: ["Transparencia y Lucha contra la Corrupción", "Gestión Documental", "Gestión de la Información Estadística"] },
      { titulo: "Gestión del Conocimiento e Innovación", url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/6.%20Dimension%206%20Gesti%C3%B3n%20del%20Conocimiento%20y%20la%20Innovaci%C3%B3n.pdf", descripcion: "Promueve el aprendizaje organizacional, la innovación y la transferencia de conocimiento.", icono: "conocimiento", politicas: ["Gestión del Conocimiento e Innovación"] },
      { titulo: "Control Interno", url: "https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/7.%20Dimension%207%20Gesti%C3%B3n%20del%20Control%20Interno.pdf", descripcion: "Garantiza la gestión de riesgos, auditorías y planes de mejoramiento institucional.", icono: "control", politicas: ["Control Interno"] }
    ];

    this._onKeydown = (e) => this.onKeydown(e);
  }

  static styles = css`
    /* ========== THEME (hospital: azules fríos + blanco) ========== */
    :host {
      --bg: #f7fbff;
      --bg-card: #ffffff;
      --text: #102a43;
      --muted: #486581;
      --brand-50: #f0f7ff;
      --brand-100: #e1effe;
      --brand-200: #c3ddfd;
      --brand-300: #a4cafe;
      --brand-400: #76a9fa;
      --brand-500: #3f83f8;  /* azul hospitalario */
      --brand-600: #2065d1;
      --brand-700: #1a56db;
      --mint-500: #29b4a9;   /* acento verdoso suave */
      --ring: 0 0 0 3px rgba(32,101,209,0.28);
      --radius-lg: 16px;
      --shadow-sm: 0 1px 2px rgba(16, 42, 67, 0.06);
      --shadow-md: 0 10px 24px rgba(16, 42, 67, 0.08);
      color: var(--text);
      font: 400 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji";
    }

    /* ========== MINI-TACHYONS (solo utilidades usadas) ========== */
    .pa4{padding:2rem}
    .pa3{padding:1rem}
    .ph3{padding-left:1rem;padding-right:1rem}
    .pv2{padding-top:.5rem;padding-bottom:.5rem}
    .pl3{padding-left:1rem}
    .mb3{margin-bottom:1rem}
    .mt0{margin-top:0}
    .mt2{margin-top:.5rem}
    .mb0{margin-bottom:0}
    .ma0{margin:0}
    .mh2{margin-left:.5rem;margin-right:.5rem}
    .mv2{margin-top:.5rem;margin-bottom:.5rem}
    .tc{text-align:center}
    .f2{font-size:1.75rem}
    .f3{font-size:1.375rem}
    .f4{font-size:1.125rem}
    .fw7{font-weight:800}
    .fw6{font-weight:700}
    .br2{border-radius:.5rem}
    .br3{border-radius:.75rem}
    .rounded-xl{border-radius:var(--radius-lg)}
    .flex{display:flex}
    .flex-wrap{flex-wrap:wrap}
    .justify-center{justify-content:center}
    .items-center{align-items:center}
    .no-underline{text-decoration:none}
    .mid-gray{color:var(--muted)}
    .dark-gray{color:#2b3a49}
    .bg-near-white{background:#fbfdff}
    .ba{border-style:solid;border-width:1px}
    .b--black-05{border-color:rgba(0,0,0,.05)}
    .lh-copy{line-height:1.6}
    .icon-blue{color:var(--brand-600)}
    .title-blue{color:#0f2742}
    .subtitle-blue{color:#143a66}

    /* ========== LAYOUT ========== */
    .container{
      max-width: 1080px;
      margin: 0 auto;
    }

    /* ========== HEADER ========== */
    h1.title-blue{
      letter-spacing:-0.02em;
      line-height:1.15;
      background:
        radial-gradient(1200px 1200px at 50% -200px, var(--brand-50), transparent 60%),
        linear-gradient(180deg, #fff, #f7fbff 70%);
      -webkit-background-clip:text;
      background-clip:text;
      color: transparent;
      text-shadow: 0 1px 0 rgba(255,255,255,.6);
    }

    /* barra de botones */
    .btn-row{
      gap:.5rem;
    }

    /* ========== BUTTONS ========== */
    .btn{
      border:1px solid var(--brand-200);
      background: linear-gradient(180deg, #ffffff, var(--brand-50));
      color: var(--brand-700);
      font-weight:700;
      letter-spacing:.2px;
      cursor:pointer;
      transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease, background .12s ease;
      box-shadow: var(--shadow-sm);
      outline: none;
    }
    .btn:hover{
      transform: translateY(-1px);
      border-color: var(--brand-300);
      box-shadow: var(--shadow-md);
      background: linear-gradient(180deg, #ffffff, var(--brand-100));
    }
    .btn:focus-visible{
      box-shadow: var(--shadow-md), var(--ring);
    }
    .btn.active{
      border-color: var(--brand-500);
      color: #0f2642;
      background:
        linear-gradient(180deg, #fff, #eef4ff),
        radial-gradient(1000px 1000px at 50% -300px, rgba(32,101,209,.08), transparent 60%);
    }
    .btn-primary{ /* mismo estilo, reservado si quisieras variación futura */ }
    .btn-success{
      border-color: rgba(41,180,169,.3);
      color:#0d3b39;
      background: linear-gradient(180deg, #ffffff, #f3fbfa);
    }
    .btn-success:hover{
      border-color: rgba(41,180,169,.45);
      background: linear-gradient(180deg, #ffffff, #e8f8f6);
    }

    /* ========== CARD ========== */
    .card{
      background: var(--bg-card);
      border: 1px solid rgba(15,39,66,.06);
      box-shadow: var(--shadow-sm);
      transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease, background .15s ease;
    }
    .card:hover{
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
      border-color: rgba(15,39,66,.12);
    }

    /* ========== SECTION: detalle seleccionado ========== */
    .selected{
      display:grid;
      gap:1rem;
    }
    .selected .head{
      display:flex;
      align-items:center;
      gap:1rem;
    }
    .selected .pdf{
      display:flex;
      gap:.75rem;
    }

    /* Etiquetas y acentos */
    .section-yellow{
      color:#0a2f55;
      position:relative;
    }
    .section-yellow::after{
      content:"";
      display:block;
      width:80px;
      height:3px;
      border-radius:999px;
      margin-top:.35rem;
      background: linear-gradient(90deg, var(--mint-500), var(--brand-500));
      opacity:.7;
    }

    /* ========== LINK estándar ========== */
    a{
      color: var(--brand-600);
    }
    a:hover{
      text-decoration: underline;
    }

    /* ========== ACCESSIBILITY ========== */
    :host(:focus-within) .sr-outline{
      outline: var(--ring) solid 0;
    }

    /* ========== SMALL SCREENS ========== */
    @media (max-width: 640px){
      .f2{font-size:1.5rem}
      .f3{font-size:1.25rem}
      .pa4{padding:1.25rem}
    }
  `;

  firstUpdated() {
    const firstBtn = this.renderRoot?.querySelector('[data-index="0"]');
    if (firstBtn) firstBtn.focus();
    this.addEventListener('keydown', this._onKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.removeEventListener('keydown', this._onKeydown);
  }

  seleccionar(i) { this.selectedIndex = i; }

  onKeydown(e) {
    const total = this.dimensiones.length;
    const current = this.selectedIndex ?? 0;
    if (e.key === 'ArrowRight') { const next = (current + 1) % total; this.seleccionar(next); this.focusButton(next); }
    else if (e.key === 'ArrowLeft') { const prev = (current - 1 + total) % total; this.seleccionar(prev); this.focusButton(prev); }
    else if (e.key === 'Enter' && this.selectedIndex == null) { this.seleccionar(0); this.focusButton(0); }
  }

  focusButton(i) { this.renderRoot?.querySelector(`[data-index="${i}"]`)?.focus(); }

  render() {
    const dim = this.selectedIndex != null ? this.dimensiones[this.selectedIndex] : null;
    return html`
      <div class="container pa4 sr-outline" role="application" aria-label="MIPG - Navegación por dimensiones">
        <dictador-tts ui lang="es-CO" rate="0.95" pitch="1" volume="1">
          <h1 class="tc f2 fw7 mb3 title-blue">Modelo Integrado de Planeación y Gestión (MIPG)</h1>

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
            <div class="card pa4 rounded-xl selected" aria-live="polite">
              <div class="head">
                <div class="mr3 icon-blue" aria-hidden="true">${this.iconos[dim.icono]}</div>
                <div>
                  <h2 class="f3 fw6 subtitle-blue ma0">${dim.titulo}</h2>
                  <p class="mid-gray mt2 mb0">${dim.descripcion}</p>
                </div>
              </div>

              <div class="pdf mt2 mb3">
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
              <p class="ma0 mid-gray">Selecciona una dimensión para ver su descripción, políticas y el PDF correspondiente.</p>
            </div>
          `}
        </dictador-tts>
      </div>
    `;
  }
}

customElements.define('x-mipg', ContenedorApp);
