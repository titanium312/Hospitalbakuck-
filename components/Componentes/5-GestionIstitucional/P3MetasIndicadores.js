import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class MetasIndicadores extends LitElement {
  createRenderRoot() { return this; } // light DOM para Tachyons

  render() {
    return html`<div class="pa3">Metas e Indicadores</div>`;
  }
}

customElements.define('metas-indicadores-view', MetasIndicadores);
