import { LitElement, html, css } from 'https://unpkg.com/lit@2.6.1/index.js?module';
import "./contenido/2-Servicios/CALENDARIO/CALENDARIO.js";
import "./contenido/2-Servicios/NOTICIAS/noticias-panel.js";
import "./contenido/2-Servicios/2-Servicios/Servicios.js";
import "./contenido/2-Servicios/pqr/PQRSD.js";

class PanelCentral extends LitElement {
  static styles = css`
    :host { display: block; }

    /* Ocupa todo el ancho de la pantalla */
    .wrap {
      width: 100%;
    }

    /* Layout móvil */
    .box {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-areas:
        "noticias"
        "calendario"
        "pqrsd"
        "servicios";
      gap: clamp(32px, 4vw, 48px);  /* más espacio entre filas/columnas */
      padding: clamp(16px, 3vw, 32px);
      align-items: start;
    }

    .box > * {
      min-width: 0;
      width: 100%;
      justify-self: stretch; /* cada item ocupa todo el ancho de su celda */
    }

    /* Áreas */
    .box > noticias-panel       { grid-area: noticias; }
    .box > salud-calendar-2025  { grid-area: calendario; }
    .box > cajon-pqrsd          { grid-area: pqrsd; }
    .box > servicios-hospital   { grid-area: servicios; }

    /* Tablet */
    @media (min-width: 720px) {
      .box {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          "noticias calendario"
          "noticias pqrsd"
          "servicios servicios";
        column-gap: clamp(40px, 5vw, 72px);  /* más separación horizontal */
      }
    }

    /* Desktop */
    @media (min-width: 1120px) {
      .box {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
          "noticias calendario servicios"
          "noticias pqrsd       servicios";
        column-gap: clamp(48px, 6vw, 96px); /* separación generosa */
        row-gap: clamp(32px, 4vw, 48px);
      }
    }
  `;

  render() {
    return html`
      <div class="wrap">
        <div class="box">
          <noticias-panel aria-label="Noticias y avisos"></noticias-panel>
          <salud-calendar-2025 aria-label="Calendario de Eventos en Salud 2025"></salud-calendar-2025>
          <cajon-pqrsd aria-label="Cajón visible para PQRSD"></cajon-pqrsd>
          <servicios-hospital aria-label="Grupos de Interés, Información y Servicios"></servicios-hospital>
        </div>
      </div>
    `;
  }
}

customElements.define('panel-central', PanelCentral);
