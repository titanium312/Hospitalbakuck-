import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class MapaDeProcesosElement extends LitElement {
  createRenderRoot(){ return this } // Light DOM → aplica Tachyons/Bulma global

  static properties = {
    open: { type: Boolean },
  }

  constructor(){
    super();
    this.open = false;
    this.imgSrc = "https://img1.wsimg.com/isteam/ip/2a2c3ae8-dfb2-48fa-9fcf-4e2478b682dc/Anexo%20Mapa%20de%20procesos.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:984,h:730";
  }

  // Animaciones suaves (reemplazo de framer-motion)
  firstUpdated(){
    // marca elementos con clase .fade-up como visibles
    requestAnimationFrame(()=>{
      this.renderRoot.querySelectorAll('.fade-up').forEach(el=>{
        el.classList.add('on');
      });
    });
  }

  // estilos mínimos para degradados, chips y modal
  _styles(){
    return html`
      <style>
        .bg-grad-page{ background: linear-gradient(to bottom, #fff, rgba(14,165,233,.08), #fff); }
        .bg-glass{ backdrop-filter: blur(6px); background: rgba(255,255,255,.7); }
        .chip{ display:inline-flex; align-items:center; gap:.4rem; padding:.25rem .6rem; border-radius:9999px; font-size:.75rem; color:#0369a1; background:#e0f2fe; border:1px solid #bae6fd; }
        .dot{ width:.5rem; height:.5rem; border-radius:9999px; background:#0ea5e9; display:inline-block; }
        .card{ border-radius:1.25rem; border:1px solid rgba(15,23,42,.12); background:#fff; box-shadow:0 8px 24px rgba(2,8,20,.06); }
        .card-sky{ border-color:#cfe8fb; }
        .badge{ display:inline-flex; align-items:center; gap:.4rem; padding:.25rem .6rem; border-radius:9999px; font-size:.75rem; border:1px solid; }
        .badge-sky{ color:#0369a1; background:#e0f2fe; border-color:#bae6fd; }
        .badge-gray{ color:#334155; background:#f8fafc; border-color:#e2e8f0; }
        .badge-emerald{ color:#047857; background:#ecfdf5; border-color:#a7f3d0; }
        .fade-up{ opacity:0; transform:translateY(10px); transition:opacity .6s ease, transform .6s ease; }
        .fade-up.on{ opacity:1; transform:none; }
        /* Modal */
        .scrim{ position:fixed; inset:0; background:rgba(15,23,42,.7); backdrop-filter: blur(3px); z-index:9999; display:flex; align-items:center; justify-content:center; padding:1rem; }
        .modal{ position:relative; width:100%; height:100%; max-width:1200px; max-height:85vh; border-radius:1.25rem; overflow:hidden; border:1px solid rgba(255,255,255,.15); background:rgba(15,23,42,.2); }
        .modal img{ width:100%; height:100%; object-fit:contain; background:#fff; }
        .close-btn{ position:absolute; top:.75rem; right:.75rem; background:rgba(255,255,255,.9); border-radius:.75rem; padding:.5rem .75rem; border:none; cursor:pointer; }
        @media (min-width:60rem){
          .grid-12{ display:grid; grid-template-columns: repeat(12, minmax(0,1fr)); gap:2rem; }
          .col-7{ grid-column: span 7 / span 7; }
          .col-5{ grid-column: span 5 / span 5; }
          .col-8{ grid-column: span 8 / span 8; }
          .col-4{ grid-column: span 4 / span 4; }
        }
      </style>
    `;
  }

  render(){
    return html`
      ${this._styles()}
      <div class="min-vh-100 bg-grad-page dark-gray">
        <!-- Barra superior -->
        <header class="sticky top-0 z-5 ba b--black-10 bg-white bg-glass">
          <div class="mw8 center ph3 ph4-ns">
            <div class="flex items-center justify-between" style="height:4rem;">
              <div class="flex items-center">
                <div class="w2-5 h2-5 br3 bg-washed-blue ba b--light-blue flex items-center justify-center mr2">
                  <span class="sr-only">Hospital</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 21V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v14" stroke="#0284c7" stroke-width="1.5"/>
                    <path d="M8 13h8M12 9v8" stroke="#0284c7" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <div>
                  <p class="f7 ttu tracked silver ma0">Gestión de Calidad</p>
                  <h1 class="f4 fw6 near-black ma0">Mapa de Procesos</h1>
                </div>
              </div>
              <nav class="dn db-ns">
                <a href="#explicacion" class="ph3 pv2 br3 mid-gray hover-bg-washed-blue no-underline">Explicación</a>
                <a href="#mapa" class="ph3 pv2 br3 mid-gray hover-bg-washed-blue no-underline">Visual</a>
                <a href="#comparacion" class="ph3 pv2 br3 mid-gray hover-bg-washed-blue no-underline">Comparación</a>
              </nav>
            </div>
          </div>
        </header>

        <!-- Explicación -->
        <section id="explicacion" class="mw8 center ph3 ph4-ns pt4 pb3">
          <div class="grid-12">
            <div class="col-7">
              <div class="fade-up">
                <span class="chip"><span class="dot"></span> Visión integral de la organización</span>
                <h2 class="mt3 f2 fw8 near-black lh-title">Un mapa claro, clínico y humano</h2>
                <p class="mt2 mid-gray lh-copy">
                  Este mapa de procesos representa cómo fluye el valor en nuestra institución: desde los
                  <span class="fw6 near-black">procesos estratégicos</span> que marcan el rumbo,
                  pasando por los <span class="fw6 near-black">procesos misionales</span> que atienden al paciente,
                  hasta los <span class="fw6 near-black">procesos de apoyo</span> que los habilitan.
                  Estética hospitalaria: <span class="blue">blancos luminosos</span>, <span class="blue">azules confiables</span> y mucho espacio en blanco.
                </p>
                <div class="mt3">
                  <div class="cf">
                    ${[
                      { title: "Estratégicos", desc: "Dirección, planeación, riesgos" },
                      { title: "Misionales", desc: "Atención, seguridad del paciente" },
                      { title: "Apoyo", desc: "Talento humano, compras, tecnología" },
                      { title: "Medición", desc: "Indicadores, mejora continua" },
                    ].map((it)=> html`
                      <div class="fl w-100 w-50-m pa2">
                        <div class="card pa3">
                          <div class="flex items-start">
                            <span class="dot mt1 mr2"></span>
                            <div>
                              <p class="ma0 fw6 near-black">${it.title}</p>
                              <p class="ma0 mid-gray">${it.desc}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    `)}
                  </div>
                </div>
              </div>
            </div>

            <div class="col-5">
              <div class="fade-up">
                <div class="br3 shadow-4" style="background:linear-gradient(135deg,#0284c7,#0ea5e9); padding: .25rem;">
                  <div class="br3 bg-white pa3">
                    <figure class="br3 overflow-hidden ba b--black-10">
                      <img
                        src=${this.imgSrc}
                        alt="Mapa de Procesos institucional"
                        class="w-100" style="max-height:20rem; object-fit:cover; cursor: zoom-in;"
                        @click=${()=> this.open = true}
                        role="button"
                        aria-label="Ampliar mapa de procesos"
                      />
                    </figure>
                    <div class="mt2 flex items-center justify-between">
                      <p class="ma0 f6 mid-gray">Haz clic en la imagen para verla a tamaño completo.</p>
                      <button class="ph3 pv2 br3 white bg-blue bn pointer"
                              @click=${()=> this.open = true}>
                        Ampliar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>            
          </div>
        </section>

        <!-- Visual principal -->
        <section id="mapa" class="mw8 center ph3 ph4-ns pb3">
          <div class="grid-12">
            <div class="col-8">
              <div class="card pa3 card-sky">
                <div class="flex items-center justify-between">
                  <h3 class="f4 fw6 near-black ma0">Visual del mapa</h3>
                  <div class="flex items-center">
                    <span class="badge badge-sky mr2"><span class="dot"></span> Estrategia</span>
                    <span class="badge badge-gray mr2"><span class="dot" style="background:#94a3b8"></span> Apoyo</span>
                    <span class="badge badge-emerald"><span class="dot" style="background:#10b981"></span> Misional</span>
                  </div>
                </div>
                <div class="mt3 br3 overflow-hidden ba b--black-10">
                  <img src=${this.imgSrc} alt="Mapa de procesos – vista detalle" class="w-100 h-auto"/>
                </div>
                <p class="mt2 f6 mid-gray">
                  Lectura: izquierda→derecha y arriba→abajo. Primero estrategia, luego misional y finalmente apoyo y medición.
                </p>
              </div>
            </div>

            <!-- KPIs -->
            <div class="col-4">
              <div class="card pa3">
                <h4 class="f5 fw6 near-black ma0">Cómo interpretar</h4>
                <ol class="mt2 pl3 f6 mid-gray">
                  <li><span class="dot mr2"></span>Ubica el macroproceso.</li>
                  <li><span class="dot mr2" style="background:#10b981"></span>Sigue el flujo al paciente.</li>
                  <li><span class="dot mr2" style="background:#94a3b8"></span>Identifica apoyos y controles.</li>
                  <li><span class="dot mr2" style="background:#8b5cf6"></span>Revisa indicadores clave.</li>
                </ol>

                <div class="mt3 cf">
                  ${[
                    { k: "Satisfacción", v: "92%" },
                    { k: "Adherencia", v: "98%" },
                    { k: "Oportunidad", v: "< 30m" },
                    { k: "Eventos", v: "↓ 27%" },
                  ].map((m)=> html`
                    <div class="fl w-50 pa1">
                      <div class="br3 ba b--black-10 pa3" style="background:linear-gradient(135deg,#fff,#eff6ff);">
                        <p class="ma0 f7 silver ttu tracked">${m.k}</p>
                        <p class="ma0 f3 fw7 near-black">${m.v}</p>
                      </div>
                    </div>
                  `)}
                </div>

                <button class="mt3 w-100 ph3 pv2 br3 white bg-blue bn pointer">
                  Descargar ficha del mapa
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Comparación -->
        <section id="comparacion" class="mw8 center ph3 ph4-ns pb5">
          <div class="card pa3 pa4-ns">
            <div class="flex flex-column flex-row-l items-start-l justify-between-l">
              <div class="w-100 w-50-l pr0 pr3-l">
                <h3 class="f4 fw6 near-black">Nuestra estética</h3>
                <p class="mt2 f6 mid-gray">
                  Interfaces clínicas modernas: espacios amplios, navegación simple, contraste alto y azules como color funcional. Genera confianza, calma y precisión.
                </p>
                <ul class="mt2 f6 mid-gray">
                  <li class="flex items-start"><span class="dot mr2"></span>Jerarquía tipográfica clara.</li>
                  <li class="flex items-start"><span class="dot mr2"></span>Tarjetas con bordes grandes y sombras leves.</li>
                  <li class="flex items-start"><span class="dot mr2"></span>Animaciones sutiles para orientación.</li>
                </ul>
              </div>

              <div class="w-100 w-50-l mt3 mt0-l">
                <div class="cf">
                  <div class="fl w-100 w-50-m pa2">
                    <div class="br3 ba b--black-10 pa3" style="background:linear-gradient(180deg,#f8fafc,#fff);">
                      <p class="ma0 f7 silver">Benchmark visual</p>
                      <h4 class="mt1 f6 fw6 near-black">Sitio clínico de referencia</h4>
                      <p class="mt2 f6 mid-gray">Layout centrado, navegación simple, contraste alto, azul institucional.</p>
                    </div>
                  </div>
                  <div class="fl w-100 w-50-m pa2">
                    <div class="br3 ba b--light-blue pa3" style="background:linear-gradient(180deg,#eff6ff,#fff);">
                      <p class="ma0 f7 blue">Aplicado aquí</p>
                      <h4 class="mt1 f6 fw6 near-black">Mapa de procesos</h4>
                      <p class="mt2 f6 mid-gray">Componentes discretos, foco en legibilidad y claridad del diagrama.</p>
                    </div>
                  </div>
                  <div class="fl w-100 w-50-m pa2">
                    <div class="br3 ba b--black-10 pa3">
                      <h4 class="ma0 f6 fw6 near-black">Principios</h4>
                      <ul class="mt2 f6 mid-gray pl3">
                        <li>Claridad ante todo</li><li>Consistencia visual</li><li>Espacios respirables</li><li>Accesibilidad AA</li>
                      </ul>
                    </div>
                  </div>
                  <div class="fl w-100 w-50-m pa2">
                    <div class="br3 ba b--black-10 pa3">
                      <h4 class="ma0 f6 fw6 near-black">Colores</h4>
                      <div class="mt2 cf">
                        ${["#0ea5e9","#38bdf8","#e0f2fe","#0f172a"].map(c => html`
                          <div class="fl w-25 pa1">
                            <div class="br3 ba b--black-10" style="aspect-ratio: 4/3; background:${c};"></div>
                          </div>
                        `)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>            
          </div>
        </section>

        <!-- Modal -->
        ${this.open ? html`
          <div class="scrim" @click=${()=> this.open=false} aria-modal="true" role="dialog">
            <div class="modal" @click=${(e)=> e.stopPropagation()}>
              <img src=${this.imgSrc} alt="Mapa de procesos ampliado"/>
              <button class="close-btn" @click=${()=> this.open=false} aria-label="Cerrar">Cerrar</button>
            </div>
          </div>
        ` : ''}

        <!-- Footer -->
        <footer class="bt b--black-10 pv4 tc silver f7">
          Diseñado para una presentación sobria y elegante. Blanco + azules, accesible y legible.
        </footer>
      </div>
    `;
  }
}

customElements.define('mapa-de-procesos', MapaDeProcesosElement);
