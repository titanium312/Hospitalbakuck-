// app.js
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class CajonPqrsd extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      border: 2px solid #1976d2;
      border-radius: 8px;
      background-color: #f9f9f9;
      max-width: 400px;
      margin: 1rem auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    h3 {
      color: #1976d2;
      font-family: Arial, sans-serif;
      font-size: 1.2rem;
      margin: 0;
      text-align: center;
    }

    div {
      text-align: center;
    }
  `;

  render() {
    return html`
      <div>
        <h3>5. Cajón visible para PQRSD</h3>
      </div>
    `;
  }
}

customElements.define('cajon-pqrsd', CajonPqrsd);
