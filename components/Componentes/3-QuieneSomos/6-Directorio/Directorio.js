import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class DirectorioInstitucional extends LitElement {
  createRenderRoot(){ return this } // Light DOM → aplica Tachyons/Bulma

  static properties = {
    open: { type: Boolean },
    pdfUrl: { type: String },
  }

  constructor(){
    super();
    this.open = false;
    this.pdfUrl = "https://img1.wsimg.com/blobby/go/2a2c3ae8-dfb2-48fa-9fcf-4e2478b682dc/Anexo%20Directorio%20de%20Servidores%20p%C3%BAblicos.pdf";
  }

  firstUpdated(){
    requestAnimationFrame(()=>{
      this.renderRoot.querySelectorAll('.fade-up').forEach(el=> el.classList.add('on'));
    });
  }

  _styles(){ return html`
    <style>
      .bg-grad-page{ background: linear-gradient(to bottom, #fff, rgba(14,165,233,.06), #fff); }
      .bg-glass{ backdrop-filter: blur(6px); background: rgba(255,255,255,.7); }
      .chip{ display:inline-flex; align-items:center; gap:.4rem; padding:.25rem .6rem; border-radius:9999px; font-size:.75rem; color:#0369a1; background:#e0f2fe; border:1px solid #bae6fd; }
      .dot{ width:.5rem; height:.5rem; border-radius:9999px; background:#0ea5e9; display:inline-block; }
      .card{ border-radius:1.25rem; border:1px solid rgba(15,23,42,.12); background:#fff; box-shadow:0 8px 24px rgba(2,8,20,.06); }
      .badge{ display:inline-flex; align-items:center; gap:.4rem; padding:.25rem .6rem; border-radius:9999px; font-size:.75rem; border:1px solid; }
      .badge-sky{ color:#0369a1; background:#e0f2fe; border-color:#bae6fd; }
      .badge-gray{ color:#334155; background:#f8fafc; border-color:#e2e8f0; }
      .fade-up{ opacity:0; transform:translateY(10px); transition:opacity .6s ease, transform .6s ease; }
      .fade-up.on{ opacity:1; transform:none; }
      .btn{ border:none; cursor:pointer; }
      .btn-sky{ background:#0284c7; color:#fff; }
      .btn-sky:hover{ background:#0369a1; }
      .btn-ghost-sky{ background:#fff; color:#0369a1; border:1px solid #bae6fd; }
      .btn-ghost-sky:hover{ background:#f0f9ff; }
      /* Modal */
      .scrim{ position:fixed; inset:0; background:rgba(15,23,42,.7); backdrop-filter: blur(3px); z-index:9999; display:flex; align-items:center; justify-content:center; padding:1rem; }
      .modal{ position:relative; width:100%; height:100%; max-width:1200px; max-height:85vh; border-radius:1.25rem; overflow:hidden; border:1px solid rgba(255,255,255,.15); background:rgba(15,23,42,.2); }
      .modal iframe{ width:100%; height:100%; background:#fff; border:0; }
      .close-btn{ position:absolute; top:.75rem; right:.75rem; background:rgba(255,255,255,.9); border-radius:.75rem; padding:.5rem .75rem; border:none; cursor:pointer; }
      @media (min-width:60rem){
        .grid-12{ display:grid; grid-template-columns: repeat(12, minmax(0,1fr)); gap:2rem; }
        .col-7{ grid-column: span 7 / span 7; } .col-5{ grid-column: span 5 / span 5; }
        .col-8{ grid-column: span 8 / span 8; } .col-4{ grid-column: span 4 / span 4; }
      }
    </style>
  `}

  render(){
    return html`
      ${this._styles()}
      <div class="min-vh-100 bg-grad-page dark-gray">
        <!-- Header -->
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
                  <p class="f7 ttu tracked silver ma0">Transparencia</p>
                  <h1 class="f4 fw6 near-black ma0">Directorio de servidores públicos</h1>
                </div>
              </div>
              <nav class="dn db-ns">
                <a href="#descripcion" class="ph3 pv2 br3 mid-gray hover-bg-washed-blue no-underline">Descripción</a>
                <a href="#directorio" class="ph3 pv2 br3 mid-gray hover-bg-washed-blue no-underline">Visual</a>
                <a href="#comparacion" class="ph3 pv2 br3 mid-gray hover-bg-washed-blue no-underline">Comparación</a>
              </nav>
            </div>
          </div>
        </header>

        <!-- Descripción -->
        <section id="descripcion" class="mw8 center ph3 ph4-ns pt4 pb3">
          <div class="grid-12">
            <div class="col-7">
              <div class="fade-up">
                <span class="chip"><span class="dot"></span> Información clara y accesible</span>
                <h2 class="mt3 f2 fw8 near-black lh-title">Directorio con estética clínica y orden impecable</h2>
                <p class="mt2 mid-gray lh-copy">
                  Presentamos el <span class="fw6 near-black">Directorio de servidores públicos</span> con un enfoque visual calmado y profesional.
                  Base blanca con acentos azules, componentes discretos y PDF incrustado con opción de ampliado y descarga.
                </p>
                <div class="mt3 cf">
                  ${[
                    { title: "Legibilidad", desc: "Jerarquía tipográfica y contraste AA" },
                    { title: "Accesibilidad", desc: "Botones grandes, etiquetas ARIA" },
                    { title: "Orden", desc: "Tarjetas con bordes grandes y sombras suaves" },
                    { title: "Calma visual", desc: "Azul funcional para realces" },
                  ].map(it => html`
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

            <!-- Tarjeta acciones -->
            <div class="col-5">
              <div class="fade-up">
                <div class="br3 shadow-4" style="background:linear-gradient(135deg,#0284c7,#0ea5e9); padding:.25rem;">
                  <div class="br3 bg-white pa3">
                    <div class="br3 overflow-hidden ba b--black-10">
                      <iframe
                        title="Directorio de Servidores Públicos (vista previa)"
                        src=${this.pdfUrl}
                        class="w-100" style="height:20rem; border:0;">
                      </iframe>
                    </div>
                    <div class="mt2 flex items-center justify-between">
                      <p class="ma0 f6 mid-gray">Vista previa. Para leer mejor, amplía o descarga.</p>
                      <div class="flex">
                        <button class="btn btn-sky ph3 pv2 br3 ml2" @click=${()=> this.open = true}>Ampliar</button>
                        <a class="btn btn-ghost-sky ph3 pv2 br3 ml2 no-underline tc"
                           href=${this.pdfUrl} target="_blank" rel="noreferrer">Descargar</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>            
          </div>
        </section>

        <!-- Visual embebido grande -->
        <section id="directorio" class="mw8 center ph3 ph4-ns pb3">
          <div class="grid-12">
            <div class="col-8">
              <div class="card pa3">
                <div class="flex items-center justify-between">
                  <h3 class="f4 fw6 near-black ma0">Directorio embebido</h3>
                  <div class="flex items-center">
                    <span class="badge badge-sky mr2"><span class="dot"></span> Transparencia</span>
                    <span class="badge badge-gray"><span class="dot" style="background:#94a3b8"></span> Acceso</span>
                  </div>
                </div>
                <div class="mt3 br3 overflow-hidden ba b--black-10">
                  <iframe title="Directorio embebido" src=${this.pdfUrl} class="w-100" style="height:70vh; border:0;"></iframe>
                </div>
                <p class="mt2 f6 mid-gray">
                  Vista limpia para lectura cómoda. Usa “Descargar” si prefieres abrirlo en otra pestaña o imprimir.
                </p>
              </div>
            </div>

            <!-- Panel lateral -->
            <div class="col-4">
              <div class="card pa3">
                <h4 class="f5 fw6 near-black ma0">Cómo usar el directorio</h4>
                <ol class="mt2 pl3 f6 mid-gray">
                  <li><span class="dot mr2"></span>Buscar dependencia o cargo.</li>
                  <li><span class="dot mr2" style="background:#10b981"></span>Ver datos de contacto y horario.</li>
                  <li><span class="dot mr2" style="background:#94a3b8"></span>Preferir descarga para impresión.</li>
                  <li><span class="dot mr2" style="background:#8b5cf6"></span>Mantener copia vigente.</li>
                </ol>

                <div class="mt3 cf">
                  ${[
                    { k: "Actualización", v: "Trimestral" },
                    { k: "Formato", v: "PDF accesible" },
                    { k: "Impresión", v: "A4 / Carta" },
                    { k: "Descargas", v: "+1.2k" },
                  ].map(m => html`
                    <div class="fl w-50 pa1">
                      <div class="br3 ba b--black-10 pa3" style="background:linear-gradient(135deg,#fff,#eff6ff);">
                        <p class="ma0 f7 silver ttu tracked">${m.k}</p>
                        <p class="ma0 f3 fw7 near-black">${m.v}</p>
                      </div>
                    </div>
                  `)}
                </div>

                <a href=${this.pdfUrl} target="_blank" rel="noreferrer"
                   class="mt3 w-100 dib tc btn btn-sky ph3 pv2 br3">
                  Descargar directorio
                </a>
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
                  Inspirada en portales clínicos: espacios amplios, contraste suficiente y navegación simple.
                  El azul institucional guía la atención sin recargar.
                </p>
                <ul class="mt2 f6 mid-gray">
                  <li class="flex items-start"><span class="dot mr2"></span>Jerarquía tipográfica clara (títulos 700, cuerpo 400–500).</li>
                  <li class="flex items-start"><span class="dot mr2"></span>Tarjetas con bordes grandes y sombras leves.</li>
                  <li class="flex items-start"><span class="dot mr2"></span>Animaciones sutiles para orientar.</li>
                </ul>
              </div>

              <div class="w-100 w-50-l mt3 mt0-l">
                <div class="cf">
                  <div class="fl w-100 w-50-m pa2">
                    <div class="br3 ba b--black-10 pa3" style="background:linear-gradient(180deg,#f8fafc,#fff);">
                      <p class="ma0 f7 silver">Benchmark visual</p>
                      <h4 class="mt1 f6 fw6 near-black">Portal público elegante</h4>
                      <p class="mt2 f6 mid-gray">Layout centrado, navegación simple, contraste alto, azul como realce.</p>
                    </div>
                  </div>
                  <div class="fl w-100 w-50-m pa2">
                    <div class="br3 ba b--light-blue pa3" style="background:linear-gradient(180deg,#eff6ff,#fff);">
                      <p class="ma0 f7 blue">Aplicado aquí</p>
                      <h4 class="mt1 f6 fw6 near-black">Directorio institucional</h4>
                      <p class="mt2 f6 mid-gray">PDF embebido, modal y acción de descarga enfocada.</p>
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

        <!-- Modal PDF -->
        ${this.open ? html`
          <div class="scrim" @click=${()=> this.open=false} aria-modal="true" role="dialog">
            <div class="modal" @click=${(e)=> e.stopPropagation()}>
              <iframe title="Directorio ampliado" src=${this.pdfUrl}></iframe>
              <button class="close-btn" @click=${()=> this.open=false} aria-label="Cerrar">Cerrar</button>
            </div>
          </div>
        ` : ''}

        <footer class="bt b--black-10 pv4 tc silver f7">
          Diseño sobrio y elegante. Blanco + azules, accesible y legible.
        </footer>
      </div>
    `;
  }
}

customElements.define('directorio-institucional', DirectorioInstitucional);
