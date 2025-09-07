import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

class Cabecera extends LitElement {
  createRenderRoot() { return this } // opcional, para aplicar CSS global (Tailwind, etc.)

  render() {
    return html`
      <!-- ===== CABECERA ===== -->
      <header
        aria-label="Barra superior GOV.CO"
        class="w-full bg-[#004b8d] py-2 text-center"
      >
        <a
          href="https://www.gov.co/"
          title="Gobierno de Colombia"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://www.hgm.gov.co/info/hgm/media/bloque239.png"
            alt="Gobierno de Colombia - GOV.CO"
            class="max-h-[60px] mx-auto"
          />
        </a>
      </header>
    `
  }
}

customElements.define('cabecera-x', Cabecera)
