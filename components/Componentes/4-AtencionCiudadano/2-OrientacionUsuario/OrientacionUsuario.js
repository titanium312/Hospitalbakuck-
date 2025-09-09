import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Orientacionusuario extends LitElement {
  createRenderRoot(){ return this; } // Light DOM para Tachyons / estilos globales

  static properties = {
    manualUrl: { type: String, attribute: 'manual-url' },
    protocoloUrl: { type: String, attribute: 'protocolo-url' },
  };

  constructor(){
    super();
    this.manualUrl = '';     // p.ej. '/docs/manual-atencion-usuario.pdf'
    this.protocoloUrl = '';  // p.ej. '/docs/protocolo-atencion-usuario.pdf'
  }

  render(){
    const c = { blue:'#1e88e5', soft:'#e3f2fd', soft2:'#bbdefb', text:'#000', hint:'#666' };
    const hasManual = !!this.manualUrl;
    const hasProtocolo = !!this.protocoloUrl;

    return html`
      <style>
        *{ box-sizing:border-box; }
        .container{ max-width:1200px; margin:0 auto; padding:20px; position:relative; background:#fff; }
        .right-border{ position:fixed; right:20px; top:0; bottom:0; width:2px; border-right:2px dotted #ccc; }

        .main-title{
          font-size:36px; font-weight:700; color:${c.text}; margin-bottom:30px;
          display:flex; justify-content:space-between; align-items:center;
        }
        .title-actions{ display:flex; gap:20px; }
        .action-btn{ display:flex; align-items:center; gap:8px; color:${c.hint}; text-decoration:none; font-size:16px; font-weight:500; }
        .action-btn:hover{ text-decoration:underline; }

        .banner-section{ margin-bottom:40px; text-align:center; position:relative; }
        .banner-title{ font-size:24px; color:${c.hint}; margin-bottom:30px; font-weight:500; }
        .banner-image-container{ margin:0 auto 30px; position:relative; max-width:500px; }
        .banner-image-container img{
          width:100%; height:auto; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,.1);
        }
        .banner-footer{
          display:flex; justify-content:space-between; align-items:center;
          background:#f8f9fa; padding:15px 30px; border-radius:8px; margin-top:20px;
        }
        .logo-section{ display:flex; align-items:center; gap:15px; }
        .logo-main{ font-size:24px; font-weight:700; color:${c.text}; }
        .logo-text{ font-size:14px; color:${c.hint}; }
        .logo-website{ font-size:12px; color:${c.hint}; }

        .content-text{ margin-bottom:40px; line-height:1.8; }
        .content-text p{ margin-bottom:20px; font-size:16px; color:${c.text}; }

        /* SIAU */
        .siau-box{
          background:${c.soft}; border:1px solid rgba(30,136,229,.2); border-radius:12px;
          padding:20px; margin: 0 0 32px 0; box-shadow:0 4px 12px rgba(30,136,229,.08);
          animation: fadeUp .4s ease both;
        }
        .siau-title{ margin:0 0 8px 0; font-size:20px; color:${c.text}; }
        .siau-sub{ margin:0; color:${c.hint}; }

        /* Recursos (Manual / Protocolo) */
        .res-grid{ display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:16px; }
        .res-card{
          background:#fff; border:1px solid rgba(30,136,229,.2); border-radius:12px;
          padding:16px; box-shadow:0 4px 12px rgba(30,136,229,.08);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .res-card:hover{ transform: translateY(-4px); box-shadow:0 8px 20px rgba(30,136,229,.16); }
        .res-title{ margin:0 0 6px 0; font-size:18px; color:${c.text}; }
        .res-desc{ margin:0 0 10px 0; font-size:14px; color:${c.hint}; }
        .res-actions{ display:flex; gap:8px; flex-wrap:wrap; }
        .btn{
          display:inline-flex; align-items:center; gap:8px;
          border:1px solid rgba(0,0,0,.08); border-radius:8px; padding:8px 12px;
          background:${c.soft}; color:#084b83; text-decoration:none; font-weight:600; font-size:14px;
        }
        .btn:hover{ background:${c.soft2}; }
        .btn[aria-disabled="true"]{ opacity:.5; pointer-events:none; }
        .state{ font-size:12px; color:${c.hint}; }

        @keyframes fadeUp { from {opacity:0; transform:translateY(8px);} to {opacity:1; transform:translateY(0);} }

        @media (max-width:768px){
          .main-title{ flex-direction:column; gap:20px; text-align:center; }
          .title-actions{ justify-content:center; }
          .banner-image-container{ max-width:90%; margin:0 auto 20px; }
          .banner-footer{ flex-direction:column; gap:20px; text-align:center; }
          .right-border{ display:none; }
          .res-grid{ grid-template-columns: 1fr; }
        }
      </style>

      <div class="pa3">
        <div class="right-border" aria-hidden="true"></div>

        <div class="container">
          <header>
            <h1 class="main-title">Protocolo para la atencion y orientacion al usuario</h1>
          </header>

          <main>
            <!-- Texto original que compartiste -->
            <section class="content-text">
              <p>
                El Hospital San Jorge de Ayapel, fiel a su compromiso de ofrecer atención de excelencia y contribuir al bienestar de la comunidad, centra sus esfuerzos en brindar a cada paciente, a su familia y a todos nuestros usuarios un servicio fundamentado en el profesionalismo, la calidez, la confianza, el respeto, la amabilidad y el trato digno.
                En estos procedimientos encontrará información clara y detallada sobre los procesos, trámites y atenciones disponibles en nuestra Institución. Si surge alguna inquietud adicional, estamos siempre dispuestos a resolverla con la prontitud y la calidad que usted merece.
                Para ello, ponemos a su disposición diversos canales de atención: presenciales, virtuales, escritos y telefónicos, a través de los cuales podrá recibir orientación y acompañamiento oportuno.
              </p>
            </section>

            <!-- Bloque SIAU (nuevo, según requisito) -->
            <section class="siau-box" aria-labelledby="siau-title">
              <h2 id="siau-title" class="siau-title">SIAU — Sistema de Información y Atención al Usuario</h2>
              <p class="siau-sub">
                El SIAU guía a pacientes, familias y a la comunidad en <strong>servicios</strong>, <strong>trámites</strong>, y en el conocimiento de sus <strong>derechos y deberes</strong>.
                Brinda orientación presencial y virtual, recibe y canaliza peticiones, quejas, reclamos y sugerencias (PQRS),
                y promueve una atención cálida, oportuna y con trato digno.
              </p>
            </section>

            <!-- Recursos descargables: Manual y Protocolo -->
            <section class="mb4">
              <h2 class="f3 fw7 mb3">Documentos para orientación</h2>
              <div class="res-grid">
                <!-- Manual -->
                <article class="res-card" style="animation: fadeUp .35s ease both;">
                  <h3 class="res-title">Manual de Atención al Usuario</h3>
                  <p class="res-desc">Lineamientos y procedimientos para orientar adecuadamente a los usuarios de la institución.</p>
                  <div class="res-actions">
                    <a
                      class="btn"
                      href=${hasManual ? this.manualUrl : 'javascript:void(0)'}
                      target=${hasManual ? '_blank' : '_self'}
                      rel=${hasManual ? 'noopener' : ''}
                      download
                      aria-disabled=${hasManual ? "false" : "true"}
                      aria-label="Descargar Manual de Atención al Usuario"
                    >📄 Descargar</a>
                    <span class="state">${hasManual ? 'Disponible' : 'No disponible'}</span>
                  </div>
                </article>

                <!-- Protocolo -->
                <article class="res-card" style="animation: fadeUp .45s ease both;">
                  <h3 class="res-title">Protocolo de Atención al Usuario</h3>
                  <p class="res-desc">Pasos y criterios para garantizar trato digno, accesible y oportuno en cada atención.</p>
                  <div class="res-actions">
                    <a
                      class="btn"
                      href=${hasProtocolo ? this.protocoloUrl : 'javascript:void(0)'}
                      target=${hasProtocolo ? '_blank' : '_self'}
                      rel=${hasProtocolo ? 'noopener' : ''}
                      download
                      aria-disabled=${hasProtocolo ? "false" : "true"}
                      aria-label="Descargar Protocolo de Atención al Usuario"
                    >📄 Descargar</a>
                    <span class="state">${hasProtocolo ? 'Disponible' : 'No disponible'}</span>
                  </div>
                </article>
              </div>
            </section>

            <!-- Banner (lo dejamos como tenías) -->
            <section class="banner-section">
              <h2 class="banner-title">Protocolo para la atencion y orientacion al usuario</h2>

              <div class="banner-image-container">
                <a href="https://hospitalsanjorgeayapel.com/pdf11" target="_blank" rel="noopener">
                  <img
                    src="https://www.chospab.es/paciente/atencionalpaciente/guia_ps.jpg"
                    alt="Guía de información y orientación al usuario" />
                </a>
              </div>

              <div class="banner-footer">
                <div class="logo-section">
                  <div class="logo-main">HSJA</div>
                  <div>
                    <div class="logo-text">Hospital San Jorge de Ayapel</div>
                    <div class="logo-website">www.hsja.gov.co</div>
                  </div>
                </div>
                <div class="social-icons" aria-label="Redes sociales">
                  <div class="social-icon" title="Facebook">f</div>
                  <div class="social-icon" title="Twitter">t</div>
                  <div class="social-icon" title="Instagram">i</div>
                  <div class="social-icon" title="YouTube">y</div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    `;
  }
}

customElements.define('orientacionusuario-view', Orientacionusuario);
