import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Transparencia extends LitElement {
  createRenderRoot() { return this; } // light DOM para Tachyons

  render() {
    return html`<div class="pa3">Hospital San Jorge de Ayapel Transparencia</div>`;
  }
}

customElements.define('transparencia-x', Transparencia);