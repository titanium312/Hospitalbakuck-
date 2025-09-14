import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../herramienta/dictador.js';
import './contenido/canal-interaccion.js';

export class Participa extends LitElement {
  // Light DOM para usar tu sistema de estilos global (Tachyons, etc.)
  createRenderRoot() { return this; }

  static properties = {
    active: { type: Number },   // índice del apartado activo
    _open:  { state: true },    // Set de IDs abiertos (colapsables)
    currentImage: { state: true },
    isAnimating: { state: true },
  };

  constructor() {
    super();
    this.active = 0;
    this._open = new Set();
    this.currentImage = 0;
    this.isAnimating = false;

    // ====== Datos del carrusel para "Canal de Interacción Deliberatoria" ======
    this.hospitalImages = [
      {
        url: 'img/hospital-1.jpg',
        title: 'Atención Humanizada',
        description: 'Nuestro equipo médico y administrativo está comprometido con el trato digno y la calidez humana en cada servicio.',
        icon: 'heart',
      },
      {
        url: 'img/hospital-2.jpg',
        title: 'Tecnología de Punta',
        description: 'Equipos modernos para diagnósticos precisos y tratamientos oportunos.',
        icon: 'award',
      },
      {
        url: 'img/hospital-3.jpg',
        title: 'Equipo Multidisciplinario',
        description: 'Profesionales altamente capacitados coordinan atención integral para nuestros usuarios.',
        icon: 'users',
      },
    ];

    // ===== Documentos PAAC =====
    this._paacDocs = [
      { anio: 2022, href: 'docs/PAAC-2022.pdf' },
      { anio: 2023, href: 'docs/PAAC-2023.pdf' },
      { anio: 2024, href: 'docs/PAAC-2024.pdf' },
      { anio: 2025, href: 'docs/PAAC-2025.pdf' },
    ];
  }

  // ===== helpers =====
  get _labels() {
    return [
      'Descripción',
      'Mecanismos y Espacios',
      'Estrategia de Participación',
      'Rendición de Cuentas',
      'PAAC',
      'Informes de Rendición',
      'Convocatorias',
      'Calendario',
      'Formulario de Inscripción',
      'Canal de Interacción Deliberatoria',
    ];
  }
  _setActive(i) { this.active = i; window.scrollTo({ top: 0, behavior: 'smooth' }); }
  _toggle(id)   { const s = new Set(this._open); s.has(id) ? s.delete(id) : s.add(id); this._open = s; }
  _isOpen(id)   { return this._open.has(id); }

  // ===== UI: Tabs =====
  _tabs() {
    return html`
      <div class="px-tabs" role="tablist" aria-label="Menú Participa">
        ${this._labels.map((lbl, i) => html`
          <button
            role="tab"
            aria-selected=${this.active === i ? 'true' : 'false'}
            class="px-tab"
            ?data-active=${this.active === i}
            @click=${() => this._setActive(i)}
          >${lbl}</button>
        `)}
      </div>
    `;
  }

  // ===== VISTAS =====
  _viewDescripcion() {
    return html`
      <div class="px-text">
        <p>
          En este espacio el Hospital San Jorge de Ayapel da a conocer información de interés para la comunidad y grupos de valor,
          quienes podrán participar en la identificación de necesidades, espacios de diálogo y convocatorias.
        </p>

        <div class="px-cols">
          <div class="px-col">
            <h3 class="px-subtitle">Espacios donde puede participar:</h3>
            <ul>
              <li>Junta Directiva</li>
              <li>Comité de Ética Hospitalaria</li>
              <li>Asociación de Usuarios</li>
            </ul>
          </div>
          <div class="px-col">
            <h3 class="px-subtitle">Nuestros canales: Te invitamos a PARTICIPAR</h3>
            <ul>
              <li>Diagnóstico de la situación</li>
              <li>Planeación y presupuesto</li>
              <li>Consulta ciudadana</li>
              <li>Colaboración e innovación</li>
              <li>Rendición de cuentas</li>
              <li>Control social</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  _viewMecanismos() {
    const id = 'canales';
    return html`
      <h2 class="px-title2">¿Cómo se puede participar? - HSJA</h2>
      <div class="px-collap">
        <button
          class="px-collap-btn"
          @click=${() => this._toggle(id)}
          aria-expanded=${this._isOpen(id)}
          aria-controls="${id}-panel"
        >
          Canales de Atención al Usuario
        </button>
        <div id="${id}-panel" class="px-collap-panel ${this._isOpen(id) ? 'is-open' : ''}">
          <div class="px-text">
            <ul>
              <li>
                <strong>Canal presencial:</strong> Ventanilla Única — Servicio de Información y Atención al Usuario.<br />
                <span>Horario: Lunes a viernes: 7:00 a.m. – 12:00 m / 2:00 p.m. – 6:00 p.m.</span>
              </li>
              <li><strong>Canal telefónico / WhatsApp:</strong> (604) 7705083 – Línea Transparencia</li>
              <li>
                <strong>Canal virtual:</strong>
                <a href="https://hospitalsanjorgeayapel.com/" class="px-link" target="_blank" rel="noopener">Página Web</a><br />
                Correo: principal_gerencia@hospitalayapel.gov.co / esesanjorgedeayapel@gmail.com
              </li>
              <li><strong>Canal escrito:</strong> Buzón físico en Ventanilla Única — Radicación presencial o formulario en línea.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  _viewEstrategiaPart() {
    const id = 'asociacion';
    return html`
      <h2 class="px-title2">Estrategia de Participación Ciudadana - HSJA</h2>
      <div class="px-collap">
        <button
          class="px-collap-btn"
          @click=${() => this._toggle(id)}
          aria-expanded=${this._isOpen(id)}
          aria-controls="${id}-panel"
        >
          Asociación de Usuarios
        </button>
        <div id="${id}-panel" class="px-collap-panel ${this._isOpen(id) ? 'is-open' : ''}">
          <div class="px-text">
            <p><strong>Asociación de Usuarios del HSJA</strong></p>
            <p>Convoca a todos los usuarios y representantes de la comunidad a conformar y participar activamente.</p>
          </div>
        </div>
      </div>
    `;
  }

  _viewRendicion() {
    const id = 'rendicion';
    return html`
      <h2 class="px-title2">Estrategia de Rendición de Cuentas - HSJA</h2>
      <div class="px-collap">
        <button
          class="px-collap-btn"
          @click=${() => this._toggle(id)}
          aria-expanded=${this._isOpen(id)}
          aria-controls="${id}-panel"
        >
          Rendición de Cuentas
        </button>
        <div id="${id}-panel" class="px-collap-panel ${this._isOpen(id) ? 'is-open' : ''}">
          <div class="px-text">
            <p><strong>Rendición de Cuentas – Espacios de Diálogo</strong></p>
            <p>Calendario de 4 jornadas anuales, estrategia de comunicación y mensaje central para invitar a la participación activa.</p>
          </div>
        </div>
      </div>
    `;
  }

  _viewPAAC() {
    return html`
      <h2 class="px-title2">Plan de Anticorrupción y Atención al Ciudadano (PAAC)</h2>
      <div class="px-grid">
        ${this._paacDocs.map(doc => html`
          <article class="px-card">
            <h3 class="px-card-title">PAAC ${doc.anio}</h3>
            <p class="px-card-desc">Plan de Anticorrupción y Atención al Ciudadano</p>
            <a class="px-btn" href="${doc.href}" target="_blank" rel="noopener">Ver PDF</a>
          </article>
        `)}
      </div>
    `;
  }

  _viewInformes() {
    return html`<p class="px-text">Aquí se publican los informes de gestión y resultados anuales.</p>`;
  }

  _viewConvocatorias() {
    return html`
      <h1 class="px-title">Convocatoria de Participación Ciudadana – HSJA</h1>
      <p class="px-text">
        El Hospital San Jorge de Ayapel (HSJA) invita a toda la comunidad a participar activamente en los espacios de diálogo y control social,
        fortaleciendo los mecanismos de participación ciudadana y garantizando el derecho de los usuarios a conocer, opinar y evaluar la gestión institucional.
      </p>
      <p class="px-text">
        A través de esta convocatoria, buscamos asegurar que las voces de nuestros usuarios, líderes sociales, veedurías y representantes de la comunidad sean
        escuchadas y tenidas en cuenta en la formulación de estrategias, planes y mejoras de los servicios de salud.
      </p>

      <h2 class="px-title2">Material de difusión</h2>
      <div class="px-img-grid">
        <img src="img/Calendario-rendicion.png" alt="Calendario Rendición de Cuentas 2025 - HSJA">
        <img src="img/Espacio-dialogo.png"    alt="Espacio de Diálogo Rendición de Cuentas - HSJA">
      </div>
    `;
  }

  _viewCalendario() {
    return html`
      <h1 class="px-title">Calendario de Rendición de Cuentas – HSJA</h1>
      <p class="px-text center">
        El Hospital San Jorge de Ayapel (HSJA) te invita a participar en los
        <strong>Espacios de Diálogo de Rendición de Cuentas</strong> programados para el año 2025.
        Estos encuentros son escenarios de transparencia y participación, donde la comunidad puede conocer, opinar y evaluar la gestión de nuestro hospital.
      </p>
      <div class="px-img-center">
        <img src="img/Calendario-rendicion.png" alt="Calendario Rendición de Cuentas 2025 - HSJA">
      </div>
    `;
  }

  _viewFormulario() {
    return html`
      <h1 class="px-title">Formulario de inscripción<br>Asociación de Usuarios del HSJA</h1>
      <form class="px-form" action="mailto:esesanjorgeayapel@gmail.com" method="post" enctype="text/plain">
        <label for="nombre">Nombre y Apellido Completo</label>
        <input type="text" id="nombre" name="Nombre y Apellido Completo" required>

        <label for="documento">Número de Documento de Identidad</label>
        <input type="text" id="documento" name="Documento de Identidad" required>

        <label for="direccion">Dirección de Residencia</label>
        <input type="text" id="direccion" name="Dirección de Residencia">

        <div class="px-rows">
          <div>
            <label for="pais">País</label>
            <select id="pais" name="País">
              <option value="Colombia" selected>Colombia</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label for="departamento">Departamento</label>
            <select id="departamento" name="Departamento" required>
              <option value="">--Seleccionar--</option>
              <option value="Antioquia">Antioquia</option>
              <option value="Córdoba">Córdoba</option>
              <option value="Sucre">Sucre</option>
              <option value="Bolívar">Bolívar</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>

        <label for="correo">Correo electrónico</label>
        <input type="email" id="correo" name="Correo electrónico" required>

        <div class="px-rows">
          <div>
            <label for="telefono">Teléfono Fijo</label>
            <input type="text" id="telefono" name="Teléfono Fijo">
          </div>
          <div>
            <label for="celular">Celular</label>
            <input type="text" id="celular" name="Celular" required>
          </div>
        </div>

        <label for="afiliacion">Afiliación a:</label>
        <select id="afiliacion" name="Afiliación a" required>
          <option value="">Seleccione...</option>
          <option value="Contributivo">Régimen Contributivo</option>
          <option value="Subsidiado">Régimen Subsidiado</option>
          <option value="Especial">Régimen Especial</option>
          <option value="Otro">Otro</option>
        </select>

        <label for="tipoSolicitud">Tipo de Solicitud:</label>
        <select id="tipoSolicitud" name="Tipo de Solicitud" required>
          <option value="">Seleccione...</option>
          <option value="Inscripción">Inscripción</option>
          <option value="Renovación">Renovación</option>
          <option value="Actualización de datos">Actualización de datos</option>
        </select>

        <label for="sugerencias">Sugerencias</label>
        <textarea id="sugerencias" name="Sugerencias" placeholder="Escriba su sugerencia"></textarea>

        <button type="submit" class="px-btn px-btn--full">Enviar inscripción al SIAU</button>
      </form>
    `;
  }

  // ===== Canal de Interacción Deliberatoria =====
  _Canaldeinteraccion() {
    return html`<canal-interaccion></canal-interaccion>`;
  }

  // ===== Iconos simples (SVG inline) =====
  _icon(name, { size = 20, color = 'currentColor' } = {}) {
    const s = size;
    const common = `width:${s}px;height:${s}px;display:inline-block;vertical-align:middle;color:${color}`;
    switch (name) {
      case 'chevron-left':
        return html`<svg style="${common}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
      case 'chevron-right':
        return html`<svg style="${common}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
      case 'award':
        return html`<svg style="${common}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11"/></svg>`;
      case 'users':
        return html`<svg style="${common}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
      case 'heart':
        return html`<svg style="${common}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
      default:
        return html``;
    }
  }

  // ===== Controles del carrusel =====
  nextImage() {
    this._animateSwap(() => {
      this.currentImage = (this.currentImage + 1) % this.hospitalImages.length;
    });
  }
  prevImage() {
    this._animateSwap(() => {
      this.currentImage = (this.currentImage - 1 + this.hospitalImages.length) % this.hospitalImages.length;
    });
  }
  goToImage(i) {
    if (i === this.currentImage) return;
    this._animateSwap(() => { this.currentImage = i; });
  }
  _animateSwap(fn) {
    this.isAnimating = true;
    fn();
    setTimeout(() => { this.isAnimating = false; }, 250);
  }

  // Vista activa
  _renderActive() {
    switch (this.active) {
      case 0: return this._viewDescripcion();
      case 1: return this._viewMecanismos();
      case 2: return this._viewEstrategiaPart();
      case 3: return this._viewRendicion();
      case 4: return this._viewPAAC();
      case 5: return this._viewInformes();
      case 6: return this._viewConvocatorias();
      case 7: return this._viewCalendario();
      case 8: return this._viewFormulario();
      case 9: return this._Canaldeinteraccion();
      default: return html``;
    }
  }

  render() {
    return html`
      <style>
        /* ===== Paleta ===== */
        .px {
          --px-brand: #006699;
          --px-brand-dark: #004466;
          --px-ink: #003366;
          --px-bg: #ffffff; /* fondo siempre blanco */
          --px-panel: #ffffff;
          --px-text: #333;
          --px-border: #ddd;
          --px-shadow: 0 3px 8px rgba(0,0,0,0.1);
        }

        /* ===== Layout general ===== */
        .px { background: var(--px-bg); color: var(--px-text); padding: 1.5rem; }
        .px-container { max-width: 72rem; margin: 0 auto; }
        .px-title { text-align: center; color: var(--px-ink); margin: 0 0 1rem; }
        .px-title2 { color: var(--px-ink); margin: .5rem 0 1rem; }
        .px-subtitle { color: var(--px-brand); margin: 0 0 .5rem; }

        .px-panel {
          background: var(--px-panel); border: 1px solid var(--px-border);
          border-radius: 16px; box-shadow: var(--px-shadow); padding: 1rem 1.25rem;
        }

        .px-text { line-height: 1.7; }
        .px-text.center { text-align: center; }

        .px-cols { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        @media (min-width: 48rem) { .px-cols { grid-template-columns: 1fr 1fr; } }

        /* ===== Tabs ===== */
        .px-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: .5rem; margin: 0 0 1rem; }
        .px-tab {
          background: var(--px-brand-dark); color: #fff; border: 0; border-radius: .75rem;
          padding: .6rem 1rem; font-weight: 600; cursor: pointer;
          transition: transform .12s ease, background .2s ease; outline-offset: 2px;
        }
        .px-tab:hover { background: var(--px-brand); transform: translateY(-1px); }
        .px-tab[aria-selected="true"], .px-tab[data-active] { background: var(--px-brand); }

        /* ===== Grid de tarjetas (PAAC) ===== */
        .px-grid {
          display: grid; gap: 1rem; margin-top: .5rem;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }
        .px-card { background: #fff; border: 1px solid var(--px-border); border-radius: 12px; padding: 1rem; box-shadow: var(--px-shadow); }
        .px-card-title { margin: 0 0 .5rem; color: var(--px-brand); font-size: 1.05rem; }
        .px-card-desc { margin: 0 0 .75rem; color: #666; }

        /* ===== Colapsables ===== */
        .px-collap { margin: .75rem 0; }
        .px-collap-btn {
          width: 100%; text-align: left; background: var(--px-brand-dark); color: #fff;
          border: 0; border-radius: .75rem; padding: .7rem 1rem; font-weight: 700; cursor: pointer;
        }
        .px-collap-panel {
          display: none; margin-top: .5rem; background: #fff; border: 1px solid var(--px-border); border-radius: 12px; padding: .9rem;
        }
        .px-collap-panel.is-open { display: block; }

        /* ===== Imágenes / Galería ===== */
        .bg-grad { background: linear-gradient(180deg, #ffffff 0%, #f4f8fb 100%); }
        .h-hero { height: clamp(220px, 45vw, 420px); }
        .card { background: #fff; border-radius: 16px; box-shadow: var(--px-shadow); border: 1px solid var(--px-border); overflow: hidden; }
        .img { width: 100%; height: 100%; object-fit: cover; transition: transform .25s ease, opacity .25s ease; }
        .scale-100 { transform: scale(1); }
        .scale-105 { transform: scale(1.05); }
        .overlay { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,0) 60%); }
        .btn-nav { background: rgba(255,255,255,0.85); border: 1px solid var(--px-border); border-radius: 999px; padding: .4rem; box-shadow: var(--px-shadow); }
        .btn-nav:hover { background: #fff; }
        .counter { background: rgba(255,255,255,.9); border: 1px solid var(--px-border); padding: .25rem .5rem; border-radius: 999px; font-weight: 700; }
        .dot { display:inline-block; width:10px; height:10px; border-radius:999px; background:#d1d5db; }
        .dot--active { background: var(--px-brand); }

        /* ===== Imágenes de material ===== */
        .px-img-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-top: 1rem; }
        .px-img-grid img {
          max-width: 420px; width: 100%; border-radius: 12px; border: 1px solid var(--px-border); box-shadow: var(--px-shadow);
        }
        .px-img-center { display: flex; justify-content: center; margin-top: 1rem; }
        .px-img-center img {
          max-width: 640px; width: 100%; border-radius: 12px; border: 1px solid var(--px-border); box-shadow: var(--px-shadow);
        }

        /* ===== Formulario ===== */
        .px-form {
          max-width: 44rem; margin: 0 auto; background: #fff; padding: 1.25rem;
          border-radius: 16px; box-shadow: var(--px-shadow); border: 1px solid var(--px-border);
        }
        .px-form label { font-weight: 700; display: block; margin: .75rem 0 .35rem; color: var(--px-ink); }
        .px-form input, .px-form select, .px-form textarea {
          width: 100%; padding: .65rem .75rem; border-radius: 8px; border: 1px solid #ccc; font-size: 14px;
        }
        .px-form input:focus, .px-form select:focus, .px-form textarea:focus {
          border-color: var(--px-brand); outline: none; box-shadow: 0 0 0 3px rgba(0,102,153,.15);
        }
        .px-form textarea { resize: vertical; min-height: 90px; }
        .px-rows { display: grid; gap: .75rem; grid-template-columns: 1fr; }
        @media (min-width: 48rem) { .px-rows { grid-template-columns: 1fr 1fr; } }

        /* ===== Botones ===== */
        .px-btn {
          display: inline-block; background: var(--px-brand); color: #fff; text-decoration: none;
          border: 0; border-radius: 8px; padding: .65rem 1rem; font-weight: 700; cursor: pointer;
          transition: background .2s ease, transform .1s ease;
        }
        .px-btn:hover { background: var(--px-brand-dark); transform: translateY(-1px); }
        .px-btn--full { width: 100%; }
      </style>

      <!-- ✅ Envoltura para TTS con controles de UI; no altera estilos internos -->
      <dictador-tts ui lang="es-CO" rate="0.95" pitch="1" volume="1">
        <section class="px">
          <div class="px-container">
            <h1 class="px-title">Menú Participa – Hospital San Jorge de Ayapel</h1>

            <div class="notice" aria-labelledby="hsja-aviso-title">
              <h2 id="hsja-aviso-title">Cordialmente, Hospital San Jorge de Ayapel – Comprometidos con la Transparencia y la Participación</h2>
              <p>El Hospital San Jorge de Ayapel (HSJA), en medio de los desafíos financieros que enfrentamos, reafirma su compromiso con la transparencia, la participación ciudadana y el control social.</p>
              <p>Creemos firmemente que el camino para superar las dificultades se construye junto a la comunidad, escuchando sus voces, atendiendo sus inquietudes y trabajando unidos por un hospital más fuerte y humano.</p>
              <p>Por eso ponemos a disposición de todos nuestros usuarios y de la ciudadanía en general los canales de interacción deliberatoria, donde se podrá participar en procesos como:</p>
              <ul class="bullets">
                <li>Diagnóstico de necesidades en salud</li>
                <li>Planeación de estrategias y programas</li>
                <li>Postulación de temáticas para rendición de cuentas</li>
                <li>Colaboración con la academia y la comunidad</li>
                <li>Ejercicio de control social y veeduría</li>
                <li>Acceso a herramientas y documentos de gestión</li>
              </ul>
              <p>Cada opinión, cada propuesta y cada gesto de confianza fortalece al hospital y nos acerca al propósito que nos une: brindar servicios de salud con calidad, oportunidad y dignidad a toda la comunidad de Ayapel.</p>
              <p>💙 Tu participación es la fuerza que necesitamos para seguir adelante.</p>
            </div>

            ${this._tabs()}

            <div class="px-panel">
              <h2 class="px-title2">${this._labels[this.active]}</h2>
              ${this._renderActive()}
            </div>
          </div>
        </section>
      </dictador-tts>
    `;
  }
}

customElements.define('participa-x', Participa);
