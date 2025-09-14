// salud-calendar-2025.js (Lit 3)
import { LitElement, html, css, nothing } from "https://cdn.jsdelivr.net/npm/lit@3/+esm";
import { EVENTS } from "./fechas.js"; // obj: { "YYYY-MM-DD": [{ tipo:'nacional'|'internacional', nombre:string }, ...] }

export class SaludCalendar2025 extends LitElement {
  static properties = {
    month: { type: Number },              // 8..11 (sept..dic)
    year: { type: Number },
    isAdmin: { type: Boolean, state: true },
    showLogin: { type: Boolean, state: true },
    showForm: { type: Boolean, state: true },
    showEvents: { type: Boolean, state: true },
    selectedDate: { type: String, state: true },
    hospitalEvents: { state: true },      // {dateKey: Array<EventoHospital>}
    alertText: { type: String, state: true },
    _formConvOtros: { type: Boolean, state: true },
  };

  constructor() {
    super();
    this.month = 8;
    this.year = 2025;
    this.isAdmin = false;
    this.showLogin = false;
    this.showForm = false;
    this.showEvents = false;
    this.selectedDate = "";
    this.hospitalEvents = {};
    this.alertText = "";
    this._formConvOtros = false;
  }

  static styles = css`
    :host { display:block; color:#003366; font-family: Arial, sans-serif; }
    h2 { margin: 10px 0 8px; font-size: 1.25rem; color:#003366; }

    #alerta { display:none; background: orange; color:#fff; font-weight:700;
      padding:10px; margin:10px auto 14px; border-radius:8px; max-width:420px; }
    #alerta[show] { display:block; }

    #monthSelect {
      padding:6px 10px; margin:8px auto 14px; font-size:.95rem; border-radius:6px;
      border:2px solid #0055a5; color:#003366; width:100%; max-width:420px;
      display:block; text-align:center; box-sizing:border-box; background:#fff;
    }

    .calendar-wrap { position: relative; display: inline-block; width:100%; }
    .calendar {
      max-width:420px; margin:0 auto; background:#fff; border:3px solid #003366;
      border-radius:12px; padding:10px; box-sizing:border-box; position:relative;
    }
    .calendar-header { display:grid; grid-template-columns:repeat(7,1fr); margin-bottom:8px; font-weight:700; font-size:.82rem; }
    .days { display:grid; grid-template-columns: repeat(7,1fr); gap:6px; }
    .day { padding:10px 0; border-radius:8px; background:#e6eef7; cursor:pointer; font-size:.9rem; line-height:1; text-align:center; }
    .day:hover { transform: scale(1.04); font-weight:700; }

    .hospital { background:#0077b6 !important; color:#fff; font-weight:700; }
    .nacional { background:#FFD700 !important; color:#000; font-weight:700; }
    .internacional { background:#0055a5 !important; color:#fff; font-weight:700; }
    .mixto { background: linear-gradient(135deg,#FFD700 33%, #0055a5 33% 66%, #0077b6 66%) !important; color:#fff; font-weight:700; }

    .fab-login {
      position:absolute; top:12px; right:12px; z-index:10; width:38px; height:38px; border-radius:9999px;
      border:0; background:#0055a5; color:#fff; box-shadow:0 6px 14px rgba(0,0,0,.15);
      cursor:pointer; font-size:18px; line-height:1; display:grid; place-items:center;
    }
    .fab-login:hover { background:#003d7a; }

    .admin { text-align:center; margin:14px auto; max-width:420px; }
    .admin button { padding:8px 14px; background:#0077b6; color:#fff; border:0; border-radius:8px; cursor:pointer; }
    .admin button:hover { background:#005f87; }

    /* Modales */
    .modal {
      position:fixed; inset:0; display:none; z-index:3000; background:rgba(0,0,0,.55);
      align-items:center; justify-content:center; padding:16px;
    }
    .modal[open] { display:flex; }
    .modal-content {
      position:relative; background:#fff; max-width:420px; width:100%; padding:18px; border-radius:12px; box-sizing:border-box;
    }
    .close { position:absolute; top:8px; right:10px; cursor:pointer; font-size:20px; font-weight:700; background:transparent; border:0; }
    .evento { display:flex; align-items:center; gap:8px; margin:8px 0; font-size:14px; }
    .ico { font-size:16px; margin-right:6px; }

    .modal-content label { font-weight:600; font-size:.9rem; display:block; margin-top:8px; }
    .modal-content input[type="text"],
    .modal-content input[type="password"],
    .modal-content input[type="date"],
    .modal-content input[type="time"],
    .modal-content select {
      width:100%; padding:8px; margin-top:6px; box-sizing:border-box; border-radius:6px; border:1px solid #cfcfcf;
    }
    .btn { margin-top:12px; padding:8px 12px; background:#0055a5; color:#fff; border:0; border-radius:6px; cursor:pointer; }
    .btn:hover { background:#003366; }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._esc = (e) => {
      if (e.key === 'Escape') { this._closeAll(); }
    };
    document.addEventListener('keydown', this._esc);
  }
  disconnectedCallback() {
    document.removeEventListener('keydown', this._esc);
    super.disconnectedCallback();
  }
  updated() { this._updateAlertForToday(); }

  /* ---------- Render ---------- */
  render() {
    return html`
      <h2>Calendario de Eventos en Salud 2025</h2>
      <div id="alerta" ?show=${!!this.alertText} role="status" aria-live="polite">${this.alertText}</div>

      <select id="monthSelect" aria-label="Seleccionar mes" .value=${String(this.month)} @change=${this._onMonthChange}>
        <option value="8">Septiembre</option>
        <option value="9">Octubre</option>
        <option value="10">Noviembre</option>
        <option value="11">Diciembre</option>
      </select>

      <div class="calendar-wrap">
        <div class="calendar" aria-label="Calendario">
          <div class="calendar-header">
            <div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div><div>Dom</div>
          </div>
          <div class="days">
            ${this._leadingEmpty().map(() => html`<div></div>`)}
            ${this._daysInMonth().map((d) => {
              const key = this._dateKey(this.year, this.month+1, d);
              return html`
                <div class="day ${this._classFor(key)}" @click=${() => this._openEvents(key)} aria-label=${`Día ${d}`}>
                  ${d}
                </div>
              `;
            })}
          </div>
        </div>
        <button class="fab-login" title="Acceso administrador" aria-haspopup="dialog" @click=${this._openLogin}>🔐</button>
      </div>

      ${this.isAdmin ? html`
        <div class="admin">
          <button @click=${this._openForm}>➕ Agregar Evento del Hospital</button>
        </div>
      ` : nothing}

      ${this._renderEventsModal()}
      ${this._renderFormModal()}
      ${this._renderLoginModal()}
    `;
  }

  /* ---------- Helpers de calendario ---------- */
  _onMonthChange(e) { this.month = parseInt(e.target.value, 10); }
  _daysInMonth() {
    const days = new Date(this.year, this.month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  }
  _leadingEmpty() {
    const firstDay = new Date(this.year, this.month, 1).getDay(); // 0=Dom
    const offset = (firstDay + 6) % 7; // lunes=0
    return Array.from({ length: offset });
  }
  _dateKey(y, m, d) { return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }

  _getAllEvents(key) {
    const base = EVENTS?.[key] ?? [];
    const hosp = this.hospitalEvents?.[key] ?? [];
    // Ordenar: hospital (1) -> nacional (2) -> internacional (3)
    const orden = { hospital:1, nacional:2, internacional:3 };
    return [...hosp, ...base].sort((a,b) => (orden[a.tipo]||9) - (orden[b.tipo]||9));
  }
  _classFor(key) {
    const tipos = this._getAllEvents(key).map(e => e.tipo);
    if (tipos.includes('hospital')) return 'hospital';
    if (tipos.includes('nacional') && tipos.includes('internacional')) return 'mixto';
    if (tipos.includes('nacional')) return 'nacional';
    if (tipos.includes('internacional')) return 'internacional';
    return '';
  }

  /* ---------- Alerta de hoy ---------- */
  _updateAlertForToday() {
    const now = new Date();
    const key = this._dateKey(now.getFullYear(), now.getMonth()+1, now.getDate());
    const hosp = (this.hospitalEvents[key] || []).map(e => e.nombre);
    if (hosp.length && now.getHours() >= 5 && now.getHours() <= 23) {
      this.alertText = `🚨 EVENTO IMPORTANTE!!! EL DÍA DE HOY: ${hosp.join(' | ')}`;
      // intento de beep (puede requerir interacción previa)
      const a = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      a.play().catch(()=>{});
    } else {
      this.alertText = '';
    }
  }

  /* ---------- Modal de eventos ---------- */
  _openEvents(key) { this.selectedDate = key; this.showEvents = true; }
  _closeEvents() { this.showEvents = false; }
  _renderEventsModal() {
    if (!this.showEvents) return nothing;
    const list = this._getAllEvents(this.selectedDate);
    return html`
      <div class="modal" open @click=${(e)=>{ if(e.target===e.currentTarget) this._closeEvents(); }} >
        <div class="modal-content" role="dialog" aria-modal="true">
          <button class="close" aria-label="Cerrar" @click=${this._closeEvents}>&times;</button>
          <h3>Eventos - ${this.selectedDate}</h3>
          <div>
            ${list.length ? list.map(e=>{
              const icon = e.tipo==='hospital' ? '🏥' : (e.tipo==='nacional' ? '🇨🇴' : '🌎');
              return html`<div class="evento"><span class="ico">${icon}</span>
                <div>
                  ${e.tipo==='hospital' ? html`
                    <strong>Evento del Hospital:</strong> ${e.nombre}
                    <div class="detalle">
                      Convocatoria: ${e.convocatoria} • Convocados: ${e.convocados} •
                      Hora: ${e.hora || '-'} • Lugar: ${e.lugar} • Modalidad: ${e.modalidad}
                    </div>
                  ` : html`<strong>${e.tipo==='nacional'?'Evento Nacional':'Evento Internacional OPS'}:</strong> ${e.nombre}`}
                </div>
              </div>`;
            }) : html`<p>No hay eventos en esta fecha.</p>`}
          </div>
        </div>
      </div>
    `;
  }

  /* ---------- Login ---------- */
  _openLogin() { this.showLogin = true; }
  _closeLogin() { this.showLogin = false; }
  _submitLogin(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const user = String(fd.get('user')||'').trim();
    const pass = String(fd.get('pass')||'');
    if (user === 'admin' && pass === '1234') {
      this.isAdmin = true;
      this.showLogin = false;
      // enfoque accesible
      this.updateComplete.then(()=>this.renderRoot.querySelector('.fab-login')?.focus());
      alert('Bienvenido, administrador');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
  _renderLoginModal() {
    if (!this.showLogin) return nothing;
    return html`
      <div class="modal" open @click=${(e)=>{ if(e.target===e.currentTarget) this._closeLogin(); }}>
        <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="loginTitle">
          <button class="close" aria-label="Cerrar" @click=${this._closeLogin}>&times;</button>
          <h3 id="loginTitle">Acceso Administrador</h3>
          <form @submit=${this._submitLogin}>
            <label for="loginUser">Usuario</label>
            <input id="loginUser" name="user" type="text" placeholder="Usuario (ej. admin)" required />
            <label for="loginPass">Contraseña</label>
            <input id="loginPass" name="pass" type="password" placeholder="Contraseña" required />
            <button type="submit" class="btn">Ingresar</button>
          </form>
        </div>
      </div>
    `;
  }

  /* ---------- Formulario evento hospital ---------- */
  _openForm() { this.showForm = true; this._formConvOtros = false; }
  _closeForm() { this.showForm = false; }
  _onConvChange(e) { this._formConvOtros = e.target.value === 'Otros'; }
  _saveHospitalEvent(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const convocatoriaSel = fd.get('convocatoria');
    const convocatoria = (convocatoriaSel === 'Otros' && fd.get('convocatoriaOtro')) ? String(fd.get('convocatoriaOtro')).trim() : String(convocatoriaSel);
    const evento = {
      tipo: 'hospital',
      convocatoria,
      convocados: String(fd.get('convocados')),
      fecha: String(fd.get('fecha')),
      hora: String(fd.get('hora')),
      lugar: String(fd.get('lugar')),
      modalidad: String(fd.get('modalidad')),
      nombre: `Convocatoria ${convocatoria} - ${String(fd.get('modalidad'))}`,
    };
    if (!evento.fecha) { alert('Seleccione una fecha'); return; }
    const list = this.hospitalEvents[evento.fecha] ? [...this.hospitalEvents[evento.fecha]] : [];
    list.unshift(evento);
    this.hospitalEvents = { ...this.hospitalEvents, [evento.fecha]: list };
    this.showForm = false;
    this._updateAlertForToday();
    alert('Evento del hospital guardado correctamente.');
  }
  _renderFormModal() {
    if (!this.showForm) return nothing;
    return html`
      <div class="modal" open @click=${(e)=>{ if(e.target===e.currentTarget) this._closeForm(); }}>
        <div class="modal-content" role="dialog" aria-modal="true">
          <button class="close" aria-label="Cerrar" @click=${this._closeForm}>&times;</button>
          <h3>Agregar Evento del Hospital</h3>
          <form @submit=${this._saveHospitalEvent}>
            <label for="convocatoria">Convocatoria</label>
            <select id="convocatoria" name="convocatoria" @change=${this._onConvChange}>
              <option>HSJA</option>
              <option>MSPS</option>
              <option>Alcaldía</option>
              <option>Otros</option>
            </select>
            ${this._formConvOtros ? html`
              <input name="convocatoriaOtro" type="text" placeholder="Si eligió 'Otros', especifique..." />
            ` : nothing}

            <label for="convocados">Convocados</label>
            <select id="convocados" name="convocados">
              <option>Todos los Funcionarios</option>
              <option>Coordinadores</option>
              <option>Líderes</option>
              <option>Gestores</option>
            </select>

            <label for="fecha">Fecha del evento</label>
            <input id="fecha" name="fecha" type="date" required />

            <label for="hora">Hora</label>
            <input id="hora" name="hora" type="time" min="07:00" max="18:00" required />

            <label for="lugar">Lugar</label>
            <select id="lugar" name="lugar">
              <option>Hospital</option>
              <option>Meet</option>
              <option>Teams</option>
              <option>Otro</option>
            </select>

            <label for="modalidad">Modalidad</label>
            <select id="modalidad" name="modalidad">
              <option>Presencial</option>
              <option>Virtual</option>
              <option>Sincrónica</option>
              <option>Asincrónica</option>
            </select>

            <button type="submit" class="btn">Guardar Evento</button>
          </form>
        </div>
      </div>
    `;
  }

  /* ---------- util ---------- */
  _closeAll() { this.showEvents = this.showForm = this.showLogin = false; }
}

customElements.define("salud-calendar-2025", SaludCalendar2025);
