import { LitElement, html, css, nothing } from "https://cdn.jsdelivr.net/npm/lit@3/+esm";
import { EVENTS } from "./fechas.js"; // ← aquí traemos las fechas desde el módulo

class SaludCalendar2025 extends LitElement {
  static properties = {
    selectedMonth: { type: Number, state: true },
    showModal: { type: Boolean, state: true },
    modalDateKey: { type: String, state: true }
  };

  constructor() {
    super();
    this.selectedMonth = 8; // 0=Ene ... 8=Septiembre
    this.showModal = false;
    this.modalDateKey = "";
  }

  static styles = css`
    /* Paleta y tokens locales (encapsulados) */
    :host {
      --azul-900: #0b2b4c;
      --azul-700: #0f4f8a;
      --azul-500: #1666c5;
      --azul-400: #3b86e0;
      --celeste-200: #e8f2ff;
      --celeste-100: #f4f8ff;
      --oro-400: #ffd34d;
      --radio: 16px;
      --sombra: 0 10px 30px rgba(15,79,138,0.15);
      --border: 1px solid rgba(11,43,76,0.08);

      display: block;
      inline-size: 100%;
      block-size: 100%; /* ocupa el alto disponible del contenedor padre si lo tiene */
      font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      color: var(--azul-900);
      background: transparent;
    }

    .wrap {
      inline-size: 100%;
      block-size: 100%;
      display: grid;
      place-items: center; /* centro visual */
      padding: clamp(12px, 2vw, 24px);
      box-sizing: border-box;
    }

    .panel {
      inline-size: min(100%, 880px); /* responsivo, pero puede estirarse hasta 880px */
      background: linear-gradient(180deg, var(--celeste-100), #fff);
      border: var(--border);
      border-radius: var(--radio);
      box-shadow: var(--sombra);
      padding: clamp(16px, 2.5vw, 24px);
      display: grid;
      gap: 14px;
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    h1 {
      margin: 0;
      font-size: clamp(1.1rem, 1.6rem + 0.2vw, 1.8rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--azul-900);
      background: linear-gradient(90deg, var(--azul-900), var(--azul-500));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    select {
      padding: 10px 12px;
      border-radius: 12px;
      border: 2px solid var(--azul-400);
      color: var(--azul-900);
      background: #fff;
      font-weight: 600;
      outline: none;
      transition: box-shadow .2s ease, transform .05s ease;
    }
    select:focus-visible {
      box-shadow: 0 0 0 4px rgba(59,134,224,0.25);
    }
    select:active { transform: scale(0.99); }

    .calendar {
      inline-size: 100%;
      background: #fff;
      border-radius: calc(var(--radio) - 6px);
      border: var(--border);
      overflow: hidden;
    }

    .calendar-head {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      background: linear-gradient(180deg, var(--celeste-200), #fff);
      border-bottom: var(--border);
    }
    .calendar-head span {
      padding: 12px 8px;
      text-align: center;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--azul-700);
      text-transform: uppercase;
      letter-spacing: .04em;
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
      padding: 10px;
      background: #fff;
    }

    .day {
      aspect-ratio: 1 / 1; /* cuadrado limpio, responsivo */
      display: grid;
      place-items: center;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--azul-900);
      background: var(--celeste-100);
      border: 1px solid rgba(11,43,76,0.06);
      cursor: pointer;
      transition: transform .08s ease, box-shadow .15s ease, background .2s ease;
      user-select: none;
    }
    .day:hover { transform: translateY(-2px); box-shadow: var(--sombra); }
    .day:active { transform: translateY(0); }

    /* Estados por tipo de evento */
    .nacional {
      background: linear-gradient(180deg, var(--oro-400), #ffeaa0);
      color: #1a1600;
      border-color: rgba(26,22,0,0.15);
    }
    .internacional {
      background: linear-gradient(180deg, var(--azul-500), var(--azul-400));
      color: #fff;
      border-color: rgba(0,0,0,0.08);
    }
    .mixto {
      background:
        linear-gradient(135deg, var(--azul-500) 0 50%, var(--oro-400) 50% 100%);
      color: #001;
      border-color: rgba(0,0,0,0.12);
    }

    /* Modal */
    .modal {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: rgba(4,17,29,0.5);
      backdrop-filter: blur(4px);
      z-index: 9999;
    }
    .modal[open] { display: flex; }
    .modal-content {
      width: min(92vw, 520px);
      background: #fff;
      border-radius: 16px;
      box-shadow: var(--sombra);
      border: var(--border);
      padding: 18px 18px 12px;
      color: var(--azul-900);
    }
    .modal-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 6px;
    }
    .modal-title {
      font-size: 1.05rem;
      font-weight: 800;
      margin: 0;
      color: var(--azul-900);
    }
    .close {
      inline-size: 36px;
      block-size: 36px;
      display: grid;
      place-items: center;
      border-radius: 10px;
      border: 1px solid rgba(11,43,76,0.12);
      background: #fff;
      cursor: pointer;
      font-size: 18px;
      font-weight: 900;
      color: var(--azul-700);
      transition: background .15s ease, transform .05s ease;
    }
    .close:hover { background: var(--celeste-100); }
    .close:active { transform: scale(0.98); }

    .evento {
      display: grid;
      grid-template-columns: 18px 1fr;
      align-items: start;
      gap: 8px;
      padding: 10px 8px;
      border-radius: 12px;
      border: 1px dashed rgba(11,43,76,0.12);
      background: linear-gradient(180deg, #fff, var(--celeste-100));
      margin: 8px 0;
      font-size: 0.95rem;
    }
    .icono {
      inline-size: 14px; block-size: 14px; border-radius: 50%;
      border: 1px solid #555;
      margin-top: 2px;
    }
    .icono.nacional {
      background: linear-gradient(to bottom, #ffd700 33%, #0033A0 33% 66%, #CE1126 66%);
      border-color: rgba(0,0,0,0.35);
    }
    .icono.internacional { background: var(--azul-500); border-color: rgba(0,0,0,0.2); }

    /* Accesibilidad */
    .day:focus-visible, .close:focus-visible, select:focus-visible {
      outline: none;
      box-shadow: 0 0 0 4px rgba(59,134,224,0.35);
    }

    @media (max-width: 560px) {
      .days { gap: 4px; padding: 8px; }
      .day { border-radius: 10px; font-size: 0.9rem; }
    }
  `;

  render() {
    return html`
      <div class="wrap">
        <div class="panel">
          <div class="title">
            <h1>Calendario de Eventos en Salud 2025</h1>
            <select @change=${this._onMonthChange} aria-label="Seleccionar mes">
              <option value="8" ?selected=${this.selectedMonth===8}>Septiembre</option>
              <option value="9" ?selected=${this.selectedMonth===9}>Octubre</option>
              <option value="10" ?selected=${this.selectedMonth===10}>Noviembre</option>
              <option value="11" ?selected=${this.selectedMonth===11}>Diciembre</option>
            </select>
          </div>

          <div class="calendar" role="grid" aria-label="Calendario mensual">
            ${this._renderHeader()}
            ${this._renderDays()}
          </div>
        </div>
      </div>

      ${this.showModal ? this._renderModal() : nothing}
    `;
  }

  _renderHeader() {
    return html`<div class="calendar-head" role="row">
      <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
    </div>`;
  }

  _renderDays() {
    const year = 2025, month = this.selectedMonth;
    const firstDay = new Date(year, month, 1).getDay(); // 0=Dom
    const offset = (firstDay + 6) % 7; // mover para iniciar en lunes
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const slots = [];
    for (let i=0; i<offset; i++) slots.push(html`<div></div>`);

    for (let day=1; day<=daysInMonth; day++) {
      const dateKey = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const cls = this._dayClass(dateKey);
      slots.push(html`
        <button
          class="day ${cls}"
          @click=${() => this._openDay(dateKey)}
          aria-label=${`Ver eventos del ${day}/${month+1}/${year}`}
        >${day}</button>
      `);
    }
    return html`<div class="days">${slots}</div>`;
  }

  _dayClass(dateKey) {
    const evs = EVENTS[dateKey];
    if (!evs) return "";
    const tipos = evs.map(e => e.tipo);
    if (tipos.includes("nacional") && tipos.includes("internacional")) return "mixto";
    if (tipos.includes("nacional")) return "nacional";
    if (tipos.includes("internacional")) return "internacional";
    return "";
  }

  _onMonthChange(e) { this.selectedMonth = Number(e.target.value); }
  _openDay(dateKey) { this.modalDateKey = dateKey; this.showModal = true; }
  _closeModal() { this.showModal = false; }

  _renderModal() {
    const evs = EVENTS[this.modalDateKey] || [];
    const fecha = this.modalDateKey || "";
    return html`
      <div class="modal" open @click=${(e)=>{ if(e.target.classList.contains('modal')) this._closeModal(); }}>
        <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="titulo-modal">
          <div class="modal-head">
            <h3 id="titulo-modal" class="modal-title">Eventos — ${fecha}</h3>
            <button class="close" @click=${this._closeModal} aria-label="Cerrar">&times;</button>
          </div>
          <div>
            ${evs.length
              ? evs.map(e => html`
                  <div class="evento">
                    <span class="icono ${e.tipo}"></span>
                    <span><strong>${e.tipo==="nacional"?"Evento Nacional":"Evento Internacional OPS"}:</strong> ${e.nombre}</span>
                  </div>
                `)
              : html`<p style="margin:8px 0 12px;">No hay eventos en esta fecha.</p>`}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("salud-calendar-2025", SaludCalendar2025);
