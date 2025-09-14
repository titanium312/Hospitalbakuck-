// directorio-institucional.js
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../../herramienta/dictador.js';
import '../../herramienta/lectopdf.js';
import '../../herramienta/contador/visit-counter.js';

class DirectorioInstitucional extends LitElement {
  static styles = css`
    :host {
      --accent: #1e3a8a;        /* Azul fuerte */
      --accent-light: #2563eb;  /* Azul vivo */
      --accent-soft: #dbeafe;   /* Azul muy suave */
      --bg: #ffffff;            /* Fondo blanco */
      --fg: #1e293b;            /* Texto gris oscuro */
      --muted: #475569;         /* Gris intermedio */
      --card: #ffffff;
      --card-border: #e2e8f0;
      --ring: rgba(37, 99, 235, 0.25);

      display: block;
      color: var(--fg);
      font-family: "Segoe UI", Roboto, Arial, sans-serif;
      background: var(--bg);
      padding: 1.5rem;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
    }

    h2 {
      margin: 0;
      font-size: 1.8rem;
      color: var(--accent);
    }

    .kicker {
      margin-top: .25rem;
      font-size: 1rem;
      color: var(--muted);
    }

    view-counter {
      display: block;
      margin-top: .5rem;
      font-size: .9rem;
      color: var(--muted);
    }

    .grid {
      display: grid;
      gap: 1.5rem;
    }

    @media (min-width: 720px) {
      .grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    .card {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 1rem 1.25rem;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      transition: transform .25s ease, box-shadow .25s ease;
    }

    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.08);
      border-color: var(--accent-light);
    }

    .card h3 {
      margin-top: 0;
      color: var(--accent-light);
      font-size: 1.2rem;
    }

    p {
      color: var(--fg);
      line-height: 1.6;
    }

    .divider {
      height: 2px;
      background: var(--accent-soft);
      margin: .75rem 0 1rem 0;
      border-radius: 1px;
    }

    .badge {
      display: inline-block;
      padding: .3rem .75rem;
      border-radius: 20px;
      background: var(--accent-soft);
      color: var(--accent);
      font-size: .8rem;
      font-weight: 600;
      margin-bottom: .5rem;
    }

    /* PDF */
    lectot-wie {
      display: block;
      border: 1px solid var(--card-border);
      border-radius: 10px;
      background: var(--bg);
      transition: border-color .25s ease, box-shadow .25s ease;
    }

    lectot-wie:hover {
      border-color: var(--accent-light);
      box-shadow: 0 0 0 4px var(--ring);
    }
  `;

  render() {
    return html`
      <div class="container">
        <dictador-tts ui lang="es-CO" rate="1" pitch="1">
          <header class="header">
            <span class="badge">Directorio Institucional</span>
            <h2>Directorio y Gestión del Talento Humano</h2>
            <p class="kicker">Transparencia, cercanía y acceso a la información</p>
          </header>

          <div class="grid">
            <section class="card">
              <h3>Información general</h3>
              <div class="divider"></div>
              <p>
                Aquí encontrará la información básica de nuestro equipo de trabajo: nombres, cargos,
                dependencias, formación académica y datos de contacto institucional, con el fin de garantizar
                transparencia y cercanía con la comunidad.
              </p>
            </section>

            <section class="card">
              <h3>📄 Documento anexo</h3>
              <div class="divider"></div>
              <p>Directorio de servidores públicos (PDF)</p>
              <lectot-wie
                urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Directorio%20de%20Servidores%20p%C3%BAblicos.pdf">
              </lectot-wie>
            </section>
          </div>
        </dictador-tts>
      </div>
    `;
  }
}

customElements.define('directorio-institucional', DirectorioInstitucional);
