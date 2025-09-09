// components/menu-superior.js (v2 encapsulado)
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

/**
 * <menu-superior>
 * - Accesible (roles ARIA, navegación con teclado, aria-current, aria-expanded)
 * - Shadow DOM (estilos encapsulados; no depende de Tachyons/Bulma)
 * - Dropdowns con click/teclado y cierre por Escape/click fuera
 * - Menú móvil con botón hamburguesa
 * - API: .activeView (string), dispara evento "select" con la key
 */
export class MenuSuperior extends LitElement {
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true }

  static properties = {
    activeDropdown: { type: String },
    activeView: { type: String },
    menuItems: { type: Array },
    burgerOpen: { type: Boolean, reflect: true },
    _focusIndex: { state: true },
  }

  constructor() {
    super()
    this.activeDropdown = null
    this.activeView = ''
    this.burgerOpen = false
    this._focusIndex = 0

    /**
     * NOTA IMPORTANTE DE RUTAS: evita espacios y acentos en keys/paths
     */
    this.menuItems = [
      { name: 'Inicio', key: 'inicio', href: '#inicio' },
      {
        name: 'Quienes somos',
        key: 'quienes-somos',
        subItems: [
          { name: 'Información Corporativa', key: 'info-corporativa', href: '#info-corporativa' },
          { name: 'Reseña Histórica', key: 'resena-historica', href: '#resena-historica' },
          { name: 'Administración', key: 'administracion', href: '#administracion' },
          { name: 'Mapa de procesos', key: 'mapa-de-procesos', href: '#mapa-de-procesos' },
          { name: 'Distinciones', key: 'distinciones', href: '#distinciones' },
          { name: 'Funcionarios', key: 'personal', href: '#personal' },
          { name: 'Directorio', key: 'directorio', href: '#directorio' },
          { name: 'Normatividad', key: 'normatividad', href: '#normatividad' },
          { name: 'Comunicaciones', key: 'comunicaciones', href: '#comunicaciones' }
        ]
      },
      {
        name: 'Atención al ciudadano',
        key: 'atencion-al-ciudadano',
        subItems: [
          { name: 'Accesibilidad', key: 'accesibilidad', href: '#accesibilidad' },
          { name: 'Orientación al usuario', key: 'orientacion-usuario', href: '#orientacion-usuario' },
          { name: 'Carta al trato digno', key: 'carta-trato-digno', href: '#carta-trato-digno' },
          { name: 'Pida una cita', key: 'pida-cita', href: '#pida-cita' },
          { name: 'Tramites', key: 'tramites', href: '#Tramites' },
          { name: 'Línea de transparencia', key: 'linea-transparencia', href: '#linea-transparencia' },
          { name: 'Preguntas Frecuentes', key: 'preguntas-frecuentes', href: '#preguntas-frecuentes' },
          { name: 'Cuidado del paciente', key: 'cuidado-paciente', href: '#cuidado-paciente' },
          { name: 'Rendición de Cuentas', key: 'rendicion-cuentas', href: '#rendicion-cuentas' }
        ]
      },
      {
        name: 'Gestión institucional',
        key: 'gestion-institucional',
        subItems: [
          { name: 'Tratamiento de Datos', key: 'tratamiento-datos', href: '#tratamiento-datos' },
          { name: 'Financiera y Contable', key: 'financiera-contable', href: '#financiera-contable' },
          { name: 'Metas e Indicadores', key: 'metas-indicadores', href: '#metas-indicadores' },
          { name: 'Protección y Uso de Datos', key: 'proteccion-datos', href: '#proteccion-datos' },
          { name: 'Planeacion Gestión y control', key: 'gestion-control', href: '#gestion-control' },
          { name: 'Mipg', key: 'mipg', href: '#Mipg' },
          { name: 'Derechos de Autor', key: 'derechos-autor', href: '#derechos-autor' },
          { name: 'Política de Cookies', key: 'politica-cookies', href: '#politica-cookies' },
          { name: 'Procesos disciplinarios', key: 'procesos-disciplinarios', href: '#procesos-disciplinarios' },
          { name: 'Referenciación', key: 'referenciacion', href: '#referenciacion' },
          { name: 'Banco de proyectos', key: 'banco-proyectos', href: '#banco-proyectos' }
        ]
      },
      { name: 'Gestion del conocimiento', key: 'gestion', href: '#servicios' },
      { name: 'Servicios', key: 'servicios', href: '#servicios' },
      { name: 'Participa', key: 'participa', href: '#participa' },
      { name: 'Transparencia', key: 'transparencia', href: '#transparencia' },
      { name: 'Biblioteca', key: 'biblioteca', href: 'https://hospitalsanjorgeayapel.info/LectorPdf/p.php' }
    ]
  }

  // ======= ESTILOS ENCAPSULADOS =======
  static styles = [
    css`
      :host { --c-text:#1f2937; --c-muted:#6b7280; --c-brand:#0b3a82; --c-brand-2:#1170ff; --c-bg:#ffffff; --c-surface:#fff; --c-emergency:#e53935; --radius:14px; font-synthesis-weight:none; }
      * { box-sizing: border-box; }
      a { color: inherit; }
      .visually-hidden { position:absolute !important; height:1px; width:1px; overflow:hidden; clip:rect(1px,1px,1px,1px); white-space:nowrap; border:0; padding:0; }

      header { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,.92); -webkit-backdrop-filter: saturate(1.05) blur(6px); backdrop-filter: saturate(1.05) blur(6px); border-bottom: 1px solid rgba(0,0,0,.06); }
      nav { max-width: 1120px; margin: 0 auto; padding: .5rem 1rem; display:flex; align-items:center; justify-content:space-between; gap:.75rem; }

      /* Marca */
      .brand { display:flex; align-items:center; text-decoration:none; color:#0b3a82; gap:.75rem; min-width:0; }
      .brand__logo-wrap { display:inline-grid; place-items:center; width:40px; height:40px; border-radius:50%; background:#991b1b; box-shadow:0 10px 25px rgba(153,27,27,.15); flex:0 0 auto; }
      img.brand__img { display:block; height:44px; width:auto; object-fit:contain; object-position:left center; filter: none; }
      .brand__name { font-weight:700; letter-spacing:.2px; }

      /* Botón hamburguesa */
      .burger { appearance:none; background:transparent; border:0; font-size:1.6rem; line-height:1; padding:.25rem .5rem; border-radius:10px; cursor:pointer; color:var(--c-text); }
      .burger:focus-visible { outline: 3px solid rgba(17,112,255,.45); outline-offset: 2px; }

      /* Menú principal */
      .menu-wrap { display:flex; align-items:center; gap: .75rem; }
      ul.menu { list-style:none; margin:0; padding:0; display:flex; align-items:center; gap:.25rem; }
      .item-link { text-decoration:none; color:var(--c-text); padding:.5rem .85rem; border-radius:10px; font-weight:500; line-height:1.2; position:relative; display:inline-flex; align-items:center; gap:.25rem; }
      .item-link:hover { color:var(--c-brand); background: #f2f7ff; }
      .item-link[aria-current="page"], .item-link.is-active { background:#edf7ff; color:#0b3a82; font-weight:600; }
      .item-link:focus-visible { outline: 3px solid rgba(17,112,255,.45); outline-offset: 2px; }

      /* Dropdown */
      .dd { position:absolute; left:0; top:calc(100% + .5rem); min-width: 16rem; background: var(--c-surface); border-radius: var(--radius); box-shadow: 0 24px 48px rgba(2,6,23,.12), 0 8px 16px rgba(2,6,23,.08); z-index: 200; padding: .5rem; border:1px solid rgba(2,6,23,.06); transform-origin: 12% top; }
      .dd::before { content:""; position:absolute; top:-.4rem; left:1.5rem; width:.8rem; height:.8rem; background: var(--c-surface); transform: rotate(45deg); box-shadow: -1px -1px 0 0 rgba(0,0,0,.05); }
      .dd a { text-decoration:none; color:var(--c-text); padding:.55rem .75rem; border-radius:10px; display:block; }
      .dd a:hover { background: #f6f9fc; color: var(--c-brand); }

      /* Animaciones (respeta reduced-motion) */
      @media (prefers-reduced-motion:no-preference) {
        .fade-enter { animation: fadeIn .2s ease-out forwards; }
        .scale-enter { animation: scaleIn .18s ease-out both; }
        .slide-down-enter { animation: slideDown .22s cubic-bezier(.2,.8,.2,1) both; }
      }
      @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      @keyframes scaleIn { from { transform: scale(.98); opacity:0 } to { transform: scale(1); opacity:1 } }
      @keyframes slideDown { from { transform: translateY(-6px); opacity: 0 } to { transform: translateY(0); opacity:1 } }

      /* Emergencias */
      .btn-emer { text-decoration:none; background: var(--c-emergency); color:#fff; border-radius:9999px; padding:.55rem 1rem; font-weight:700; box-shadow: 0 18px 30px rgba(229,57,53,.18); transition: transform .12s ease; }
      .btn-emer:hover { transform: translateY(-1px); background:#c62828; }
      .btn-emer:focus-visible { outline: 3px solid rgba(229,57,53,.45); outline-offset:2px; }

      /* Responsive */
      @media (max-width: 60rem) {
        nav { padding: .5rem .75rem; }
        .menu-wrap { position: fixed; inset: 64px 0 auto 0; display: block; background: rgba(255,255,255,.98); border-bottom:1px solid rgba(0,0,0,.06); transform: translateY(-8px); opacity:0; pointer-events:none; transition: opacity .15s ease, transform .15s ease; }
        :host([burgeropen]) .menu-wrap { transform: translateY(0); opacity:1; pointer-events:auto; }
        ul.menu { display:block; padding:.5rem; }
        ul.menu > li { margin:.25rem 0; }
        .dd { position:static; top:auto; left:auto; min-width:unset; box-shadow:none; border:0; padding:.25rem; }
        .dd::before { display:none; }
      }
    `,
  ]

  isExternal(href) { return !!href && /^(https?:)?\/\//i.test(href) }
  toggleBurger() { this.burgerOpen = !this.burgerOpen }
  toggleDropdown(key) { this.activeDropdown = this.activeDropdown === key ? null : key }

  _onKeyDown = (e) => {
    // Escape cierra cosas
    if (e.key === 'Escape') {
      this.activeDropdown = null
      this.burgerOpen = false
      return
    }

    // Roving tabindex en el nivel superior
    const topItems = this.renderRoot?.querySelectorAll('[data-top="1"]') || []
    if (!topItems.length) return

    const max = topItems.length - 1
    if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) {
      e.preventDefault()
      if (e.key === 'ArrowRight') this._focusIndex = (this._focusIndex + 1) % topItems.length
      if (e.key === 'ArrowLeft') this._focusIndex = (this._focusIndex - 1 + topItems.length) % topItems.length
      if (e.key === 'Home') this._focusIndex = 0
      if (e.key === 'End') this._focusIndex = max
      topItems[this._focusIndex]?.focus()
    }

    // Abrir dropdown con ↓ o Enter/Espacio
    if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
      const el = topItems[this._focusIndex]
      const key = el?.getAttribute('data-key')
      const hasSub = el?.getAttribute('aria-haspopup') === 'true'
      if (hasSub) {
        e.preventDefault()
        this.activeDropdown = key
        // Enfocar primer item del dropdown
        const first = this.renderRoot?.querySelector(`[data-dd="${key}"] a`)
        first?.focus()
      }
    }
  }

  _onDocClick = (e) => {
    const path = typeof e.composedPath === 'function' ? e.composedPath() : []
    const clickedInside = path.length ? path.includes(this) : this.contains?.(e.target)
    if (!clickedInside) this.activeDropdown = null
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('keydown', this._onKeyDown)
    document.addEventListener('click', this._onDocClick)
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._onKeyDown)
    document.removeEventListener('click', this._onDocClick)
    super.disconnectedCallback()
  }

  _navigateTo(key, evt) {
    if (evt) evt.preventDefault()
    this.dispatchEvent(new CustomEvent('select', { detail: key, bubbles: true, composed: true }))
    this.activeDropdown = null
    this.burgerOpen = false
  }

  setActiveView(key) { this.activeView = key }

  render() {
    const isActive = (key) => this.activeView === key

    return html`
      <header role="banner">
        <nav role="navigation" aria-label="Principal">
          <!-- Marca -->
          <a href="#inicio" class="brand" title="Hospital San Jorge" @click=${(e) => this._navigateTo('inicio', e)}>
                <img
  class="brand__img"
  src="https://hospitalsanjorgeayapel.info/LectorPdf/Img/logo.png"
  alt="Logo Hospital San Jorge Ayapel"
  width="150"
  height="auto"
  style="margin-left: -300px;"
/>

          </a>

          <!-- Botón hamburguesa -->
          <button class="burger" aria-label="Abrir menú" aria-controls="principal-menu" aria-expanded=${this.burgerOpen} @click=${this.toggleBurger}>
            ☰
          </button>

          <!-- Menú -->
          <div id="principal-menu" class="menu-wrap ${this.burgerOpen ? 'slide-down-enter' : ''}">
            <ul class="menu" role="menubar">
              ${this.menuItems.map((item, idx) => {
                const baseClass = 'item-link'

                if (item.subItems?.length) {
                  const open = this.activeDropdown === item.key
                  return html`
                    <li class="has-dd" role="none" style="position:relative;">
                      <a href="#" class="${baseClass} ${isActive(item.key) ? 'is-active' : ''}"
                         data-top="1" data-key="${item.key}" role="menuitem" aria-haspopup="true"
                         aria-expanded=${open} aria-controls="dd-${item.key}"
                         tabindex=${this._focusIndex === idx ? '0' : '-1'}
                         @click=${(e) => { e.preventDefault(); this.toggleDropdown(item.key) }}>
                        <span>${item.name}</span>
                        <span aria-hidden="true">▾</span>
                      </a>
                      ${open ? html`
                        <div class="dd scale-enter" id="dd-${item.key}" role="menu" data-dd="${item.key}">
                          ${item.subItems.map(sub => html`
                            <a href="${sub.href}" role="menuitem"
                               @click=${(e) => this._navigateTo(sub.key ?? item.key, e)}
                               aria-current=${isActive(sub.key) ? 'page' : 'false'}>
                              ${sub.name}
                            </a>
                          `)}
                        </div>
                      ` : ''}
                    </li>`
                }

                if (item.href) {
                  if (this.isExternal(item.href)) {
                    return html`<li role="none">
                      <a href="${item.href}" target="_blank" rel="noopener noreferrer" class="${baseClass} ${isActive(item.key) ? 'is-active' : ''}"
                         role="menuitem" data-top="1" data-key="${item.key}" tabindex=${this._focusIndex === idx ? '0' : '-1'}
                         aria-current=${isActive(item.key) ? 'page' : 'false'}>
                        ${item.name}
                      </a>
                    </li>`
                  }
                  return html`<li role="none">
                    <a href="${item.href}" class="${baseClass} ${isActive(item.key) ? 'is-active' : ''}"
                       role="menuitem" data-top="1" data-key="${item.key}" tabindex=${this._focusIndex === idx ? '0' : '-1'}
                       aria-current=${isActive(item.key) ? 'page' : 'false'}
                       @click=${(e) => this._navigateTo(item.key, e)}>
                      ${item.name}
                    </a>
                  </li>`
                }

                return html`<li role="none">
                  <a href="#${item.key}" class="${baseClass} ${isActive(item.key) ? 'is-active' : ''}"
                     role="menuitem" data-top="1" data-key="${item.key}" tabindex=${this._focusIndex === idx ? '0' : '-1'}
                     aria-current=${isActive(item.key) ? 'page' : 'false'}
                     @click=${(e) => this._navigateTo(item.key, e)}>
                    ${item.name}
                  </a>
                </li>`
              })}
            </ul>

            <a href="tel:123" class="btn-emer">📞 Emergencias 24/7</a>
          </div>
        </nav>
      </header>
    `
  }
}

customElements.define('menu-superior', MenuSuperior)
