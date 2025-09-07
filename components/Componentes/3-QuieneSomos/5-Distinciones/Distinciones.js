// distinciones-galeria.js (versión JS pura para navegador)
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

class DistincionesGaleria extends LitElement {
  // Light DOM para que Tachyons global funcione
  createRenderRoot(){ return this }

  // ----- Config pública -----
  static properties = {
    intervalMs: { type: Number, attribute: 'interval-ms' },
    currentImage: { type: Number, state: true },
    isAnimating: { type: Boolean, state: true }
  }

  constructor(){
    super()
    this.intervalMs = 5000
    this.currentImage = 0
    this.isAnimating = false
    this._timer = undefined

    // Datos (como en tu React)
    this.hospitalImages = [
      { url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=2000&q=80', title: 'Sala de Emergencias Moderna', description: 'Equipamiento de última generación para atención de emergencias 24/7', icon: 'heart' },
      { url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=2000&q=80', title: 'Equipo Médico Especializado', description: 'Profesionales altamente capacitados brindando atención personalizada', icon: 'users' },
      { url: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&w=2000&q=80', title: 'Laboratorio de Análisis Clínicos', description: 'Tecnología avanzada para diagnósticos precisos y rápidos', icon: 'microscope' },
      { url: 'https://images.unsplash.com/photo-1586773860418-d37222d8eaae?auto=format&fit=crop&w=2000&q=80', title: 'Quirófanos de Alta Tecnología', description: 'Salas de cirugía equipadas con los más altos estándares internacionales', icon: 'award' },
      { url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=2000&q=80', title: 'Consultorios Especializados', description: 'Espacios cómodos y modernos para consultas médicas especializadas', icon: 'stethoscope' },
      { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80', title: 'Instalaciones de Rehabilitación', description: 'Centro integral de fisioterapia y rehabilitación médica', icon: 'building2' }
    ]
  }

  static styles = css`
    .bg-grad { background: linear-gradient(135deg, #eff6ff, #ffffff 45%, #ecfdf5); }
    .h-hero { height: 24rem; }
    @media (min-width: 60rem) { .h-hero { height: 31rem; } }
    .img { width: 100%; height: 100%; object-fit: cover; transition: transform .3s ease, opacity .3s ease; }
    .overlay { position:absolute; inset:0; background: linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,0) 60%); }
    .btn-nav { background: rgba(255,255,255,.9); border-radius: 9999px; padding: .75rem; box-shadow: 0 6px 16px rgba(2,8,23,.12); transition: transform .2s ease, background .2s ease; }
    .btn-nav:hover { background: #fff; transform: scale(1.08); }
    .counter { background: rgba(0,0,0,.6); color:#fff; padding:.25rem .6rem; border-radius:9999px; font-size:.875rem; font-weight:600 }
    .card { background: #fff; border-radius: 1.25rem; box-shadow: 0 12px 40px rgba(2,8,23,.12); overflow: hidden; }
    .dot { width: .6rem; height: .6rem; border-radius: 9999px; background: #cdd3d9; transition: transform .2s ease, background .2s ease; }
    .dot--active { background: #1d4ed8; transform: scale(1.25); }

    /* utilidades posicionamiento (mini helpers) */
    .absolute{ position:absolute }
    .relative{ position:relative }
    .left-1{ left: .75rem }
    .right-1{ right: .75rem }
    .top-1{ top: .75rem }
    .top-50{ top: 50% }
    .translate--50{ transform: translateY(-50%) }
    .o-80{ opacity:.8 }
    .o-100{ opacity:1 }
    .scale-100{ transform: scale(1) }
    .scale-105{ transform: scale(1.05) }
  `

  connectedCallback(){
    super.connectedCallback()
    this.startAutoplay()
  }
  disconnectedCallback(){
    this.stopAutoplay()
    super.disconnectedCallback()
  }

  startAutoplay(){
    this.stopAutoplay()
    this._timer = window.setInterval(() => this.nextImage(), this.intervalMs)
  }
  stopAutoplay(){
    if(this._timer){ clearInterval(this._timer); this._timer = undefined }
  }

  nextImage(){
    if(this.isAnimating) return
    this.isAnimating = true
    window.setTimeout(()=>{
      this.currentImage = (this.currentImage + 1) % this.hospitalImages.length
      this.isAnimating = false
    }, 150)
  }
  prevImage(){
    if(this.isAnimating) return
    this.isAnimating = true
    window.setTimeout(()=>{
      this.currentImage = (this.currentImage - 1 + this.hospitalImages.length) % this.hospitalImages.length
      this.isAnimating = false
    }, 150)
  }
  goToImage(index){
    if(this.isAnimating || index === this.currentImage) return
    this.isAnimating = true
    window.setTimeout(()=>{
      this.currentImage = index
      this.isAnimating = false
    }, 150)
  }

  // Iconos inline estilo lucide
  _icon(name, {size=24, color='currentColor'} = {}){
    const s = String(size)
    const common = (c=color)=>({width:s,height:s,viewBox:'0 0 24 24',fill:'none',stroke:c,'stroke-width':'2','stroke-linecap':'round','stroke-linejoin':'round'})
    const svg = (child) => html`<svg
      width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${color}"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${child}</svg>`
    switch(name){
      case 'chevron-left': return svg(html`<polyline points="15 18 9 12 15 6"/>`)
      case 'chevron-right': return svg(html`<polyline points="9 18 15 12 9 6"/>`)
      case 'heart': return svg(html`<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>`)
      case 'users': return svg(html`<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`)
      case 'award': return svg(html`<circle cx="12" cy="8" r="5"/><path d="m8.2 12.2-1.2 8 5-3 5 3-1.2-8"/>`)
      case 'stethoscope': return svg(html`<path d="M4 4v4a4 4 0 0 0 8 0V4"/><path d="M4 8a4 4 0 0 0 8 0"/><path d="M12 14a4 4 0 0 0 8 0v-1"/><circle cx="20" cy="13" r="2"/>`)
      case 'building2': return svg(html`<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 11h10M7 15h10"/>`)
      case 'microscope': return svg(html`<path d="M6 18h12"/><path d="M14 14v-4l2-2"/><rect x="9" y="2" width="4" height="6" rx="1"/><path d="M10 8v6a4 4 0 0 1-4 4"/>`)
      default: return html``
    }
  }

  render(){
    const img = this.hospitalImages[this.currentImage]
    return html`
      <div class="min-vh-100 bg-grad">
        <!-- Header -->
        <div class="bg-white shadow-2 ba b--blue bw1">
          <div class="mw7 center ph4 pv4 tc">
            <h1 class="f2 fw8 dark-gray mb2">Distinciones y Excelencia Médica</h1>
            <p class="f5 mid-gray">Comprometidos con la salud y bienestar de nuestra comunidad</p>
          </div>
        </div>

        <!-- Galería Principal -->
        <div class="mw7 center ph3 pv5">
          <div class="card">
            <!-- Imagen principal -->
            <div class="relative h-hero bg-near-white overflow-hidden">
              <img class="img ${this.isAnimating ? 'o-80' : 'o-100'} ${this.isAnimating ? 'scale-105' : 'scale-100'}" src="${img.url}" alt="${img.title}" />
              <div class="overlay" aria-hidden="true"></div>

              <!-- Controles -->
              <button class="btn-nav absolute left-1 top-50 translate--50 pointer" @click=${()=>this.prevImage()} aria-label="Anterior">${this._icon('chevron-left',{size:24})}</button>
              <button class="btn-nav absolute right-1 top-50 translate--50 pointer" @click=${()=>this.nextImage()} aria-label="Siguiente">${this._icon('chevron-right',{size:24})}</button>

              <!-- Contador -->
              <div class="absolute right-1 top-1 counter">${this.currentImage + 1} / ${this.hospitalImages.length}</div>
            </div>

            <!-- Info de la imagen -->
            <div class="pa4 pa5-ns">
              <div class="flex items-start gap3 mb3">
                <div class="bg-washed-blue pa3 br3">${this._icon(img.icon,{size:32, color:'#1d4ed8'})}</div>
                <div class="flex-auto">
                  <h2 class="f3 fw8 dark-gray mt0 mb2">${img.title}</h2>
                  <p class="f5 mid-gray lh-copy">${img.description}</p>
                </div>
              </div>

              <!-- Indicadores -->
              <div class="tc pt3 bt b--black-05">
                ${this.hospitalImages.map((_,i)=> html`
                  <button class="ba b--transparent dib mh1 pointer" @click=${()=>this.goToImage(i)} aria-label="Ir a imagen ${i+1}">
                    <span class="dot ${i===this.currentImage ? 'dot--active' : ''}"></span>
                  </button>
                `)}
              </div>
            </div>
          </div>

          <!-- Información adicional -->
          <div class="mt5">
            <div class="cf nl3 nr3">
              <div class="fl w-100 w-third-ns pa3">
                <div class="bg-white pa4 br3 shadow-1 tc">
                  <div class="br-100 w3 h3 center flex items-center justify-center mb3" style="background:#dcfce7">${this._icon('award',{size:28, color:'#16a34a'})}</div>
                  <h3 class="f4 fw7 dark-gray mt0 mb2">Certificaciones</h3>
                  <p class="f6 mid-gray">Acreditados por los más altos estándares de calidad médica internacional</p>
                </div>
              </div>
              <div class="fl w-100 w-third-ns pa3">
                <div class="bg-white pa4 br3 shadow-1 tc">
                  <div class="br-100 w3 h3 center flex items-center justify-center mb3" style="background:#dbeafe">${this._icon('users',{size:28, color:'#1d4ed8'})}</div>
                  <h3 class="f4 fw7 dark-gray mt0 mb2">Equipo Experto</h3>
                  <p class="f6 mid-gray">Más de 200 profesionales especializados en diversas áreas médicas</p>
                </div>
              </div>
              <div class="fl w-100 w-third-ns pa3">
                <div class="bg-white pa4 br3 shadow-1 tc">
                  <div class="br-100 w3 h3 center flex items-center justify-center mb3" style="background:#ede9fe">${this._icon('heart',{size:28, color:'#7c3aed'})}</div>
                  <h3 class="f4 fw7 dark-gray mt0 mb2">Compromiso</h3>
                  <p class="f6 mid-gray">Dedicados a brindar atención médica de excelencia con calidez humana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('distinciones-galeria', DistincionesGaleria)
