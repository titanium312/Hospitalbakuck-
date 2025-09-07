import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

class Cabecera extends LitElement {
  // Light DOM para que Tachyons (CSS global) aplique
  createRenderRoot() { return this }

  render() {
    return html`
      <!-- ===== CABECERA (Tachyons) ===== -->
      <header
        aria-label="Barra superior GOV.CO"
        class="w-100 pv3"
        style="background-color:#004b8d;"
      >
        <div class="flex items-center justify-center">
          <a
            href="https://www.gov.co/"
            title="Gobierno de Colombia"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
          >
            <img
              src="https://www.hgm.gov.co/info/hgm/media/bloque239.png"
              alt="Gobierno de Colombia - GOV.CO"
              class="db"
              style="max-height:60px;"
            />
          </a>
        </div>
      </header>
    `
  }
}

customElements.define('cabecera-x', Cabecera)
