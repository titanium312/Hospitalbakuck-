// distinciones-galeria.js
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class DirectorioInstitucional extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 1.5rem;
      background-color: #fdfdfd;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      max-width: 800px;
      margin: auto;
      color: #333;
      line-height: 1.6;
    }

    h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    section {
      margin-bottom: 2rem;
    }

    .icon-title {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .emoji {
      margin-right: 0.5rem;
    }

    lectot-wie {
      display: block;
      margin-top: 1rem;
      border: 1px solid #ccc;
      padding: 0.5rem;
      border-radius: 4px;
    }
  `;

  render() {
    return html`
      <h2>Directorio y Gestión del Talento Humano</h2>

      <section>
        <p>
          Aquí encontrará la información básica de nuestro equipo de trabajo: nombres, cargos, dependencias, formación académica y datos de contacto institucional, con el fin de garantizar transparencia y cercanía con la comunidad.
        </p>
      </section>


      <section>
        <p><strong>📄 Documento Anexo:</strong></p>
        <lectot-wie urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Directorio%20de%20Servidores%20p%C3%BAblicos.pdf"></lectot-wie>
      </section>
    `;
  }
}



customElements.define('directorio-institucional', DirectorioInstitucional);
