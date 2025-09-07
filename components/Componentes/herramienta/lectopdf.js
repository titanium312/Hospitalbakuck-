// lectopdf.js
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
// Núcleo ESM de PDF.js
import * as pdfjsLib from 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/build/pdf.min.mjs';

// IMPORTANTE: asignar la URL del worker (no se importa como módulo)
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs';

class LectotWie extends LitElement {
  // Light DOM para que Tachyons afecte el contenido
  createRenderRoot(){ return this; }

  static get properties(){
    return {
      urlpdf: { type: String },
      page: { type: Number, state: true },
      scale: { type: Number, state: true },
      _doc: { state: true },
      _pages: { type: Number, state: true },
      _loading: { type: Boolean, state: true },
      _error: { type: String, state: true }
    }
  }

  constructor(){
    super();
    this.page = 1;
    this.scale = 1.1;
    this._pages = 0;
    this._loading = false;
    this._error = '';
  }

  updated(changed){
    if (changed.has('urlpdf')) this._load();
    if (changed.has('page') || changed.has('scale')) this._renderPage();
  }

  async _load(){
    this._error = '';
    this._loading = true;
    this._doc = null;
    this._pages = 0;
    try {
      const loadingTask = pdfjsLib.getDocument({
        url: this.urlpdf,
        withCredentials: false, // pon true si tu servidor requiere cookies
      });
      this._doc = await loadingTask.promise;
      this._pages = this._doc.numPages;
      this.page = 1; // reiniciar a la primera página
      await this._renderPage();
    } catch (e) {
      console.error('PDF load error:', e);
      this._error = 'No se pudo cargar el PDF (posible CORS o URL inválida).';
    } finally {
      this._loading = false;
      this.requestUpdate();
    }
  }

  async _renderPage(){
    if (!this._doc) return;
    const canvas = this.querySelector('#pdfCanvas');
    if (!canvas) return;

    const page = await this._doc.getPage(this.page);
    const viewport = page.getViewport({ scale: this.scale });

    const ctx = canvas.getContext('2d', { alpha: false });
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    await page.render({ canvasContext: ctx, viewport }).promise;
  }

  _prev(){ if (this.page > 1){ this.page--; } }
  _next(){ if (this.page < this._pages){ this.page++; } }
  _zoomIn(){ this.scale = Math.min(this.scale + 0.15, 3); }
  _zoomOut(){ this.scale = Math.max(this.scale - 0.15, 0.4); }
  _open(){ window.open(this.urlpdf, '_blank'); }
  async _copy(){
    try { await navigator.clipboard.writeText(this.urlpdf || ''); this._toast('Enlace copiado'); }
    catch { this._toast('No se pudo copiar'); }
  }
  _toast(msg){
    const el = document.createElement('div');
    el.textContent = msg;
    el.className = 'fixed bottom-1 left-50 translate--50 tc bg-dark-blue white br3 pv2 ph3 shadow-5';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }

  render(){
    const c = { border:'#D6F0FA', soft:'#E6F7FD', accent:'#2b8fdc' };
    return html`
      <style>
        .wrap{ background:#fff; border:1px solid ${c.border}; border-radius:1rem; box-shadow:0 10px 28px rgba(0,0,0,.06); }
        .ribbon{ background:${c.soft}; height:.5rem; border-bottom:1px solid ${c.border};
                 border-top-left-radius:1rem; border-top-right-radius:1rem; }
        .toolbar .btn{ border:1px solid ${c.border}; border-radius:.75rem; }
        .toolbar .btn:active{ transform:scale(.98); }
        canvas{ width:100%; height:auto; background:#fff; border:1px solid ${c.border}; border-radius:12px;
                box-shadow:0 6px 20px rgba(0,0,0,.05); }
      </style>

      <section class="pa3 pa4-ns">
        <div class="wrap">
          <div class="ribbon"></div>
          <div class="pa3 pa4-ns">
            <!-- Controles -->
            <div class="toolbar flex items-center justify-between mb3">
              <div class="flex items-center">
                <button class="btn bg-white hover-bg-near-white pa2 ph3 mr2 pointer" @click=${this._prev} ?disabled=${this.page<=1} aria-label="Página anterior">⟵</button>
                <span class="f6 dark-gray mr2">Página</span>
                <span class="b dark-blue mr2">${this.page}</span>
                <span class="f6 o-60">/ ${this._pages || '—'}</span>
              </div>
              <div class="flex items-center">
                <button class="btn bg-white hover-bg-near-white pa2 ph3 mr2 pointer" @click=${this._zoomOut} aria-label="Reducir zoom">−</button>
                <span class="f6 dark-gray mr2">${Math.round(this.scale*100)}%</span>
                <button class="btn bg-white hover-bg-near-white pa2 ph3 mr3 pointer" @click=${this._zoomIn} aria-label="Aumentar zoom">＋</button>
                <button class="btn bg-washed-blue hover-bg-lightest-blue pa2 ph3 mr2 pointer" @click=${this._open}>Abrir</button>
                <button class="btn bg-white hover-bg-near-white pa2 ph3 pointer" @click=${this._copy}>Copiar enlace</button>
              </div>
            </div>

            <!-- Lienzo PDF / Estados -->
            ${this._loading ? html`<p class="f6 gray">Cargando PDF…</p>` : ''}
            ${this._error
              ? html`<p class="f6 dark-red">${this._error}</p>
                     <p class="f6 gray">Sugerencia: si controlas el servidor, habilita <code>Access-Control-Allow-Origin</code> para tu dominio, o sirve el PDF desde el mismo dominio.</p>`
              : html`<canvas id="pdfCanvas" class="db" role="img" aria-label="Vista del documento PDF"></canvas>`
            }

            <!-- Navegación inferior -->
            <div class="flex items-center justify-center mt3">
              <button class="btn bg-white hover-bg-near-white pa2 ph3 mr2 pointer" @click=${this._prev} ?disabled=${this.page<=1}>Anterior</button>
              <button class="btn bg-white hover-bg-near-white pa2 ph3 pointer" @click=${this._next} ?disabled=${this.page>=this._pages}>Siguiente</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('lectot-wie', LectotWie);