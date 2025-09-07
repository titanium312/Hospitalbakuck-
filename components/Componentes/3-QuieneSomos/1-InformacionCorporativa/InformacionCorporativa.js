// Componentes/3-QuieneSomos/1-InformacionCorporativa/InformacionCorporativa.js
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class InformacionCorporativa extends LitElement {
  // Light DOM para que apliquen estilos globales
  createRenderRoot(){ return this; }

  #chip(text){ return html`<span class="inline-flex items-center br-pill ba b--blue bg-washed-blue ph3 pv1 f7 fw6 dark-blue">${text}</span>`; }
  #dot(){ return html`<span class="mt1 br-100 bg-blue" style="width:.5rem;height:.5rem;display:inline-block;"></span>`; }

  render(){
    const funciones = [
      'Prestar servicios de baja complejidad (promoción, prevención, diagnóstico, tratamiento y rehabilitación) según PBS y capacidad instalada.',
      'Garantizar acceso, continuidad e integralidad de la atención en salud para Ayapel y su área de influencia.',
      'Ejecutar políticas de salud pública: vacunación, control de enfermedades transmisibles y crónicas, salud materno-infantil y escolar, entre otras.',
      'Desarrollar acciones de PyP en el marco de las RIAS.',
      'Administrar eficientemente los recursos públicos, con sostenibilidad y transparencia.',
      'Prestar servicios de urgencias básicas 24/7, estabilizar y referir cuando se requiera.',
      'Implementar referencia y contrarreferencia para atención integral en la red.',
      'Mantener actualizados los planes institucionales (PDI, Plan de Acción, Talento Humano, Calidad, Mantenimiento, etc.).',
      'Fomentar la participación social: veeduría, asociaciones de usuarios y rendición de cuentas.',
      'Cumplir normas de seguridad del paciente, calidad y humanización conforme a la PAIS.',
    ];

    const deberesUsuarios = [
      'Brindar atención digna, oportuna, segura y con calidad.',
      'Respetar derechos de los pacientes y su participación en decisiones sobre su salud.',
      'Mantener canales de comunicación claros (PQRS, líneas, web).',
    ];

    const deberesEstado = [
      'Cumplir lineamientos de Minsalud y autoridades territoriales; presentar informes de gestión y calidad; transparencia y acceso a la información.',
      'Proveer condiciones de trabajo seguras, dignas y de desarrollo; inducción, capacitación y evaluación; cumplimiento en SST.',
      'Gestión ambiental hospitalaria, manejo de residuos y responsabilidad social.',
    ];

    const valores = [
      { t:'Honestidad', d:'Actuamos con rectitud, transparencia y coherencia, privilegiando el interés colectivo.' },
      { t:'Respeto', d:'Valoramos la dignidad de cada persona y ofrecemos un trato humano, justo e incluyente.' },
      { t:'Compromiso', d:'Servimos con responsabilidad, dedicación y vocación comunitaria.' },
      { t:'Diligencia', d:'Operamos con eficiencia, prontitud y excelencia, cuidando los recursos públicos.' },
      { t:'Justicia', d:'Garantizamos equidad e imparcialidad, respetando los derechos de todas las personas.' },
      { t:'Seguridad', d:'Promovemos conductas responsables que protegen la vida y la salud.' },
    ];

    const principios = [
      'Probidad','Transparencia','Ejemplaridad','Planeación','Eficiencia y eficacia','Participación','Interés general','Compromiso colectivo'
    ];

    const propuesta = [
      'Atención centrada en el paciente y su familia, con trato humanizado y acompañamiento integral.',
      'Gestión del riesgo en salud: anticipación, prevención y autocuidado.',
      'Red integrada de servicios articulada con la ESE y otros niveles de complejidad.',
      'Innovación y conocimiento: TIC y telemedicina para ampliar cobertura y oportunidad.',
      'Seguridad y calidad del paciente como principios rectores.',
    ];

    const cadenaValor = [
      'Atención primaria en salud (APS): promoción, prevención y detección temprana de riesgos.',
      'Procesos asistenciales seguros: consultas, urgencias, hospitalización básica y apoyo diagnóstico.',
      'Apoyo clínico y logístico: laboratorio, farmacia, mantenimiento y suministros.',
      'Gestión administrativa y financiera para sostenibilidad y eficiencia.',
      'Relación con el entorno: articulación con EPS, entes territoriales y comunidad.',
    ];

    const politicaCalidad = [
      'Cumplimiento de normatividad y estándares nacionales de calidad en salud.',
      'Gestión de riesgos en salud e institucionales para atención segura.',
      'Fortalecimiento de la humanización, dignidad y derechos de los usuarios.',
      'Participación activa de la comunidad en procesos de salud.',
      'Formación, compromiso y bienestar del talento humano.',
      'Innovación, investigación y gestión del conocimiento.',
      'Sostenibilidad financiera y administrativa que respalde la misión.',
    ];

    return html`
      <style>
        /* Degradados y efectos mínimos sin @import */
        .bg-grad { background: linear-gradient(to bottom, rgba(239,246,255,.7), #fff, rgba(239,246,255,.7)); }
        .blurball { filter: blur(36px); opacity: .4; }
        .ring { box-shadow: 0 0 0 1px rgba(29,78,216,.15) inset, 0 8px 20px rgba(2, 8, 20, .06); }
        .card { border-radius: 1.25rem; background: rgba(255,255,255,.92); }
        .dot { width:.5rem;height:.5rem;display:inline-block;border-radius:9999px;background:#2563eb; }
        .divider { height:.35rem; width:7rem; border-radius:9999px; background: linear-gradient(90deg, rgba(56,189,248,.3), rgba(14,165,233,.7), rgba(56,189,248,.3)); }
        .vignette { position:absolute; left:0; right:0; bottom:0; height:4rem; background: linear-gradient(to top, #fff, transparent); pointer-events:none; }
      </style>

      <section class="relative w-100 bg-grad">
        <!-- decor sutil -->
        <div class="absolute top--3 right--3 w5 h5 br-100 bg-light-blue blurball" aria-hidden="true"></div>
        <div class="absolute bottom--3 left--2 w6 h6 br-100 bg-washed-blue blurball" aria-hidden="true"></div>

        <div class="center w-100 mw8 ph3 ph4-ns pv4 pv5-ns relative z-1">
          <!-- Intro -->
          <header class="tc">
            ${this.#chip('Plataforma Estratégica')}
            <h1 class="mt3 f2 f1-ns fw8 dark-gray">Hospital San Jorge de Ayapel</h1>
            <p class="mt3 center measure-wide mid-gray">
              Bienvenidos a nuestra página web. Somos una ESE de primer nivel, cercana a la gente, que presta servicios de baja complejidad con calidad, seguridad y calidez humana.
            </p>
          </header>

          <div class="center mt3 divider"></div>

          <!-- Quiénes somos + cifras -->
          <section class="mt4 mt5-ns">
            <div class="cf">
              <div class="fl w-100 w-60-l pr0 pr4-l">
                <h2 class="f3 f2-ns fw8 dark-gray">Quiénes somos</h2>
                <p class="mt3 mid-gray">
                  Estamos comprometidos con la salud y la vida de cada habitante del municipio y su área de influencia. Fuimos creados por el Acuerdo N.º 002 del 14 de febrero de 1991 y reestructurados por el Decreto 104 de 1995 como la ESE Hospital San Jorge de Ayapel.
                </p>
                <p class="mt2 mid-gray">
                  Nuestra razón de ser son las personas: niños, jóvenes, adultos y adultos mayores. Contamos con talento humano competente y comprometido, que trabaja con vocación de servicio, responsabilidad y amor por la comunidad.
                </p>
              </div>

              <aside class="fl w-100 w-40-l mt3 mt0-l">
                <div class="card ring pa3 pa4-ns">
                  <h3 class="f5 fw7 dark-blue">En cifras</h3>
                  <div class="mt3 cf">
                    <div class="fl w-50 pa2">
                      <div class="tc br3 bg-washed-blue pa3 ring">
                        <div class="f7 blue">Corregimientos</div>
                        <div class="mt1 f2 fw8 dark-blue">10</div>
                      </div>
                    </div>
                    <div class="fl w-50 pa2">
                      <div class="tc br3 bg-washed-blue pa3 ring">
                        <div class="f7 blue">Veredas</div>
                        <div class="mt1 f2 fw8 dark-blue">47</div>
                      </div>
                    </div>
                  </div>
                  <p class="mt3 f6 mid-gray">
                    Acercamos nuestros servicios a las zonas rurales para reducir barreras de acceso y llevar salud donde más se necesita.
                  </p>
                </div>
              </aside>
            </div>
          </section>

          <!-- Misión / Visión -->
          <section class="mt4 mt5-ns flex-ns flex-wrap-ns">
            <div class="w-100 w-50-ns pr0 pr3-ns">
              <div class="card ring pa4">
                <h2 class="f4 f3-ns fw8 dark-blue">Misión</h2>
                <p class="mt2 mid-gray">
                  Proporcionar atención médica de alta calidad y accesible a todos los pacientes, sin importar su condición. Brindamos un servicio humano y compasivo, utilizando la tecnología y los recursos de manera eficiente para mejorar la salud y el bienestar de nuestra comunidad.
                </p>
              </div>
            </div>
            <div class="w-100 w-50-ns pl0 pl3-ns mt3 mt0-ns">
              <div class="card ring pa4">
                <h2 class="f4 f3-ns fw8 dark-blue">Visión 2030</h2>
                <p class="mt2 mid-gray">
                  Ser un hospital líder en la región, reconocido por la excelencia en atención médica, investigación y educación; un modelo de atención sanitaria pública que genere confianza y satisfacción en pacientes y familias.
                </p>
              </div>
            </div>
          </section>

          <!-- Funciones -->
          <section class="mt5">
            <h2 class="f3 f2-ns fw8 dark-gray">Funciones Generales</h2>
            <ul class="mt3 list pl0">
              ${funciones.map(txt => html`
                <li class="flex items-start mt2">
                  <span class="dot mt1 mr2"></span>
                  <p class="ma0 mid-gray">${txt}</p>
                </li>
              `)}
            </ul>
          </section>

          <!-- Deberes -->
          <section class="mt5 cf">
            <div class="fl w-100 w-50-ns pr0 pr3-ns">
              <h2 class="f3 f2-ns fw8 dark-gray">Deberes con usuarios y comunidad</h2>
              <ul class="mt3 list pl0">
                ${deberesUsuarios.map(txt => html`
                  <li class="flex items-start mt2">
                    <span class="dot mt1 mr2"></span>
                    <p class="ma0 mid-gray">${txt}</p>
                  </li>
                `)}
              </ul>
            </div>
            <div class="fl w-100 w-50-ns pl0 pl3-ns mt3 mt0-ns">
              <h3 class="f3 fw8 dark-gray">Deberes con el Estado y el talento humano</h3>
              <ul class="mt3 list pl0">
                ${deberesEstado.map(txt => html`
                  <li class="flex items-start mt2">
                    <span class="dot mt1 mr2"></span>
                    <p class="ma0 mid-gray">${txt}</p>
                  </li>
                `)}
              </ul>
            </div>
          </section>

          <!-- Valores -->
          <section class="mt5">
            <h2 class="f3 f2-ns fw8 dark-gray">Valores Corporativos</h2>
            <div class="mt3 cf">
              ${valores.map(v => html`
                <article class="fl w-100 w-50-m w-33-l pa2">
                  <div class="card ring pa3">
                    <h4 class="f5 fw7 dark-blue ma0">${v.t}</h4>
                    <p class="mt2 mid-gray">${v.d}</p>
                  </div>
                </article>
              `)}
            </div>
          </section>

          <!-- Principios -->
          <section class="mt5">
            <h2 class="f3 f2-ns fw8 dark-gray">Principios de la gestión pública</h2>
            <div class="mt3 cf">
              ${principios.map(p => html`
                <div class="fl w-50-m w-33-l pa2">
                  <div class="tc br3 bg-washed-blue pa3 ring dark-blue fw6">${p}</div>
                </div>
              `)}
            </div>
          </section>

          <!-- Propuesta de valor -->
          <section class="mt5 cf">
            <div class="fl w-100 w-60-l pr0 pr4-l">
              <h2 class="f3 f2-ns fw8 dark-gray">Propuesta de valor</h2>
              <p class="mt2 mid-gray">
                Reconocemos los riesgos en salud de nuestra población y los institucionales. Para responder, proponemos un modelo de atención centrado en el paciente y su familia, gestión del riesgo, red integrada de servicios, innovación y telemedicina, y seguridad del paciente.
              </p>
              <ul class="mt3 list pl0">
                ${propuesta.map(txt => html`
                  <li class="flex items-start mt2">
                    <span class="dot mt1 mr2"></span>
                    <p class="ma0 mid-gray">${txt}</p>
                  </li>
                `)}
              </ul>
            </div>
            <aside class="fl w-100 w-40-l mt3 mt0-l">
              <div class="card ring pa4">
                <h3 class="f5 fw7 dark-blue">Cadena de valor hospitalaria</h3>
                <ul class="mt3 list pl0">
                  ${cadenaValor.map(txt => html`
                    <li class="flex items-start mt2">
                      <span class="dot mt1 mr2" style="width:.4rem;height:.4rem;background:#3b82f6;"></span>
                      <span class="mid-gray">${txt}</span>
                    </li>
                  `)}
                </ul>
              </div>
            </aside>
          </section>

          <!-- Política de calidad -->
          <section class="mt5">
            <h2 class="f3 f2-ns fw8 dark-gray">Política de Calidad</h2>
            <p class="mt2 mid-gray">
              Como institución pública de primer nivel, nos comprometemos con servicios integrales, seguros, humanizados y centrados en el paciente y su familia; garantizamos accesibilidad, continuidad y oportunidad, con eficiencia, transparencia, equidad y sostenibilidad.
            </p>
            <ul class="mt3 list pl0">
              ${politicaCalidad.map(txt => html`
                <li class="flex items-start mt2">
                  <span class="dot mt1 mr2"></span>
                  <span class="mid-gray">${txt}</span>
                </li>
              `)}
            </ul>
          </section>
        </div>

        <div class="vignette"></div>
      </section>
    `;
  }
}

customElements.define('informacion-corporativa', InformacionCorporativa);
