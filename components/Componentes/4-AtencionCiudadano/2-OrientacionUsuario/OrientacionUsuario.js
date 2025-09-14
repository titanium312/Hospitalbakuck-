import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../../herramienta/lectopdf.js';
import '../../herramienta/dictador.js';
import { dictador } from '../../herramienta/dictador.js';

export class Orientacionusuario extends LitElement {
  createRenderRoot(){ return this; } // Light DOM para estilos globales

  static properties = {
    manualUrl:    { type: String, attribute: 'manual-url' },
    protocoloUrl: { type: String, attribute: 'protocolo-url' },
  };

  constructor(){
    super();
    this.manualUrl =
      'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/MANUAL%20DE%20SERVICIO%20AL%20P%C3%9ABLICO.pdf';
    this.protocoloUrl =
      'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Protocolo%20para%20la%20atenci%C3%B3n%20al%20usuario.pdf';
  }

  render(){
    const c = { blue:'#1e88e5', soft:'#e3f2fd', soft2:'#bbdefb', text:'#000', hint:'#666' };

    const intro = `El Hospital San Jorge de Ayapel, fiel a su compromiso de ofrecer atención de excelencia y contribuir al bienestar de la comunidad, centra sus esfuerzos en brindar a cada paciente, a su familia y a todos nuestros usuarios un servicio fundamentado en el profesionalismo, la calidez, la confianza, el respeto, la amabilidad y el trato digno. En estos procedimientos encontrará información clara y detallada sobre los procesos, trámites y atenciones disponibles en nuestra Institución. Si surge alguna inquietud adicional, estamos siempre dispuestos a resolverla con la prontitud y la calidad que usted merece. Para ello, ponemos a su disposición diversos canales de atención: presenciales, virtuales, escritos y telefónicos, a través de los cuales podrá recibir orientación y acompañamiento oportuno.`.replace(/\s+/g,' ');

    const siauTxt = `SIAU — Sistema de Información y Atención al Usuario. El SIAU guía a pacientes, familias y a la comunidad en servicios, trámites y en el conocimiento de sus derechos y deberes. Brinda orientación presencial y virtual, recibe y canaliza peticiones, quejas, reclamos y sugerencias, y promueve una atención cálida, oportuna y con trato digno.`.replace(/\s+/g,' ');

    return html`
      <style>
        *{ box-sizing:border-box; }
        .container{ max-width:1200px; margin:0 auto; padding:20px; position:relative; background:#fff; }
        .right-border{ position:fixed; right:20px; top:0; bottom:0; width:2px; border-right:2px dotted #ccc; }

        .main-title{
          font-size:36px; font-weight:700; color:${c.text}; margin-bottom:30px;
          display:flex; justify-content:space-between; align-items:center;
        }
        .content-text{ margin-bottom:24px; line-height:1.8; }
        .content-text p{ margin-bottom:20px; font-size:16px; color:${c.text}; }

        /* SIAU */
        .siau-box{
          background:${c.soft}; border:1px solid rgba(30,136,229,.2); border-radius:12px;
          padding:20px; margin: 0 0 32px 0; box-shadow:0 4px 12px rgba(30,136,229,.08);
          animation: fadeUp .4s ease both;
        }
        .siau-title{ margin:0 0 8px 0; font-size:20px; color:${c.text}; }
        .siau-sub{ margin:0; color:${c.hint}; }

        /* Botones TTS */
        .pill{
          display:inline-flex; align-items:center; gap:8px;
          border:1px solid rgba(0,0,0,.08); border-radius:9999px; padding:8px 14px;
          background:${c.soft}; color:#084b83; font-weight:700; font-size:14px;
          cursor:pointer; transition: background .25s ease, transform .2s ease, opacity .2s ease;
        }
        .pill:hover{ background:${c.soft2}; transform: translateY(-1px); }
        .pill[disabled]{ opacity:.6; cursor:not-allowed; transform:none; }
        .pill-wrap{ display:flex; gap:8px; flex-wrap:wrap; margin: 8px 0 18px; }

        @keyframes fadeUp { from {opacity:0; transform:translateY(8px);} to {opacity:1; transform:translateY(0);} }

        @media (max-width:768px){
          .main-title{ flex-direction:column; gap:20px; text-align:center; }
          .right-border{ display:none; }
        }
      </style>

      <div class="pa3">
        <div class="right-border" aria-hidden="true"></div>

        <div class="container">
          <header>
            <h1 class="main-title">Protocolo para la atención y orientación al usuario</h1>
          </header>

          <!-- 🔊 Barra global: lee todo lo visible dentro del slot -->
          <dictador-tts ui lang="es-CO" rate="1" pitch="1">
            <main>
              <!-- Introducción -->
              <section class="content-text" id="intro">
                <div class="pill-wrap">
                  <button class="pill" type="button" @click=${() => dictador.dictar(intro, { lang:'es-CO' })}>🔊 Introducción</button>
                </div>
                <p>${intro}</p>
              </section>

              <!-- SIAU -->
              <section class="siau-box" aria-labelledby="siau-title" id="siau">
                <div class="pill-wrap">
                  <button class="pill" type="button" @click=${() => dictador.dictar(siauTxt, { lang:'es-CO' })}>🔊 Leer SIAU</button>
                </div>
                <h2 id="siau-title" class="siau-title">SIAU — Sistema de Información y Atención al Usuario</h2>
                <p class="siau-sub">
                  El SIAU guía a pacientes, familias y a la comunidad en <strong>servicios</strong>, <strong>trámites</strong> y en el conocimiento de sus <strong>derechos y deberes</strong>.
                  Brinda orientación presencial y virtual, recibe y canaliza peticiones, quejas, reclamos y sugerencias (PQRS),
                  y promueve una atención cálida, oportuna y con trato digno.
                </p>
              </section>

              <!-- Visores PDF -->
              <section>
                <lectot-wie
                  aria-label="Manual de Servicio al Público"
                  urlpdf=${this.manualUrl}>
                </lectot-wie>
              </section>

              <section>
                <lectot-wie
                  aria-label="Protocolo para la atención al usuario"
                  urlpdf=${this.protocoloUrl}>
                </lectot-wie>
              </section>
            </main>
          </dictador-tts>
        </div>
      </div>
    `;
  }
}

customElements.define('orientacionusuario-view', Orientacionusuario);
