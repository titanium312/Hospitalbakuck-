
  import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

  class FooterApp extends LitElement {
    // Light DOM para que Tachyons (CSS global) aplique
    createRenderRoot() { return this }

    static properties = {
      secciones: { type: Array }
    }

    constructor() {
      super();
      this.secciones = [
        {
          titulo: 'Procesos destacados',
          enlaces: [
           
          ],
        },
        {
          titulo: 'Atención al ciudadano',
          enlaces: [
           
            { label: 'Atención a niños y adolescentes', href: '#' },
            { label: 'Preguntas frecuentes', href: '#' },
            { label: 'Recepción de PQRSDF', href: '#' },
            { label: 'Canales de atención y pida una cita', href: '#' },
            { label: 'Glosario', href: '#' },
            { label: 'Foros', href: '#' },
          ],
        },
        {
          titulo: 'Gestión Institucional',
          enlaces: [
            { label: 'Información financiera y contable', href: '#' },
            { label: 'Planeación, gestión y control', href: '#' },
            { label: 'Sistema de gestión integral de calidad', href: '#' },
            { label: 'Solicitud de Referenciación', href: '#' },
          ],
        },
        {
          titulo: 'Quiénes somos',
          enlaces: [
            { label: 'Información corporativa', href: '#' },
            { label: 'Reseña histórica', href: '#' },
            { label: 'Comunicaciones', href: '#' },
            { label: 'Administración', href: '#' },
            { label: 'Distinciones', href: '#' },
            { label: 'Auditorio', href: '#' },
          ],
        },
      ];
    }

    render() {
      return html`
        <!-- ===== NAV DE ENLACES INSTITUCIONALES ===== -->
        <section class="w-100 ph3 ph4-ns pv3">
          <nav aria-label="Enlaces institucionales"
               class="relative w-100 br3 shadow-1 ba b--light-blue bg-near-white pa3 pa4-ns">
            <!-- banda decorativa superior -->
            <div class="absolute top-0 left-0 right-0 h1" style="background:linear-gradient(90deg,#93c5fd,#2563eb,#93c5fd);"></div>

            <!-- GRID (flex responsive con Tachyons) -->
            <div class="flex flex-wrap nl2 nr2">
              ${this.secciones.map(sec => html`
                <div class="w-100 w-50-m w-25-l pa2">
                  <div class="ba b--light-blue bg-white br3 pa3 hover-shadow-1 transition-all">
                    <h3 class="f4 b navy mt0 mb1">${sec.titulo}</h3>
                    <div class="mt1 mb2 br-pill w3 h1" style="background:linear-gradient(90deg,#93c5fd,#2563eb);"></div>

                    <ul class="list pl0 mt3">
                      ${sec.enlaces.map(e => html`
                        <li class="mb2">
                          <a href=${e.href}
                             class="no-underline flex items-center justify-between ph2 pv2 br3 mid-gray hover-bg-washed-blue hover-dark-blue"
                             >
                            <span class="truncate">${e.label}</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                 class="o-70 hover-o-100"
                                 aria-hidden="true">
                              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.8"
                                    stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </a>
                        </li>
                      `)}
                    </ul>
                  </div>
                </div>
              `)}
            </div>

            <!-- franja inferior sutil -->
            <div class="absolute left-0 right-0 bottom-0"
                 style="height:1.5rem;background:linear-gradient(0deg,rgba(191,219,254,.6),transparent);pointer-events:none;"></div>
          </nav>
        </section>

        <!-- ===== FRANJA INSTITUCIONAL ===== -->
        <section class="w-100 white pv5 ph3 tc"
                 style="background:linear-gradient(90deg,#0f172a,#1e3a8a);">
          <div class="mw8 center ph3">
            <div class="flex items-center justify-center mb3">
              <div class="mr3 flex items-center justify-center br3"
                   style="height:3rem;width:3rem;background:rgba(255,255,255,.2);">
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                  <path d="M12 21s-6.716-4.438-9.333-7.056C.88 11.156 1.2 7.6 4.05 6.12 6.15 5.01 8.4 5.93 9.6 7.5 10.8 5.93 13.05 5.01 15.15 6.12c2.85 1.48 3.17 5.036 1.383 7.824C18.716 16.562 12 21 12 21z" fill="currentColor"></path>
                </svg>
              </div>
              <div>
                <h3 class="f3 b ma0">Hospital San Jorge de Ayapel</h3>
                <p class="light-blue mt1 mb0">ESE - Entidad Social del Estado</p>
              </div>
            </div>

            <div class="center mb4 mw7">
              <p class="f5 f4-ns lightest-blue lh-copy">
                Más de siete décadas cuidando vidas, construyendo esperanza y siendo el corazón médico que late por la salud del sur de Córdoba.
              </p>
            </div>

            <div class="bt b--dark-blue pt3 light-blue">
              <p class="ma0">© 2025 Hospital San Jorge de Ayapel • Ayapel, Córdoba, Colombia</p>
            </div>
          </div>
        </section>

        <!-- ===== PIE DE PÁGINA ===== -->
       <footer role="contentinfo" class="w-100 white ph3 pv3" style="background-color:#004b8d;">
  <div class="mw8 center">
    <!-- Fila de logos -->
    <div class="mb3 flex flex-wrap items-center justify-center">
      <a href="https://www.colombia.co/" target="_blank" rel="noopener noreferrer"
         title="Marca País Colombia"
         class="link flex items-center">
        <img src="https://www.hgm.gov.co/info/hgm/media/galeria7405.png"
             alt="Marca País Colombia" class="h2" loading="lazy"/>
      </a>
    </div>

    <!-- Línea legal -->
    <div class="tc f6 lh-copy">
      <div>© 2025 Hospital San Jorge de Ayapel — Todos los derechos reservados</div>
      <div class="mt2">
        <a href="https://hospitalsanjorgeayapel.com/" target="_blank" rel="noopener noreferrer"
           class="link washed-yellow hover-white">Hospital San Jorge de Ayapel</a>
        <span class="mh2">|</span>
        <a href="https://www.gov.co/" target="_blank" rel="noopener noreferrer"
           class="link washed-yellow hover-white">GOV.CO</a>
      </div>
    </div>
  </div>
</footer>

      `;
    }
  }

  customElements.define('footer-app', FooterApp);