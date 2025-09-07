import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class ServiciosHospital extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    section {
      padding: 3rem 1rem;
      background: radial-gradient(1200px 400px at 95% 40%, rgba(0,123,255,.08), transparent 60%),
                  radial-gradient(1000px 380px at 10% 10%, rgba(0,123,255,.06), transparent 60%),
                  linear-gradient(#f7fbff, #eef6ff);
    }

    h2 {
      font-size: 2rem;
      font-weight: 600;
      color: #004080;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    p {
      text-align: center;
      font-size: 1rem;
      color: #555;
      margin-bottom: 1.5rem;
    }

    .decor-line {
      margin: 0 auto;
      width: 110px;
      height: 6px;
      border-radius: 3px;
      background: #a3c9ff;
      opacity: 0.5;
    }

    .cards {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    @media (min-width: 768px) {
      .cards {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .card {
      flex: 1;
      min-height: 140px;
      background: #fff;
      border: 1px solid #e5eaf0;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: pointer;
      transition: transform 0.25s ease, border-color 0.25s ease;
      padding: 1rem;
      text-decoration: none;
      color: inherit;
    }

    .card:hover {
      transform: scale(1.05);
    }

    .card.featured {
      border-color: #007bff;
    }

    .icon-box {
      width: 64px;
      height: 64px;
      border: 1px solid #74b3ff;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      color: #007bff;
    }

    .card-title {
      display: block;
      margin-top: 1rem;
      font-weight: 600;
      font-size: 0.95rem;
    }
  `;

  static properties = {
    featured: { type: String }
  };

  constructor() {
    super();
    this.featured = 'historia';
    this.items = [
      { id: 'citas', titulo: 'Citas Consulta Externa', icono: 'cal', href: '#' },
      { id: 'calendario', titulo: 'Calendario Citas', icono: 'cal-check', href: '#' },
      { id: 'lab', titulo: 'Resultados de laboratorio', icono: 'tube', href: '#' },
      { id: 'medicos', titulo: 'Nuestros Médicos', icono: 'steth', href: '#' },
      { id: 'historia', titulo: 'Solicitar historia clínica', icono: 'doc', href: '#' }
    ];
  }

  renderIcon(name) {
    const size = 24;
    switch (name) {
      case 'cal':
        return html`<svg width=${size} height=${size} fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="17" rx="2" ry="2"></rect>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <rect x="7" y="13" width="4" height="4" rx="1"></rect>
        </svg>`;
      case 'cal-check':
        return html`<svg width=${size} height=${size} fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="17" rx="2" ry="2"></rect>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <polyline points="8 16 10 18 16 12"></polyline>
        </svg>`;
      case 'tube':
        return html`<svg width=${size} height=${size} fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M10 2v6l-5.5 9a4 4 0 0 0 3.5 6h7a4 4 0 0 0 3.5-6L13 8V2"></path>
        </svg>`;
      case 'steth':
        return html`<svg width=${size} height=${size} fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M6 3v6a4 4 0 0 0 8 0V3"></path>
          <circle cx="18" cy="7" r="3"></circle>
          <path d="M14 13v2a5 5 0 0 1-5 5H8"></path>
        </svg>`;
      case 'doc':
        return html`<svg width=${size} height=${size} fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
          <path d="M14 2v6h6"></path>
          <line x1="9" y1="13" x2="15" y2="13"></line>
          <line x1="9" y1="17" x2="15" y2="17"></line>
        </svg>`;
      default:
        return null;
    }
  }

  render() {
    return html`
      <section>
        <div>
          <h2>Servicios Hospitalarios</h2>
          <p>Accede de forma rápida y segura a los principales servicios de atención al paciente.</p>
          <div class="decor-line"></div>
        </div>

        <div class="cards">
          ${this.items.map(item => html`
            <a class="card ${item.id === this.featured ? 'featured' : ''}" href=${item.href}>
              <div>
                <div class="icon-box">${this.renderIcon(item.icono)}</div>
                <span class="card-title">${item.titulo}</span>
              </div>
            </a>
          `)}
        </div>
      </section>
    `;
  }
}

customElements.define('servicios-hospital', ServiciosHospital);
