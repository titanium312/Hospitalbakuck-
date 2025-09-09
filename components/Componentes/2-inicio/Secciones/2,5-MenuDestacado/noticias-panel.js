import { LitElement, html, css, nothing } from "https://cdn.jsdelivr.net/npm/lit@3/+esm";
import { unsafeHTML } from "https://cdn.jsdelivr.net/npm/lit@3/directives/unsafe-html.js/+esm";
import { noticiasData } from "./noticias-data.js"; // 👈 Importas el array

class NoticiasPanel extends LitElement {
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

      display: block;
      color: #0b2a42;
      font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
     
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

    .layout { display: grid; grid-template-columns: 320px minmax(0,1fr); gap: 1.25rem; }
    @media (max-width: 960px) { .layout { grid-template-columns: 1fr; } }

    .sidebar {
      position: sticky;
      top: 16px;
      align-self: start;
      background: var(--panel);
      border: 1px solid #d6e4f0;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .list { max-height: min(70vh, 820px); overflow: auto; scrollbar-width: thin; }
    .section-head {
      padding: .85rem 1rem;
      border-bottom: 1px solid #e0edf9;
      background: #e9f5ff;
      font-weight: 600;
      color: var(--brand-600);
    }

    .headline {
      padding: .7rem 1rem;
      cursor: pointer;
      border-bottom: 1px solid #f0f4f9;
      transition: background .15s ease;
    }
    .headline:hover { background: #f5faff; }
    .headline[aria-current="page"] {
      background: #ffffff;
      border-left: 4px solid var(--brand);
    }
    .headline strong { font-weight: 600; color: #0b2a42; }
    .headline time { color: var(--muted); font-size: .85rem; }

    .article {
      background: var(--panel);
      border: 1px solid #d6e4f0;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      overflow: hidden;
      animation: fadeSlide .35s ease both;
    }

    .hero { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; }

    .body { padding: 1.5rem; }
    .a-title { font-size: 1.8rem; margin: 0 0 .35rem 0; color: var(--brand-600); }
    .a-meta { font-size: .9rem; color: var(--muted); margin-bottom: 1rem; }
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

        <div class="layout">
          <aside class="sidebar">
            <div class="section-head">Últimas publicaciones</div>
            <div class="list">
              ${items.map(n => html`
                <div
                  class="headline"
                  aria-current=${this.selectedSlug === n.slug ? "page" : nothing}
                  @click=${() => this._select(n.slug)}>
                  <strong>${n.title}</strong><br>
                  <time>${n.date}</time>
                </div>
              `)}
            </div>
          </aside>

          <article class="article">
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
