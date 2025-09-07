// mapa-de-procesos.js — Web Component (Lit + Tachyons, JS puro ESM)
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

class Comunicaciones extends LitElement {
  // Light DOM para que apliquen utilidades Tachyons del host
  createRenderRoot(){ return this }

  static properties = {
    searchTerm: { type: String, state: true },
    selectedCategory: { type: String, state: true },
  }

  constructor(){
    super()
    this.searchTerm = ''
    this.selectedCategory = 'all'

    this.documentos = [
      { id:1, titulo:'Procedimiento para el Chatbot de Respuesta Automática', categoria:'chatbot', icon:'message-circle', color:'#3b82f6', badge:'bg-blue', colorLight:'#eff6ff', descripcion:'Protocolo para la implementación y gestión del sistema de respuesta automática', url:'https://hospitalsanjorgeayapel.info/LectorPdf/viewer.html?file=.%2Fpdfs%2FProcedimiento%20para%20el%20Chatbot%20de%20Respuesta%20Autom%C3%A1tica.pdf' },
      { id:2, titulo:'Anexo Evaluando', categoria:'evaluacion', icon:'eye', color:'#22c55e', badge:'bg-green', colorLight:'#ecfdf5', descripcion:'Documentación para procesos de evaluación y seguimiento', url:'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Evaluando.pdf' },
      { id:3, titulo:'Procedimiento Identidad Visual', categoria:'identidad', icon:'eye', color:'#a855f7', badge:'bg-purple', colorLight:'#f5f3ff', descripcion:'Lineamientos para el uso correcto de la identidad visual corporativa', url:'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Procedimiento%20Identidad%20Visual.pdf' },
      { id:4, titulo:'Comunicaciones de Entidades de Gobierno', categoria:'gobierno', icon:'building2', color:'#ef4444', badge:'bg-red', colorLight:'#fef2f2', descripcion:'Anexo para comunicaciones con MSPS, INS e INVIMA', url:'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Comunicaciones%20de%20las%20entidades%20de%20gobierno%20MSPS%20INS%20INVIMA.pdf' },
      { id:5, titulo:'Formato de Aprobación de Publicación', categoria:'publicacion', icon:'check-circle', color:'#f97316', badge:'bg-orange', colorLight:'#fff7ed', descripcion:'Formato estándar para aprobar publicaciones institucionales', url:'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/formato_aprobacion_publicacion.pdf' },
      { id:6, titulo:'Formato de Postulación Web', categoria:'web', icon:'globe', color:'#14b8a6', badge:'bg-teal', colorLight:'#f0fdfa', descripcion:'Formato para postular información a publicar en la página web', url:'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Formato%20de%20Aprobaci%C3%B3n%20de%20informaci%C3%B3n%20a%20Publicar%20en%20Pag.%20WEB.pdf' },
      { id:7, titulo:'Formato de Aprobación Web', categoria:'web', icon:'globe', color:'#14b8a6', badge:'bg-teal', colorLight:'#f0fdfa', descripcion:'Formato para aprobar información a publicar en página web', url:'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Formato%20de%20Aprobaci%C3%B3n%20de%20informaci%C3%B3n%20a%20Publicar%20en%20Pag.%20WEB.pdf' },
      { id:8, titulo:'Protocolo de Publicación de Noticias', categoria:'noticias', icon:'newspaper', color:'#6366f1', badge:'bg-indigo', colorLight:'#eef2ff', descripcion:'Protocolo de comunicaciones para publicación de noticias', url:'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Protocolo%20de%20Comunicaciones%20Para%20Publicaci%C3%B3n%20de%20noticias%20en%20la.pdf' },
      { id:9, titulo:'Procedimiento de Acceso', categoria:'acceso', icon:'key', color:'#4b5563', badge:'bg-gray', colorLight:'#f5f5f5', descripcion:'Procedimiento para gestión de accesos y permisos', url:'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Procedimiento%20Acceso.pdf' },
    ]

    this.categorias = [
      { id:'all', nombre:'Todos', cls:'bg-near-white dark-gray' },
      { id:'chatbot', nombre:'Chatbot', cls:'bg-washed-blue dark-blue' },
      { id:'evaluacion', nombre:'Evaluación', cls:'bg-washed-green dark-green' },
      { id:'identidad', nombre:'Identidad', cls:'bg-washed-purple dark-purple' },
      { id:'gobierno', nombre:'Gobierno', cls:'bg-washed-red dark-red' },
      { id:'publicacion', nombre:'Publicación', cls:'bg-washed-yellow dark-orange' },
      { id:'web', nombre:'Web', cls:'bg-washed-teal dark-teal' },
      { id:'noticias', nombre:'Noticias', cls:'bg-washed-light-blue dark-blue' },
      { id:'acceso', nombre:'Acceso', cls:'bg-near-white dark-gray' },
    ]
  }

  static styles = css`
    .bg-grad { background: linear-gradient(135deg, #eff6ff, #ffffff 45%, #ecfdf5); min-height: 100vh; }
    .header-bar { border-bottom: 4px solid #2563eb; }
    .card { border-radius: 1rem; border: 2px solid rgba(0,0,0,.06); transition: transform .2s ease, box-shadow .2s ease; cursor: pointer; }
    .card:hover { transform: translateY(-2px) scale(1.015); box-shadow: 0 16px 40px rgba(2,8,23,.12) }
    .badge { font-size: .75rem; border-radius: 9999px; padding: .25rem .6rem; }
    .chip { padding: .5rem 1rem; border-radius: 9999px; font-weight:600; border:1px solid rgba(0,0,0,.08); }
    .input { width: 100%; padding: .75rem 1rem .75rem 2.25rem; border:1px solid #d1d5db; border-radius: .75rem; outline: none }
    .input:focus { box-shadow: 0 0 0 3px rgba(37,99,235,.25); border-color: transparent }

    /* helpers colores */
    .bg-blue{ background:#dbeafe; color:#1d4ed8 }
    .bg-green{ background:#dcfce7; color:#16a34a }
    .bg-purple{ background:#ede9fe; color:#7c3aed }
    .bg-red{ background:#fee2e2; color:#ef4444 }
    .bg-orange{ background:#ffedd5; color:#f97316 }
    .bg-teal{ background:#ccfbf1; color:#0f766e }
    .bg-indigo{ background:#e0e7ff; color:#4f46e5 }
    .bg-gray{ background:#f5f5f5; color:#374151 }
  `

  // --- iconos inline estilo lucide ---
  _icon(name, { size=24, color='currentColor' }={}){
    const s = String(size)
    const svg = (children) => html`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${children}</svg>`
    switch(name){
      case 'file-text': return svg(html`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>`)
      case 'message-circle': return svg(html`<path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.5 8.5 0 1 1 9-8.5Z"/><polyline points="8 13 12 13 12 9"/>`)
      case 'eye': return svg(html`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/>`)
      case 'building2': return svg(html`<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 11h10M7 15h10"/>`)
      case 'check-circle': return svg(html`<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`)
      case 'globe': return svg(html`<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/>`)
      case 'newspaper': return svg(html`<path d="M18 19H5a2 2 0 0 1-2-2V5"/><path d="M22 5v11a2 2 0 0 1-2 2H7"/><path d="M8 5h12v4H8z"/><path d="M8 11h12v4H8z"/><path d="M2 5h4v14H4a2 2 0 0 1-2-2z"/>`)
      case 'key': return svg(html`<path d="M21 2l-2 2"/><path d="M15 8l-2 2"/><circle cx="7" cy="17" r="5"/><path d="M12 12l9-9"/>`)
      case 'search': return svg(html`<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`)
      case 'download': return svg(html`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`)
      case 'external-link': return svg(html`<path d="M18 3h3v3"/><path d="M21 3 14 10"/><path d="M21 10V3"/><rect x="3" y="8" width="13" height="13" rx="2" ry="2"/>`)
      default: return svg(html``)
    }
  }

  get _docsFiltrados(){
    const t = this.searchTerm.toLowerCase()
    return this.documentos.filter(doc => {
      const cumpleBusqueda = doc.titulo.toLowerCase().includes(t) || doc.descripcion.toLowerCase().includes(t)
      const cumpleCategoria = this.selectedCategory === 'all' || doc.categoria === this.selectedCategory
      return cumpleBusqueda && cumpleCategoria
    })
  }

  _abrir(url){ window.open(url, '_blank', 'noopener,noreferrer') }

  render(){
    const docs = this._docsFiltrados
    return html`
      <div class="bg-grad">
        <!-- Header -->
        <div class="bg-white header-bar shadow-1">
          <div class="mw8 center ph4 pv4">
            <div class="tc mb4">
              <h1 class="f2 fw8 dark-gray mb2">Mapa de Procesos</h1>
              <p class="f5 mid-gray">Documentos de Comunicaciones - Hospital San Jorge</p>

              <!-- Buscador -->
              <div class="mw6 center relative mt3">
                <div style="position:absolute;left:.75rem;top:50%;transform:translateY(-50%)">${this._icon('search',{size:20, color:'#9ca3af'})}</div>
                <input class="input" type="text" placeholder="Buscar documentos..." .value=${this.searchTerm} @input=${e=> this.searchTerm = e.target.value} />
              </div>
            </div>

            <!-- Filtros -->
            <div class="flex flex-wrap justify-center">
              ${this.categorias.map(cat => html`
                <button class="chip mh1 mv1 ${this.selectedCategory===cat.id ? 'shadow-1' : ''}"
                        style="background: ${this.selectedCategory===cat.id ? 'rgba(0,0,0,.03)' : '#fff'}"
                        @click=${()=> this.selectedCategory = cat.id}>${cat.nombre}</button>
              `)}
            </div>
          </div>
        </div>

        <!-- Grid de documentos -->
        <div class="mw8 center ph4 pv5">
          ${docs.length === 0 ? html`
            <div class="tc pv6">
              <div class="mb3">${this._icon('file-text',{size:64, color:'#9ca3af'})}</div>
              <h3 class="f4 fw6 mid-gray mb2">No se encontraron documentos</h3>
              <p class="gray">Intenta con otros términos de búsqueda o selecciona otra categoría</p>
            </div>
          ` : html`
            <div class="cf nl3 nr3">
              ${docs.map(doc => html`
                <div class="fl w-100 w-50-m w-third-l pa3">
                  <div class="card pa4" style="background:${doc.colorLight}">
                    <div class="flex items-start mb3">
                      <div class="br3 pa3" style="background:${doc.color};color:#fff">${this._icon(doc.icon,{size:22, color:'#fff'})}</div>
                      <div class="ml3 flex-auto">
                        <h3 class="f5 fw7 dark-gray mt0 mb2">${doc.titulo}</h3>
                        <p class="f6 mid-gray">${doc.descripcion}</p>
                      </div>
                    </div>

                    <div class="flex items-center justify-between pt3 bt b--black-05">
                      <span class="badge ${doc.badge}">${(this.categorias.find(c=>c.id===doc.categoria)||{}).nombre || 'General'}</span>
                      <div class="flex gap2">
                        <button class="ba b--black-05 br2 bg-white ph2 pv2 pointer" @click=${()=> this._abrir(doc.url)} title="Descargar/Ver">${this._icon('download',{size:16, color:'#4b5563'})}</button>
                        <button class="ba b--black-05 br2 bg-white ph2 pv2 pointer" @click=${()=> this._abrir(doc.url)} title="Abrir en nueva pestaña">${this._icon('external-link',{size:16, color:'#4b5563'})}</button>
                      </div>
                    </div>

                    <button class="mt3 w-100 ph3 pv2 br2 ba b--black-10 pointer bg-white hover-bg-near-white" @click=${()=> this._abrir(doc.url)}>Abrir documento</button>
                  </div>
                </div>
              `)}
            </div>
          `}

          <!-- Estadísticas -->
          <div class="mt5 bg-white br3 shadow-1 pa4">
            <div class="cf nl3 nr3 tc">
              <div class="fl w-100 w-25-ns pa3">
                <div class="br-100 w3 h3 center flex items-center justify-center mb3" style="background:#dbeafe">${this._icon('file-text',{size:28, color:'#1d4ed8'})}</div>
                <h3 class="f3 fw8 dark-gray ma0">${this.documentos.length}</h3>
                <p class="mid-gray mt1">Documentos Totales</p>
              </div>
              <div class="fl w-100 w-25-ns pa3">
                <div class="br-100 w3 h3 center flex items-center justify-center mb3" style="background:#dcfce7">${this._icon('check-circle',{size:28, color:'#16a34a'})}</div>
                <h3 class="f3 fw8 dark-gray ma0">${this.categorias.length - 1}</h3>
                <p class="mid-gray mt1">Categorías</p>
              </div>
              <div class="fl w-100 w-25-ns pa3">
                <div class="br-100 w3 h3 center flex items-center justify-center mb3" style="background:#ede9fe">${this._icon('search',{size:28, color:'#7c3aed'})}</div>
                <h3 class="f3 fw8 dark-gray ma0">${docs.length}</h3>
                <p class="mid-gray mt1">Resultados Actuales</p>
              </div>
              <div class="fl w-100 w-25-ns pa3">
                <div class="br-100 w3 h3 center flex items-center justify-center mb3" style="background:#ffedd5">${this._icon('globe',{size:28, color:'#f97316'})}</div>
                <h3 class="f3 fw8 dark-gray ma0">100%</h3>
                <p class="mid-gray mt1">Digitalizados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('comunicaciones-x', Comunicaciones)
