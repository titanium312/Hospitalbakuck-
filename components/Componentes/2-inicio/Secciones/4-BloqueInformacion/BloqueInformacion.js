import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class BloqueInformacion extends LitElement {
  createRenderRoot() {
    return this; // Usa Light DOM para aplicar estilos globales (como Tachyons o Bulma)
  }

  static styles = css`
    .maxw { max-width: 72rem; }
    .bar-grad {
      height: 8px;
      width: 6rem;
      border-radius: 9999px;
      background: linear-gradient(90deg, #38bdf8, #22d3ee, #3b82f6);
    }
    .glass {
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(6px);
      border: 1px solid #e0f2fe;
    }
    .card {
      background: #fff;
      border: 1px solid #e0f2fe;
      border-radius: 1rem;
      box-shadow: 0 8px 24px rgba(2, 8, 20, 0.06);
    }
    .ring-sky { box-shadow: 0 0 0 1px #e0f2fe inset; }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }
    @media (min-width: 48rem) {
      .grid-3 {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .icon-container {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 9999px;
      border: 2px solid #7dd3fc;
      color: #0ea5e9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
  `;

  _icon(name, props = {}) {
    const { size = 20, color = 'currentColor', className = '' } = props;
    const s = String(size);
    const base = (paths) => html`
      <svg width=${s} height=${s} viewBox="0 0 24 24" fill="none"
           stroke=${color} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
           class=${className} aria-hidden="true">${paths}</svg>`;
    switch (name) {
      case 'phone':
        return base(html`<path d="M4 5c0-1.1.9-2 2-2h2c.5 0 .9.3 1 .8l.7 3a1 1 0 0 1-.3.9L8.3 9.5a12.5 12.5 0 0 0 6.2 6.2l1.8-1.1a1 1 0 0 1 .9-.1l3 .7c.5.1.8.5.8 1v2a2 2 0 0 1-2 2h-1C9.8 20.2 3.8 14.2 4 6V5Z"/>`);
      case 'calendar':
        return base(html`<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>`);
      case 'map-pin':
        return base(html`<path d="M12 22s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="11" r="2.5"/>`);
      case 'arrow-right':
        return base(html`<path d="M5 12h14M13 6l6 6-6 6"/>`);
      case 'shield':
        return base(html`<path d="M12 3 5 6v6c0 5 7 9 7 9s7-4 7-9V6l-7-3Z" stroke-linejoin="round"/>`);
      default: return base('');
    }
  }

  _quickLink({ iconName, label, href }) {
    return html`
      <a href=${href}
         class="group flex items-center justify-between br3 bg-white ba b--light-blue ph4 pv3 shadow-1 hover-bg-near-white no-underline"
         aria-label=${label}>
        <span class="inline-flex items-center">
          <span class="mr3 icon-container">${this._icon(iconName, { size: 20 })}</span>
          <span class="fw6 near-black">${label}</span>
        </span>
        <span class="o-80 group-hover-mh1">
          ${this._icon('arrow-right', { size: 20, color: '#0284c7', className: 'transition-transform' })}
        </span>
      </a>
    `;
  }

  render() {
    return html`
      <section aria-labelledby="info-title" class="center maxw ph3 pv4 pv5-ns">
        <div class="bar-grad center"></div>

        <div class="mt3 mt4-ns br4 glass pa3 pa4-ns">
          <div class="grid-3">
            <!-- Columna 1 -->
            <article class="card pa4">
              <div class="flex items-start">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Coat_of_arms_of_Colombia.svg/250px-Coat_of_arms_of_Colombia.svg.png"
                     alt="Escudo de Colombia" class="h3 h4-ns w-auto mr3" loading="lazy" />
                <div class="flex-auto">
                  <h3 id="info-title" class="f4 fw7 near-black mt0 mb2">Hospital San Jorge de Medellín</h3>
                  <p class="mid-gray lh-copy mv0">
                    Somos una Empresa Social del Estado que presta servicios de salud de baja y mediana complejidad.
                    Priorizamos la seguridad del paciente, la confianza y la calidez humana.
                  </p>
                  <div class="mt3 inline-flex items-center ph3 pv2 br-pill"
                       style="background:#eff6ff; color:#0369a1; border:1px solid #e0f2fe;">
                    <span class="mr2">${this._icon('shield',{size:16,color:'#0369a1'})}</span>
                    <span class="fw6">Atención segura y humanizada</span>
                  </div>
                </div>
              </div>
            </article>

            <!-- Columna 2 -->
            <article class="card pa4">
              <h3 class="f5 fw7 near-black mt0">Atención al usuario</h3>
              <div class="mt2 flex items-center dark-gray">
                <span class="mr2">${this._icon('phone',{size:18,color:'#0284c7'})}</span>
                <a href="tel:+576040000000" class="link blue hover-dark-blue">(604) 000 0000</a>
                <span class="ml2 silver">Ext. 1000 y 1001</span>
              </div>
              <p class="mt3 fw6 near-black mb2">Nuestras redes sociales</p>
              <div class="flex items-center">
                ${['F','X','I','Y'].map(l => html`
                  <span title=${l} class="mr2 icon-container bg-white">${l}</span>
                `)}
              </div>
              <p class="mt3 fw6 near-black mb1">Línea de transparencia</p>
              <div class="flex items-center dark-gray">
                <span class="mr2">${this._icon('phone',{size:18,color:'#0284c7'})}</span>
                <a href="tel:+576040000000" class="link blue hover-dark-blue">(604) 000 0000</a>
              </div>
              <p class="mt2 f6 silver">
                Horario de atención: Lunes a sábado 6:00 a. m. a 10:00 p. m.
              </p>
              <a href="#" class="mt3 inline-flex items-center link blue hover-dark-blue">
                <span class="mr2">${this._icon('arrow-right',{size:16,color:'#0284c7'})}</span>
                <span class="fw6">Reporte en línea aquí</span>
              </a>
            </article>

            <!-- Columna 3 -->
            <article class="card pa4">
              <h3 class="f5 fw7 near-black mt0">Nuestra información</h3>
              <dl class="mt2 mid-gray">
                <div class="flex flex-wrap items-baseline">
                  <dt class="fw6 near-black mr2">Conmutador:</dt>
                  <dd class="ma0"><a href="tel:+576040000000" class="link blue hover-dark-blue">(604) 000 0000</a></dd>
                </div>
                <div class="flex flex-wrap items-baseline mt2">
                  <dt class="fw6 near-black mr2">Dirección:</dt>
                  <dd class="ma0">Calle 00 # 00–00, Medellín – Colombia</dd>
                </div>
                <div class="flex flex-wrap items-baseline mt2">
                  <dt class="fw6 near-black mr2">Correo:</dt>
                  <dd class="ma0"><a href="mailto:contacto@hsjm.gov.co" class="link blue hover-dark-blue">contacto@hsjm.gov.co</a></dd>
                </div>
                <div class="flex flex-wrap items-baseline mt2">
                  <dt class="fw6 near-black mr2">Notificaciones judiciales:</dt>
                  <dd class="ma0"><a href="mailto:procesos@hsjm.gov.co" class="link blue hover-dark-blue">procesos@hsjm.gov.co</a></dd>
                </div>
                <div class="flex flex-wrap items-baseline mt2">
                  <dt class="fw6 near-black mr2">NIT:</dt>
                  <dd class="ma0">000000000-0</dd>
                </div>
              </dl>
              <h4 class="mt3 fw6 near-black">Horario y servicios</h4>
              <ul class="mt2 pl3 mid-gray">
                <li>Asignación de citas: L–J 7:00 a. m. – 5:00 p. m.; V 7:00 a. m. – 4:00 p. m.</li>
                <li>Urgencias: 24 horas.</li>
                <li>Consulta externa: L–V 7:00 a. m. – 5:00 p. m.</li>
                <li>Administrativo: L–V 7:00 a. m. – 5:00 p. m.</li>
              </ul>
            </article>
          </div>

          <!-- Enlaces rápidos -->
          <div class="mt3 flex flex-column flex-row-ns gap">
            <div class="w-100 w-third-ns pr2-ns">
              ${this._quickLink({ iconName:'phone', label:'Urgencias 24/7', href:'tel:+576040000000' })}
            </div>
            <div class="w-100 w-third-ns ph2-ns mt2 mt0-ns">
              ${this._quickLink({ iconName:'calendar', label:'Pedir cita', href:'#' })}
            </div>
            <div class="w-100 w-third-ns pl2-ns mt2 mt0-ns">
              ${this._quickLink({ iconName:'map-pin', label:'Cómo llegar', href:'#' })}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('bloque-informacion', BloqueInformacion);
