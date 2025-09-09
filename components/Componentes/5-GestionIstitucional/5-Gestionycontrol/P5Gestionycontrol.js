
  import { LitElement, html, css } from "https://cdn.jsdelivr.net/npm/lit@3/+esm";
  import "./contenido/mipg.js";

  const defaultItems = [
    { id: 1,  title: "Auditoría Interna", slug: "auditoria-interna", status: "cerrado" },
    { id: 2,  title: "Entes de control y mecanismos de supervisión", slug: "entes-de-control-y-mecanismos-de-supervision", status: "cerrado" },
    { id: 3,  title: "FURAG Certificados", slug: "furag-certificados", status: "cerrado" },
    { id: 4,  title: "Certificados FURAG", slug: "certificados-furag", status: "cerrado" },
    { id: 5,  title: "Informes de Gestión", slug: "informes-de-gestion", status: "cerrado" },
    { id: 6,  title: "Metas e Indicadores", slug: "metas-indicadores", status: "cerrado" },
    { id: 7,  title: "MIPG", slug: "mipg", status: "cerrado" },
    { id: 8,  title: "Normatividad", slug: "normatividad", status: "cerrado" },
    { id: 9,  title: "Nueva carpeta", slug: "nueva-carpeta", status: "cerrado" },
    { id: 10, title: "PDI", slug: "pdi", status: "cerrado" },
    { id: 11, title: "Plan Anticorrupción (PAAC)", slug: "plan-anticorrupcion", status: "cerrado" },
    { id: 12, title: "Plan de Acción", slug: "plan-de-accion", status: "cerrado" },
    { id: 13, title: "Planes de mejoramiento", slug: "planes-de-mejoramiento", status: "cerrado" },
  ];

  class GestionControl extends LitElement {
    static properties = {
      items: { type: Array },
      selected: { type: Object },
      filter: { type: String },
    };

    constructor() {
      super();
      this.items = defaultItems;
      this.selected = null;
      this.filter = "";
    }

    firstUpdated() {
      // Muestra MIPG por defecto; si no existe, toma el primero.
      if (!this.selected && this.items?.length) {
        this.selected = this.items.find(i => i.slug === "mipg") || this.items[0];
      }
    }

    get _sorted() {
      // MIPG primero, luego alfabético
      const arr = [...(this.items || [])];
      arr.sort((a, b) => {
        if (a.slug === "mipg") return -1;
        if (b.slug === "mipg") return 1;
        return a.title.localeCompare(b.title, "es");
      });
      return arr;
    }

    get _filtered() {
      const q = (this.filter || "").toLowerCase().trim();
      if (!q) return this._sorted;
      return this._sorted.filter(i =>
        i.title.toLowerCase().includes(q) || i.slug.toLowerCase().includes(q)
      );
    }

    openItem(item, evt) {
      // Si hace Ctrl/Cmd click, que abra el link real en otra pestaña.
      if (evt?.metaKey || evt?.ctrlKey) return;
      evt?.preventDefault();
      this.selected = item;
      this.dispatchEvent(new CustomEvent("open", { detail: item }));
    }

    static styles = css`
      :host {
        display: block;
        --blue-25: #f8fbff;
        --blue-50: #eff6ff;
        --blue-100: #dbeafe;
        --blue-500: #1d4ed8;
        --blue-600: #1e40af;
        --slate-600: #475569;
        --slate-500: #64748b;
        --ink: #0f172a;
        --border: #e5e7eb;
        --radius: 16px;
        --shadow: 0 2px 8px rgba(16, 24, 40, 0.08);
        background: #fff;
        color: var(--ink);
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
      }

      .layout {
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 1.25rem;
        width: 100%;
      }
      @media (max-width: 900px) {
        .layout { grid-template-columns: 1fr; }
      }

      /* Sidebar */
      .sidebar {
        border: 1px solid var(--border);
        border-radius: var(--radius);
        background: linear-gradient(180deg, #fff 0%, var(--blue-25) 100%);
        box-shadow: var(--shadow);
        overflow: hidden;
      }
      .side-head {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--border);
      }
      .title {
        margin: 0;
        font-size: 1rem;
        font-weight: 700;
        color: var(--blue-600);
      }
      .search {
        margin-top: 0.5rem;
        width: 100%;
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 0.5rem 0.75rem;
        font-size: 0.95rem;
        outline: none;
        background: #fff;
      }
      .search:focus { border-color: var(--blue-500); box-shadow: 0 0 0 3px color-mix(in srgb, var(--blue-500) 28%, transparent); }

      .list { margin: 0; padding: 0.25rem; list-style: none; max-height: 70vh; overflow: auto; }
      .item a {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 0.25rem 0.5rem;
        align-items: center;
        padding: 0.6rem 0.65rem;
        border-radius: 10px;
        text-decoration: none;
        color: var(--ink);
        outline: none;
      }
      .item a:hover { background: var(--blue-50); }
      .item a:focus-visible { box-shadow: 0 0 0 3px color-mix(in srgb, var(--blue-500) 40%, transparent); background: var(--blue-50); }
      .item .name { font-size: 0.98rem; font-weight: 600; line-height: 1.2; }
      .item .slug { font-size: 0.8rem; color: var(--slate-500); grid-column: 1 / -1; }
      .badge {
        font-size: 0.72rem;
        padding: 0.15rem 0.45rem;
        border: 1px solid var(--border);
        border-radius: 999px;
        color: var(--slate-600);
        background: #fff;
        justify-self: end;
      }
      .item[aria-current="true"] a {
        background: #fff;
        border: 1px solid var(--blue-100);
      }

      /* Panel principal */
      .main {
        border: 1px solid var(--border);
        border-radius: var(--radius);
        background: #fff;
        box-shadow: var(--shadow);
        min-height: 240px;
        padding: 1rem;
      }
      .main-head {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--border);
        padding-bottom: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .main-title {
        margin: 0;
        font-size: 1.05rem;
        color: var(--blue-600);
        font-weight: 700;
      }
      .link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        text-decoration: none;
        font-weight: 600;
        border: 1px solid var(--blue-100);
        border-radius: 10px;
        padding: 0.4rem 0.6rem;
        background: var(--blue-50);
        color: var(--blue-600);
      }
      .link:hover { background: #fff; }
      .muted { color: var(--slate-500); font-size: 0.9rem; }

      /* Animación sutil */
      .fade-in { animation: fadeIn .22s ease both; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }
      @media (prefers-reduced-motion: reduce) { .fade-in { animation: none; } }
    `;

    render() {
      const items = this._filtered;
      return html`
        <div class="layout">
          <!-- Navegación izquierda -->
          <aside class="sidebar">
            <div class="side-head">
              <h2 class="title">Gestión y Control</h2>
              <label>
                <span class="visually-hidden">Filtrar</span>
                <input
                  class="search"
                  type="search"
                  placeholder="Filtrar por nombre o slug…"
                  .value=${this.filter}
                  @input=${(e) => (this.filter = e.target.value)}
                />
              </label>
            </div>
            <nav aria-label="Secciones" class="fade-in">
              <ul class="list">
                ${items.map(i => html`
                  <li class="item" aria-current=${this.selected?.id === i.id ? "true" : "false"}>
                    <a href="/${i.slug}" @click=${(e) => this.openItem(i, e)} aria-label="Abrir ${i.title}">
                      <span class="name">${i.title}</span>
                      <span class="badge">${i.status || ""}</span>
                      <span class="slug">${i.slug}</span>
                    </a>
                  </li>
                `)}
              </ul>
            </nav>
          </aside>

          <!-- Contenido derecho -->
          <section class="main fade-in" aria-live="polite">
            ${this.selected ? html`
              <header class="main-head">
                <h3 class="main-title">${this.selected.title}</h3>
                <a class="link" href="/${this.selected.slug}" target="_blank" rel="noopener">
                  Enlace público
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"/>
                  </svg>
                </a>
              </header>
              <mipg-x
                .page=${this.selected.title}
                page=${this.selected.title}
                .slug=${this.selected.slug}
                slug=${this.selected.slug}>
              </mipg-x>
            ` : html`
              <p class="muted">Selecciona un elemento de la lista para ver su contenido aquí.</p>
            `}
          </section>
        </div>
      `;
    }
  }

  customElements.define("gestion-control", GestionControl);

