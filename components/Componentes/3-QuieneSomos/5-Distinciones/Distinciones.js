// distinciones-galeria.js (versión JS pura para navegador)
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

class DistincionesGaleria extends LitElement {
 
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
