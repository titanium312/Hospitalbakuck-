import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Historiaclinica extends LitElement {
  createRenderRoot() { return this; } // Light DOM para aplicar Tachyons/globales

  render() {
    return html`
      <style>
        .wrap {
          background: #fff;
          border: 1px solid #D6F0FA;
          border-radius: 1rem;
          box-shadow: 0 8px 28px rgba(0,0,0,.06);
        }
        .ribbon {
          background: #E6F7FD;
          height: .5rem;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          border-bottom: 1px solid #D6F0FA;
        }
        .literal {
          white-space: pre-wrap; /* respeta saltos de línea */
          color: #333;
        }
        a {
          color: #00A8E8;
          font-weight: 600;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>

      <section class="pa3 pa4-ns">
        <div class="wrap">
          <div class="ribbon"></div>
          <div class="pa3 pa4-ns literal lh-copy f5">
Historia clínica
Como usuario tiene derecho a obtener la historia clínica personal, conozca detalles y siga las instrucciones entregadas en el siguiente enlace:

Consulte aquí : <a href="https://www.gov.co/servicios-y-tramites/T16155" target="_blank" rel="noopener">
https://www.gov.co/servicios-y-tramites/T16155</a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('historiaclinica-view', Historiaclinica);
