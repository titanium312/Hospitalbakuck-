import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../herramienta/lectopdf.js';
import '../herramienta/dictador.js'; // ⬅️ Activa <dictador-tts> y la API de voz

/**
 * <metas-indicadores-view>
 *
 * - Shadow DOM activado (encapsulación total).
 * - "micro-Tachyons" dentro del componente.
 * - Paleta limpia en celestes y blancos, estética hospitalaria.
 * - Tarjeta con borde suave, sombra aérea y hover sutil.
 * - Texto original intacto.
 */
export class MetasIndicadores extends LitElement {
  static styles = css`
    /* ===== Variables de color (celestes/blancos) ===== */
    :host {
      --azul-900: #0b3d91;  /* título/iconos */
      --azul-700: #0f5fa6;  /* acentos */
      --azul-500: #1b84e7;  /* botones/hover */
      --azul-200: #dbeafe;  /* borde suave */
      --celeste-50: #f5faff; /* fondo muy leve */
      --celeste-100: #eef6ff; /* bloques */
      --texto: #1f2d3d; 
      --muted: #55606e; 
      --shadow: 0 10px 28px rgba(13, 42, 78, 0.12);
      --radius-lg: 16px;
      --radius-md: 12px;
      --maxw: 1160px;
    }

    /* ===== Reset mínimo dentro del Shadow ===== */
    *, *::before, *::after { box-sizing: border-box; }
    :host { display: block; color: var(--texto); font: 16px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; background: transparent; }

    /* ===== micro-Tachyons (subset) ===== */
    .pa2 { padding: .5rem; }
    .pa3 { padding: 1rem; }
    .pa4 { padding: 2rem; }
    .pv3 { padding-top: 1rem; padding-bottom: 1rem; }
    .pv4 { padding-top: 2rem; padding-bottom: 2rem; }
    .ph3 { padding-left: 1rem; padding-right: 1rem; }
    .ph4 { padding-left: 2rem; padding-right: 2rem; }
    .mt0 { margin-top: 0; } .mb0 { margin-bottom: 0; }
    .mt2 { margin-top: .5rem; } .mb2 { margin-bottom: .5rem; }
    .mt3 { margin-top: 1rem; } .mb3 { margin-bottom: 1rem; }
    .mt4 { margin-top: 2rem; } .mb4 { margin-bottom: 2rem; }
    .br2 { border-radius: 8px; } .br3 { border-radius: var(--radius-md); } .br4 { border-radius: var(--radius-lg); }
    .ba { border-style: solid; border-width: 1px; }
    .b--light-blue { border-color: var(--azul-200); }
    .bg-white { background: #fff; }
    .bg-near-white { background: var(--celeste-50); }
    .bg-lightest-blue { background: var(--celeste-100); }
    .shadow-2 { box-shadow: var(--shadow); }
    .flex { display: flex; } .items-center { align-items: center; }
    .justify-between { justify-content: space-between; }
    .gap1 { gap: .5rem; } .gap2 { gap: 1rem; } .gap3 { gap: 1.5rem; }
    .w-100 { width: 100%; }
    .tc { text-align: center; }
    .f5 { font-size: 1rem; } .f4 { font-size: 1.25rem; } .f3 { font-size: 1.5rem; }
    .lh-copy { line-height: 1.6; }
    .dark-blue { color: var(--azul-900); }
    .muted { color: var(--muted); }

    /* breakpoints estilo Tachyons */
    @media (min-width: 30em) { /* ns */
      .pv4-ns { padding-top: 2rem; padding-bottom: 2rem; }
      .ph4-ns { padding-left: 2rem; padding-right: 2rem; }
      .f3-ns { font-size: 1.75rem; }
    }
    @media (min-width: 60em) { /* l */
      .ph5-l { padding-left: 3rem; padding-right: 3rem; }
      .f2-l { font-size: 2rem; }
    }

    /* ===== Layout del componente ===== */
    .container { max-width: var(--maxw); margin: 0 auto; }

    .hero { 
      background: linear-gradient(0deg, rgba(219,234,254,.35), rgba(219,234,254,.35)), var(--celeste-50);
      border: 1px solid var(--azul-200);
      border-radius: var(--radius-lg);
    }
    .heroIcon {
      width: 44px; height: 44px; border-radius: 50%;
      background: #fff; border: 1px solid var(--azul-200);
      display: grid; place-items: center;
      box-shadow: 0 6px 18px rgba(27,132,231,.12);
    }
    .heroIcon svg { width: 24px; height: 24px; fill: var(--azul-700); }

    .lead { color: var(--muted); }

    .hsja-card { 
      position: relative; background: #fff; border: 1px solid var(--azul-200); 
      border-radius: var(--radius-lg); box-shadow: var(--shadow); transition: transform .2s ease, box-shadow .2s ease;
    }
    .hsja-card::before { /* franja superior sutil */
      content: ""; position: absolute; inset: 0 0 auto 0; height: 6px; border-top-left-radius: var(--radius-lg); border-top-right-radius: var(--radius-lg);
      background: linear-gradient(90deg, var(--azul-700), var(--azul-500));
    }
    .hsja-card:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(13,42,78,.16); }

    /* Accesibilidad al focus */
    :host(:focus), :host(:focus-within) .hsja-card { outline: none; box-shadow: 0 0 0 3px rgba(27,132,231,.25), var(--shadow); }

    /* Espacio del viewer */
    .viewer { min-height: 60vh; }

    /* Texto auxiliar sobre el PDF */
    .subtle { font-size: .95rem; color: var(--muted); }
  `;

  render() {
    return html`
      <!-- Barra de control TTS + contenido “leíble” en el slot -->
      <dictador-tts ui lang="es-CO" rate="0.95" pitch="1" volume="1">
        <section class="bg-near-white pv3 pv4-ns">
          <div class="container ph3 ph4-ns ph5-l">
            <div class="hero pa3 pa4 br4">
              <div class="flex items-center gap2 mb2">
                <span class="heroIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false" aria-label="Indicadores">
                    <path d="M3 3h2v18H3V3zm16 10h2v8h-2v-8zM7 9h2v12H7V9zm8-6h2v18h-2V3zm-4 10h2v8h-2v-8z"/>
                  </svg>
                </span>
                <!-- Texto original del usuario (intacto) -->
                <p class="mt0 mb0 f4 f3-ns dark-blue lh-copy">
                  Define los compromisos, metas de gestión y resultados esperados del hospital, así como los indicadores de seguimiento.
                </p>
              </div>
              <p class="subtle mt2 mb0">Visualiza la matriz oficial directamente en el visor PDF integrado.</p>
            </div>

            <div class="hsja-card pa3 pa4 mt4">
              <div class="viewer">
                <lectot-wie
                  aria-label="Anexo Matriz de Indicadores MIPG-SOGC"
                  urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Matriz%20de%20Indicadores%20MIPG-SOGC.pdf">
                </lectot-wie>
              </div>
            </div>
          </div>
        </section>
      </dictador-tts>
    `;
  }
}

customElements.define('metas-indicadores-view', MetasIndicadores);
