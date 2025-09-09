

// app.js
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'


import './Componentes/1-Menu/menu-superior.js'

// IMPORTANTE: evita espacios/acentos en rutas reales del filesystem
// Ajusta tus nombres de carpetas/archivos a ASCII y kebab-case.
import './Componentes/2-inicio/inicio.js'



//-----------------------------------QuieneSomos
import './Componentes/3-QuieneSomos/1-InformacionCorporativa/InformacionCorporativa.js'
import './Componentes/3-QuieneSomos/2-ResenaHistorica/ResenaHistoricas.js'
import './Componentes/3-QuieneSomos/3-Administración/Administración.js'
import './Componentes/3-QuieneSomos/4-Mapaprocesos/Mapaprocesos.js'
import './Componentes/3-QuieneSomos/5-Distinciones/Distinciones.js'
import './Componentes/3-QuieneSomos/6-Personal/Directorio.js'
import './Componentes/3-QuieneSomos/6-Personal/Personal.js'
import './Componentes/3-QuieneSomos/7-Normatividad/Normatividad.js'
import './Componentes/3-QuieneSomos/8-Comunicaciones/Comunicaciones.js'

//------------------------------------------  4-AtencionCiudadano
import './Componentes/4-AtencionCiudadano/1-Accesibilidad/Accesibilidad.js'
import './Componentes/4-AtencionCiudadano/2-OrientacionUsuario/OrientacionUsuario.js'
import './Componentes/4-AtencionCiudadano/3-Carta al trato digno/Cartaaltratodigno.js'
import './Componentes/4-AtencionCiudadano/4-Pida una cita/Pidaunacita.js'
import './Componentes/4-AtencionCiudadano/5-Tramites/Tramites.js'
import './Componentes/4-AtencionCiudadano/6-Línea de transparencia/Lineadetransparencia.js'
import './Componentes/4-AtencionCiudadano/7-Preguntas Frecuentes/PreguntasFrecuentes.js'
import './Componentes/4-AtencionCiudadano/8-Cuidado del paciente/Cuidadodelpaciente.js'
import './Componentes/4-AtencionCiudadano/9-Rendición de Cuentas/RendicióndeCuentas.js'

//-------------------------------------GestionIstitucional

import './Componentes/5-GestionIstitucional/P1TratamientodeDatos.js';
import './Componentes/5-GestionIstitucional/P2-FinancierayContable.js';
import './Componentes/5-GestionIstitucional/P3MetasIndicadores.js';
import './Componentes/5-GestionIstitucional/P4ProtecciónUsodeDatos.js';
import './Componentes/5-GestionIstitucional/5-Gestionycontrol/P5Gestionycontrol.js';
import './Componentes/5-GestionIstitucional/P5mipg.js';
import './Componentes/5-GestionIstitucional/P6DerechosdeAutor.js';
import './Componentes/5-GestionIstitucional/P7PoliticadeCookies.js';
import './Componentes/5-GestionIstitucional/P8Procesosdisciplinarios.js';
import './Componentes/5-GestionIstitucional/P11Referenciación.js';
import './Componentes/5-GestionIstitucional/P12Bancodeproyectos.js';

//----------------------------------------- extra
import './Componentes/5,5-GestionConocimiento/gestion.js'
import './Componentes/6-SERVICIOS/servicios.js'
import './Componentes/7-Participa/Participa.js'
import './Componentes/8-Transparencia/Transparencia.js'


class ContenedorApp extends LitElement {
  static properties = { activeView: { type: String } }
  constructor() {
    super()
    this.activeView = 'inicio'
    this._onHash = null
  }
  createRenderRoot() { return this }


  
  setActiveView(view) { this.activeView = view; location.hash = `#${view}` }

  _applyHash() {
    const key = (location.hash || '').replace(/^#/, '')
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


      //------------QuieneSomos
      'inicio': html`<inicio-x></inicio-x>`,
      'info-corporativa': html`<informacion-corporativa></informacion-corporativa>`,
      'resena-historica': html`<resena-historica></resena-historica>`,
      'administracion': html`<administracion-element></administracion-element>`,
      'mapa-de-procesos': html`<mapa-de-procesos></mapa-de-procesos>`,
      'distinciones': html`<distinciones-galeria></distinciones-galeria>`,
      'personal': html`<personal-app></personal-app>`,
      'directorio': html`<directorio-institucional></directorio-institucional>`,
      'normatividad': html`<x-normatividad></x-normatividad>`,
      'comunicaciones': html`<comunicaciones-x></comunicaciones-x>`,
      'servicios': html`<servicios-element></servicios-element>`,
      'participa': html`<participa-element></participa-element>`,
      'transparencia': html`<transparencia-element></transparencia-element>`,
    ///

  // ...otras vistas existentes


    'accesibilidad': html`<accesibilidad-x ></accesibilidad-x>`,
    'orientacion-usuario': html`<orientacionusuario-view></orientacionusuario-view>`,
    'carta-trato-digno': html`<cartaaltratodigno-view></cartaaltratodigno-view>`,
    'pida-cita': html`<pidaunacita-view></pidaunacita-view>`,
    'tramites': html`<tramites-x></tramites-x>`,
    'linea-transparencia': html`<lineadetransparencia-view></lineadetransparencia-view>`,
    'preguntas-frecuentes': html`<preguntasfrecuentes-view></preguntasfrecuentes-view>`,
    'cuidado-paciente': html`<cuidadodelpaciente-view></cuidadodelpaciente-view>`,
    'rendicion-cuentas': html`<rendiciondecuentas-view></rendiciondecuentas-view>`,

      // GestionIstitucional
      'tratamiento-datos': html`<tratamientode-datos-view></tratamientode-datos-view>`,
      'financiera-contable': html`<financieray-contable-view></financieray-contable-view>`,
      'metas-indicadores': html`<metas-indicadores-view></metas-indicadores-view>`,
      'proteccion-datos': html`<proteccion-datos></proteccion-datos>`,
      'gestion-control': html`<gestion-control></gestion-control>`,
      'mipg': html`<x-mipg></x-mipg>`,
      'derechos-autor': html`<derechosde-autor-view></derechosde-autor-view>`,
      'politica-cookies': html`<politica-cookies></politica-cookies>`,
      'procesos-disciplinarios': html`<procesosdisciplinarios-view></procesosdisciplinarios-view>`,
      'referenciacion': html`<referenciacion-view></referenciacion-view>`,
      'banco-proyectos': html`<bancodeproyectos-view></bancodeproyectos-view>`,


      // ---------------------
      'gestion': html`<gestion-x></gestion-x>`,
      'servicios': html`<servicios-x></servicios-x>`,
      'participa': html`<participa-x></participa-x>`,
      'transparencia': html`<transparencia-x></transparencia-x>`
    
      };
    

    const current = views[this.activeView] ?? html`<div class="pa3 bg-washed-yellow dark-gray br2 ba b--black-10">Sección en construcción…</div>`

    return html`
      <menu-superior .activeView=${this.activeView} @select=${(e) => this.setActiveView(e.detail)}></menu-superior>
      <main class="section" style="padding-top:2rem; padding-bottom:2rem;">
        <div class="container">${current}</div>
      </main>
    `
  }
}

customElements.define('contenedor-app', ContenedorApp)
