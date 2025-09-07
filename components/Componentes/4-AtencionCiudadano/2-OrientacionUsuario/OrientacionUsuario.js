import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Orientacionusuario extends LitElement {
  createRenderRoot(){ return this; } // Light DOM para Tachyons / estilos globales

  render(){
    return html`
      <style>
        *{ box-sizing:border-box; }
        .container{ max-width:1200px; margin:0 auto; padding:20px; position:relative; }
        .right-border{ position:fixed; right:20px; top:0; bottom:0; width:2px; border-right:2px dotted #ccc; }

        .main-title{
          font-size:36px; font-weight:700; color:#000; margin-bottom:30px;
          display:flex; justify-content:space-between; align-items:center;
        }
        .title-actions{ display:flex; gap:20px; }
        .action-btn{ display:flex; align-items:center; gap:8px; color:#666; text-decoration:none; font-size:16px; font-weight:500; }
        .action-btn:hover{ text-decoration:underline; }

        .banner-section{ margin-bottom:40px; text-align:center; position:relative; }
        .banner-title{ font-size:24px; color:#666; margin-bottom:30px; font-weight:500; }

        .banner-image-container{ margin:0 auto 30px; position:relative; max-width:500px; }
        .banner-image-container img{
          width:100%; height:auto; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,.1);
        }

        .banner-footer{
          display:flex; justify-content:space-between; align-items:center;
          background:#f8f9fa; padding:15px 30px; border-radius:8px; margin-top:20px;
        }
        .logo-section{ display:flex; align-items:center; gap:15px; }
        .logo-main{ font-size:24px; font-weight:700; color:#000; }
        .logo-text{ font-size:14px; color:#666; }
        .logo-website{ font-size:12px; color:#666; }

        .social-icons{ display:flex; gap:15px; }
        .social-icon{
          width:24px; height:24px; background:#666; border-radius:50%;
          display:flex; align-items:center; justify-content:center; color:#fff; font-size:12px;
        }

        .content-text{ margin-bottom:40px; line-height:1.8; }
        .content-text p{ margin-bottom:20px; font-size:16px; color:#000; }

        @media (max-width:768px){
          .main-title{ flex-direction:column; gap:20px; text-align:center; }
          .title-actions{ justify-content:center; }
          .banner-image-container{ max-width:90%; margin:0 auto 20px; }
          .banner-footer{ flex-direction:column; gap:20px; text-align:center; }
          .right-border{ display:none; }
        }
      </style>

      <div class="pa3">
        <div class="right-border" aria-hidden="true"></div>

        <div class="container">
          <header>
            <h1 class="main-title">Protocolo para la atencion y orientacion al usuario</h1>
          </header>

          <main>
            <section class="content-text">
              <p>
                El Hospital San Jorge de Ayapel, fiel a su compromiso de ofrecer atención de excelencia y contribuir al bienestar de la comunidad, centra sus esfuerzos en brindar a cada paciente, a su familia y a todos nuestros usuarios un servicio fundamentado en el profesionalismo, la calidez, la confianza, el respeto, la amabilidad y el trato digno.
                En estos procedimientos encontrará información clara y detallada sobre los procesos, trámites y atenciones disponibles en nuestra Institución. Si surge alguna inquietud adicional, estamos siempre dispuestos a resolverla con la prontitud y la calidad que usted merece.
                Para ello, ponemos a su disposición diversos canales de atención: presenciales, virtuales, escritos y telefónicos, a través de los cuales podrá recibir orientación y acompañamiento oportuno.
              </p>
            </section>

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
