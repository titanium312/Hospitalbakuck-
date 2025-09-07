
  import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

  export class Protecci extends LitElement {
    createRenderRoot() { return this; } // Light DOM para Tachyons

    static properties = {
      titulo: { type: String },
      descripcion: { type: String },
      categoria: { type: String },
      tipoDoc: { type: String },
      items: { type: Array }, // [{nombre, descripcion, peso, expide, publica, descargas, vistas, url}]
      mostrar: { type: Number }, // cantidad a mostrar
      mostrarSelector: { type: Boolean }, // si muestras el selector "Mostrar N resultados"
    };

    constructor() {
      super();
      this.titulo = 'Política de protección y uso de datos personales';
      this.descripcion = 'Documento que establece lineamientos para la recolección, manejo y protección de datos en cumplimiento de la Ley 1581 de 2012.';
      this.categoria = 'Política de protección y uso de datos personales';
      this.tipoDoc = 'Tipo no definido';
      this.mostrar = 10;
      this.mostrarSelector = true;

      this.items = [
        {
          nombre: 'Política de Protección de Datos Personales.pdf',
          descripcion: 'Política de Protección de Datos Personales',
          peso: '0.10 MB',
          expide: '10/02/2023',
          publica: '18/07/2024',
          descargas: 132,
          vistas: 26,
          url: 'https://www.minjusticia.gov.co/ministerio/Documents/SIG/_pol%C3%ADtica%20de%20tratamiento%20y%20protecci%C3%B3n%20datos%20personales.pdf',
          formato: 'PDF'
        }
      ];
    }

    #onChangeMostrar(e) {
      const val = parseInt(e.target.value, 10);
      if (!Number.isNaN(val)) this.mostrar = val;
      this.requestUpdate();
    }

    render() {
      const lista = (this.items || []).slice(0, this.mostrar);

      return html`
        <style>
          .pdx {
            --pdx-accent: #0e8a6a;
            --pdx-muted: #4b5563;
            color: #1f2937;
          }
          .pdx .pdx-card {
            border: 1px solid rgba(0,0,0,.07);
            border-radius: 1rem;
            box-shadow: 0 4px 18px rgba(0,0,0,.06);
            background: #fff;
          }
          .pdx .pdx-chip { background: rgba(14,138,106,.1); color: var(--pdx-accent); }
          .pdx .pdx-link { color: var(--pdx-accent); text-decoration: underline; }
          .pdx .pdx-link:hover { text-decoration: none; }
          .pdx .pdx-meta dt { color: var(--pdx-muted); }
          @media (prefers-color-scheme: dark) {
            .pdx { color: #e5e7eb; }
            .pdx .pdx-card { background: #111827; border-color: rgba(255,255,255,.06); }
            .pdx .pdx-meta dt { color: #9ca3af; }
          }
        </style>

        <section class="pdx mw8 center pa3 pa4-ns">
          <!-- Header -->
          <header class="mb3 mb4-ns">
            <h1 class="f3 f2-ns fw7 mv2">${this.titulo}</h1>
            <p class="lh-copy mid-gray">${this.descripcion}</p>

            <div class="flex flex-wrap items-center mt3">
              <a class="link dim mr3 mb2" href="#categorias" aria-label="Ir a categorías">Ir a categorías</a>
              <a class="link dim mr3 mb2" href="#ayuda" aria-label="Ayuda">Ayuda</a>
              <button class="mr3 mb2 pointer bg-transparent ba b--black-20 br2 ph3 pv2" type="button" aria-label="Compartir" @click=${() => navigator.share?.({ title: this.titulo })}>
                Compartir
              </button>
              <label class="mb2 flex items-center" for="buscador">
                <span class="mr2">Buscar</span>
                <input id="buscador" type="search" class="input-reset ba b--black-20 br2 ph2 pv1" placeholder="Escribe para filtrar…" @input=${this.#filtrar}/>
              </label>
            </div>

            <div class="mt3 flex items-center">
              <div class="pdx-chip br-pill ph3 pv1 fw6 f6 mr2">${this.categoria}</div>
              <div class="pdx-chip br-pill ph3 pv1 fw6 f6">${this.tipoDoc}</div>
            </div>
          </header>

          <!-- Controles -->
          <div class="flex items-center justify-between mb2">
            <div class="fw6">Listado de documentos</div>
            ${this.mostrarSelector ? html`
              <label class="f6 mid-gray">
                Mostrar
                <select class="ml2 ba b--black-20 br2" @change=${this.#onChangeMostrar}>
                  ${[5,10,20,50].map(n => html`<option ?selected=${n===this.mostrar}>${n}</option>`)}
                </select>
                resultados
              </label>
            `: ''}
          </div>

          <!-- Lista -->
          <div role="list" aria-label="Resultados de documentos">
            ${lista.map((d, i) => html`
              <article role="listitem" class="pdx-card pa3 pa4-ns mb3">
                <div class="flex items-start justify-between">
                  <div>
                    <div class="flex items-center mb2">
                      <span class="br2 ph2 pv1 mr2 bg-black-05">${d.formato || 'PDF'}</span>
                      <span class="mid-gray f6">${d.peso || ''}</span>
                    </div>
                    <h2 class="f5 f4-ns fw7 mv1">${d.nombre}</h2>
                    <p class="mid-gray mt1 mb3">${d.descripcion || ''}</p>

                    <dl class="pdx-meta f6 lh-copy mv0">
                      <div class="flex flex-wrap">
                        <dt class="w-100 w-auto-ns mr2">Categoría:</dt>
                        <dd class="ma0 mr3">${this.categoria}</dd>
                        <dt class="w-100 w-auto-ns mr2">Tipo de documento:</dt>
                        <dd class="ma0 mr3">${this.tipoDoc}</dd>
                      </div>
                      <div class="flex flex-wrap mt1">
                        <dt class="w-100 w-auto-ns mr2">Fechas:</dt>
                        <dd class="ma0 mr3">
                          Expedición: ${d.expide || '—'} | Publicación: ${d.publica || '—'}
                        </dd>
                      </div>
                      <div class="flex flex-wrap mt1">
                        <dt class="w-100 w-auto-ns mr2">Descargas:</dt>
                        <dd class="ma0 mr3">${d.descargas ?? '0'}</dd>
                        <dt class="w-100 w-auto-ns mr2">Visualizaciones:</dt>
                        <dd class="ma0">${d.vistas ?? '0'}</dd>
                      </div>
                    </dl>
                  </div>

                  <div class="ml3 mt1">
                    <a
                      class="pdx-link fw6 db mb2"
                      href=${d.url}
                      target="_blank" rel="noopener noreferrer"
                      aria-label=${`Abrir ${d.nombre}`}>
                      Abrir documento
                    </a>
                    <a
                      class="link dim db"
                      download
                      href=${d.url}
                      aria-label=${`Descargar ${d.nombre}`}>
                      Descargar
                    </a>
                  </div>
                </div>
              </article>
            `)}
          </div>
        </section>
      `;
    }

    // Filtrado simple por texto sobre nombre y descripción
    #filtrar = (e) => {
      const q = (e.target.value || '').toLowerCase();
      this.items = this.items.map(x => ({ ...x, __hide: q && !(`${x.nombre} ${x.descripcion}`.toLowerCase().includes(q)) }));
      // reordenar: visibles primero
      const visibles = this.items.filter(x => !x.__hide);
      const ocultos  = this.items.filter(x => x.__hide);
      this.items = [...visibles, ...ocultos];
      this.requestUpdate();
    }
  }

  customElements.define('proteccion-datos', Protecci);

