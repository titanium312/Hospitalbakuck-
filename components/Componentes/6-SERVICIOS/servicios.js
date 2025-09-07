import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class servicios extends LitElement {
  createRenderRoot() { return this; } // light DOM para Tachyons

  render() {
    return html`<div class="pa3">Hospital San Jorge de Ayapel servicios</div>`;
  }
}

customElements.define('servicios-x', servicios);
