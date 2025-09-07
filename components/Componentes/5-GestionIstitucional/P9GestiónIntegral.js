import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class GestionIntegral extends LitElement {
  createRenderRoot() { return this; } // light DOM para Tachyons
  render() { return html`<div class="pa3">


Sistema de gestión integral de calidad
Compartir
Buscar
Sistema obligatorio de garantía de calidad de la atención en salud
Sistema de Seguridad y Salud Ocupacional
Sistema institucional de control interno
Sistema de gestión ambiental
Todo sobre la Acreditación
Responsabilidad social empresarial
El Hospital San Jorge de Ayapel cuenta con una estructura denominada Sistema de Gestión Integral de Calidad que incorpora todos los sistemas y procesos del Hospital desde la calidad, asociados en temas estratégicos como: Sistema Obligatorio de Garantía de Calidad de la Atención en Salud (SOGCS), Sistema de Seguridad y Salud Ocupacional, Sistema de Gestión Ambiental y Modelo Estándar de Control Interno (MECI), de tal manera que éstos interactúan de una manera coordinada y sincronizada, con el propósito de aportar valor al negocio (excelencia en el desempeño) y alinearse a la Política de Calidad.



https://sical.gov.co/wp-content/uploads/2019/09/ONUDI_Poli%CC%81tica_Nacional_de_Calidad_Web.pdf
  </div>`; }
}

customElements.define('gestionintegral-view', GestionIntegral);
