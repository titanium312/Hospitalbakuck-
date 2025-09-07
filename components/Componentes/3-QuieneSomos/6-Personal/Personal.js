// app.js
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import "./Directorio.js"

class AspirantesApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      background: #ffffff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #0f3d6e;
    }

    section {
      width: 100%;
      padding: 4rem 2rem;
      box-sizing: border-box;
      background: #ffffff;
    }

    .container {
      max-width: 90rem;
      margin: 0 auto;
      padding: 3rem 2rem;
      border-radius: 1.5rem;
      box-shadow: 0 1rem 2.5rem rgba(0, 90, 170, 0.08);
      border: 1px solid rgba(2, 132, 199, 0.1);
      animation: fadeInUp .7s ease;
    }

    h2 {
      text-align: center;
      color: #0f3d6e;
      font-size: 2.5rem;
      margin-bottom: 2rem;
      letter-spacing: .5px;
    }

    p {
      margin-bottom: 1.5rem;
      max-width: 75ch;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.7;
    }

    .button-link {
      display: inline-block;
      padding: 0.8rem 2rem;
      background-color: #0f3d6e;
      color: #fff;
      text-decoration: none;
      border-radius: 9999px;
      font-weight: 600;
      transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
    }

    .button-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(15,61,110,0.25);
      opacity: .95;
    }

    .actions {
      text-align: center;
      margin: 2.5rem 0;
    }

    /* Botón pegable */
    .toggle-btn {
      margin-top: 1rem;
      cursor: pointer;
      background: #1d4ed8;
      border: none;
      padding: 0.8rem 2rem;
      color: white;
      border-radius: 9999px;
      font-size: 1rem;
      font-weight: 600;
      transition: background 0.3s ease, transform 0.2s ease;
    }

    .toggle-btn:hover {
      background: #0f3d6e;
      transform: translateY(-1px);
    }

    .accordion {
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.5s ease, opacity 0.5s ease;
      opacity: 0;
    }

    .accordion.open {
      max-height: 1500px; /* suficiente para mostrar contenido */
      opacity: 1;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  static properties = {
    showDirectorio: { type: Boolean }
  };

  constructor() {
    super();
    this.showDirectorio = false;
  }

  toggleDirectorio() {
    this.showDirectorio = !this.showDirectorio;
  }

  render() {
    return html`
      <section>
        <div class="container">
          <h2>Portal de Aspirantes</h2>

          <p>
            En cumplimiento de la normatividad vigente y con el propósito de garantizar la transparencia en los procesos de selección, 
            el <strong>Hospital San Jorge de Ayapel</strong> pone a disposición de la ciudadanía el acceso a la información de quienes aspiran 
            a ocupar cargos públicos en nuestra institución.
          </p>

          <p>
            Las hojas de vida de los aspirantes se encuentran publicadas en el enlace oficial de la 
            <strong>Presidencia de la República</strong>, dentro del aplicativo de <em>Aspirantes a Cargos Públicos</em>, 
            permitiendo la consulta abierta por parte de cualquier ciudadano.
          </p>

          <p>
            Este espacio busca fortalecer la confianza, el acceso a la información y la participación ciudadana, 
            asegurando procesos claros y verificables en la designación de cargos públicos.
          </p>

          <p>
            Las hojas de vida de los aspirantes a cargos públicos de libre nombramiento y remoción se encuentran disponibles 
            para consulta ciudadana en el sistema oficial de la Presidencia de la República de Colombia.
          </p>

          <p><strong>Puedes acceder directamente al portal aquí:</strong></p>

          <div class="actions">
            <a href="https://aspirantes.presidencia.gov.co" target="_blank" class="button-link">
              Ir al Portal de Aspirantes
            </a>
          </div>

          <!-- Botón para mostrar/ocultar directorio -->
          <div class="actions">
            <button class="toggle-btn" @click=${this.toggleDirectorio}>
              ${this.showDirectorio ? 'Ocultar Directorio Institucional' : 'Ver Directorio Institucional'}
            </button>
          </div>

          <!-- Contenedor plegable -->
          <div class="accordion ${this.showDirectorio ? 'open' : ''}">
            <directorio-institucional></directorio-institucional>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('personal-app', AspirantesApp);
