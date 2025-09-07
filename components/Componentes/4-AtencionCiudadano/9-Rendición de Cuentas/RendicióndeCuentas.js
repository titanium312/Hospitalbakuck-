import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Rendiciondecuentas extends LitElement {
  createRenderRoot() { return this; } // light DOM para Tachyons
  render() { return html`<div>Componente de Rendición de Cuentas aquí</div>`; }
}

customElements.define('rendiciondecuentas-view', Rendiciondecuentas);
