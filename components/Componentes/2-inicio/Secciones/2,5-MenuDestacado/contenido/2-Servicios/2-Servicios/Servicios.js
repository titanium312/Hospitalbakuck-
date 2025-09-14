// servicios-hospital-vertical-fit.js
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class ServiciosHospital extends LitElement {
  static properties = {
    acciones: { type: Array },
    _abiertos: { state: true },
    bare: { type: Boolean, reflect: true },
    sticky: { type: Boolean, reflect: true },
    maxWidth: { type: String },
  };

  constructor() {
    super();
    // Abierto por defecto el submenú de "Información Usuarios"
    this._abiertos = new Set(['usuarios']);
    this.bare = false;
    this.sticky = false;
    this.maxWidth = '';

    // === ORDEN NUEVO DE GRUPOS DE INTERÉS ===
    this.acciones = [
      {
        id: 'portal-ninos',
        icon: 'boy',
        titulo: 'Portal Niños y Niñas',
        detalle: 'Entrada rápida y amigable para niños y niñas.',
        variant: 'kids', // ← activa colores especiales (amarillo/rojo)
        href: '#ninos',
        submenuNombre: 'Accesos del Portal',
        submenus: [
          { label: 'Juegos y Actividades', href: '#ninos' },
          { label: 'Consejos de Cuidado', href: '#nino' },
        ],
      },
      {
        id: 'usuarios',
        icon: 'file',
        titulo: 'Información Usuarios',
        detalle: 'Consultas frecuentes, trámites y servicios para la comunidad usuaria.',
        submenuNombre: 'Información Para Usuarios',
        submenus: [
          { label: 'PQRSD', href: '#pqrsd' },
          { label: 'Trámites', href: '#tramites' },
          { label: 'Servicios', href: '#servicios' },
          { label: 'Directorio', href: '#directorio' },
          { label: 'Ubicación', href: '#ubicacion' },
          { label: 'Carta de Derechos y Deberes', href: '#carta-derechos-deberes' },
        ],
      },
      {
        id: 'funcionarios',
        icon: 'calendarCheck',
        titulo: 'Información Funcionarios',
        detalle: 'Recursos internos, bienestar y soporte de talento humano.',
        submenuNombre: 'Recursos para Funcionarios',
        submenus: [
          { label: 'Portal interno', href: '#inicio' },
        ],
      },
      {
        id: 'proveedores',
        icon: 'file',
        titulo: 'Información Proveedores',
        detalle: 'Contratación, facturación y requisitos de vinculación.',
        submenuNombre: 'Recursos para Proveedores',
        submenus: [
          { label: 'Convocatorias abiertas', href: '#inicio' },
        ],
      },
    ];
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
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
      --servicios-max-width: 100%;
      --servicios-sticky-top: 1rem;
      container-type: inline-size;
    }

    :host([bare]) section.wrapper { padding: 0; background: transparent; }

    .container {
      width: 100%;
      max-width: var(--servicios-max-width);
      margin: 0;
      position: relative;
      box-sizing: border-box;
    }

    :host([sticky]) .container {
      position: sticky;
      top: var(--servicios-sticky-top);
      align-self: start;
    }

    .head { text-align: start; margin-bottom: 1rem; }
    .title { font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; font-size: clamp(1.2rem, 2.2vw, 1.6rem); color: var(--text-900); }
    .title span { background: linear-gradient(90deg, var(--primary-700), var(--primary-600)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
    .subtitle { margin: .5rem 0 0; color: var(--text-600); max-width: 70ch; font-size: clamp(.9rem, 1.2vw, 1rem); }
    .bar { height: 3px; width: 5rem; border-radius: 999px; margin: .75rem 0 0; background: linear-gradient(90deg, rgba(56,189,248,.36), rgba(14,165,233,.8), rgba(56,189,248,.36)); }

    .acciones { margin-top: clamp(.8rem, 2vw, 1.2rem); display: flex; flex-direction: column; gap: clamp(0.5rem, 1.5vw, .8rem); width: 100%; }

    .card {
      position: relative;
      width: 100%;
      border-radius: var(--radius);
      background: var(--bg-card-elev);
      border: 1px solid var(--primary-200);
      box-shadow: var(--shadow-sm);
      padding: .9rem;
      transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease, background .2s ease;
      backdrop-filter: blur(6px);
      box-sizing: border-box;
    }
    .card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: var(--primary-300); }
    .card:focus-within { box-shadow: var(--shadow-lg); outline: none; }

    /* === ESTILO ESPECIAL PARA "Portal Niños y Niñas" === */
    .card.kids {
      background: #FFD93D;            /* amarillo brillante */
      border-color: #FF4C4C;          /* contorno rojo brillante */
      box-shadow: 0 10px 24px rgba(255, 76, 76, .12);
    }
    .card.kids .cardTitle { color: #7a2100; }
    .card.kids .cardDetalle { color: #5c3b00; }
    .card.kids .icon-wrap {
      background: #fff7cc;
      border-color: #FF4C4C;
    }
    .card.kids .toggle { border-color: #FF4C4C; color: #7a2100; }
    .card.kids .submenuLink { background: #fffbe6; }

    .cardTop { display: grid; grid-template-columns: auto 1fr auto; gap: .8rem; align-items: center; min-width: 0; }

    .icon-wrap {
      width: 3rem; height: 3rem; border-radius: 14px;
      background: linear-gradient(to bottom, #f0f9ff, #fff);
      border: 1px solid var(--primary-200);
      display: grid; place-items: center;
      box-shadow: inset 0 1px 2px rgba(0,0,0,.04);
      flex: 0 0 auto;
    }
    .icon { width: 1.5rem; height: 1.5rem; color: var(--primary-700); }

    .titleWrap { display: grid; gap: .1rem; min-width: 0; }
    .cardTitle { font-weight: 700; color: var(--text-900); font-size: 1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .cardDetalle { color: var(--text-600); font-size: .9rem; line-height: 1.35; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

    .ctaRow { display: flex; align-items: center; gap: .5rem; margin-top: .6rem; }

    a.primaryLink {
      text-decoration: none;
      background: linear-gradient(180deg, #e0f2fe, #dbeafe);
      border: 1px solid var(--primary-200);
      padding: .45rem .7rem;
      border-radius: 12px;
      color: var(--primary-700);
      font-weight: 600;
      transition: transform .15s ease, border-color .15s ease, background .15s ease;
      max-width: 100%;
    }
    a.primaryLink:hover { transform: translateY(-1px); border-color: var(--primary-300); }

    .toggle {
      margin-left: auto; display: inline-flex; align-items: center; gap: .45rem;
      background: transparent; border: 1px solid var(--primary-200);
      padding: .4rem .55rem; border-radius: 10px; color: var(--primary-700);
      font-weight: 600; cursor: pointer; transition: background .15s ease, border-color .15s ease, transform .15s ease;
      white-space: nowrap;
    }
    .toggle:hover { background: #f0f9ff; border-color: var(--primary-300); }
    .toggle:focus-visible { box-shadow: var(--ring); outline: none; }
    .chev { width: 1rem; height: 1rem; transform: rotate(0deg); transition: transform .2s ease; }
    .toggle[aria-expanded="true"] .chev { transform: rotate(180deg); }

    .panel { overflow: clip; transition: grid-template-rows .25s ease, opacity .25s ease; display: grid; grid-template-rows: 0fr; opacity: 0.0; margin-top: .45rem; }
    .panel[data-open="true"] { grid-template-rows: 1fr; opacity: 1; }
    .panelInner { min-height: 0; border-radius: 12px; border: 1px dashed var(--primary-200); background: linear-gradient(180deg, rgba(240,249,255,.6), rgba(255,255,255,.6)); padding: .5rem; display: grid; gap: .4rem; }

    .submenuLink { display: flex; align-items: center; justify-content: space-between; text-decoration: none; padding: .45rem .55rem; border-radius: 10px; background: #ffffff; border: 1px solid rgba(2,8,23,.06); color: var(--text-700); font-weight: 600; transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease, background .15s ease; box-shadow: 0 1px 1px rgba(0,0,0,.02); }
    .submenuLink:hover { transform: translateY(-1px); border-color: var(--primary-200); box-shadow: 0 6px 14px rgba(2, 8, 23, .06); }
    .submenuLink small { color: var(--primary-700); font-weight: 700; }

    .underline-anim { position: absolute; left: .9rem; right: .9rem; bottom: .6rem; height: 1px; transform: scaleX(0); transform-origin: center; background: linear-gradient(90deg, rgba(14,165,233,0), rgba(14,165,233,.6), rgba(14,165,233,0)); transition: transform .2s ease; pointer-events: none; }
    .card:hover .underline-anim { transform: scaleX(1); }

    @media (prefers-reduced-motion: reduce) {
      .card, .toggle, .panel, .submenuLink { transition: none !important; }
    }
  `;

  updated() {
    if (this.maxWidth) {
      this.style.setProperty('--servicios-max-width', this.maxWidth);
    }
  }

  render() {
    return html`
      <section class="wrapper" aria-labelledby="sec-title">
        <div class="container">
          <header class="head">
            <!-- Título corregido con mayúscula y acento -->
            <h2 id="sec-title" class="title">Grupos de Interés</h2>
            <div class="bar" role="presentation"></div>
          </header>

          <nav class="acciones" role="list">
            ${this.acciones.map(a => this._card(a))}
          </nav>
        </div>
      </section>
    `;
  }

  _card(a) {
    const abierto = this._abiertos.has(a.id);
    const key = this._slug(a.id);
    const panelId = `panel-${key}`;
    const btnId = `btn-${key}`;
    const hasHref = typeof a.href === 'string' && a.href.trim().length > 0;
    const classes = ['card', a.variant === 'kids' ? 'kids' : ''].filter(Boolean).join(' ');

    return html`
      <article class=${classes} role="listitem">
        <div class="cardTop">
          <div class="icon-wrap" aria-hidden="true">${this._icon(a.icon)}</div>
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
            ${a.submenuNombre ?? 'Submenú'}
            <svg class="chev" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
        </div>

        ${hasHref ? html`
          <div class="ctaRow">
            <a class="primaryLink" href=${a.href} aria-label=${`Ir a ${a.titulo}`}>Ir al servicio</a>
          </div>
        ` : ''}

        <div
          id=${panelId}
          class="panel"
          data-open=${abierto ? 'true' : 'false'}
          role="region"
          aria-labelledby=${btnId}
        >
          <div class="panelInner">
            ${a.submenus?.map(s => html`
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
    next.has(id) ? next.delete(id) : next.add(id);
    this._abiertos = next;
    const btn = this.renderRoot?.querySelector(`#btn-${this._slug(id)}`);
    btn?.focus();
  }

  // Normaliza ids con espacios/tildes a slug seguro
  _slug(str = '') {
    return String(str)
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
      .replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-_]/g, '')
      .toLowerCase();
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
      case 'boy':
      case 'nino':
      case 'child':
        return html`
        <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <!-- cabeza -->
          <circle cx="12" cy="7.5" r="3" stroke="currentColor" stroke-width="1.6"></circle>
          <!-- tronco y brazos -->
          <path d="M6 13.5h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
          <path d="M12 10.5v4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
          <!-- piernas -->
          <path d="M10 21v-3.5M14 21v-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
          <!-- torso -->
          <path d="M8.5 17.5v-2a3.5 3.5 0 0 1 7 0v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
        </svg>`;
      default: return html``;
    }
  }
}

customElements.define('servicios-hospital', ServiciosHospital);
