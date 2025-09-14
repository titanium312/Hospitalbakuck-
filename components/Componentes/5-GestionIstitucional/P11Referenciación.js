import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../herramienta/lectopdf.js';
import '../herramienta/dictador.js'; // ✅ agregado

export class Referenciaci extends LitElement {
  createRenderRoot() { return this; } // light DOM para Tachyons

  render() {
    return html`
      <!-- ✅ envolvemos en dictador-tts -->
      <dictador-tts ui lang="es-CO" rate="0.95" pitch="1" volume="1">
        <div class="pa3">
          <p class="lh-copy">
            Carpeta destinada a las solicitudes recibidas o emitidas para referenciar información institucional o de gestión.
          </p>

          <div class="hsja-card pa2 mt3">
            <lectot-wie aria-label="Solicitud de Relacionamiento Institucional"
              urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Solicitud%20de%20Relacionamiento%20Institucional.pdf">
            </lectot-wie>
          </div>

          <div class="hsja-card pa2 mt3">
            <lectot-wie aria-label="Procedimiento de Referenciación"
              urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Procedimiento%20de%20Referenciaci%C3%B3n.pdf">
            </lectot-wie>
          </div>
        </div>
      </dictador-tts>
    `;
  }
}

customElements.define('referenciaci-view', Referenciaci);
