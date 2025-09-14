import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../../herramienta/dictador.js'; // define <dictador-tts>

/**
 * <tramites-hsja>
 * Componente Lit encapsulado (sin <html>/<head>/<body>)
 * Conserva textos y estructura de los trámites y PQRSDF.
 */
export class TramitesHsja extends LitElement {
  static properties = {
    openId: { type: String, state: true },
    radicado: { type: String, state: true }
  };

  constructor(){
    super();
    this.openId = '';
    this.radicado = '';
    this._onKey = (e) => { if (e.key === 'Escape') this.closeAll(); };
  }
  connectedCallback(){ super.connectedCallback(); window.addEventListener('keydown', this._onKey); }
  disconnectedCallback(){ window.removeEventListener('keydown', this._onKey); super.disconnectedCallback(); }

  static styles = css`
    :host{ display:block; background:#f4f8fb; color:#003366; font-family: Arial, sans-serif; }
    .section{ padding:40px 20px; max-width:1200px; margin:0 auto; }
    h1{ text-align:center; color:#003366; margin:40px 0 20px; font-size:2.2rem; text-transform:uppercase; }

    .cards{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:22px; }
    .card{ background:#fff; border:3px solid #003366; border-radius:16px; text-align:center; padding:34px 18px; transition:all .28s; cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; }
    .card:hover{ border-color:#ffcc00; transform:translateY(-8px); box-shadow:0 10px 24px rgba(0,0,0,.12); }
    .ico{ width:56px; height:56px; margin-bottom:18px; }
    .ico path{ fill:#0055a5; transition:fill .28s; }
    .card:hover .ico path{ fill:#ffcc00; }
    .card h3{ margin:0; font-size:1.3rem; font-weight:700; color:#003366; }

    /* Modal */
    .modal{ display:none; position:fixed; z-index:2000; inset:0; background:rgba(0,0,0,0.6); align-items:center; justify-content:center; padding:20px; }
    .modal[open]{ display:flex; }
    .modal-content{ background:#fff; width:100%; max-width:820px; max-height:92%; overflow-y:auto; border-radius:14px; padding:22px; box-shadow:0 12px 36px rgba(0,0,0,.28); animation:pop .22s ease; }
    @keyframes pop{ from{opacity:0; transform:translateY(-10px)} to{opacity:1; transform:none} }
    .modal h3{ margin:0 0 10px; color:#003366; font-size:1.4rem; }
    .modal p{ margin:6px 0; color:#333; }
    .close{ float:right; font-size:20px; font-weight:700; cursor:pointer; color:#333; border:none; background:none; }
    .close:hover{ color:#003366; }

    /* Cajita Modalidad */
    .card-box{ margin-top:14px; display:flex; flex-wrap:wrap; gap:10px; }
    .card-item{ background:#f4f8fb; border:2px solid #003366; border-radius:12px; padding:10px 12px; font-weight:700; color:#003366; flex:1; }

    /* PQRS sección */
    .cards.pqrs{ grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); }
    .cajita{ border:2px solid #003366; border-radius:12px; padding:10px; margin:6px 0; background:#f0f8ff; color:#0055a5; font-weight:700; }
    form{ display:flex; flex-direction:column; gap:10px; }
    input[type=text], input[type=email], textarea, select{ width:100%; padding:8px; border-radius:6px; border:1px solid #ccc; box-sizing:border-box; }
    textarea{ resize:vertical; min-height:80px; }
    input[type=checkbox], input[type=radio]{ margin-right:6px; }
    button.btn{ margin-top:16px; padding:10px 20px; background:#003366; color:#fff; border:none; border-radius:8px; cursor:pointer; }
    button.btn:hover{ background:#0055a5; }

    @media (max-width:520px){ .card{ padding:26px 12px; } .ico{ width:48px; height:48px; } .modal-content{ padding:16px; } }
  `;

  // Icons (SVG inline)
  ic(name){
    switch(name){
      case 'baby': return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a5 5 0 0 1 5 5v1H7V7a5 5 0 0 1 5-5zm-6 9h12a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4zm2 6h8l2 3H6z"/></svg>`;
      case 'cross': return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 7 7h3v10h4V7h3z"/></svg>`;
      case 'file-med': return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6v20h12V8zM14 2v6h6"/></svg>`;
      case 'brief': return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6v3h5v14H4V6h5zM9 6V3m6 0v3"/></svg>`;
      case 'pills': return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14a5 5 0 1 1 10 0 5 5 0 0 1-10 0zm12-7 4 4-7 7-4-4z"/></svg>`;
      case 'truck-med': return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h9v5h3l3 3h1v2h-1.18a3 3 0 1 1-5.64 0H9.82a3 3 0 1 1-5.64 0H3V6zm9 7V8H5v5h7zm-4-1H7V10h1V9h2v1h1v2H10v1H8v-1zM18 13l-2-2h-2v2h4z"/></svg>`;
      case 'syringe': return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21l5-5 2 2 8-8-2-2 2-2 2 2-2 2 2 2-2 2-2-2-8 8 2 2z"/></svg>`;
      case 'child': return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a3 3 0 1 1-3 3 3 3 0 0 1 3-3zM7 22v-4H5v-3h14v3h-2v4z"/></svg>`;
      case 'female': return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a6 6 0 1 1-2.83 11.3L8 16h2v2H8v2H6v-2H4v-2h2l1.17-2.7A6 6 0 0 1 12 2z"/></svg>`;
      case 'envelope': return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3zM3 6l9 7 9-7"/></svg>`;
      case 'calendar': return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v3H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2V2h-2v3H9V2z"/></svg>`;
      case 'mail-open': return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l10 6v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8zM2 8l10 6 10-6"/></svg>`;
      default: return html``;
    }
  }

  // Helpers
  open(id){ this.openId = id; }
  closeAll(){ this.openId = ''; }
  _backdrop(e){ if (e.target === e.currentTarget) this.closeAll(); }

  render(){
    return html`
      <!-- Barra TTS EXTERNA: lee TODO lo visible dentro de #main-content -->
      <dictador-tts ui text-src="#main-content" lang="es-CO" rate="1" pitch="1"></dictador-tts>

      <!-- Envolvemos el contenido principal para que la barra externa tenga un target limpio -->
      <div id="main-content">
        <section class="section">
          <h1>Trámites del HSJA</h1>
          <div class="cards">
            ${this.card('modalNacido', 'baby', 'Certificado de Nacido Vivo')}
            ${this.card('modalDefuncion', 'cross', 'Certificado de Defunción')}
            ${this.card('modalHistoria', 'file-med', 'Historia Clínica')}
            ${this.card('modalLaboral', 'brief', 'Certificado Laboral')}
            ${this.card('modalMedicamentos', 'pills', 'Dispensación de Medicamentos')}
            ${this.card('modalUrgencias', 'truck-med', 'Atención Inicial de Urgencias')}
            ${this.card('modalVacunacion', 'syringe', 'Certificado de Vacunación')}
            ${this.card('modalCarnetCrec', 'child', 'Carné de Crecimiento y Desarrollo')}
            ${this.card('modalPrenatal', 'female', 'Carné de Cuidado Prenatal')}
            ${this.card('modalPQRSD', 'envelope', 'Radicación de PQRSD')}
            ${this.card('modalCitas', 'calendar', 'Asignación de Citas Médicas')}
          </div>
        </section>

        ${this.modalesTramites()}

        <section class="section">
          <h1>PQRSDF EN LINEA - HSJA</h1>
          <div class="cards pqrs">
            <article class="card">
              ${this.ic('mail-open')}
              <h3>PQRSDF</h3>
              <button class="btn" @click=${() => this.open('modalPQRS')}>Abrir formulario</button>
            </article>
          </div>
        </section>

        ${this.modalPQRS()}
        ${this.modalAcuse()}
      </div>
    `;
  }

  card(id, icon, title){
    return html`
      <button class="card" aria-haspopup="dialog" aria-controls=${id} @click=${() => this.open(id)}>
        ${this.ic(icon)}
        <h3>${title}</h3>
      </button>
    `;
  }

  shell(id, title, content){
    const open = this.openId === id;
    return html`
      <div class="modal" ?open=${open} @click=${this._backdrop} role="dialog" aria-modal="true" aria-labelledby="${id}-title" id=${id}>
        <div class="modal-content">
          <button class="close" aria-label="Cerrar" @click=${this.closeAll}>&times;</button>
          <h3 id="${id}-title">${title}</h3>

          <!-- Barra TTS DENTRO DEL MODAL (lee sólo su contenido) -->
          <dictador-tts ui text-src="#${id}-content" lang="es-CO" rate="1" pitch="1"></dictador-tts>

          <div id="${id}-content">
            ${content}
          </div>
        </div>
      </div>
    `;
  }

  modalesTramites(){
    return html`
      ${this.shell('modalNacido','Certificado de Nacido Vivo', html`
        <p>Documento expedido al recién nacido para registro civil de nacimiento.</p>
        <p><strong>Norma:</strong> Resolución 3280 de 2018; Decreto 1171 de 1997.</p>
        <p><strong>Usuario:</strong> Recién nacido y acudientes.</p>
        <p><strong>Medio de acceso:</strong> Presencial en área de estadística.</p>
        <p><strong>Horario:</strong> Lunes a viernes de 8:00 a.m. a 5:00 p.m.</p>
        <p><strong>Observación:</strong> Documento válido para registro civil de nacimiento.</p>
        <div class="card-box"><div class="card-item">Modalidad del Trámite: Presencial</div></div>
      `)}

      ${this.shell('modalDefuncion','Certificado de Defunción', html`
        <p>Documento legal requerido para trámites funerarios y civiles.</p>
        <p><strong>Norma:</strong> Resolución 13437 de 1991; Decreto 1260 de 1970.</p>
        <p><strong>Usuario:</strong> Familiares del fallecido.</p>
        <p><strong>Medio de acceso:</strong> Presencial en estadística o correo institucional.</p>
        <p><strong>Horario:</strong> Lunes a viernes de 8:00 a.m. a 5:00 p.m.</p>
        <p><strong>Observación:</strong> Requisito legal para trámites funerarios y civiles.</p>
        <div class="card-box"><div class="card-item">Modalidad del Trámite: Presencial</div></div>
      `)}

      ${this.shell('modalHistoria','Historia Clínica', html`
        <p>Derecho del titular o acudiente a obtener copia de la historia clínica. Documento reservado.</p>
        <p><strong>Norma:</strong> Resolución 1995 de 1999; Ley 23 de 1981; Ley 1581 de 2012 (Habeas Data).</p>
        <p><strong>Usuario:</strong> Titular, acudiente o autoridad competente.</p>
        <p><strong>Medio de acceso:</strong> Presencial en secretaría o vía correo electrónico con soportes.</p>
        <p><strong>Horario:</strong> Lunes a viernes de 7:00 a.m. a 5:00 p.m.</p>
        <p><strong>Observación:</strong> Solo se entrega al titular o autorizado legalmente.</p>
        <div class="card-box"><div class="card-item">Modalidad del Trámite: Presencial / Virtual con soportes</div></div>
      `)}

      ${this.shell('modalLaboral','Certificado Laboral', html`
        <p>Constancia de vinculación laboral o contractual en el HSJA.</p>
        <p><strong>Norma:</strong> Código Sustantivo del Trabajo; Ley 1755 de 2015.</p>
        <p><strong>Usuario:</strong> Servidores públicos y contratistas del HSJA.</p>
        <p><strong>Medio de acceso:</strong> Presencial o virtual (correo institucional / PQRS).</p>
        <p><strong>Horario:</strong> Lunes a viernes de 7:00 a.m. a 5:00 p.m.</p>
        <p><strong>Observación:</strong> Se expide dentro de los 15 días hábiles posteriores a la solicitud.</p>
        <div class="card-box"><div class="card-item">Modalidad del Trámite: Presencial / Virtual</div></div>
      `)}

      ${this.shell('modalMedicamentos','Dispensación de Medicamentos', html`
        <p>Entrega de medicamentos formulados en farmacia institucional. Requiere fórmula médica vigente.</p>
        <p><strong>Norma:</strong> Resolución 1403 de 2007; Decreto 780 de 2016.</p>
        <p><strong>Usuario:</strong> Pacientes con fórmula médica vigente.</p>
        <p><strong>Medio de acceso:</strong> Farmacia institucional.</p>
        <p><strong>Horario:</strong> Lunes a viernes de 7:00 a.m. a 5:00 p.m.</p>
        <p><strong>Observación:</strong> Se registra en el sistema.</p>
        <div class="card-box"><div class="card-item">Modalidad del Trámite: Presencial</div></div>
      `)}

      ${this.shell('modalUrgencias','Atención Inicial de Urgencias', html`
        <p>Servicio disponible para cualquier persona, afiliada o no. Atención obligatoria sin pago previo.</p>
        <p><strong>Norma:</strong> Ley 100 de 1993; Resolución 5596 de 2015; Ley 1751 de 2015.</p>
        <p><strong>Usuario:</strong> Toda persona (afiliada o no).</p>
        <p><strong>Medio de acceso:</strong> Servicio de urgencias.</p>
        <p><strong>Horario:</strong> 24 horas del día, 7 días a la semana.</p>
        <p><strong>Observación:</strong> Obligatoria, sin barreras administrativas ni pago previo.</p>
        <div class="card-box"><div class="card-item">Modalidad del Trámite: Presencial</div></div>
      `)}

      ${this.shell('modalVacunacion','Certificado de Vacunación', html`
        <p>Documento que acredita la aplicación de vacunas según el esquema nacional.</p>
        <p><strong>Norma:</strong> Resolución 3280 de 2018; Decreto 780 de 2016; PAI.</p>
        <p><strong>Usuario:</strong> Niños, adultos y población priorizada.</p>
        <p><strong>Medio de acceso:</strong> Punto de vacunación / jornadas extramurales.</p>
        <p><strong>Horario:</strong> Lunes a viernes de 7:00 a.m. a 5:00 p.m.</p>
        <p><strong>Observación:</strong> Documento oficial que respalda esquema de inmunización.</p>
        <div class="card-box"><div class="card-item">Modalidad del Trámite: Presencial</div></div>
      `)}

      ${this.shell('modalCarnetCrec','Carné de Crecimiento y Desarrollo', html`
        <p>Registro de talla, peso y desarrollo de niños menores de 10 años.</p>
        <p><strong>Norma:</strong> Resolución 412 de 2000.</p>
        <p><strong>Usuario:</strong> Niños menores de 10 años.</p>
        <p><strong>Medio de acceso:</strong> Consulta de control.</p>
        <p><strong>Horario:</strong> Lunes a viernes de 7:00 a.m. a 5:00 p.m.</p>
        <p><strong>Observación:</strong> Primera vez sin costo; reposición $10.000.</p>
        <div class="card-box"><div class="card-item">Modalidad del Trámite: Presencial</div></div>
      `)}

      ${this.shell('modalPrenatal','Carné de Cuidado Prenatal', html`
        <p>Seguimiento de controles materno-perinatales en gestantes.</p>
        <p><strong>Norma:</strong> Resolución 412 de 2000.</p>
        <p><strong>Usuario:</strong> Mujeres gestantes.</p>
        <p><strong>Medio de acceso:</strong> Consulta prenatal.</p>
        <p><strong>Horario:</strong> Lunes a viernes de 7:00 a.m. a 5:00 p.m.</p>
        <p><strong>Observación:</strong> Primera vez sin costo; reposición $10.000.</p>
        <div class="card-box"><div class="card-item">Modalidad del Trámite: Presencial</div></div>
      `)}

      ${this.shell('modalPQRSD','Radicación de PQRSD', html`
        <p>Canal para presentar solicitudes, quejas, reclamos, sugerencias y denuncias. Se asigna número de radicado para seguimiento.</p>
        <p><strong>Norma:</strong> Ley 1755 de 2015; Decreto 2106 de 2019.</p>
        <p><strong>Usuario:</strong> Ciudadanía en general.</p>
        <p><strong>Medio de acceso:</strong> Ventanilla única, correo electrónico, página web.</p>
        <p><strong>Horario:</strong> Lunes a viernes de 7:00 a.m. a 5:00 p.m.</p>
        <p><strong>Observación:</strong> Se asigna número de radicado y se garantiza trazabilidad.</p>
        <div class="card-box"><div class="card-item">Modalidad del Trámite: Presencial / Virtual</div></div>
      `)}

      ${this.shell('modalCitas','Asignación de Citas Médicas', html`
        <p>Permite solicitar citas con medicina general o especializada, garantizando oportunidad y continuidad en la atención.</p>
        <p><strong>Norma:</strong> Resolución 1552 de 2013; Decreto 780 de 2016.</p>
        <p><strong>Usuario:</strong> Afiliados y vinculados al SGSSS.</p>
        <p><strong>Medio de acceso:</strong> Ventanilla, línea telefónica, página web o correo electrónico.</p>
        <p><strong>Horario:</strong> Lunes a viernes de 7:00 a.m. a 5:00 p.m.</p>
        <p><strong>Observación:</strong> Garantizar oportunidad y continuidad en la atención.</p>
        <div class="card-box"><div class="card-item">Modalidad del Trámite: Presencial / Virtual</div></div>
      `)}
    `;
  }

  modalPQRS(){
    return this.shell('modalPQRS','Trámite PQRSDF', html`
      <p>Permite radicar Petición, Queja, Reclamo, Sugerencia, Denuncia o Felicitación. Garantiza respuesta con acuse y radicado para seguimiento.</p>
      <div class="cajita">Modalidad del Trámite: <strong>Online</strong></div>
      <form id="formPQRS" @submit=${this._submitPQRS} novalidate>
        <h4>Selección de la opción</h4>
        <label><input type="radio" name="tipoPQRS" value="Petición" required> Petición</label>
        <label><input type="radio" name="tipoPQRS" value="Queja/Reclamo"> Queja / Reclamo</label>
        <label><input type="radio" name="tipoPQRS" value="Solicitud de información"> Solicitud de información</label>
        <label><input type="radio" name="tipoPQRS" value="Denuncia"> Denuncia</label>
        <label><input type="radio" name="tipoPQRS" value="Sugerencia/Propuesta"> Sugerencia / Propuesta</label>
        <label><input type="radio" name="tipoPQRS" value="Felicitación"> Felicitación</label>

        <h4>Datos del solicitante</h4>
        <label>Nombre y Apellidos / Razón Social (opcional si anónimo)</label>
        <input type="text" id="nombre">
        <label><input type="checkbox" id="anonimo"> Presentar de forma anónima</label>

        <label>Tipo de documento</label>
        <select id="tipoDoc">
          <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
          <option value="NUIP">NUIP</option>
          <option value="Cédula de Extranjería">Cédula de Extranjería</option>
          <option value="NIT">NIT</option>
          <option value="Pasaporte">Pasaporte</option>
        </select>

        <label>Número de documento o NIT</label>
        <input type="text" id="numDoc">

        <label>Modalidad de recepción de la respuesta</label>
        <select id="modalidadResp">
          <option value="Correo electrónico">Correo electrónico</option>
          <option value="Dirección física">Dirección física de correspondencia</option>
        </select>

        <label>Correo electrónico</label>
        <input type="email" id="correo">

        <label>Dirección de correspondencia</label>
        <input type="text" id="direccion">

        <label>Número de contacto</label>
        <input type="text" id="telefono">

        <label>Objeto de la PQRSDF</label>
        <textarea id="objeto"></textarea>

        <label>Adjuntar documentos o anexos</label>
        <input type="file" id="archivos">

        <label><input type="checkbox" id="acepto" required> Declaro que la información es veraz y autorizo tratamiento de datos personales (Ley 1581/2012).</label>

        <button class="btn" type="submit">Enviar</button>
      </form>
    `);
  }

  modalAcuse(){
    return this.shell('modalAcuse','Acuse de Recibo PQRSD', html`
      <p>Su solicitud ha sido registrada correctamente. Número de radicado:</p>
      <div class="cajita">${this.radicado}</div>
      <p>Guarde este número para seguimiento en línea.</p>
      <button class="btn" @click=${this.closeAll}>Cerrar</button>
    `);
  }

  _submitPQRS(e){
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    this.radicado = `HSJA-${Date.now()}`;
    this.open('modalAcuse');
    form.reset();
  }
}

customElements.define('tramites-x', TramitesHsja);
