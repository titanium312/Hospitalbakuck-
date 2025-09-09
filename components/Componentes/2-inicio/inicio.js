import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'
import './Secciones/1-VideoPanel/VideoPanel.js'
import './Secciones/2-Servicios/Servicios.js'
import './Secciones/3-GaleriaFotos/GaleriaFotos.js'
import './Secciones/4-BloqueInformacion/BloqueInformacion.js'
import './Secciones/2,5-MenuDestacado/noticias-panel.js'

class inicio extends LitElement {
  static styles = css`
    /* Fila 2 columnas: menú | noticias */
    .row {
      display: grid;
      grid-template-columns: minmax(260px, 28%) 1fr;
      gap: 1.25rem;
      align-items: stretch;          /* igual altura */
    }

    /* Asegura que los hosts ocupen el track completo y no se centren solos */
    .row > servicios-hospital,
    .row > noticias-panel {
      height: 100%;
      margin: 0;                     /* neutraliza márgenes del host */
      display: block;
    }

    /* Si tu noticias-panel traía un max-width interno, este host permitirá que crezca */
    .row > noticias-panel { width: 100%; }

    /* Responsive: apilar en pantallas pequeñas */
    @media (max-width: 960px){
      .row { grid-template-columns: 1fr; }
    }
  `;

  render() {
    return html`
      <video-panel></video-panel>

      <div class="row">
        <servicios-hospital></servicios-hospital>
        <noticias-panel></noticias-panel>
      </div>

      <galeria-estreno></galeria-estreno>
      <bloque-informacion></bloque-informacion>
    `;
  }
}
customElements.define('inicio-x', inicio)
