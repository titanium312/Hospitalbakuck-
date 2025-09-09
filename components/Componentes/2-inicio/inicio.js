import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'
import './Secciones/1-VideoPanel/VideoPanel.js'
import './Secciones/2-Servicios/Servicios.js'
import './Secciones/2,5-MenuDestacado/PanelCentral.JS'
import './Secciones/3-GaleriaFotos/GaleriaFotos.js'
import './Secciones/4-BloqueInformacion/BloqueInformacion.js'

class inicio extends LitElement {


  render() {
    return html`
      <video-panel></video-panel>
      <servicios-hospital></servicios-hospital>
      <panel-central></panel-central>

      <galeria-estreno></galeria-estreno>
      <bloque-informacion></bloque-informacion>
    `;
  }
}
customElements.define('inicio-x', inicio)
