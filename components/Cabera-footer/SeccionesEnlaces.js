import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

class SeccionesEnlaces extends LitElement {
  // Usa light DOM para que Tailwind (CSS global) aplique
  createRenderRoot() { return this }

  static properties = {
    secciones: { type: Array }
  }

  constructor() {
    super()
    this.secciones = [
      {
        titulo: 'Procesos destacados',
        enlaces: [
          { label: 'Banco de Sangre', href: '#' },
          { label: 'Banco de Leche Humana', href: '#' },
          { label: 'Laboratorio de Cocreación', href: '#' },
          { label: 'Centro de ensayos clínicos', href: '#' },
          { label: 'Docencia - Servicio', href: '#' },
          { label: 'Contratación', href: '#' },
        ],
      },
      {
        titulo: 'Atención al ciudadano',
        enlaces: [
          { label: 'Encuesta de usabilidad', href: '#' },
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
    ]
  }

  render() {
    return html`
      <section class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Enlaces institucionales"
          class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-50 via-white to-blue-50 p-6 md:p-8 shadow-sm ring-1 ring-blue-200/60"
        >
          <!-- banda decorativa superior -->
          <div class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-300 via-blue-600 to-blue-300"></div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            ${this.secciones.map(sec => html`
              <div
                class="group flex flex-col rounded-2xl border border-blue-100 bg-white/80 p-5 shadow-sm backdrop-blur hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <h3 class="text-lg md:text-xl font-extrabold text-blue-800 tracking-tight">
                  ${sec.titulo}
                </h3>
                <div class="mt-1 h-0.5 w-16 rounded-full bg-gradient-to-r from-blue-300 to-blue-600"></div>

                <ul class="mt-4 space-y-2.5">
                  ${sec.enlaces.map(e => html`
                    <li>
                      <a
                        href=${e.href}
                        class="group/link flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-[15px] font-medium text-blue-800/90 ring-1 ring-transparent hover:bg-blue-50 hover:text-blue-900 hover:ring-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
                      >
                        <span class="truncate">${e.label}</span>
                        <!-- icono flecha -->
                        <svg
                          width="18" height="18" viewBox="0 0 24 24" fill="none"
                          class="shrink-0 opacity-70 group-hover/link:opacity-100" aria-hidden="true"
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </a>
                    </li>
                  `)}
                </ul>
              </div>
            `)}
          </div>

          <!-- franja inferior sutil -->
          <div class="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-blue-100/60 to-transparent"></div>
        </nav>

        <!-- Footer -->
        <footer class="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-16">
          <div class="container mx-auto px-6">
            <div class="text-center">
              <div class="flex items-center justify-center mb-6">
                <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                  <!-- Heart (reemplazo de lucide-react) -->
                  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                    <path d="M12 21s-6.716-4.438-9.333-7.056C.88 11.156 1.2 7.6 4.05 6.12 6.15 5.01 8.4 5.93 9.6 7.5 10.8 5.93 13.05 5.01 15.15 6.12c2.85 1.48 3.17 5.036 1.383 7.824C18.716 16.562 12 21 12 21z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold">Hospital San Jorge de Ayapel</h3>
                  <p class="text-blue-200">ESE - Entidad Social del Estado</p>
                </div>
              </div>
              <div class="max-w-2xl mx-auto mb-8">
                <p class="text-lg text-blue-100 leading-relaxed">
                  Más de siete décadas cuidando vidas, construyendo esperanza y siendo
                  el corazón médico que late por la salud del sur de Córdoba.
                </p>
              </div>
              <div class="border-t border-blue-800 pt-8 text-blue-200">
                <p>&copy; 2024 Hospital San Jorge de Ayapel • Ayapel, Córdoba, Colombia</p>
              </div>
            </div>
          </div>
        </footer>
      </section>
    `
  }
}

customElements.define('secciones-enlaces-x', SeccionesEnlaces)