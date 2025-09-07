
  import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

  export class Lineadetransparencia extends LitElement {
    // Light DOM para Tachyons / estilos globales
    createRenderRoot() { return this; }

    static properties = {
      telefono: { type: String },
      horario:  { type: String },
      email:    { type: String },
      formUrl:  { type: String },
      titulo:   { type: String },
      subtitulo:{ type: String }
    };

    constructor() {
      super();
      this.titulo    = 'Línea de transparencia';
      this.subtitulo = 'Juntos construimos transparencia';
      this.telefono  = '(604) 7705083';
      this.horario   = 'Lunes a sábado, 7:00 am a 5:00 pm';
      this.email     = 'gerencia@hospitalayapel.gov.co';
      this.formUrl   = '#'; // URL real del formulario
    }

    render() {
      return html`
        <style>
          /* Paleta hospitalaria (blanco + azules) y fondo SIEMPRE blanco */
          .ldx-transparencia {
            --ldx-accent: #2b7bbb;        /* azul principal */
            --ldx-accent-weak: #e6f1fb;   /* azul muy claro */
            --ldx-text: #0f172a;          /* texto */
            --ldx-muted: #475569;         /* texto secundario */
            background: #ffffff;
            color: var(--ldx-text);
          }

          /* Cinta decorativa superior para dar identidad */
          .ldx-ribbon {
            height: 6px;
            background: linear-gradient(90deg, var(--ldx-accent), #63a4df 60%, #9ec7ef);
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
          }

          .ldx-badge {
            background: var(--ldx-accent-weak);
            color: var(--ldx-accent);
            border: 1px solid rgba(43,123,187,.25);
          }

          .ldx-card {
            border: 1px solid rgba(43,123,187,.18);
            border-radius: 1rem;
            box-shadow: 0 6px 24px rgba(43,123,187,.08);
            background: #fff;
            transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
            will-change: transform, box-shadow;
          }
          .ldx-card:hover,
          .ldx-card:focus-within {
            transform: translateY(-4px);
            border-color: rgba(43,123,187,.35);
            box-shadow: 0 10px 28px rgba(43,123,187,.14);
          }

          .ldx-list li::marker { color: var(--ldx-accent); }
          .ldx-link { color: var(--ldx-accent); text-decoration: underline; }
          .ldx-link:hover { text-decoration: none; }
          .ldx-title { line-height: 1.15; letter-spacing: -.01em; }
          .ldx-subtitle { color: var(--ldx-muted); }

          /* Tarjetitas internas (teléfono/correo) */
          .ldx-subcard {
            border: 1px solid rgba(43,123,187,.18);
            border-radius: .75rem;
            background: #fff;
          }

          /* Animación suave de aparición */
          @keyframes ldx-fadeUp {
            from { opacity: 0; transform: translateY(6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .ldx-anim { animation: ldx-fadeUp .35s ease both; }

          @media (prefers-color-scheme: dark) {
            /* Mantener blanco aunque el sistema esté en dark */
            .ldx-transparencia { background: #ffffff; color: var(--ldx-text); }
            .ldx-card, .ldx-subcard { background: #fff; border-color: rgba(43,123,187,.18); }
          }
        </style>

        <section class="ldx-transparencia w-100">
          <div class="mw8 center ph3 ph4-m ph5-l pv4 pv5-l">
            <!-- Encabezado -->
            <header class="tc ldx-anim">
              <div class="ldx-badge dib ph3 pv1 br-pill fw6 f6 mb3">Transparencia y Ética</div>
              <h1 class="ldx-title f2 f1-ns fw7 mt2 mb2">${this.titulo}</h1>
              <p class="ldx-subtitle f5 f4-ns mt0">${this.subtitulo}</p>
            </header>

            <!-- Cuerpo -->
            <article class="ldx-card mt4 ldx-anim">
              <div class="ldx-ribbon"></div>
              <div class="pa3 pa4-ns">
                <p class="lh-copy f5 mt0">
                  El Hospital San Jorge de Ayapel, comprometido con la transparencia en la gestión, la administración de los recursos
                  y el fortalecimiento de la cultura de la integridad y la ética, pone a disposición de sus grupos de interés un
                  canal independiente para reportar de manera confidencial y anónima actividades que vayan en contra de los principios
                  éticos, incumplimiento de procedimientos, fraudes, lavado de activos, comportamientos laborales inadecuados y otros
                  eventos que vulneren las políticas institucionales.
                </p>

                <div class="mt4">
                  <h2 class="f4 fw7 mb2">¿Qué puedo reportar?</h2>
                  <ul class="ldx-list pl3 ml3 lh-copy f5">
                    <li>Fraude</li>
                    <li>Soborno y corrupción</li>
                    <li>Conflicto de interés</li>
                    <li>Mal uso de los recursos</li>
                    <li>Falsedad en documentos</li>
                    <li>Irregularidades en el cumplimiento de políticas</li>
                    <li>Inadecuados comportamientos laborales</li>
                    <li>Revelación o uso indebido de la información</li>
                  </ul>
                </div>

                <div class="mt4">
                  <h2 class="f4 fw7 mb3">¿Dónde me puedo comunicar?</h2>

                  <div class="flex flex-column flex-row-ns gap mb3">
                    <div class="w-100 w-50-ns pr0 pr3-ns mb3 mb0-ns">
                      <div class="ldx-subcard pa3 h-100">
                        <div class="fw6 mb2">📞 Línea telefónica</div>
                        <div class="lh-copy">
                          <a class="ldx-link fw6" href=${`tel:${this.telefono.replace(/[^\d+]/g,'')}`} aria-label="Llamar a la línea de transparencia">
                            ${this.telefono}
                          </a>
                          <div class="mid-gray f6 mt1">${this.horario}</div>
                        </div>
                      </div>
                    </div>

                    <div class="w-100 w-50-ns pl0 pl3-ns">
                      <div class="ldx-subcard pa3 h-100">
                        <div class="fw6 mb2">✉️ Correo electrónico</div>
                        <div class="lh-copy">
                          <a class="ldx-link fw6" href=${`mailto:${this.email}`} aria-label="Enviar correo a gerencia">
                            ${this.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt3">
                    <div class="ldx-subcard pa3 tc">
                      <div class="fw6 mb2">📝 Formulario web</div>
                      <a class="ldx-link fw6" href=${this.formUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir formulario de reporte">
                        REALIZA EL REPORTE AQUÍ
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <footer class="tr mt3 ldx-anim">
              <small class="mid-gray">Reportes confidenciales y, si lo prefieres, anónimos.</small>
            </footer>
          </div>
        </section>
      `;
    }
  }

  customElements.define('lineadetransparencia-view', Lineadetransparencia);

