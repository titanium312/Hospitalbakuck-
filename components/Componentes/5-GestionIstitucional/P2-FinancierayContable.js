  import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
  // Si ya tienes tu visor PDF (<lectot-wie>) cárgalo en la página, por ejemplo:
  // <script type="module" src="/herramienta/lectopdf.js"></script>

  export class FinancierayContable extends LitElement {
    createRenderRoot(){ return this; } // Light DOM para Tachyons

    static properties = {
      query: { type: String },
      year: { type: String },
      tipo: { type: String },
      perPage: { type: Number },
      page: { type: Number },
      proxyBase: { type: String },   // opcional, se pasa a <lectot-wie>
      open: { type: Boolean, state: true },
      currentDoc: { state: true },
    }

    constructor(){
      super();
      this.query = '';
      this.year = 'Todos';
      this.tipo = 'Todos';
      this.perPage = 10;
      this.page = 1;
      this.proxyBase = ''; // ej: "https://pdf-proxy.tu-worker.workers.dev"
      this.open = false;
      this.currentDoc = null;

      // 🔧 Datos de ejemplo (reemplaza 'url' por tus enlaces reales)
      this.items = [
        { title: 'Ejecución presupuestal 2025', year: '2025', period: 'Anual',  tipo: 'Ejecución presupuestal', format: 'PDF', url: '#' },
        { title: 'Informe contable enero 2025', year: '2025', period: 'Enero',  tipo: 'Informe contable',       format: 'PDF', url: '#' },
        { title: 'Informe contable febrero 2025', year: '2025', period: 'Febrero', tipo: 'Informe contable',    format: 'PDF', url: '#' },
      ];
    }

    // ====== Utilidades ======
    _styles(){
      return html`
        <style>
          .card{ border-radius:1rem; border:1px solid rgba(15,23,42,.12); background:#fff; box-shadow:0 8px 24px rgba(2,8,20,.06); }
          .chip{ display:inline-flex; align-items:center; gap:.4rem; padding:.25rem .55rem; border-radius:9999px; font-size:.75rem; border:1px solid; }
          .chip-blue{ color:#0369a1; background:#e0f2fe; border-color:#bae6fd; }
          .chip-gray{ color:#334155; background:#f8fafc; border-color:#e2e8f0; }
          .chip-green{ color:#047857; background:#ecfdf5; border-color:#a7f3d0; }
          .btn{ border-radius:.75rem; }
          .btn-outline{ border:1px solid #e5e7eb; background:#fff; }
          .btn-blue{ background:#1d4ed8; color:#fff; }
          .grid{ display:grid; gap:1rem; }
          @media (min-width:40rem){ .grid{ grid-template-columns: repeat(2,minmax(0,1fr)); } }
          @media (min-width:64rem){ .grid{ grid-template-columns: repeat(3,minmax(0,1fr)); } }
          /* Modal */
          .scrim{ position:fixed; inset:0; background:rgba(15,23,42,.75); backdrop-filter: blur(3px); z-index:9999; display:flex; align-items:center; justify-content:center; padding:1rem; }
          .modal{ position:relative; width:100%; height:100%; max-width:1200px; max-height:85vh; border-radius:1rem; overflow:hidden; border:1px solid rgba(255,255,255,.15); background:#fff; }
          .close{ position:absolute; top:.5rem; right:.5rem; }
          .note{ font-size:.875rem; color:#475569; }
        </style>
      `;
    }

    get _years(){
      const set = new Set(this.items.map(i => i.year).filter(Boolean));
      return ['Todos', ...Array.from(set).sort((a,b)=> b.localeCompare(a))];
    }

    get _tipos(){
      const set = new Set(this.items.map(i => i.tipo).filter(Boolean));
      return ['Todos', ...Array.from(set).sort()];
    }

    get _filtered(){
      const q = (this.query||'').toLowerCase().trim();
      return this.items.filter(i => {
        const byQ = !q || [i.title,i.tipo,i.year,i.period].some(v => (v||'').toLowerCase().includes(q));
        const byY = this.year==='Todos' || i.year===this.year;
        const byT = this.tipo==='Todos' || i.tipo===this.tipo;
        return byQ && byY && byT;
      });
    }

    get _paginated(){
      const start = (this.page-1)*this.perPage;
      return this._filtered.slice(start, start + this.perPage);
    }

    _goto(p){
      const totalPages = Math.max(1, Math.ceil(this._filtered.length / this.perPage));
      this.page = Math.min(Math.max(1, p), totalPages);
    }

    _view(doc){
      if (!doc?.url || doc.url==='#') { window.alert('Agrega la URL del documento.'); return; }
      // Si existe <lectot-wie>, abre modal. Si no, abrir en pestaña.
      if (customElements.get('lectot-wie')){
        this.currentDoc = doc;
        this.open = true;
      } else {
        window.open(doc.url, '_blank');
      }
    }

    // ====== Render ======
    render(){
      const totalPages = Math.max(1, Math.ceil(this._filtered.length / this.perPage));
      return html`
        ${this._styles()}

        <section class="mw8 center ph3 ph4-ns pv4">
          <!-- Encabezado -->
          <header class="mb3">
            <h1 class="f3 f2-ns fw7 dark-blue ma0">Información financiera y contable</h1>
            <p class="mid-gray lh-copy mt2">
              Reúne los estados financieros, presupuestos y ejecución presupuestal de la entidad, asegurando la transparencia en el manejo de recursos.
            </p>
            <p class="note mt1">
              *Los documentos aquí publicados son de carácter informativo. Para versiones firmadas o con validez jurídica, consulta la oficina responsable.
            </p>
          </header>

          <!-- Filtros -->
          <div class="card pa3 pa3-ns mb3">
            <div class="flex flex-column flex-row-ns items-start items-center-ns">
              <div class="w-100 w-40-ns mr3-ns mb2 mb0-ns">
                <label class="db mb1 fw6 near-black" for="buscador">Buscar</label>
                <input id="buscador" class="input-reset ba b--black-20 br3 pa2 w-100"
                       type="search" placeholder="Buscar por nombre, tipo o periodo…"
                       @input=${e=>{ this.query = e.target.value; this.page=1; }} />
              </div>

              <div class="w-100 w-20-ns mr3-ns mb2 mb0-ns">
                <label class="db mb1 fw6 near-black" for="f-year">Año</label>
                <select id="f-year" class="ba b--black-20 br3 pa2 w-100"
                        @change=${e=>{ this.year = e.target.value; this.page=1; }}>
                  ${this._years.map(y => html`<option value=${y}>${y}</option>`)}
                </select>
              </div>

              <div class="w-100 w-25-ns mr3-ns mb2 mb0-ns">
                <label class="db mb1 fw6 near-black" for="f-tipo">Tipo</label>
                <select id="f-tipo" class="ba b--black-20 br3 pa2 w-100"
                        @change=${e=>{ this.tipo = e.target.value; this.page=1; }}>
                  ${this._tipos.map(t => html`<option value=${t}>${t}</option>`)}
                </select>
              </div>

              <div class="w-100 w-15-ns">
                <label class="db mb1 fw6 near-black" for="f-perpage">Resultados</label>
                <select id="f-perpage" class="ba b--black-20 br3 pa2 w-100"
                        @change=${e=>{ this.perPage = Number(e.target.value); this.page=1; }}>
                  ${[10,20,50].map(n => html`<option value=${n}>${n} por página</option>`)}
                </select>
              </div>
            </div>
            <p class="mt2 f6 mid-gray">${this._filtered.length} resultado(s)</p>
          </div>

          <!-- Galería -->
          <div class="grid">
            ${this._paginated.map(doc => html`
              <article class="card pa3">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="f5 fw7 near-black mt0 mb1">${doc.title}</h3>
                    <div class="mt1">
                      <span class="chip chip-gray mr1">${doc.year} · ${doc.period}</span>
                      <span class="chip chip-blue mr1">${doc.tipo}</span>
                      <span class="chip chip-green">${doc.format || 'PDF'}</span>
                    </div>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5z" fill="#0ea5e9"/>
                  </svg>
                </div>

                <div class="mt3 flex items-center">
                  <button class="btn btn-blue ph3 pv2 mr2 pointer"
                          @click=${()=> this._view(doc)}
                          ?disabled=${!doc.url || doc.url==='#'}>
                    Ver
                  </button>
                  <a class="btn btn-outline ph3 pv2 link mid-gray no-underline"
                     href=${doc.url || '#'} target="_blank" download
                     @click=${e=>{ if(!doc.url || doc.url==='#'){ e.preventDefault(); alert('Agrega la URL del documento.'); }}}
                  >Descargar</a>
                </div>
              </article>
            `)}
          </div>

          <!-- Paginación -->
          <div class="tc mt3">
            <button class="btn btn-outline ph3 pv2 mh1 pointer"
                    @click=${()=> this._goto(this.page-1)} ?disabled=${this.page<=1}>Anterior</button>
            <span class="mh2 f6 mid-gray">Página ${this.page} / ${totalPages}</span>
            <button class="btn btn-outline ph3 pv2 mh1 pointer"
                    @click=${()=> this._goto(this.page+1)} ?disabled=${this.page>=totalPages}>Siguiente</button>
          </div>
        </section>

        <!-- Modal visor -->
        ${this.open ? html`
          <div class="scrim" @click=${()=>{ this.open=false; this.currentDoc=null; }} aria-modal="true" role="dialog">
            <div class="modal" @click=${e=> e.stopPropagation()}>
              <button class="close btn btn-outline ph2 pv1 br2 pointer" @click=${()=>{ this.open=false; this.currentDoc=null; }} aria-label="Cerrar">✕</button>
              ${customElements.get('lectot-wie') && this.currentDoc?.url
                ? html`<lectot-wie
                        style="display:block;height:100%;"
                        urlpdf=${this.currentDoc.url}
                        proxyBase=${this.proxyBase || ''}
                      ></lectot-wie>`
                : html`
                    <div class="pa3">
                      <p class="mid-gray">No se encontró el visor integrado. Abre el documento en una pestaña nueva:</p>
                      <a class="link blue" target="_blank" href=${this.currentDoc?.url}>Abrir PDF</a>
                    </div>
                  `}
            </div>
          </div>
        ` : ''}
      `;
    }
  }

  customElements.define('financieray-contable-view', FinancierayContable);