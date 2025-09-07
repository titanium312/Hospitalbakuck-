// components/menu-superior.js
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

/**
 * <menu-superior>
 * - Accesible (roles ARIA, navegación con teclado, aria-current, aria-expanded)
 * - Light DOM (Tachyons/Bulma friendly)
 * - Dropdowns con click/teclado y cierre por Escape/click fuera
 * - Menú móvil con botón hamburguesa
 * - API: .activeView (string), dispara evento "select" con la key
 */
export class MenuSuperior extends LitElement {
  createRenderRoot() { return this }

  static properties = {
    activeDropdown: { type: String },
    activeView: { type: String },
    menuItems: { type: Array },
    burgerOpen: { type: Boolean },
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
          { name: 'Personal', key: 'personal', href: '#personal' },
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
          { name: 'Historia clínica', key: 'historia-clinica', href: '#historia-clinica' },
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
          { name: 'Gestión y control', key: 'gestion-control', href: '#gestion-control' },
          { name: 'Derechos de Autor', key: 'derechos-autor', href: '#derechos-autor' },
          { name: 'Política de Cookies', key: 'politica-cookies', href: '#politica-cookies' },
          { name: 'Procesos disciplinarios', key: 'procesos-disciplinarios', href: '#procesos-disciplinarios' },
          { name: 'Gestión Integral', key: 'gestion-integral', href: '#gestion-integral' },
          { name: 'Control Interno', key: 'control-interno', href: '#control-interno' },
          { name: 'Referenciación', key: 'referenciacion', href: '#referenciacion' },
          { name: 'Banco de proyectos', key: 'banco-proyectos', href: '#banco-proyectos' }
        ]
      },
      { name: 'Servicios', key: 'servicios', href: '#servicios' },
      { name: 'Participa', key: 'participa', href: '#participa' },
      { name: 'Transparencia', key: 'transparencia', href: '#transparencia' },
      { name: 'Biblioteca', key: 'biblioteca', href: 'https://hospitalsanjorgeayapel.info/LectorPdf/p.php' }
    ]
  }

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
      <style>
        .sticky-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,.92); backdrop-filter: saturate(1.05) blur(6px); }
        .dd { position: absolute; left: 0; top: 100%; min-width: 16rem; background: #fff; border-radius: .5rem; box-shadow: 0 1rem 2rem rgba(0,0,0,.08); z-index: 200; }
        .dd:before { content: ""; position: absolute; top: -.4rem; left: 1.5rem; width: .8rem; height: .8rem; background: #fff; transform: rotate(45deg); box-shadow: -1px -1px 0 0 rgba(0,0,0,.05); }
        .dd a { text-decoration: none; }
        .dd a:hover { background: #f6f9fc; }
        .is-active { background: #edf7ff; color: #0b3a82; font-weight: 600; }
        .btn-emer { background: #e53935; color: #fff; border-radius: 9999px; box-shadow: 0 .75rem 1.5rem rgba(229,57,53,.18); }
        .btn-emer:hover { background: #c62828; transform: translateY(-1px); }
        .menu-wrap.is-open { display: block; }
        @media (min-width: 60rem) { .menu-wrap { display: block; } }
        @media (max-width: 60rem) { .menu-wrap { display: none; } }
        .focus-ring:focus { outline: 3px solid rgba(13,110,253,.6); outline-offset: 2px; border-radius: .25rem; }
      </style>

      <header class="sticky-nav shadow-1" role="banner">
        <nav class="mw8 center ph3 ph4-ns pv2 flex items-center justify-between" role="navigation" aria-label="Principal">
          <!-- Marca -->
          <a href="#inicio" class="no-underline dark-blue flex items-center focus-ring" title="Hospital San Jorge" @click=${(e) => this._navigateTo('inicio', e)}>
            <span class="br-100 bg-dark-red mr2" style="width:24px;height:24px;"></span>
            <strong class="f5 f4-ns">Hospital San JORGE</strong>
          </a>

          <!-- Botón hamburguesa -->
          <button class="dn-ns bg-transparent bn f3 pointer focus-ring" aria-label="Abrir menú" aria-controls="principal-menu" aria-expanded=${this.burgerOpen} @click=${this.toggleBurger}>☰</button>

          <!-- Menú -->
          <div id="principal-menu" class="menu-wrap ${this.burgerOpen ? 'is-open' : ''}">
            <div class="flex-ns items-center-ns">
              <ul class="list ma0 pa0 flex-ns items-center-ns" role="menubar">
                ${this.menuItems.map((item, idx) => {
                  const base = `link dark-gray hover-dark-blue ph3 pv2 br2 dib focus-ring`

                  if (item.subItems?.length) {
                    const open = this.activeDropdown === item.key
                    return html`
                      <li class="relative" role="none">
                        <a href="#" class="${base} ${isActive(item.key) ? 'is-active' : ''}"
                           data-top="1" data-key="${item.key}" role="menuitem" aria-haspopup="true"
                           aria-expanded=${open} aria-controls="dd-${item.key}"
                           tabindex=${this._focusIndex === idx ? '0' : '-1'}
                           @click=${(e) => { e.preventDefault(); this.toggleDropdown(item.key) }}>
                          ${item.name} <span class="ml2 o-60" aria-hidden="true">▾</span>
                        </a>
                        ${open ? html`
                          <div class="dd mt2" id="dd-${item.key}" role="menu" data-dd="${item.key}">
                            ${item.subItems.map(sub => html`
                              <a href="${sub.href}" class="db ph3 pv2 dark-gray hover-dark-blue br1"
                                 role="menuitem" @click=${(e) => this._navigateTo(sub.key ?? item.key, e)}
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
                        <a href="${item.href}" target="_blank" rel="noopener noreferrer" class="${base} ${isActive(item.key) ? 'is-active' : ''}"
                           role="menuitem" data-top="1" data-key="${item.key}" tabindex=${this._focusIndex === idx ? '0' : '-1'}
                           aria-current=${isActive(item.key) ? 'page' : 'false'}>
                          ${item.name}
                        </a>
                      </li>`
                    }
                    return html`<li role="none">
                      <a href="${item.href}" class="${base} ${isActive(item.key) ? 'is-active' : ''}"
                         role="menuitem" data-top="1" data-key="${item.key}" tabindex=${this._focusIndex === idx ? '0' : '-1'}
                         aria-current=${isActive(item.key) ? 'page' : 'false'}
                         @click=${(e) => this._navigateTo(item.key, e)}>
                        ${item.name}
                      </a>
                    </li>`
                  }

                  return html`<li role="none">
                    <a href="#${item.key}" class="${base} ${isActive(item.key) ? 'is-active' : ''}"
                       role="menuitem" data-top="1" data-key="${item.key}" tabindex=${this._focusIndex === idx ? '0' : '-1'}
                       aria-current=${isActive(item.key) ? 'page' : 'false'}
                       @click=${(e) => this._navigateTo(item.key, e)}>
                      ${item.name}
                    </a>
                  </li>`
                })}
              </ul>

              <a href="tel:123" class="ml3 mt3 mt0-ns ph3 pv2 dib btn-emer no-underline b focus-ring">📞 Emergencias 24/7</a>
            </div>
          </div>
        </nav>
      </header>
    `
  }
}

customElements.define('menu-superior', MenuSuperior)
