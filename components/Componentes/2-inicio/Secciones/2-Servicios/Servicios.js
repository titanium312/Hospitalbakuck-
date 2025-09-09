import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class MenuHospital extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }

    nav {
      background: #fff;
      border: 1px solid #e5eaf0;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,.06);
      padding: 0.5rem 0.75rem;
      max-width: 20rem;
    }

    h3 {
      margin: 0 0 .5rem 0;
      font-size: .9rem;
      text-transform: uppercase;
      letter-spacing: .05em;
      color: #004080;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li + li { margin-top: .4rem; }

    button {
      width: 100%;
      text-align: left;
      border: 1px solid #e5eaf0;
      background: #fff;
      border-radius: 10px;
      padding: .6rem .75rem;
      font-size: .9rem;
      font-weight: 600;
      color: #333;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background .2s, border-color .2s;
    }
    button:hover { background: #f8fbff; border-color: #c3d8ff; }

    .arrow {
      transition: transform .25s ease;
    }
    .open .arrow {
      transform: rotate(90deg);
    }

    .panel {
      max-height: 0;
      overflow: hidden;
      transition: max-height .25s ease;
      font-size: .85rem;
      color: #555;
      padding-left: .5rem;
    }
    .open + .panel {
      max-height: 200px; /* lo suficiente para el texto */
      padding-top: .3rem;
    }
  `;

  static properties = {
    openId: { type: String }
  };

  constructor(){
    super();
    this.openId = null;
    this.items = [
      { id: 'usuarios',     titulo: 'Información para usuarios',     detalle: 'Accede a servicios y trámites como paciente o usuario.' },
      { id: 'funcionarios', titulo: 'Información para funcionarios', detalle: 'Recursos y soporte interno para funcionarios.' },
      { id: 'proveedores',  titulo: 'Información para proveedores',  detalle: 'Procesos de contratación y gestión para proveedores.' },
    ];
  }

  toggle(id){
    this.openId = this.openId === id ? null : id;
  }

  render(){
    return html`
      <nav>
        <h3>Navegación</h3>
        <ul>
          ${this.items.map(it => html`
            <li>
              <button
                class="${this.openId === it.id ? 'open' : ''}"
                @click=${()=>this.toggle(it.id)}
                aria-expanded=${this.openId === it.id}
              >
                <span>${it.titulo}</span>
                <span class="arrow">▶</span>
              </button>
              <div class="panel">
                ${this.openId === it.id ? html`${it.detalle}` : ''}
              </div>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }
}

customElements.define('servicios-hospital', MenuHospital);
