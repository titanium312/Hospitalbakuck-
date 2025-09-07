import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm'

/**
 * <x-normatividad></x-normatividad>
 * Estética hospitalaria (blanco + azules), navegación interna y acordeones.
 * - Light DOM para usar Tachyons sin fricción
 * - Animaciones CSS (fade/collapse) en lugar de framer-motion
 */
export class XNormatividad extends LitElement {
  createRenderRoot(){ return this }

  static properties = {
    openId: { type: String, attribute: 'open-id', reflect: true },
  }

  constructor(){
    super()
    this.openId = ''
    this._onKeydown = e => { if(e.key === 'Escape') this.openId = '' }
    this.politicas = [
      {
        id: 'gestion-gerencial',
        titulo: '1. Gestión Gerencial',
        items: [
          { subtitulo: '1.1 Transparencia y Rendición de Cuentas', texto: 'El Hospital San Jorge de Ayapel garantiza la gestión administrativa y asistencial con criterios de transparencia, acceso a la información pública y rendición de cuentas permanente, promoviendo la confianza y el control social.' },
          { subtitulo: '1.2 Planeación Estratégica con Enfoque en Resultados', texto: 'Planeación estratégica participativa articulada con los planes territoriales y nacionales, bajo un enfoque de resultados medibles y sostenibles.' },
          { subtitulo: '1.3 Participación Ciudadana y Veeduría Social', texto: 'Participación activa de la comunidad en decisiones, seguimiento y evaluación mediante comités y mecanismos de veeduría social.' },
        ],
      },
      { id: 'gestion-planeacion', titulo: '2. Gestión de Planeación', items: [ { subtitulo: '2.1 Política de Planeación bajo Ciclo PHVA', texto: 'La planeación institucional se basa en el ciclo PHVA, articulada con los planes nacionales, departamentales y municipales de salud.' } ] },
      { id: 'gestion-juridica', titulo: '3. Gestión Jurídica', items: [
        { subtitulo: '3.1 Política de Cumplimiento Normativo', texto: 'Cumplimiento estricto de la normatividad legal vigente en salud, garantizando seguridad jurídica.' },
        { subtitulo: '3.2 Política de Defensa Jurídica Institucional', texto: 'Defensa de los intereses jurídicos con ética, transparencia y responsabilidad.' },
        { subtitulo: '3.3 Política de Garantía del Debido Proceso', texto: 'Respeto al debido proceso y derechos fundamentales en todas las actuaciones.' },
        { subtitulo: '3.4 Política de Protección de Datos Personales', texto: 'Confidencialidad y protección de datos personales e historia clínica (Ley 1581 de 2012).' },
      ] },
      { id: 'gestion-tic', titulo: '4. Gestión de TIC', items: [
        { subtitulo: '4.1 Seguridad de la Información', texto: 'Integridad, confidencialidad y disponibilidad de la información institucional y de pacientes.' },
        { subtitulo: '4.2 Uso Responsable de Recursos Tecnológicos', texto: 'Uso eficiente, racional y responsable de recursos tecnológicos.' },
        { subtitulo: '4.3 Interoperabilidad', texto: 'Adopción de lineamientos de HCE interoperable y normatividad vigente en ciberseguridad.' },
      ] },
      { id: 'gestion-financiera', titulo: '5. Gestión Contable y Financiera', items: [
        { subtitulo: '5.1 Transparencia Financiera', texto: 'Administración de recursos públicos con transparencia, eficiencia y eficacia.' },
        { subtitulo: '5.2 Oportunidad en Pagos', texto: 'Pago oportuno a proveedores y trabajadores para la sostenibilidad institucional.' },
      ] },
      { id: 'gestion-calidad', titulo: '6. Gestión de la Calidad', items: [
        { subtitulo: '6.1 Mejora Continua', texto: 'Mejoramiento continuo de procesos con herramientas de gestión de calidad.' },
        { subtitulo: '6.2 Seguridad del Paciente', texto: 'Principio rector que minimiza riesgos asociados a la atención.' },
        { subtitulo: '6.3 Cumplimiento del SOGCS', texto: 'Implementación de habilitación, auditoría, PAMEC y acreditación.' },
        { subtitulo: '6.4 Evaluación con Indicadores', texto: 'Seguimiento permanente mediante indicadores de calidad.' },
      ] },
      { id: 'ambiente-fisico', titulo: '7. Gestión del Ambiente Físico', items: [
        { subtitulo: '7.1 Infraestructura Segura y Accesible', texto: 'Condiciones físicas seguras, accesibles e inclusivas.' },
        { subtitulo: '7.2 Bioseguridad', texto: 'Protocolos para prevenir riesgos biológicos y ambientales.' },
        { subtitulo: '7.3 Mantenimiento', texto: 'Mantenimiento preventivo y correctivo de infraestructura y equipos biomédicos.' },
        { subtitulo: '7.4 Gestión Ambiental', texto: 'Cumplimiento de normatividad ambiental y manejo integral de residuos hospitalarios.' },
      ] },
      { id: 'gestion-informacion', titulo: '8. Gestión de la Información', items: [
        { subtitulo: '8.1 Transparencia en la Información Pública', texto: 'Acceso a información pública (Ley 1712 de 2014).' },
        { subtitulo: '8.2 Confidencialidad de Datos Clínicos', texto: 'Protección de la historia clínica y datos sensibles de los usuarios.' },
      ] },
      { id: 'recursos-fisicos', titulo: '9. Gestión de Recursos Físicos', items: [ { subtitulo: '9.1 Mantenimiento Tecnológico', texto: 'Operatividad de equipos biomédicos mediante planes de mantenimiento.' } ] },
      { id: 'talento-humano', titulo: '10. Gestión del Talento Humano', items: [
        { subtitulo: '10.1 Selección y Contratación Transparente', texto: 'Procesos basados en mérito, equidad y transparencia.' },
        { subtitulo: '10.2 Capacitación Continua', texto: 'Formación permanente en competencias técnicas y humanas.' },
        { subtitulo: '10.3 Bienestar Laboral', texto: 'Bienestar integral, salud ocupacional y seguridad laboral.' },
      ] },
      { id: 'urgencias', titulo: '11. Atención en Urgencias', items: [
        { subtitulo: '11.1 Acceso Universal', texto: 'Atención a toda persona, sin discriminación ni barreras administrativas.' },
        { subtitulo: '11.2 Priorización de Atención', texto: 'Atención bajo criterios de triage y seguridad del paciente.' },
        { subtitulo: '11.3 Red de Referencia', texto: 'Articulación con la red departamental de referencia y contrarreferencia.' },
      ] },
      { id: 'parto-rn', titulo: '12. Atención del Parto y del Recién Nacido', items: [
        { subtitulo: '12.1 Parto Humanizado', texto: 'Parto respetado y centrado en la madre, RN y familia.' },
        { subtitulo: '12.2 Seguridad Materno Perinatal', texto: 'Normas y protocolos para atención segura en embarazo, parto y puerperio.' },
        { subtitulo: '12.3 Lactancia e IAMI', texto: 'Promoción de lactancia y cumplimiento de estrategia IAMI.' },
      ] },
      { id: 'medica-general', titulo: '13. Atención Médica General', items: [
        { subtitulo: '13.1 Acceso Oportuno', texto: 'Atención oportuna, equitativa y sin discriminación.' },
        { subtitulo: '13.2 Protocolización Clínica', texto: 'Aplicación de guías y protocolos basados en evidencia.' },
        { subtitulo: '13.3 Atención Centrada en el Paciente', texto: 'Enfoque integral, considerando al paciente y su familia.' },
      ] },
      { id: 'odontologia', titulo: '14. Atención Odontológica', items: [
        { subtitulo: '14.1 Promoción de Salud Oral', texto: 'Programas preventivos desde la infancia.' },
        { subtitulo: '14.2 Bioseguridad en Odontología', texto: 'Protocolos de bioseguridad en la atención.' },
        { subtitulo: '14.3 Acceso Equitativo', texto: 'Acceso justo y sin barreras.' },
      ] },
      { id: 'promocion-mantenimiento', titulo: '15. Promoción y Mantenimiento de la Salud', items: [
        { subtitulo: '15.1 Atención Primaria en Salud (APS)', texto: 'Enfoque APS para salud familiar y comunitaria.' },
        { subtitulo: '15.2 Plan de Intervenciones Colectivas (PIC)', texto: 'Acciones de promoción y prevención bajo el PIC.' },
      ] },
      { id: 'hospitalizacion', titulo: '16. Hospitalización', items: [
        { subtitulo: '16.1 Atención Segura y Humanizada', texto: 'Calidad y humanización en hospitalización.' },
        { subtitulo: '16.2 Acompañamiento Familiar', texto: 'Participación familiar en la recuperación.' },
      ] },
      { id: 'apoyo-dx-tx', titulo: '17. Apoyo Diagnóstico y Terapéutico', items: [
        { subtitulo: '17.1 Oportunidad Diagnóstica', texto: 'Entrega oportuna y confiable de resultados.' },
        { subtitulo: '17.2 Mantenimiento y Calibración', texto: 'Confiabilidad mediante calibración periódica de equipos.' },
      ] },
      { id: 'farmacia-insumos', titulo: '18. Farmacia e Insumos', items: [
        { subtitulo: '18.1 Acceso a Medicamentos Esenciales', texto: 'Disponibilidad y acceso oportuno a medicamentos esenciales.' },
        { subtitulo: '18.2 Dispensación Segura', texto: 'Uso racional y seguro de medicamentos.' },
      ] },
      { id: 'transporte-asistencial', titulo: '19. Transporte Asistencial', items: [
        { subtitulo: '19.1 Disponibilidad Permanente', texto: 'Disponibilidad 24/7 de transporte asistencial para emergencias.' },
        { subtitulo: '19.2 Seguridad en el Traslado', texto: 'Seguridad del paciente durante el traslado y cumplimiento de normas de habilitación.' },
      ] },
    ]
  }

  connectedCallback(){
    super.connectedCallback()
    addEventListener('keydown', this._onKeydown)
  }
  disconnectedCallback(){
    removeEventListener('keydown', this._onKeydown)
    super.disconnectedCallback()
  }

  // --- helpers ---
  #logo(){
    return html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 21V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v14" stroke="#0284c7" stroke-width="1.5"></path>
      <path d="M8 13h8M12 9v8" stroke="#0284c7" stroke-width="1.5" stroke-linecap="round"></path>
    </svg>`
  }
  #badge({ text, color='#0ea5e9', bg='rgba(14,165,233,.08)', border='rgba(14,165,233,.25)'}={}){
    return html`<span class="inline-flex items-center ph3 pv1 f7" style="background:${bg}; color:${color}; border:1px solid ${border}; border-radius:9999px">
      <span style="width:.5rem;height:.5rem;background:${color};border-radius:9999px" class="dib mr2"></span>${text}
    </span>`
  }

  #toggle(id){ this.openId = this.openId === id ? '' : id }

  render(){
    return html`
      <style>
        :host{ display:block; color:#0f172a }
        .bg-grad-page{ background: linear-gradient(to bottom, #ffffff, rgba(14,165,233,.08) 40%, #ffffff) }
        .shadow-soft{ box-shadow: 0 8px 24px rgba(2,8,20,.08) }
        .br-3xl{ border-radius: 1.5rem } .br-2xl{ border-radius: 1rem }
        .sticky-top{ position: sticky; top: 0 }
        .fade-up{ opacity:0; transform: translateY(12px); animation: fadeUp .5s ease forwards }
        .fade-up.delay-1{ animation-delay:.1s }
        @keyframes fadeUp { to { opacity:1; transform:none } }
        .collapse{ overflow:hidden; max-height:0; opacity:0; transition: max-height .35s ease, opacity .25s ease }
        .collapse.open{ max-height: 1200px; opacity:1 }
        .rotate{ transition: transform .25s ease }
        .rotate.open{ transform: rotate(180deg) }
        .tracking-widest{ letter-spacing: .15em }
        .sr-only{ position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0 }
      </style>

      <div class="min-vh-100 bg-grad-page dark-gray">
        <!-- Header -->
        <header class="sticky-top z-2 bg-white-80 bb b--light-silver">
          <div class="center mw8 ph3 flex items-center justify-between" style="height:4rem">
            <div class="flex items-center">
              <div class="h2 w2 br2 bg-washed-blue ba b--light-blue flex items-center justify-center mr3">
                <span class="sr-only">Hospital</span>
                ${this.#logo()}
              </div>
              <div>
                <p class="f7 ttu tracking-widest mid-gray ma0">Normatividad</p>
                <h1 class="f4 fw6 near-black ma0">SUIN y Políticas Institucionales</h1>
              </div>
            </div>
            <nav class="dn dib-ns">
              <a href="#suin" class="ph3 pv2 br3 hover-bg-washed-blue mid-gray">SUIN</a>
              <a href="#como-usar" class="ph3 pv2 br3 hover-bg-washed-blue mid-gray">Cómo usar</a>
              <a href="#politicas" class="ph3 pv2 br3 hover-bg-washed-blue mid-gray">Políticas</a>
            </nav>
          </div>
        </header>

        <!-- SUIN -->
        <section id="suin" class="center mw8 ph3 pt4 pb3">
          <div class="cf">
            <div class="fl w-100 w-70-l pr0 pr4-l fade-up">
              ${this.#badge({ text:'Biblioteca normativa oficial de Colombia' })}
              <h2 class="mt3 f2 fw7 near-black lh-title">Normatividad SUIN</h2>
              <p class="mt3 mid-gray lh-copy">El SUIN es la biblioteca normativa oficial de Colombia, clave para que hospitales, EPS, IPS y profesionales actúen con base en la ley, eviten riesgos jurídicos y fortalezcan la calidad y seguridad de los servicios de salud.</p>
              <div class="mt3 br-2xl ba b--light-silver bg-white pa3">
                <h3 class="f5 fw6 near-black ma0">¿Qué es el SUIN?</h3>
                <p class="mt2 mid-gray">El <span class="fw6 near-black">Sistema Único de Información Normativa</span> consolida, organiza y permite consultar la normatividad vigente del país: leyes, decretos, resoluciones, circulares, sentencias y otros documentos emitidos por entidades del Estado.</p>
              </div>
            </div>
            <aside class="fl w-100 w-30-l fade-up">
              <div class="br-3xl ba b--light-silver bg-white pa3 shadow-1">
                <h4 class="f5 fw6 near-black ma0">Ficha documental</h4>
                <dl class="mt2 f6 mid-gray">
                  <div class="mv2"><dt class="silver">Planeación – MIPG – SGC</dt><dd class="fw6 dark-gray">Código: PT-AD-PL-003</dd></div>
                  <div class="mv2 flex">
                    <div class="w-50 pr2"><dt class="silver">Versión</dt><dd class="fw6 dark-gray">V.1</dd></div>
                    <div class="w-50 pl2"><dt class="silver">Fecha de emisión</dt><dd class="fw6 dark-gray">18-08-2025</dd></div>
                  </div>
                  <div class="mv2"><dt class="silver">Título</dt><dd class="fw6 dark-gray">Protocolo Normatividad SUIN</dd></div>
                </dl>
                <a href="https://www.suin-juriscol.gov.co/" target="_blank" rel="noreferrer" class="db tc mt3 br3 white bg-blue hover-bg-dark-blue pv2 no-underline">Ir al sitio del SUIN</a>
              </div>
            </aside>
          </div>
        </section>

        <!-- Cómo usar -->
        <section id="como-usar" class="center mw8 ph3 pb4">
          <div class="br-3xl ba b--light-silver bg-white pa4 shadow-1">
            <h3 class="f4 fw6 near-black ma0">¿Cómo usar el SUIN en salud?</h3>
            <p class="mt2 mid-gray f6">Herramienta fundamental para hospitales, EPS, secretarías, profesionales y usuarios. Orientación práctica:</p>
            <div class="mt3 cf">
              ${[
                {
                  step: 'Paso 1', title: 'Búsqueda normativa', body: html`<ol class="pl3">
                    <li class="mv2">Ingresar a <a class="blue" target="_blank" rel="noreferrer" href="https://www.suin-juriscol.gov.co/">suin-juriscol.gov.co</a></li>
                    <li class="mv2">Usar palabras clave: <span class="fw6">salud pública, seguridad del paciente, Ley 100, RIAS, APS, calidad, EPS, IPS</span>.</li>
                    <li class="mv2">Filtrar por tipo de norma (ley, decreto, resolución), año o entidad emisora (MinSalud, etc.).</li>
                  </ol>`
                },
                {
                  step: 'Paso 2', title: 'Consultas específicas', body: html`<ul class="pl3">
                    <li class="mv1">Resoluciones de habilitación de servicios de salud</li>
                    <li class="mv1">Normas de seguridad del paciente</li>
                    <li class="mv1">Gestión de calidad en salud</li>
                    <li class="mv1">Decretos de contratación, talento humano y régimen de ESE</li>
                    <li class="mv1">Políticas públicas: APS, materno-infantil, crónicas, ambiental</li>
                  </ul>`
                },
                {
                  step: 'Paso 3', title: 'Seguimiento y aplicación', body: html`<ul class="pl3">
                    <li class="mv1">Verificar vigencia: vigente, modificada o derogada</li>
                    <li class="mv1">Construir manuales, protocolos y políticas alineadas a ley</li>
                    <li class="mv1">Capacitar talento humano con normas actualizadas</li>
                    <li class="mv1">Diseñar proyectos de salud pública respaldados por norma</li>
                    <li class="mv1">Gestionar riesgos legales aplicando disposiciones correctamente</li>
                  </ul>`
                },
              ].map(card => html`<div class="fl w-100 w-33-m w-33-l pa2">
                <div class="br-2xl ba b--light-silver pa3">
                  <p class="f7 ttu tracked silver ma0">${card.step}</p>
                  <h4 class="mt1 fw6 near-black">${card.title}</h4>
                  <div class="mid-gray f6">${card.body}</div>
                </div>
              </div>`)}
            </div>
          </div>
        </section>

        <!-- Políticas institucionales -->
        <section id="politicas" class="center mw8 ph3 pb5">
          <div class="br-3xl ba b--light-silver bg-white pa4 shadow-1">
            <div class="flex flex-column flex-row-l">
              <div class="w-100 w-30-l pr0 pr3-l">
                <h3 class="f4 fw6 near-black ma0">Políticas Institucionales</h3>
                <p class="mt2 mid-gray f6">Documento base: <span class="fw6">PO-AD-PL-001</span> · Versión <span class="fw6">V.1</span> · Emisión <span class="fw6">18-08-2025</span></p>
                <p class="mt2 mid-gray f6">Despliega cada bloque para ver sus políticas y subpolíticas.</p>
              </div>
              <div class="w-100 w-70-l">
                <ul class="list pl0 mt0">
                  ${this.politicas.map(p => html`
                    <li class="ba b--light-silver br3 mv2">
                      <button class="w-100 flex items-center justify-between ph3 pv3 tl" @click=${() => this.#toggle(p.id)} aria-expanded=${this.openId===p.id} aria-controls=${p.id+'-panel'}>
                        <span class="fw6 near-black">${p.titulo}</span>
                        <svg class="rotate ${this.openId===p.id? 'open' : ''}" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <path d="M6 8l4 4 4-4" stroke="#0ea5e9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </button>
                      <div id=${p.id+'-panel'} class="collapse ${this.openId===p.id? 'open' : ''} ph3 pb3" role="region">
                        <div class="cf">
                          ${p.items.map(it => html`<div class="fl w-100 w-50-m w-50-l pa1">
                            <div class="br2 ba b--light-silver bg-near-white pa3">
                              <p class="f6 fw6 near-black ma0">${it.subtitulo}</p>
                              <p class="f6 mid-gray mt1 mb0">${it.texto}</p>
                            </div>
                          </div>`) }
                        </div>
                      </div>
                    </li>
                  `)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer class="bt b--light-silver pv4 tc f7 mid-gray">Diseño sobrio y elegante. Blanco + azules, accesible y legible.</footer>
      </div>
    `
  }
}

customElements.define('x-normatividad', XNormatividad)
