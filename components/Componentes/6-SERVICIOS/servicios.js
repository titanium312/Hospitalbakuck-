import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

/**
 * <servicios-hsja>
 * Componente Lit con CSS encapsulado (sin dependencias globales) que replica
 * el diseño y contenido del mockup original. Mantiene el texto EXACTO.
 * - Estética hospitalaria: blancos/azules, limpio y luminoso.
 * - Accesible: role="dialog", aria-modal, cerrar con ESC y clic afuera.
 */
export class ServiciosHsja extends LitElement {
  static properties = {
    openId: { type: String, state: true }
  };

  constructor(){
    super();
    this.openId = '';
    // Cerrar con ESC
    this._onKeyDown = (e) => { if (e.key === 'Escape') this.closeAll(); };
  }

  connectedCallback(){
    super.connectedCallback();
    window.addEventListener('keydown', this._onKeyDown);
  }
  disconnectedCallback(){
    window.removeEventListener('keydown', this._onKeyDown);
    super.disconnectedCallback();
  }

  static styles = css`
    :host { display:block; background:#f4f8fb; color:#003366; font-family: Arial, sans-serif; }
    .wrap { padding: 40px 20px; max-width:1200px; margin:0 auto; }
    h1 { text-align:center; color:#003366; margin:40px 0 20px; font-size:2.2rem; text-transform:uppercase; }

    /* GRID CARDS */
    .cards { display:grid; grid-template-columns:repeat(auto-fit, minmax(260px,1fr)); gap:22px; }
    .card { background:#fff; border:3px solid #003366; border-radius:16px; text-align:center; padding:34px 18px; transition:all .28s; cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; }
    .card:hover { border-color:#ffcc00; transform:translateY(-8px); box-shadow:0 10px 24px rgba(0,0,0,0.12); }
    .icon { width:56px; height:56px; margin-bottom:18px; display:block; }
    .icon path { fill:#0055a5; transition: fill .28s; }
    .card:hover .icon path { fill:#ffcc00; }
    .card h3 { margin:0; font-size:1.5rem; font-weight:700; color:#003366; }

    /* PROGRAMAS LIST */
    .soft { background:linear-gradient(180deg,#fff 0%, #f3fbff 100%); margin-top:8px; }
    .programas-list { display:grid; gap:12px; margin-top:10px; }
    .prog-item { background:#fff; border:2px solid #003366; border-radius:12px; padding:14px 16px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; }
    .prog-item:hover { background:#f9fbff; border-color:#ffcc00; }
    .prog-left { display:flex; align-items:center; gap:10px; font-weight:700; color:#003366; }
    .chev { width:18px; height:18px; }

    /* MODAL */
    .modal { display:none; position:fixed; z-index:2000; inset:0; background:rgba(0,0,0,0.6); align-items:center; justify-content:center; padding:20px; }
    .modal[open] { display:flex; }
    .dialog { background:#fff; width:100%; max-width:820px; max-height:92%; overflow-y:auto; border-radius:14px; padding:22px; box-shadow:0 12px 36px rgba(0,0,0,0.28); animation:pop .22s ease; }
    @keyframes pop { from{opacity:0; transform:translateY(-10px)} to{opacity:1; transform:none} }
    .dialog h3 { margin:0 0 10px; color:#003366; font-size:1.4rem; }
    .dialog h4 { margin:12px 0 6px; color:#ffcc00; }
    .close { float:right; font-size:20px; font-weight:700; cursor:pointer; color:#333; border:none; background:none; }
    .close:hover { color:#003366; }
    ul { margin:6px 0 12px 20px; }
    p { margin:0 0 12px; color:#333; }

    /* Responsive */
    @media (max-width:520px){
      .card { padding:26px 12px; }
      .icon { width:48px; height:48px; }
      .dialog { padding:16px; }
    }
  `;

  openModal(id){ this.openId = id; }
  closeAll(){ this.openId = ''; }
  _backdropClick(e){ if (e.target === e.currentTarget) this.closeAll(); }

  // --- ICONS (inline SVG para mantener encapsulación y evitar dependencias externas) ---
  ic(name){
    switch(name){
      case 'truck-medical': return html`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h9v5h3l3 3h1v2h-1.18a3 3 0 1 1-5.64 0H9.82a3 3 0 1 1-5.64 0H3V6zm9 7V8H5v5h7zm-4-1H7V10h1V9h2v1h1v2H10v1H8v-1zM18 13l-2-2h-2v2h4z"/></svg>`;
      case 'user-md': return html`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-7 8a7 7 0 0 1 14 0v1H5z"/></svg>`;
      case 'baby': return html`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a5 5 0 0 1 5 5v1H7V7a5 5 0 0 1 5-5zm-6 9h12a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4zm2 6h8l2 3H6z"/></svg>`;
      case 'bed': return html`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h10a4 4 0 0 1 4 4v2h4v4h-2v-2H5v2H3zm2 4h8V9H5z"/></svg>`;
      case 'vials': return html`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h4v2H9v11a3 3 0 1 1-2 0V5H7zm8 0h4v2h-2v11a3 3 0 1 1-2 0V5h0z"/></svg>`;
      case 'people-group': return html`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm10 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1zM9 11a3 3 0 1 0 6 0z"/></svg>`;
      case 'tooth': return html`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c4 0 6 3 6 6 0 4-2 8-3 12-.5 2-2 2-3 0-1 2-2.5 2-3 0-1-4-3-8-3-12 0-3 2-6 6-6z"/></svg>`;
      case 'vial': return html`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8v2H8zm1 3h6v11a3 3 0 1 1-6 0z"/></svg>`;
      case 'pills': return html`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14a5 5 0 1 1 10 0 5 5 0 0 1-10 0zm12-7 4 4-7 7-4-4z"/></svg>`;
      case 'user-nurse': return html`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l5 2-5 2-5-2 5-2zm0 6a4 4 0 1 1-4 4 4 4 0 0 1 4-4zm-7 9a7 7 0 0 1 14 0v1H5z"/></svg>`;
      case 'leaf': return html`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4C11 4 6 9 6 16c0 2.5 2 4 4 4 7 0 12-5 12-12 0-2-1-3-2-4zM6 16c-2 0-4-2-4-4 0-6 5-7 10-8C8 7 6 10 6 16z"/></svg>`;
      case 'chev': return html`<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="#003366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      default: return html``;
    }
  }

  // --- TEMPLATE ---
  render(){
    return html`
      <div class="wrap">
        <h1>Servicios del HSJA</h1>
        <div class="cards">
          ${this._card('modalUrgencias', 'truck-medical', 'Urgencias')}
          ${this._card('modalConsulta', 'user-md', 'Consulta Externa')}
          ${this._card('modalPartos', 'baby', 'Sala de Partos')}
          ${this._card('modalHosp', 'bed', 'Hospitalización')}
          ${this._card('modalDiag', 'vials', 'Apoyo Diagnóstico')}
          ${this._card('modalConexos', 'people-group', 'Servicios Conexos')}
        </div>
      </div>

      <div class="wrap soft">
        <h1>Programas Institucionales</h1>
        <div class="programas-list">
          ${this._prog('modalProgUrg', 'truck-medical', 'Programas en Urgencias')}
          ${this._prog('modalProgHosp', 'bed', 'Programas en Hospitalización')}
          ${this._prog('modalProgBucal', 'tooth', 'Programas de Salud Bucal')}
          ${this._prog('modalProgLab', 'vial', 'Programas en Laboratorio Clínico')}
          ${this._prog('modalProgFarm', 'pills', 'Programas de Farmacia')}
          ${this._prog('modalProgEnf', 'user-nurse', 'Programas de Enfermería')}
          ${this._prog('modalProgAmb', 'leaf', 'Programas Ambientales')}
        </div>
      </div>

      ${this._modals()}
    `;
  }

  _card(id, icon, title){
    return html`
      <button class="card" @click=${() => this.openModal(id)} aria-haspopup="dialog" aria-controls=${id}>
        ${this.ic(icon)}
        <h3>${title}</h3>
      </button>
    `;
  }
  _prog(id, icon, label){
    return html`
      <button class="prog-item" @click=${() => this.openModal(id)} aria-haspopup="dialog" aria-controls=${id}>
        <span class="prog-left">${this.ic(icon)} ${label}</span>
        ${this.ic('chev')}
      </button>
    `;
  }

  _modalShell(id, title, body){
    const open = this.openId === id;
    return html`
      <div class="modal" ?open=${open} @click=${this._backdropClick} role="dialog" aria-modal="true" aria-labelledby="${id}-title" id=${id}>
        <div class="dialog">
          <button class="close" @click=${this.closeAll} aria-label="Cerrar">&times;</button>
          <h3 id="${id}-title">${title}</h3>
          ${body}
        </div>
      </div>
    `;
  }

  _modals(){
    return html`
      ${this._modalShell('modalUrgencias', 'Urgencias', html`
        <h4>🎯 Objetivo</h4>
        <p>Estabilizar, tratar y remitir oportunamente a los pacientes con atención humanizada y oportuna.</p>
        <h4>📌 Servicios</h4>
        <ul>
          <li>Área de triaje</li>
          <li>Sala de observación (adultos y pediátrica)</li>
          <li>Sala de reanimación</li>
          <li>Sala de partos y postparto</li>
        </ul>
      `)}

      ${this._modalShell('modalConsulta', 'Consulta Externa', html`
        <h4>🎯 Objetivo</h4>
        <p>Garantizar acceso ambulatorio integral con énfasis en prevención y detección temprana.</p>
        <h4>📌 Servicios</h4>
        <ul>
          <li>Medicina General</li>
          <li>Enfermería PyP</li>
          <li>Control prenatal y crecimiento</li>
          <li>Odontología básica</li>
          <li>Psicología</li>
          <li>Vacunación (PAI)</li>
        </ul>
      `)}

      ${this._modalShell('modalPartos', 'Sala de Partos', html`
        <h4>🎯 Objetivo</h4>
        <p>Asegurar un parto seguro, digno y humanizado para madre y recién nacido.</p>
        <h4>📌 Servicios</h4>
        <ul>
          <li>Atención médica y de enfermería</li>
          <li>Partos de bajo riesgo</li>
          <li>Atención inmediata al recién nacido</li>
          <li>Acompañamiento familiar</li>
        </ul>
      `)}

      ${this._modalShell('modalHosp', 'Hospitalización', html`
        <h4>🎯 Objetivo</h4>
        <p>Brindar un entorno seguro y humanizado para la recuperación de pacientes.</p>
        <h4>📌 Servicios</h4>
        <ul>
          <li>10 camas para adultos</li>
          <li>2 camas pediátricas</li>
          <li>Camas obstétricas postparto</li>
        </ul>
      `)}

      ${this._modalShell('modalDiag', 'Apoyo Diagnóstico', html`
        <h4>🎯 Objetivo</h4>
        <p>Apoyar la labor médica con diagnósticos confiables y suministro de medicamentos.</p>
        <h4>📌 Servicios</h4>
        <ul>
          <li>Laboratorio clínico básico</li>
          <li>Citologías cérvico-uterinas</li>
          <li>Imagenología básica</li>
          <li>Farmacia hospitalaria</li>
        </ul>
      `)}

      ${this._modalShell('modalConexos', 'Servicios Conexos', html`
        <h4>🎯 Objetivo</h4>
        <p>Garantizar atención integral con apoyo social, logístico y comunitario.</p>
        <h4>📌 Servicios</h4>
        <ul>
          <li>Ambulancias habilitadas</li>
          <li>Trabajo social en salud</li>
          <li>Programas ambientales</li>
          <li>Educación comunitaria</li>
        </ul>
      `)}

      ${this._modalShell('modalProgUrg', 'Programas en Urgencias', html`
        <p>Resolución de eventos básicos, estabilización de casos graves, vigilancia en salud pública y protección comunitaria.</p>
        <h4>Actividades destacadas</h4>
        <ul>
          <li>Protocolo de atención inicial y derivación.</li>
          <li>Formación en reanimación y triaje para el personal.</li>
          <li>Vigilancia de eventos en salud pública.</li>
        </ul>
      `)}

      ${this._modalShell('modalProgHosp', 'Programas en Hospitalización', html`
        <p>Recuperación clínica, cuidado integral y acompañamiento familiar para pacientes hospitalizados.</p>
        <h4>Actividades destacadas</h4>
        <ul>
          <li>Protocolos de cuidado multidisciplinario.</li>
          <li>Rotación médica y planes de rehabilitación.</li>
          <li>Atención psicosocial y apoyo familiar.</li>
        </ul>
      `)}

      ${this._modalShell('modalProgBucal', 'Programas de Salud Bucal', html`
        <p>Promoción y prevención en salud oral, higiene bucal y tratamientos básicos odontológicos.</p>
        <h4>Actividades destacadas</h4>
        <ul>
          <li>Jornadas de educación y cepillado supervisado.</li>
          <li>Atención preventiva y curativa básica.</li>
          <li>Campañas escolares de salud bucal.</li>
        </ul>
      `)}

      ${this._modalShell('modalProgLab', 'Programas en Laboratorio Clínico', html`
        <p>Apoyo diagnóstico y soporte a programas de salud pública.</p>
        <h4>Actividades destacadas</h4>
        <ul>
          <li>Procesamiento de muestras para vigilancia epidemiológica.</li>
          <li>Controles de calidad y capacitación técnica.</li>
          <li>Apoyo en campañas de tamizaje.</li>
        </ul>
      `)}

      ${this._modalShell('modalProgFarm', 'Programas de Farmacia', html`
        <p>Seguimiento farmacoterapéutico, seguridad del paciente, educación y promoción comunitaria en salud.</p>
        <h4>Actividades destacadas</h4>
        <ul>
          <li>Revisión farmacoterapéutica y conciliación de medicamentos.</li>
          <li>Capacitaciones en uso racional de medicamentos.</li>
          <li>Dispensación segura y control de inventarios.</li>
        </ul>
      `)}

      ${this._modalShell('modalProgEnf', 'Programas de Enfermería', html`
        <p>Articulación de acciones clínicas, comunitarias y educativas en salud pública.</p>
        <h4>Actividades destacadas</h4>
        <ul>
          <li>Programas de promoción y prevención en territorio.</li>
          <li>Formación en cuidado domiciliario y seguimiento de crónicos.</li>
          <li>Protocolos de seguridad del paciente.</li>
        </ul>
      `)}

      ${this._modalShell('modalProgAmb', 'Programas Ambientales', html`
        <p>Acciones de vigilancia, control y educación en salud ambiental en la institución y la comunidad.</p>
        <h4>Actividades destacadas</h4>
        <ul>
          <li>Manejo de residuos hospitalarios y campañas educativas.</li>
          <li>Monitoreo de calidad de agua y acciones de mitigación.</li>
          <li>Proyectos de sostenibilidad institucional.</li>
        </ul>
      `)}
    `;
  }
}

customElements.define('servicios-x', ServiciosHsja);
