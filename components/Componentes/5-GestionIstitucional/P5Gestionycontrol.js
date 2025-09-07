
  import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

  export class Gestionycontrol extends LitElement {
    createRenderRoot() { return this; }

    static properties = {
      titulo: { type: String },
      descripcion: { type: String },
      categorias: { type: Array }
    };

    constructor() {
      super();
      this.titulo = 'Planeación, gestión y control';
      this.descripcion =
        'Carpeta que agrupa los documentos estratégicos, planes e informes relacionados con la planeación institucional, el control interno y el seguimiento a la gestión.';

      this.categorias = [
        'Auditoría Interna',
        'Entes de control y mecanismos de supervisión',
        'FURAG Certificados',
        'Certificados FURAG',
        'Informes de Gestión',
        'Metas e Indicadores',
        'MIPG',
        'Normatividad',
        'Nueva carpeta',
        'PDI',
        'Plan Anticorrupción (PAAC)',
        'Plan de Acción',
        'Planes de mejoramiento'
      ];
    }

    render() {
      return html`
        <style>
          .gcx {
            --gcx-accent: #2b7bbb;
            --gcx-accent-light: #e6f1fb;
            --gcx-text: #0f172a;
            background: #ffffff; /* Fondo blanco fijo */
            color: var(--gcx-text);
          }

          .gcx-card {
            background: #fff;
            border: 1px solid rgba(43, 123, 187, 0.2);
            border-radius: 0.75rem;
            box-shadow: 0 4px 16px rgba(43, 123, 187, 0.08);
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }
          .gcx-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(43, 123, 187, 0.16);
          }

          .gcx-chip {
            background: var(--gcx-accent-light);
            color: var(--gcx-accent);
            border-radius: 9999px;
            padding: 0.25rem 0.75rem;
            font-weight: 600;
            display: inline-block;
          }

          .gcx-title {
            line-height: 1.15;
            letter-spacing: -0.01em;
          }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .gcx-anim { animation: fadeUp .4s ease both; }
        </style>

        <section class="gcx w-100 pv4 pv5-ns ph3 ph5-ns">
          <header class="tc gcx-anim">
            <div class="gcx-chip mb3">Gestión institucional</div>
            <h1 class="gcx-title f2 f1-ns fw7 mv2">${this.titulo}</h1>
            <p class="mid-gray f5 f4-ns">${this.descripcion}</p>
          </header>

          <div class="mt4 mt5-ns flex flex-wrap nl2 nr2 gcx-anim">
            ${this.categorias.map(
              (cat, i) => html`
                <article class="w-100 w-50-m w-33-l pa2">
                  <div class="gcx-card pa3 pa4-ns h-100" style="animation-delay:${i *
                  40}ms">
                    <div class="flex items-center">
                      <div
                        class="br-100 bg-light-blue pa2 mr3 flex items-center justify-center"
                        style="width:40px;height:40px;"
                      >
                        📂
                      </div>
                      <h2 class="f5 f4-ns fw6 mv0">${cat}</h2>
                    </div>
                  </div>
                </article>
              `
            )}
          </div>
        </section>
      `;
    }
  }

  customElements.define('gestion-control', Gestionycontrol);
