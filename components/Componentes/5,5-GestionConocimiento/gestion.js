import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import  '../herramienta/dictador.js'
/**
 * <gestion-x></gestion-x>
 *
 * Componente Lit totalmente encapsulado que replica tu maquetación:
 * - Paleta blanco/azules, estética hospitalaria.
 * - Tarjetas en grid con hover.
 * - Modales accesibles gestionados por estado.
 * - Sin dependencias globales (ni Tachyons ni Font Awesome); íconos en SVG inline.
 */
export class GestionConocimientoHsja extends LitElement {
  static properties = {
    openModalId: { type: String, state: true },
  };

  constructor() {
    super();
    this.openModalId = '';
    this._escHandler = (e) => { if (e.key === 'Escape') this.closeModal(); };
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._escHandler);
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this._escHandler);
    super.disconnectedCallback();
  }

  static styles = css`
    :host {
      --azul: #003366;
      --azul-claro: #0055a5;
      --amarillo: #ffcc00;
      --gris-fondo: #f4f8fb;
      display: block;
      color: var(--azul);
      font-family: Arial, Helvetica, sans-serif;
      background: var(--gris-fondo);
    }

    .wrap { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }

    h1 {
      text-align: center; color: var(--azul); margin: 40px 0 20px; 
      font-size: 2.2rem; text-transform: uppercase; letter-spacing: .02em;
    }

    /* Cards Grid */
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 22px; }

    .card {
      background: #fff; border: 3px solid var(--azul); border-radius: 16px;
      text-align: center; padding: 34px 18px; transition: transform .28s, box-shadow .28s, border-color .28s; cursor: pointer;
      display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 180px;
    }
    .card:hover { border-color: var(--amarillo); transform: translateY(-8px); box-shadow: 0 10px 24px rgba(0,0,0,.12); }
    .card h3 { margin: 10px 0 0; font-size: 1.5rem; font-weight: 700; color: var(--azul); }

    .icon { width: 56px; height: 56px; display: inline-block; margin-bottom: 18px; }
    .icon svg { width: 100%; height: 100%; fill: var(--azul-claro); transition: fill .28s; }
    .card:hover .icon svg { fill: var(--amarillo); }

    /* Agradecimiento */
    .agradecimiento {
      border-left: 5px solid var(--amarillo);
      background: #f9f9f9;
      padding: 18px 22px;
      margin: 20px 0 36px;
      border-radius: 8px;
      color: #1f2d3d;
    }
    .agradecimiento strong { color: var(--azul); }

    /* Modal */
    .modalBack {
      position: fixed; inset: 0; display: none; align-items: center; justify-content: center; padding: 20px;
      background: rgba(0,0,0,.6); z-index: 2000;
    }
    .modalBack[open] { display: flex; }

    .modal {
      background: #fff; width: 100%; max-width: 820px; max-height: 92%; overflow: auto; border-radius: 14px; padding: 22px;
      box-shadow: 0 12px 36px rgba(0,0,0,.28); animation: pop .22s ease;
    }
    @keyframes pop { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
    .modalHeader { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
    .modalTitle { margin: 0; color: var(--azul); font-size: 1.4rem; font-weight: 800; }

    .closeBtn {
      border: 2px solid transparent; border-radius: 10px; background: transparent; padding: 8px; cursor: pointer; color: #333;
    }
    .closeBtn:hover { color: var(--azul); background: #f4f6f8; }

    .modal p { margin: 0 0 12px; color: #333; line-height: 1.5; }
    .modal ul { margin: 0; padding-left: 18px; color: #1f2d3d; }

    .badge-impl { font-weight: 700; color: var(--amarillo); }

    @media (max-width: 520px) {
      .card { padding: 26px 12px; min-height: 160px; }
      .icon { width: 48px; height: 48px; }
      .modal { padding: 16px; }
    }
  `;

  // Helpers para abrir/cerrar
  openModal(id) { this.openModalId = id; }
  closeModal() { this.openModalId = ''; }
  _backdropClick(e) { if (e.target === e.currentTarget) this.closeModal(); }

  // Íconos SVG (inline)
  _icon(name) {
    const common = (path) => html`<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img" focusable="false"><path d="${path}"></path></svg></span>`;
    switch (name) {
      case 'code':
        return common('M9.4 16.6 5.8 13l3.6-3.6L8 8l-5 5 5 5 1.4-1.4zm5.2 0L18.2 13l-3.6-3.6L16 8l5 5-5 5-1.4-1.4zM13.7 4l-4 16 1.9.5 4-16L13.7 4z');
      case 'doc':
        return common('M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z');
      case 'gears':
        return common('M10.4 4l.4 2.1c.3.1.6.2.9.4l2-1 1.6 1.6-1 2c.2.3.3.6.4.9l2.1.4v2.3l-2.1.4c-.1.3-.2.6-.4.9l1 2-1.6 1.6-2-1c-.3.2-.6.3-.9.4l-.4 2.1H8.1l-.4-2.1a4 4 0 0 1-.9-.4l-2 1L3.2 16l1-2a4 4 0 0 1-.4-.9L1.7 12V9.7l2.1-.4c.1-.3.2-.6.4-.9l-1-2L4.8 4l2 1c.3-.2.6-.3.9-.4L8.1 2h2.3zM9.3 12a2.7 2.7 0 1 0 5.4 0 2.7 2.7 0 0 0-5.4 0z');
      case 'users':
        return common('M16 11c1.7 0 3-1.3 3-3S17.7 5 16 5s-3 1.3-3 3 1.3 3 3 3zm-8 0c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5C15 14.2 10.3 13 8 13zm8 0c-.3 0-.7 0-1 .1 1.2.9 2 2.1 2 3.4V19h7v-2.5C24 14.2 19.3 13 16 13z');
      case 'news':
        return common('M4 6h13V4H4c-1.1 0-2 .9-2 2v10H0v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6H4zm0 10h12V8H4v8z');
      default:
        return common('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z');
    }
  }

  // Contenido de cada modal para mantener el template limpio
  _modalContent(id) {
    const blocks = {
      modal1: {
        title: 'Cambios en la Página Web',
        paras: [
          html`La E.S.E. Hospital San Jorge de Ayapel reconoce la importancia de actualizar continuamente su página web para optimizar la experiencia del usuario y facilitar el acceso a la información. Muchos de estos cambios están en <span class="badge-impl">implementación</span> y se espera que mejoren la estructura del Sistema de Calidad, articulado con el MIPG.`,
        ],
        list: [
          'Integración de módulos interactivos de trámites y servicios.',
          'Mejoras en accesibilidad para dispositivos móviles.',
          'Rediseño visual intuitivo, reflejando innovación y transparencia.',
          'Herramientas de retroalimentación y seguimiento de observaciones de usuarios.',
        ],
      },
      modal2: {
        title: 'Documentación y Procedimientos',
        paras: [
          html`Se consolida un repositorio técnico-científico y procedimental, organizado gracias al liderazgo de la asesora Martha Lucía Ibarra Rosero. Muchos procedimientos están en <span class="badge-impl">implementación</span>, con el objetivo de mapear los procesos misionales, estratégicos y de apoyo, alineados con MIPG y el sistema de calidad.`,
        ],
        list: [
          'Manual y guías actualizadas de trámites y servicios.',
          'Protocolos estandarizados de atención médica y administrativa.',
          'Medición de procesos mediante indicadores de gestión y resultados.',
        ],
      },
      modal3: {
        title: 'Innovación y Tecnología',
        paras: [
          html`Se incorporan herramientas digitales que transforman datos en información estratégica. Varias iniciativas están en <span class="badge-impl">implementación</span>, fortaleciendo la eficiencia del sistema de calidad y el seguimiento de indicadores.`,
        ],
        list: [
          'Sistemas integrados de información clínica y administrativa.',
          'Capacitación continua del personal mediante recursos tecnológicos.',
          'Indicadores de desempeño para medir procesos y resultados.',
        ],
      },
      modal4: {
        title: 'Participación y Retroalimentación',
        paras: [
          html`El conocimiento se fortalece con la participación de usuarios y la comunidad. La mayoría de los mecanismos están en <span class="badge-impl">implementación</span> y buscan articular la retroalimentación al sistema de calidad y MIPG.`,
        ],
        list: [
          'Canales digitales y físicos para comentarios y sugerencias.',
          'Seguimiento de observaciones y mejoras implementadas.',
          'Evaluación de satisfacción mediante indicadores.',
        ],
      },
      modal5: {
        title: 'Boletines y Noticias del Conocimiento',
        paras: [
          html`Se mantiene la actualización constante de información institucional y técnico-científica. Este mecanismo está en <span class="badge-impl">implementación</span> para garantizar la mejora continua y el seguimiento de indicadores de gestión y resultados.`,
        ],
        list: [
          'Publicación de cambios normativos y protocolos.',
          'Boletines de capacitación y buenas prácticas.',
          'Comunicados sobre innovación y mejoras en servicios.',
          'Monitoreo mediante indicadores de desempeño y resultados.',
        ],
      },
    };
    return blocks[id];
  }

  // Bloque Agradecimiento (texto exacto del usuario)
  _agradecimiento() {
    return html`
      <div class="agradecimiento" role="note" aria-label="Reconocimiento y agradecimiento">
        <p>
          La E.S.E. Hospital San Jorge de Ayapel reconoce y valora la implementación de la gestión del conocimiento,
          la cual ha permitido consolidar la información técnico-científica y administrativa de la institución, fortalecida
          a través de la puesta en marcha del Modelo Integrado de Planeación y Gestión (MIPG). Este proceso ha sido liderado
          por la asesora <strong>Martha Ibarra</strong>, responsable de la consecución, organización y sistematización
          de la información. Paralelamente, la estructura y arquitectura de la página web ha contado con la dirección técnica
          del Ingeniero <strong>Jerónimo Ortega</strong>, encargado de la estructuración del contenido, y del Ingeniero <strong>Roberto Barreto</strong>,
          responsable de la arquitectura y programación, logrando un portal moderno, funcional y accesible.
        </p>
        <p><strong>Colaboración y Apoyo Técnico:</strong></p>
        <ul>
          <li>Rubiela Demoya Navarro - Gerencia</li>
          <li>Grupo de Asesores - Estratégicos</li>
          <li>Aura Maria Navarro Alvarado - Coordinador Científico</li>
          <li>Daniela Arrieta Méndez - Coordinadora Facturación</li>
          <li>Estewart Villacot Oviedo - Contabilidad</li>
          <li>Farley Patricia Ramos Restrepo - Estadística</li>
          <li>Hugo Alberto Luna Arrieta - Archivo</li>
          <li>Jesús Laverde Sarmiento - Seguridad y Salud en el Trabajo</li>
          <li>Loira Esther Castaño Romero - Jefe de Presupuesto</li>
          <li>Lucy Tatiana Benavidez - Coordinador PYM</li>
          <li>María Patricia Ruiz Payares - Talento Humano</li>
          <li>Natalia Rodríguez Blanquiceth - Coordinadora Urgencias</li>
          <li>Pablo Andrés Barrera Oviedo - Calidad</li>
          <li>Rafael Jerónimo Cardona Morales - Control Interno</li>
        </ul>
      </div>
    `;
  }

  // Template de la tarjeta
  _card(key, iconName, title) {
    return html`
      <button class="card" @click=${() => this.openModal(key)} aria-haspopup="dialog" aria-controls="${key}" title="${title}">
        ${this._icon(iconName)}
        <h3>${title}</h3>
      </button>
    `;
  }

  // Template del modal
  _modal(id) {
    const content = this._modalContent(id);
    const open = this.openModalId === id;
    return html`
      <div class="modalBack" ?open=${open} @click=${this._backdropClick} role="dialog" aria-modal="true" aria-labelledby="${id}-title">
        ${open ? html`
          <div class="modal" id="${id}">
            <div class="modalHeader">
              <h3 class="modalTitle" id="${id}-title">${content.title}</h3>
              <button class="closeBtn" @click=${this.closeModal} aria-label="Cerrar">✕</button>
            </div>
            ${content.paras.map(p => html`<p>${p}</p>`)}
            <ul>
              ${content.list.map(item => html`<li>${item}</li>`)}
            </ul>
          </div>
        ` : null}
      </div>
    `;
  }

  render() {
    return html`
      <!-- ✅ wrapper de lectura en voz alta, sin tocar estilos -->
      <dictador-tts ui lang="es-CO" rate="0.95" pitch="1" volume="1">
        <section class="wrap" aria-label="Gestión del Conocimiento">
          <h1>Gestión del Conocimiento</h1>

          ${this._agradecimiento()}

          <div class="cards" role="list">
            ${this._card('modal1', 'code', 'Cambios en la Página Web')}
            ${this._card('modal2', 'doc', 'Documentación y Procedimientos')}
            ${this._card('modal3', 'gears', 'Innovación y Tecnología')}
            ${this._card('modal4', 'users', 'Participación y Retroalimentación')}
            ${this._card('modal5', 'news', 'Boletines y Noticias del Conocimiento')}
          </div>
        </section>

        ${this._modal('modal1')}
        ${this._modal('modal2')}
        ${this._modal('modal3')}
        ${this._modal('modal4')}
        ${this._modal('modal5')}
      </dictador-tts>
    `;
  }
}

customElements.define('gestion-x', GestionConocimientoHsja);

/*
USO:
  1) Incluye este archivo JS en tu página pública (sin <html> completo dentro del módulo).
  2) Coloca <gestion-x></gestion-x> donde quieras renderizar el contenido.
  3) No requiere CSS global ni icon fonts.
*/
