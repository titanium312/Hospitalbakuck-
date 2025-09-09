// servicios-hospital.js
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class ServiciosHospital extends LitElement {
  static properties = {
    acciones: { type: Array },
    _abiertos: { state: true }, // Set de tarjetas abiertas (para submenús)
  };

  constructor() {
    super();
    this._abiertos = new Set();
    // Puedes ajustar icon, href y submenus por acción
    this.acciones = [
      {
        id: 'usuarios',
        icon: 'stethoscope',
        titulo: 'Información para usuarios',
        detalle: 'Citas, historia clínica, resultados y orientación al paciente.',
        href: '#/usuarios',
        submenus: [
          { label: 'Agendar cita', href: '#/usuarios/citas' },
          { label: 'Resultados de laboratorio', href: '#/usuarios/lab' },
          { label: 'Pago en línea', href: '#/usuarios/pagos' },
          { label: 'Peticiones, Quejas y Reclamos', href: '#/usuarios/pqr' },
        ],
      },
      {
        id: 'funcionarios',
        icon: 'calendarCheck',
        titulo: 'Información para funcionarios',
        detalle: 'Recursos internos, bienestar y soporte de talento humano.',
        href: '#/funcionarios',
        submenus: [
          { label: 'Portal interno', href: '#/funcionarios/portal' },
          { label: 'Nómina y certificados', href: '#/funcionarios/nomina' },
          { label: 'Capacitaciones', href: '#/funcionarios/capacitaciones' },
        ],
      },
      {
        id: 'proveedores',
        icon: 'file',
        titulo: 'Información para proveedores',
        detalle: 'Contratación, facturación y requisitos de vinculación.',
        href: '#/proveedores',
        submenus: [
          { label: 'Convocatorias abiertas', href: '#/proveedores/convocatorias' },
          { label: 'Cargar factura', href: '#/proveedores/facturacion' },
          { label: 'Términos y requisitos', href: '#/proveedores/terminos' },
        ],
      },
      // Agrega más tarjetas si lo necesitas
    ];
  }

  static styles = css`
    :host {
      display: block;
      --bg: #f8fafc;
      --bg-card: #ffffff;
      --bg-card-elev: rgba(255, 255, 255, .85);
      --primary-600: #0284c7;
      --primary-700: #0369a1;
      --primary-200: #bae6fd;
      --primary-300: #7dd3fc;
      --text-900: #0f172a;
      --text-700: #334155;
      --text-600: #475569;
      --ring: 0 0 0 3px rgba(2,132,199,.28);
      --radius: 18px;
      --shadow-sm: 0 1px 2px rgba(0,0,0,.06);
      --shadow-md: 0 8px 24px rgba(2, 8, 23, .08);
      --shadow-lg: 0 14px 34px rgba(2, 8, 23, .12);
      contain: content;
    }

    section.wrapper {
      width: 100%;
      padding: clamp(2rem, 5vw, 4rem) 0;
      background:
        radial-gradient(60rem 60rem at 110% -10%, rgba(125,211,252,.18), transparent 60%),
        radial-gradient(50rem 50rem at -10% 110%, rgba(186,230,253,.18), transparent 60%),
        var(--bg);
    }

    .container {
      max-width: min(1100px, 92vw);
      margin: 0 auto;
      position: relative;
    }

    /* Encabezado centrado */
    .head {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    .title {
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.1;
      font-size: clamp(1.6rem, 2.6vw, 2.4rem);
      color: var(--text-900);
    }
    .title span {
      background: linear-gradient(90deg, var(--primary-700), var(--primary-600));
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      margin: .75rem auto 0;
      color: var(--text-600);
      max-width: 60ch;
      font-size: clamp(.95rem, 1.3vw, 1.05rem);
    }
    .bar {
      height: 4px; width: 7rem; border-radius: 999px;
      margin: 1rem auto 0;
      background: linear-gradient(90deg, rgba(56,189,248,.36), rgba(14,165,233,.8), rgba(56,189,248,.36));
    }

    /* Grid de tarjetas centrado y fluido */
    .acciones {
      margin-top: clamp(1.2rem, 3vw, 1.8rem);
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
      gap: clamp(0.9rem, 2.2vw, 1.2rem);
      place-items: stretch;
      place-content: center;
    }

    /* Tarjeta */
    .card {
      position: relative;
      border-radius: var(--radius);
      background: var(--bg-card-elev);
      border: 1px solid var(--primary-200);
      box-shadow: var(--shadow-sm);
      padding: 1rem;
      transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease, background .2s ease;
      backdrop-filter: blur(6px);
    }
    .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--primary-300); }
    .card:focus-within { box-shadow: var(--shadow-lg); outline: none; }

    .cardTop {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: .9rem;
      align-items: center;
    }

    .icon-wrap {
      width: 3.25rem; height: 3.25rem;
      border-radius: 14px;
      background: linear-gradient(to bottom, #f0f9ff, #fff);
      border: 1px solid var(--primary-200);
      display: grid; place-items: center;
      box-shadow: inset 0 1px 2px rgba(0,0,0,.04);
    }

    .icon { width: 1.65rem; height: 1.65rem; color: var(--primary-700); }

    .titleWrap { display: grid; gap: .15rem; }
    .cardTitle {
      font-weight: 700; color: var(--text-900);
      font-size: 1.02rem;
    }
    .cardDetalle { color: var(--text-600); font-size: .92rem; line-height: 1.35; }

    .ctaRow {
      display: flex; align-items: center; gap: .5rem;
      margin-top: .85rem;
    }

    a.primaryLink {
      text-decoration: none;
      background: linear-gradient(180deg, #e0f2fe, #dbeafe);
      border: 1px solid var(--primary-200);
      padding: .5rem .75rem;
      border-radius: 12px;
      color: var(--primary-700);
      font-weight: 600;
      transition: transform .15s ease, border-color .15s ease, background .15s ease;
    }
    a.primaryLink:hover { transform: translateY(-1px); border-color: var(--primary-300); }

    /* Botón de submenú (acordeón) */
    .toggle {
      margin-left: auto;
      display: inline-flex; align-items: center; gap: .45rem;
      background: transparent;
      border: 1px solid var(--primary-200);
      padding: .45rem .6rem;
      border-radius: 10px;
      color: var(--primary-700);
      font-weight: 600;
      cursor: pointer;
      transition: background .15s ease, border-color .15s ease, transform .15s ease;
    }
    .toggle:hover { background: #f0f9ff; border-color: var(--primary-300); }
    .toggle:focus-visible { box-shadow: var(--ring); outline: none; }
    .chev {
      width: 1rem; height: 1rem; display: inline-block;
      transform: rotate(0deg);
      transition: transform .2s ease;
    }
    .toggle[aria-expanded="true"] .chev { transform: rotate(180deg); }

    /* Panel acordeón */
    .panel {
      overflow: clip;
      transition: grid-template-rows .25s ease, opacity .25s ease;
      display: grid;
      grid-template-rows: 0fr;
      opacity: 0.0;
      margin-top: .5rem;
    }
    .panel[data-open="true"] {
      grid-template-rows: 1fr;
      opacity: 1;
    }
    .panelInner {
      min-height: 0;
      border-radius: 12px;
      border: 1px dashed var(--primary-200);
      background: linear-gradient(180deg, rgba(240,249,255,.6), rgba(255,255,255,.6));
      padding: .55rem;
      display: grid;
      gap: .45rem;
    }

    .submenuLink {
      display: flex; align-items: center; justify-content: space-between;
      text-decoration: none;
      padding: .5rem .6rem;
      border-radius: 10px;
      background: #ffffff;
      border: 1px solid rgba(2,8,23,.06);
      color: var(--text-700);
      font-weight: 600;
      transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease, background .15s ease;
      box-shadow: 0 1px 1px rgba(0,0,0,.02);
    }
    .submenuLink:hover {
      transform: translateY(-1px);
      border-color: var(--primary-200);
      box-shadow: 0 6px 14px rgba(2, 8, 23, .06);
    }
    .submenuLink small { color: var(--primary-700); font-weight: 700; }

    /* Línea decorativa al pasar */
    .underline-anim {
      position: absolute; left: 1rem; right: 1rem; bottom: .7rem;
      height: 1px; transform: scaleX(0); transform-origin: center;
      background: linear-gradient(90deg, rgba(14,165,233,0), rgba(14,165,233,.6), rgba(14,165,233,0));
      transition: transform .2s ease;
      pointer-events: none;
    }
    .card:hover .underline-anim { transform: scaleX(1); }

    /* Accesibilidad / motion */
    @media (prefers-reduced-motion: reduce) {
      .card, .toggle, .panel, .submenuLink { transition: none !important; }
    }
  `;

  render() {
    return html`
      <section class="wrapper" aria-labelledby="sec-title">
        <div class="container">
          <header class="head">
            <h2 id="sec-title" class="title">
              Servicios <span>Hospitalarios</span>
            </h2>
            <p class="subtitle">Accede de forma rápida y segura a los principales servicios de atención al paciente.</p>
            <div class="bar" role="presentation"></div>
          </header>

          <div class="acciones" role="list">
            ${this.acciones.map(a => this._card(a))}
          </div>
        </div>
      </section>
    `;
  }

  _card(a) {
    const abierto = this._abiertos.has(a.id);
    const panelId = `panel-${a.id}`;
    const btnId = `btn-${a.id}`;

    return html`
      <article class="card" role="listitem">
        <div class="cardTop">
          <div class="icon-wrap" aria-hidden="true">
            ${this._icon(a.icon)}
          </div>

          <div class="titleWrap">
            <div class="cardTitle">${a.titulo}</div>
            <div class="cardDetalle">${a.detalle}</div>
          </div>

          <button
            id=${btnId}
            class="toggle"
            @click=${() => this._toggle(a.id)}
            aria-expanded=${abierto}
            aria-controls=${panelId}
          >
            Submenú
            <svg class="chev" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
        </div>

        <div class="ctaRow">
          <a class="primaryLink" href=${a.href} aria-label=${`Ir a ${a.titulo}`}>Ir al servicio</a>
        </div>

        <!-- Panel de submenús -->
        <div
          id=${panelId}
          class="panel"
          data-open=${abierto ? 'true' : 'false'}
          role="region"
          aria-labelledby=${btnId}
        >
          <div class="panelInner">
            ${a.submenus?.map((s, i) => html`
              <a class="submenuLink" href=${s.href} aria-label=${`${s.label} de ${a.titulo}`}>
                <span>${s.label}</span>
                <small>›</small>
              </a>
            `) ?? html``}
          </div>
        </div>

        <span class="underline-anim"></span>
      </article>
    `;
  }

  _toggle(id) {
    const next = new Set(this._abiertos);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    this._abiertos = next;
    // Enfocar el botón que controla el panel para mejor UX con teclado
    const btn = this.renderRoot?.querySelector(`#btn-${id}`);
    btn?.focus();
  }

  /* ==== ICONOS SVG ==== */
  _icon(name) {
    switch (name) {
      case 'calendar': return html`
        <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" stroke-width="1.6"></rect>
          <path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
          <circle cx="12" cy="14" r="2" fill="currentColor"></circle>
        </svg>`;
      case 'calendarCheck': return html`
        <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" stroke-width="1.6"></rect>
          <path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
          <path d="M9.5 14.5l1.8 1.8 3.7-3.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>`;
      case 'lab': return html`
        <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 2v6L4.8 16c-.9 1.9.4 4 2.5 4h9.4c2.1 0 3.4-2.1 2.5-4L15 8V2"
                stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
          <path d="M9 8h6M7 16h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
        </svg>`;
      case 'stethoscope': return html`
        <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 3v6a4 4 0 0 0 8 0V3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
          <path d="M10 19a5 5 0 0 0 10 0v-2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
          <circle cx="20" cy="15" r="2.5" stroke="currentColor" stroke-width="1.6"></circle>
        </svg>`;
      case 'file': return html`
        <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 3h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                stroke="currentColor" stroke-width="1.6"></path>
          <path d="M13 3v6h6" stroke="currentColor" stroke-width="1.6"></path>
        </svg>`;
      default: return html``;
    }
  }
}

customElements.define('servicios-hospital', ServiciosHospital);
