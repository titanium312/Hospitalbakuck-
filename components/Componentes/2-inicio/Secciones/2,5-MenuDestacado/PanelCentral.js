import { LitElement, html, css } from 'https://unpkg.com/lit@2.6.1/index.js?module';
import "./contenido/2-Servicios/CALENDARIO/CALENDARIO.js";
import "./contenido/2-Servicios/NOTICIAS/noticias-panel.js";

class PanelCentral extends LitElement {
  static styles = css`
    :host { display: block; }

    /* Contenedor: 2 columnas iguales + márgenes alrededor */
    .box {
      display: grid;
      grid-template-columns: 1fr 1fr; /* 50% / 50% */
      gap: 24px;                      /* espacio entre columnas */
      margin: 24px;                   /* márgenes: arriba/abajo/izq/der */
    }

    /* Evita overflow de los web components */
    .left, .right { min-width: 0; }
    .left > *, .right > * { display: block; width: 100%; }
  `;

  render() {
    return html`
      <div class="box">
        <div class="left">
          <salud-calendar-2025></salud-calendar-2025>
        </div>
        <div class="right">
          <noticias-panel></noticias-panel>
        </div>
      </div>
    `;
  }
}

customElements.define('panel-central', PanelCentral);
