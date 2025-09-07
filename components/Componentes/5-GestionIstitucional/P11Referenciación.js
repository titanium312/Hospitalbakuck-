import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Referenciaci extends LitElement {
  createRenderRoot() { return this; } // light DOM para Tachyons

  render() {
    return html`<div class="pa3">Referenciación</div>`;
  }
}

customElements.define('referenciaci-view', Referenciaci);
