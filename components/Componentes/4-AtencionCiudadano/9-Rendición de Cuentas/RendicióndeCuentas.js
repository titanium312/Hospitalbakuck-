import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../../herramienta/dictador.js'; // registra <dictador-tts>

export class Rendiciondecuentas extends LitElement {
  // Light DOM para que tu CSS global/Tachyons apliquen si lo usas
  createRenderRoot() { return this; }

  static properties = {
    basePath: { type: String },
    docs: { type: Array }
  };

  constructor() {
    super();
    // Carpeta base donde están los PDFs (ajústala)
    this.basePath = 'docs/';

    // Tarjetas de documentos
    this.docs = [
      { title: 'Listado de Asistentes', file: 'Listado-Asistentes.pdf', descr: 'Registro de los participantes en la audiencia pública.' },
      { title: 'Acta de la Audiencia', file: 'Acta-Audiencia.pdf', descr: 'Registro oficial del desarrollo de la rendición de cuentas.' },
      { title: 'Preguntas de los Asistentes', file: 'Preguntas-Asistentes.pdf', descr: 'Compilación de inquietudes y observaciones ciudadanas.' },
      { title: 'Formato de Evaluación', file: 'Formato-Evaluacion.pdf', descr: 'Instrumento para evaluar claridad y pertinencia del proceso.' },
      { title: 'Presentación', file: 'Presentacion-Rendicion.pdf', descr: 'Exposición con resultados de gestión e indicadores.' },
      { title: 'Evidencias', file: 'Evidencias-Rendicion.pdf', descr: 'Soportes documentales, fotos, videos y publicaciones.' },
      { title: 'Transmisión', file: 'Transmision-Rendicion.pdf', descr: 'Registro audiovisual de la audiencia pública.' },
    ];
  }

  render() {
    return html`
      <dictador-tts ui lang="es-CO" rate="1" pitch="1" volume="1">
        <section class="rc-wrap" aria-labelledby="rc-title">
          <style>
            :root{
              --azul-900:#003366; --azul-700:#006699; --azul-800:#004d80;
              --bg:#f4f8fb; --card:#fff; --borde:#dde6ee;
              --shadow:0 8px 22px rgba(0,0,0,.08);
            }
            .rc-wrap{ background:var(--bg); padding:20px; }
            .rc-container{ max-width:1100px; margin:0 auto; }

            h1#rc-title{ text-align:center; color:var(--azul-900); margin:0 0 20px; }
            .rc-intro{ max-width:900px; color:#334; margin:0 auto 18px; line-height:1.6; }

            .rc-sub{ text-align:center; color:var(--azul-900); margin:30px 0 18px; }

            .rc-grid{
              display:grid; gap:20px;
              grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));
              max-width:1100px; margin:0 auto;
            }
            .rc-card{
              background:var(--card); border:1px solid var(--borde); border-radius:14px;
              padding:18px; text-align:center; box-shadow:var(--shadow);
              transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
            }
            .rc-card:hover{ transform:translateY(-4px); box-shadow:0 12px 28px rgba(0,0,0,.12); border-color:#cfe3f2; }

            .rc-card h2{ margin:8px 0; color:var(--azul-700); font-size:18px; }
            .rc-card p{ margin:0 0 14px; color:#555; font-size:14px; }

            .rc-btn{
              display:inline-block; padding:10px 14px; border-radius:8px;
              background:var(--azul-700); color:#fff; text-decoration:none; font-weight:700;
              transition: background .15s ease, transform .15s ease, box-shadow .15s ease;
            }
            .rc-btn:hover{ background:var(--azul-800); transform:translateY(-1px); box-shadow:0 6px 16px rgba(0,0,0,.12); }
            .rc-btn:focus-visible{ outline:3px solid #5aa9ff; outline-offset:2px; }

            .rc-law{
              max-width:900px; margin:32px auto 0; background:#fff; padding:20px;
              border:1px solid var(--borde); border-radius:12px; box-shadow:var(--shadow);
            }
            .rc-law h3{ color:var(--azul-900); margin:0 0 10px; }
            .rc-law ul{ margin:0; padding-left:20px; }
            .rc-law li{ margin:8px 0; color:#344; }

            @media (prefers-reduced-motion:reduce){
              .rc-card,.rc-btn{ transition:none; transform:none; }
            }
          </style>

          <div class="rc-container">
            <h1 id="rc-title">Rendición de Cuentas – HSJA</h1>

            <p class="rc-intro">
              La rendición de cuentas es un proceso obligatorio de transparencia, participación ciudadana y control social,
              mediante el cual el Hospital San Jorge de Ayapel informa a la comunidad sobre su gestión, resultados,
              uso de recursos y cumplimiento de metas.
            </p>
            <p class="rc-intro">
              Este ejercicio permite que los usuarios y la ciudadanía en general conozcan, pregunten, opinen y evalúen la gestión institucional,
              fortaleciendo la confianza pública y la legitimidad del hospital.
            </p>

            <h2 class="rc-sub">Documentos de Rendición de Cuentas</h2>

            <div class="rc-grid" role="list">
              ${this.docs.map(d => html`
                <article class="rc-card" role="listitem">
                  <h2>${d.title}</h2>
                  <p>${d.descr}</p>
                  <a
                    class="rc-btn"
                    href="${(d.file?.startsWith('http') ? d.file : this.basePath + d.file)}"
                    target="_blank"
                    rel="noopener"
                    aria-label="Ver ${d.title} en PDF (se abre en una nueva pestaña)"
                  >Ver PDF</a>
                </article>
              `)}
            </div>

            <section class="rc-law" aria-labelledby="rc-law-title">
              <h3 id="rc-law-title">📜 Normatividad de soporte</h3>
              <ul>
                <li><strong>Ley 489 de 1998</strong> – obligación de rendición de cuentas en entidades públicas.</li>
                <li><strong>Ley 1474 de 2011</strong> – Estatuto Anticorrupción.</li>
                <li><strong>CONPES 3654 de 2010</strong> – política de rendición de cuentas.</li>
                <li><strong>Decreto 2482 de 2012</strong> – lineamientos para planes de mejoramiento.</li>
                <li><strong>CONPES 3982 de 2020</strong> – política de participación ciudadana.</li>
                <li><strong>Resolución 2063 de 2017</strong> – lineamientos específicos para el sector salud.</li>
              </ul>
            </section>
          </div>
        </section>
      </dictador-tts>
    `;
  }
}

customElements.define('rendiciondecuentas-view', Rendiciondecuentas);
