

// app.js
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

class ContenedorApp extends LitElement {

render() {
    return html`
      <section class="pa4 bg-light-blue white br3 shadow-4">
        <h1 class="f2 tc">¡Hola Mundo!</h1>
      </section>
    `;
  }
}


customElements.define('contenedor-app', ContenedorApp)
