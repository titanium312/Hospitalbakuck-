import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class ControlInterno extends LitElement {
  createRenderRoot() { return this; } // light DOM para Tachyons

  render() {
    return html`<div class="pa3">nada</div>`;
  }
}

customElements.define('control-interno-view', ControlInterno);
