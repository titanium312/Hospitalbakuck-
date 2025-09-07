// Componentes/1-Menu/menu-superior.js
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

class MenuSuperior extends LitElement {
  createRenderRoot() { return this } // Light DOM → Tachyons/Bulma

  static properties = {
    activeDropdown: { type: String },
    activeView: { type: String },
    menuItems: { type: Array },
    burgerOpen: { type: Boolean },
  }

  constructor() {
    super()
    this.activeDropdown = null
    this.activeView = ''
    this.burgerOpen = false

    this.menuItems = [
      { name: 'Inicio', key: 'inicio', href: 'inicio' },
      {
        name: 'Quienes somos', key: 'quienes-somos',
        subItems: [
          { name: 'Información Corporativa', key: 'info-corporativa', href: 'info-corporativa' },
          { name: 'Reseña Histórica', key: 'resena-historica', href: 'resena-historica' },
          { name: 'Administración', key: 'administracion', href: 'administracion' },
          { name: 'Mapa de procesos', key: 'mapa-de-procesos', href: 'mapa-de-procesos' },
          { name: 'Distinciones', key: 'distinciones', href: 'distinciones' },
          { name: 'Directorio', key: 'directorio', href: 'directorio' },
          { name: 'Normatividad', key: 'normatividad', href: 'normatividad' },
          { name: 'Comunicaciones', key: 'comunicaciones', href: 'comunicaciones' }
        ]
      },
      { name: 'Servicios', key: 'servicios', href: 'servicios' },
      { name: 'Participa', key: 'participa', href: 'participa' },
      { name: 'Transparencia', key: 'transparencia', href: 'transparencia' },
      { name: 'Biblioteca', key: 'biblioteca', href: 'https://hospitalsanjorgeayapel.info/LectorPdf/p.php' }
    ]
  }

  isExternal(href) { return !!href && /^(https?:)?\/\//i.test(href) }
  toggleBurger() { this.burgerOpen = !this.burgerOpen }
  toggleDropdown(key) { this.activeDropdown = (this.activeDropdown === key ? null : key) }

  _onKeyDown = (e) => { if (e.key === 'Escape'){ this.activeDropdown = null; this.burgerOpen = false } }

  _onDocClick = (e) => {
    const path = typeof e.composedPath === 'function' ? e.composedPath() : []
    const clickedInside = path.length ? path.includes(this) : this.contains?.(e.target)
    if (!clickedInside) this.activeDropdown = null
  }

  connectedCallback(){
    super.connectedCallback()
    document.addEventListener('keydown', this._onKeyDown)
    document.addEventListener('click', this._onDocClick)
  }
  disconnectedCallback(){
    document.removeEventListener('keydown', this._onKeyDown)
    document.removeEventListener('click', this._onDocClick)
    super.disconnectedCallback()
  }

  _navigateTo(key, evt){
    if (evt) evt.preventDefault()
    this.dispatchEvent(new CustomEvent('select', { detail: key, bubbles:true, composed:true }))
    this.activeDropdown = null
    this.burgerOpen = false
  }

  render(){
    return html`
      <style>
        .sticky-nav{ position:sticky; top:0; z-index:100; background: rgba(255,255,255,.92); backdrop-filter: saturate(1.05) blur(6px); }
        .dd{ position:absolute; left:0; top:100%; min-width:16rem; background:#fff; border-radius:.5rem; box-shadow:0 1rem 2rem rgba(0,0,0,.08); z-index:200; }
        .dd:before{ content:""; position:absolute; top:-.4rem; left:1.5rem; width:.8rem; height:.8rem; background:#fff; transform:rotate(45deg); box-shadow:-1px -1px 0 0 rgba(0,0,0,.05); }
        .dd a{ text-decoration:none; }
        .dd a:hover{ background:#f6f9fc; }
        .is-active{ background:#edf7ff; color:#0b3a82; font-weight:600; }
        .btn-emer{ background:#e53935; color:#fff; border-radius:9999px; box-shadow:0 .75rem 1.5rem rgba(229,57,53,.18); }
        .btn-emer:hover{ background:#c62828; transform: translateY(-1px); }
        @media (max-width: 60rem){ .menu-wrap { display: ${this.burgerOpen ? 'block' : 'none'}; } }
      </style>

      <header class="sticky-nav shadow-1">
        <nav class="mw8 center ph3 ph4-ns pv2 flex items-center justify-between">
          <!-- Brand -->
          <a href="#inicio"
             class="no-underline dark-blue flex items-center"
             title="Hospital San Jorge"
             @click=${(e)=>this._navigateTo('inicio', e)}>
            <span class="br-100 bg-dark-red mr2" style="width:24px;height:24px;"></span>
            <strong class="f5 f4-ns">Hospital San JORGE</strong>
          </a>

          <!-- Burger -->
          <button class="dn-ns bg-transparent bn f3 pointer"
                  aria-label="Abrir menú"
                  aria-controls="principal-menu"
                  aria-expanded=${this.burgerOpen}
                  @click=${this.toggleBurger}>☰</button>

          <!-- Menu -->
          <div id="principal-menu" class="menu-wrap dn db-ns">
            <div class="flex-ns items-center-ns">
              <ul class="list ma0 pa0 flex-ns items-center-ns">
                ${this.menuItems.map(item => {
                  const isActive = this.activeView === item.key ? 'is-active' : ''
                  const base = `link dark-gray hover-dark-blue ph3 pv2 br2 dib`

                  if (item.subItems?.length){
                    const open = this.activeDropdown === item.key
                    return html`
                      <li class="relative">
                        <a href="#"
                           class="${base} ${isActive}"
                           @click=${(e)=>{e.preventDefault(); this.toggleDropdown(item.key)}}
                           aria-haspopup="true" aria-expanded=${open}>
                          ${item.name} <span class="ml2 o-60">▾</span>
                        </a>
                        ${open ? html`
                          <div class="dd mt2" role="menu">
                            ${item.subItems.map(sub => html`
                              <a href="${sub.href ?? '#'}"
                                 class="db ph3 pv2 dark-gray hover-dark-blue br1"
                                 role="menuitem"
                                 @click=${(e)=>this._navigateTo(sub.key ?? item.key, e)}>
                                ${sub.name}
                              </a>
                            `)}
                          </div>
                        ` : ''}
                      </li>
                    `
                  }

                  if (item.href){
                    if (this.isExternal(item.href)){
                      return html`
                        <li>
                          <a href="${item.href}" target="_blank" rel="noopener noreferrer"
                             class="${base} ${isActive}">
                            ${item.name}
                          </a>
                        </li>
                      `
                    }
                    return html`
                      <li>
                        <a href="${item.href}" class="${base} ${isActive}"
                           @click=${(e)=>this._navigateTo(item.key, e)}>
                          ${item.name}
                        </a>
                      </li>
                    `
                  }

                  return html`
                    <li>
                      <a href="#${item.key}" class="${base} ${isActive}"
                         @click=${(e)=>this._navigateTo(item.key, e)}>
                        ${item.name}
                      </a>
                    </li>
                  `
                })}
              </ul>

              <a href="tel:123"
                 class="ml3 mt3 mt0-ns ph3 pv2 dib btn-emer no-underline b">
                📞 Emergencias 24/7
              </a>
            </div>
          </div>
        </nav>
      </header>
    `
  }
}

customElements.define('menu-superior', MenuSuperior)
