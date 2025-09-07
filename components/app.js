// app.js
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

// Componentes
import './Componentes/1-Menu/menu-superior.js'
import './Componentes/2-inicio/inicio.js'
import './Componentes/3-QuieneSomos/1-InformacionCorporativa/InformacionCorporativa.js'
import './Componentes/3-QuieneSomos/2-ResenaHistorica/ResenaHistorica.js'
import './Componentes/3-QuieneSomos/3-Administración/Administración.js'
import './Componentes/3-QuieneSomos/4-Mapa de procesos/Mapa de procesos.js'
import './Componentes/3-QuieneSomos/5-Distinciones/Distinciones.js'
import './Componentes/3-QuieneSomos/6-Directorio/Directorio.js'
 import './Componentes/3-QuieneSomos/7-Normatividad/Normatividad.js'
 import   './Componentes/3-QuieneSomos/8-Comunicaciones/Comunicaciones.js'
class ContenedorApp extends LitElement {
  static properties = { activeView: { type: String } }

  constructor() {
    super()
    this.activeView = 'inicio'
    this._onHash = null
  }

  createRenderRoot() { return this }

  setActiveView(view) {
    this.activeView = view
    location.hash = `#${view}`
  }

  _applyHash() {
    const key = (location.hash || '').replace(/^#/, '')
    console.log('[hashchange] key =', key)
    if (key) this.activeView = key
  }

  connectedCallback() {
    super.connectedCallback()
    this._onHash = () => this._applyHash()
    this._applyHash()
    window.addEventListener('hashchange', this._onHash)
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this._onHash)
    super.disconnectedCallback()
  }

  render() {
    const views = {
      inicio: html`<inicio-x></inicio-x>`,
      'info-corporativa': html`<informacion-corporativa></informacion-corporativa>`,
      'resena-historica': html`<resena-historica></resena-historica>`, 
      'administracion': html`<administracion-element></administracion-element>`,
      'mapa-de-procesos': html`<mapa-de-procesos></mapa-de-procesos>`,
      'distinciones': html`<distinciones-galeria></distinciones-galeria>`,
      'directorio': html`<directorio-institucional></directorio-institucional>`,
      'normatividad': html`<x-normatividad></x-normatividad>`,
      'comunicaciones' : html`<comunicaciones-x></comunicaciones-x>`,
      // 'servicios': html`<servicios-element></servicios-element>`,
    }

    const current = views[this.activeView] ?? (
      console.warn('[views] no existe la vista:', this.activeView),
      html`<div class="pa3 bg-washed-yellow dark-gray br2 ba b--black-10">Sección en construcción…</div>`
    )

    return html`
      <menu-superior
        .activeView=${this.activeView}
        @select=${(e) => this.setActiveView(e.detail)}
      ></menu-superior>

      <main class="section" style="padding-top:2rem; padding-bottom:2rem;">
        <div class="container">
          ${current}
        </div>
      </main>
    `
  }
}

customElements.define('contenedor-app', ContenedorApp)

