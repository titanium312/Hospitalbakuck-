
  import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

  class FooterApp extends LitElement {
    // Light DOM para que Tachyons (CSS global) aplique
    createRenderRoot() { return this }

    static properties = {
      secciones: { type: Array },
      entidadNombre: { type: String },
      entidadSubtitulo: { type: String },
      logos: { type: Object },
      redes: { type: Array },
      contacto: { type: Object },
      enlaces: { type: Object }
    }

    constructor() {
      super();
      // ====== SECCIONES DE NAVEGACIÓN (columna múltiple) ======
      this.secciones = [
        {
          titulo: 'Procesos destacados',
          enlaces: [
            { label: 'Citas y resultados', href: 'https://hospitalsanjorgeayapel.com/pida-una-cita' }, // Citas
            { label: 'Solicitudes y certificados', href: 'https://hospitalsanjorgeayapel.com/tr%C3%A1mites' }, // Trámites
            { label: 'Transparencia y acceso a la información', href: 'https://hospitalsanjorgeayapel.com/transparencia' },
            { label: 'Contratación', href: 'https://hospitalsanjorgeayapel.com/transparencia' }, // Sección madre con ítems de ley
          ],
        },
        {
          titulo: 'Atención al ciudadano',
          enlaces: [
            { label: 'Preguntas frecuentes', href: '#preguntas-frecuentes' },
            { label: 'Recepción de PQRSDF', href: 'https://hospitalsanjorgeayapel.com/orientaci%C3%B3n-al-usuario' },
            { label: 'Canales de atención y pida una cita', href: '#pida-cita' },
          ],
        },
        {
          titulo: 'Gestión Institucional',
          enlaces: [
            { label: 'Información financiera y contable', href: '#financiera-contable' },
            { label: 'Planeación, gestión y control', href: '#gestion-control' },
            { label: 'Sistema de gestión integral de calidad', href: 'https://hospitalsanjorgeayapel.com/gesti%C3%B3n-integral' },
            { label: 'Solicitud de Referenciación', href: 'https://hospitalsanjorgeayapel.com/referenciaci%C3%B3n' },
          ],
        },
        {
          titulo: 'Quiénes somos',
          enlaces: [
            { label: 'Información corporativa', href: 'https://hospitalsanjorgeayapel.com/informacion-corporativa' },
            { label: 'Reseña histórica', href: 'https://hospitalsanjorgeayapel.com/rese%C3%B1a-hist%C3%B3rica' },
            { label: 'Comunicaciones', href: 'https://hospitalsanjorgeayapel.com/comunicaciones' },
            { label: 'Administración', href: 'https://hospitalsanjorgeayapel.com/administraci%C3%B3n' },
            { label: 'Distinciones', href: 'https://hospitalsanjorgeayapel.com/distinciones' },
            { label: 'Auditorio', href: '#' },
          ],
        },
      ];

      // ====== IDENTIDAD ======
      this.entidadNombre = 'E.S.E. Hospital San Jorge de Ayapel';
      this.entidadSubtitulo = 'ESE - Entidad Social del Estado';

      // ====== LOGOS ======
      this.logos = {
        marcaPais: {
          href: 'https://www.colombia.co/',
          src: 'https://www.hgm.gov.co/info/hgm/media/galeria7405.png',
          alt: 'Marca País Colombia'
        },
        portalEstado: {
          href: 'https://www.gov.co/',
          src: 'https://cdn.www.gov.co/assets/images/Vertical-Color.png',
          alt: 'Portal Único del Estado - GOV.CO'
        }
      };

      // ====== REDES (solo las verificadas) ======
      this.redes = [
        { name: 'Facebook', href: 'https://www.facebook.com/ESE-hospital-san-jorge-de-Ayapel-104628107654222/', icon: 'facebook' }
        // Si te comparten los oficiales de X/Instagram/YouTube/LinkedIn, los agregamos aquí.
      ];

      // ====== CONTACTO (datos reales) ======
      this.contacto = {
        conmutador: '+57 (604) 770 5083',              // Publicado en “Línea de transparencia”
        lineaGratuita: 'No disponible',
        lineaAnticorrupcion: '+57 (604) 770 5083 (Línea de transparencia)',
        canalesAtencion: {
          fisicos: 'Cra. 6 Diagonal 19-21, Ayapel, Córdoba, Colombia',
          electronicos: 'https://hospitalsanjorgeayapel.com/orientaci%C3%B3n-al-usuario'
        },
        correoNotificaciones: 'notificacionesjudiciales@hospitalsanjorgeayapel.com',
        // Extras visibles en la rejilla de contacto (añadidos para exactitud)
        codigoIPS: '230680023801',
        nit: '812001219-6'
      };

      // ====== ENLACES FINALES ======
      this.enlaces = {
        mapaSitio: 'https://hospitalsanjorgeayapel.com/',
        terminos: 'https://hospitalsanjorgeayapel.com/pol%C3%ADtica-de-cookies',
        privacidad: 'https://hospitalsanjorgeayapel.com/tratamiento-de-datos',
        derechosAutor: 'https://hospitalsanjorgeayapel.com/derechos-de-autor',
        otrasPoliticas: [
          // Ej.: { label: 'Política de seguridad de la información', href: '#' }
        ]
      };
    }

    // ====== ICONOS SVG MINIMALISTAS ======
    #svg(icon) {
      const base = 'o-70 hover-o-100';
      const common = 'currentColor';
      const map = {
        facebook: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="${base}" aria-hidden="true"><path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v6h3v-6h2.2l.3-3H14v-1.5c0-.4.3-.5.7-.5H17V8h-2z" fill="${common}"></path></svg>`,
        twitter: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="${base}" aria-hidden="true"><path d="M21 5.6c-.7.3-1.4.5-2.1.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.9-2.6 1.1A3.7 3.7 0 0 0 12 7.9c0 .3 0 .5.1.8-3-.1-5.7-1.6-7.5-3.8-.3.5-.4 1.1-.4 1.7 0 1.3.7 2.5 1.8 3.2-.6 0-1.2-.2-1.7-.5v.1c0 1.8 1.3 3.2 3.1 3.6-.3.1-.6.1-1 .1-.2 0-.4 0-.6-.1.4 1.4 1.8 2.5 3.4 2.6A7.5 7.5 0 0 1 3 18.6 10.5 10.5 0 0 0 8.7 20c6.3 0 9.8-5.2 9.8-9.8v-.4c.7-.4 1.3-1.1 1.8-1.8z" fill="${common}"></path></svg>`,
        instagram: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="${base}" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="${common}" stroke-width="2"></rect><circle cx="12" cy="12" r="4" stroke="${common}" stroke-width="2"></circle><circle cx="17.5" cy="6.5" r="1.5" fill="${common}"></circle></svg>`,
        youtube: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="${base}" aria-hidden="true"><path d="M23 12s0-3.2-.4-4.7a3.1 3.1 0 0 0-2.2-2.1C18.6 4.7 12 4.7 12 4.7s-6.6 0-8.4.5A3.1 3.1 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7c.2 1 .9 1.8 2 2.1 1.8.6 8.6.6 8.6.6s6.6 0 8.4-.5a3.1 3.1 0 0 0 2.2-2.1c.4-1.5.4-4.7.4-4.7z" fill="${common}"></path><path d="M10 15V9l6 3-6 3z" fill="#fff"></path></svg>`,
        linkedin: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="${base}" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" stroke="${common}" stroke-width="2"></rect><rect x="6" y="10" width="3" height="8" fill="${common}"></rect><circle cx="7.5" cy="7.5" r="1.5" fill="${common}"></circle><path d="M12 18v-4a3 3 0 0 1 6 0v4" stroke="${common}" stroke-width="2"></path></svg>`,
        arrow: html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="o-70" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      };
      return map[icon] || html``;
    }

    render() {
      const brandGradient = 'linear-gradient(90deg,#93c5fd,#2563eb,#93c5fd)';
      const sectionDivider = 'linear-gradient(90deg,#93c5fd,#2563eb)';

      return html`
        <!-- ===== NAV DE ENLACES INSTITUCIONALES ===== -->
        <section class="w-100 ph3 ph4-ns pv3">
          <nav aria-label="Enlaces institucionales"
              class="relative w-100 br3 shadow-1 ba b--light-blue bg-near-white pa3 pa4-ns">
            <!-- banda decorativa superior -->
            <div class="absolute top-0 left-0 right-0 h1" style="background:${brandGradient};"></div>

            <!-- GRID (flex responsive con Tachyons) -->
            <div class="flex flex-wrap nl2 nr2">
              ${this.secciones.map(sec => html`
                <div class="w-100 w-50-m w-25-l pa2">
                  <div class="ba b--light-blue bg-white br3 pa3 hover-shadow-1 transition-all">
                    <h3 class="f4 b navy mt0 mb1">${sec.titulo}</h3>
                    <div class="mt1 mb2 br-pill w3 h1" style="background:${sectionDivider};"></div>

                    <ul class="list pl0 mt3">
                      ${sec.enlaces.map(e => html`
                        <li class="mb2">
                          <a href=${e.href}
                            class="no-underline flex items-center justify-between ph2 pv2 br3 mid-gray hover-bg-washed-blue hover-dark-blue">
                            <span class="truncate">${e.label}</span>
                            ${this.#svg('arrow')}
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
        <section class="w-100 white pv5 ph3 tc" style="background:linear-gradient(90deg,#0f172a,#1e3a8a);">
          <div class="mw8 center ph3">
            <div class="flex items-center justify-center mb3">
              <div class="mr3 flex items-center justify-center br3"
                  style="height:3rem;width:3rem;background:rgba(255,255,255,.2);">
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                  <path d="M12 21s-6.716-4.438-9.333-7.056C.88 11.156 1.2 7.6 4.05 6.12 6.15 5.01 8.4 5.93 9.6 7.5 10.8 5.93 13.05 5.01 15.15 6.12c2.85 1.48 3.17 5.036 1.383 7.824C18.716 16.562 12 21 12 21z" fill="currentColor"></path>
                </svg>
              </div>
              <div>
                <h3 class="f3 b ma0">${this.entidadNombre}</h3>
                <p class="light-blue mt1 mb0">${this.entidadSubtitulo}</p>
              </div>
            </div>

            <div class="center mb4 mw7">
              <p class="f5 f4-ns lightest-blue lh-copy">
                Más de siete décadas cuidando vidas, construyendo esperanza y siendo el corazón médico que late por la salud del sur de Córdoba.
              </p>
            </div>

            <!-- Redes sociales oficiales -->
            <div class="flex flex-wrap justify-center items-center gap ma0 pa0 mb4">
              ${this.redes.map(r => html`
                <a class="link white hover-light-blue br-pill ba b--white-30 ph3 pv2 mh1 mv1 flex items-center"
                  href=${r.href} target="_blank" rel="noopener noreferrer" aria-label=${'Ir a ' + r.name}>
                  ${this.#svg(r.icon)}
                  <span class="ml2">${r.name}</span>
                </a>
              `)}
            </div>

            <div class="bt b--dark-blue pt3 light-blue">
              <p class="ma0">© 2025 ${this.entidadNombre} • Ayapel, Córdoba, Colombia</p>
            </div>
          </div>
        </section>

        <!-- ===== PIE DE PÁGINA ===== -->
        <footer role="contentinfo" class="w-100 white ph3 pv4" style="background-color:#004b8d;">
          <div class="mw8 center">
            <!-- Fila de logos -->
            <div class="mb3 flex flex-wrap items-center justify-center">
              <!-- Portal Único del Estado -->
              <a href=${this.logos.portalEstado.href} target="_blank" rel="noopener noreferrer"
                title="Portal Único del Estado (GOV.CO)" class="link flex items-center mh2">
                <img src=${this.logos.portalEstado.src} alt=${this.logos.portalEstado.alt} class="h2" loading="lazy"/>
              </a>
              <!-- Marca País Colombia -->
              <a href=${this.logos.marcaPais.href} target="_blank" rel="noopener noreferrer"
                title="Marca País Colombia" class="link flex items-center mh2">
                <img src=${this.logos.marcaPais.src} alt=${this.logos.marcaPais.alt} class="h2" loading="lazy"/>
              </a>
            </div>

            <!-- Línea legal -->
            <div class="tc f6 lh-copy">
              <div>© 2025 ${this.entidadNombre} — Todos los derechos reservados</div>
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

