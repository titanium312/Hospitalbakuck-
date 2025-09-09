import { LitElement, html, css, nothing } from "https://cdn.jsdelivr.net/npm/lit@3/+esm";
import { unsafeHTML } from "https://cdn.jsdelivr.net/npm/lit@3/directives/unsafe-html.js/+esm";
import { noticiasData } from "./noticias-data.js"; // mantiene el origen de datos externo

/**
 * <noticias-panel>
 * Versión "cuadriculada":
 * - Disposición a dos columnas en un mismo grid; ambos paneles son tarjetas del mismo tamaño visual.
 * - Estética hospitalaria (celestes/azules), bordes suaves, sombras sutiles.
 * - Mantiene deeplinking por hash, búsqueda y filtrado existentes.
 */
export class NoticiasPanel extends LitElement {
  static properties = {
    items: { type: Array },
    selectedSlug: { type: String },
    filter: { type: String },
    deeplink: { type: Boolean }
  };

  constructor() {
    super();
    this.items = [...noticiasData].sort((a, b) => (b.date > a.date ? 1 : -1));
    this.filter = "";
    this.deeplink = true;

    const fromHash = location.hash ? decodeURIComponent(location.hash.slice(1)) : "";
    this.selectedSlug =
      (fromHash && this.items.find(n => n.slug === fromHash)?.slug) ||
      this.items[0]?.slug ||
      "";

    this._onHashChange = this._onHashChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.deeplink) window.addEventListener("hashchange", this._onHashChange);
  }
  disconnectedCallback() {
    if (this.deeplink) window.removeEventListener("hashchange", this._onHashChange);
    super.disconnectedCallback();
  }

  _onHashChange() {
    const slug = decodeURIComponent(location.hash.slice(1));
    if (this.items.some(n => n.slug === slug)) {
      this.selectedSlug = slug;
    }
  }

  _select(slug) {
    this.selectedSlug = slug;
    if (this.deeplink) {
      history.replaceState(null, "", `#${encodeURIComponent(slug)}`);
    }
  }

  _onInputFilter(e) {
    this.filter = e.target.value || "";
  }

  get _filtered() {
    const q = (this.filter || "").toLowerCase().trim();
    if (!q) return this.items;
    return this.items.filter(n =>
      [n.title, n.author, n.slug, n.date].join(" ").toLowerCase().includes(q)
    );
  }

  static styles = css`
    :host {
      /* Paleta hospitalaria */
      --brand: #2296f3;
      --brand-600: #1976d2;
      --panel: #ffffff;
      --muted: #5c6f82;
      --ring: rgba(34, 150, 243, 0.25);
      --shadow: 0 6px 16px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.04);
      --radius: 16px;
      --radius-lg: 22px;
      --maxw: 1100px;

      color: #0b2a42;
      font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: block;
    }

    .container {
      max-width: var(--maxw);
      margin: 24px auto 40px;
      padding: clamp(12px, 3vw, 24px);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .title {
      font-size: clamp(1.25rem, 2vw + .5rem, 2rem);
      margin: 0;
      color: var(--brand-600);
      letter-spacing: .2px;
    }

    .toolbar { display: flex; align-items: center; gap: .5rem; }

    .search {
      inline-size: min(340px, 60vw);
      border: 1px solid #cfd9e3;
      background: #f8fbff;
      border-radius: 999px;
      padding: .65rem 1rem;
      font-size: .95rem;
      transition: box-shadow .2s ease, border-color .2s ease;
    }
    .search:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 6px var(--ring); }

    /* GRID principal: dos tarjetas hermanas del mismo "peso" */
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0,1fr));
      gap: 1.25rem;
      align-items: stretch;
    }
    @media (max-width: 960px) { .grid { grid-template-columns: 1fr; } }

    .card {
      background: var(--panel);
      border: 1px solid #d6e4f0;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-height: 540px; /* asegura "cuadriculado" en altura similar */
      animation: fadeSlide .35s ease both;
    }

    /* Tarjeta izquierda: listado (menú) */
    .menu-head {
      padding: .9rem 1rem;
      border-bottom: 1px solid #e0edf9;
      background: #e9f5ff;
      font-weight: 600;
      color: var(--brand-600);
    }
    .menu-list {
      flex: 1;
      overflow: auto;
      scrollbar-width: thin;
    }
    .headline {
      padding: .8rem 1rem;
      cursor: pointer;
      border-bottom: 1px solid #f0f4f9;
      transition: background .15s ease, border-left-color .15s ease;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: baseline;
      gap: .25rem .75rem;
    }
    .headline:hover { background: #f5faff; }
    .headline[aria-current="page"] {
      background: #ffffff;
      border-left: 4px solid var(--brand);
    }
    .headline strong { font-weight: 600; color: #0b2a42; }
    .headline time { color: var(--muted); font-size: .85rem; }

    /* Tarjeta derecha: detalle */
    .hero { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; }

    .body { padding: 1.25rem 1.25rem 1.5rem; display: flex; flex-direction: column; gap: .75rem; }
    .a-title { font-size: 1.6rem; margin: 0; color: var(--brand-600); }
    .a-meta { font-size: .9rem; color: var(--muted); }
    .content { font-size: 1rem; line-height: 1.7; max-width: 70ch; }
    .content p { margin: 0 0 1rem; }
    .content img { max-width: 100%; border-radius: 12px; }
    .content a { color: var(--brand); text-decoration: none; }
    .content a:hover { text-decoration: underline; }

    @keyframes fadeSlide {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  render() {
    const items = this._filtered;
    const sel = items.find(n => n.slug === this.selectedSlug) || items[0];

    return html`
      <div class="container">
        <header class="header">
          <h1 class="title">Noticias</h1>
          <div class="toolbar">
            <input
              class="search"
              type="search"
              placeholder="Buscar por título, autor o fecha…"
              .value=${this.filter}
              @input=${this._onInputFilter}
              aria-label="Buscar noticias" />
          </div>
        </header>

        <div class="grid">
          <!-- Tarjeta: menú/listado -->
          <aside class="card" role="navigation" aria-label="Listado de noticias">
            <div class="menu-head">Últimas publicaciones</div>
            <div class="menu-list">
              ${items.map(n => html`
                <div
                  class="headline"
                  aria-current=${this.selectedSlug === n.slug ? "page" : nothing}
                  @click=${() => this._select(n.slug)}>
                  <strong>${n.title}</strong>
                  <time>${n.date}</time>
                </div>
              `)}
            </div>
          </aside>

          <!-- Tarjeta: detalle de noticia -->
          <article class="card">
            ${sel ? html`
              ${sel.image ? html`<img class="hero" src=${sel.image} alt="">` : nothing}
              <div class="body">
                <h2 class="a-title">${sel.title}</h2>
                <div class="a-meta">${sel.date} — ${sel.author || ""}</div>
                <div class="content">${unsafeHTML(sel.html)}</div>
              </div>
            ` : html`<div class="body"><p>Selecciona una noticia.</p></div>`}
          </article>
        </div>
      </div>
    `;
  }
}

customElements.define("noticias-panel", NoticiasPanel);
