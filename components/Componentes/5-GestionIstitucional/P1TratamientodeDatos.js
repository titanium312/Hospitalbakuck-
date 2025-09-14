import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
// Importa el web component del dictador (ajusta la ruta si es necesario)
import '../herramienta/dictador.js';

export class TratamientodeDatos extends LitElement {
  // Light DOM para compatibilidad con Tachyons y estilos globales
  createRenderRoot () { return this; }

  render () {
    const file = {
      name: 'Aviso de Tratamiento de Datos Personales.pdf',
      description: 'Aviso de Tratamiento de Datos Personales',
      category: 'Documento aviso tratamiento de datos personales',
      type: 'Descargable',
      created: '2020-05-25',
      published: '2024-07-18',
      size: '0.08 MB',
      url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Pol%C3%ADtica%20Tratamiento%20de%20Datos%20Personales.pdf',
      downloads: 132,
      views: 18,
    };

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: 'Documento aviso tratamiento de datos personales',
      description: file.description,
      dateCreated: file.created,
      datePublished: file.published,
      about: 'Protección y tratamiento de datos personales',
      genre: file.category,
      encoding: {
        '@type': 'MediaObject',
        contentUrl: file.url,
        encodingFormat: 'application/pdf',
        contentSize: file.size,
      },
      interactionStatistic: [
        { '@type': 'InteractionCounter', interactionType: { '@type': 'DownloadAction' }, userInteractionCount: file.downloads },
        { '@type': 'InteractionCounter', interactionType: { '@type': 'ViewAction' }, userInteractionCount: file.views },
      ],
    };

    return html`
      <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

      <style>
        :host { color: #0f172a; }
        .card { background: #fff; border: 1px solid rgba(2,8,23,0.06); border-radius: 1rem; box-shadow: 0 4px 24px rgba(2,8,23,0.06); }
        .title { letter-spacing: -0.01em; }
        .meta dt { color: #475569; }
        .badge { display: inline-flex; align-items: center; gap: .375rem; font-weight: 600; border-radius: 999px; padding: .375rem .75rem; background: #f1f5f9; color: #0f172a; border: 1px solid rgba(2,8,23,0.06); }
        .btn { display: inline-flex; align-items: center; gap: .5rem; text-decoration: none; }
        .btn:focus-visible { outline: 3px solid #94a3b8; outline-offset: 3px; border-radius: .5rem; }
        .divider { height: 1px; background: rgba(2,8,23,0.06); }
        .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      </style>

      <!-- Dictador TTS con barra de control visible -->
      <dictador-tts ui lang="es-CO" rate="0.95" pitch="1" volume="1">
        <section class="pa3 pa4-ns">
          <header class="mb3 mb4-ns">
            <h2 class="title f3 f2-ns mt0 mb2">Documento aviso tratamiento de datos personales</h2>
            <p class="f5 lh-copy measure mv0 mid-gray">Listado de documentos</p>
          </header>

          <article class="card pa3 pa4-ns">
            <div class="flex items-center justify-between flex-column flex-row-ns gap2">
              <div class="w-100">
                <div class="flex items-center gap2 mb2">
                  <span class="badge mono" title="Tamaño del archivo">PDF · ${file.size}</span>
                  <span class="badge" title="Tipo de documento">${file.type}</span>
                  <span class="badge" title="Categoría">${file.category}</span>
                </div>
                <h3 class="f4 mv2">${file.name}</h3>
                <p class="mid-gray mv0">${file.description}</p>
              </div>

              <div class="mt3 mt0-ns flex items-center gap2">
                <a class="btn pv3 ph4 br2 bg-dark-blue white b"
                   href="${file.url}" target="_blank" rel="noopener noreferrer" download
                   aria-label="Descargar ${file.name} como PDF">
                  ${this._icon('download')} Descargar PDF
                </a>
                <a class="btn pv3 ph4 br2 ba b--black-10 bg-near-white dark-blue"
                   href="${file.url}" target="_blank" rel="noopener noreferrer"
                   aria-label="Abrir ${file.name} en el navegador">
                  ${this._icon('eye')} Ver en el navegador
                </a>
              </div>
            </div>

            <div class="divider mv3"></div>

            <dl class="meta f6 lh-copy mt0 flex flex-wrap">
              <dt class="w-100 w-30-ns gray">Fechas</dt>
              <dd class="w-100 w-70-ns mv0">
                Expedición: 25/05/2020 <span class="mh2">|</span> Publicación: 18/07/2024
              </dd>

              <dt class="w-100 w-30-ns gray mt3">Actividad</dt>
              <dd class="w-100 w-70-ns mv0 mt3">
                <span class="badge" aria-label="Descargas totales">${this._icon('download')} ${file.downloads}</span>
                <span class="badge ml2" aria-label="Visualizaciones totales">${this._icon('eye')} ${file.views}</span>
              </dd>
            </dl>
          </article>
        </section>
      </dictador-tts>
    `;
  }

  _icon (name) {
    const icons = {
      download: html`<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v8.586l2.293-2.293 1.414 1.414L12 16.414 7.293 11.707l1.414-1.414L11 12.586V4a1 1 0 0 1 1-1z"/><path fill="currentColor" d="M5 20a1 1 0 0 1-1-1v-3h2v2h12v-2h2v3a1 1 0 0 1-1 1H5z"/></svg>`,
      eye: html`<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 5c-5 0-9 4.5-10 7 1 2.5 5 7 10 7s9-4.5 10-7c-1-2.5-5-7-10-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8a3 3 0 100 6 3 3 0 000-6z"/></svg>`,
    };
    return icons[name] || html``;
  }
}

customElements.define('tratamientode-datos-view', TratamientodeDatos);
