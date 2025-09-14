// app.js
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import "../../herramienta/lectopdf.js";
import { dictador } from "../../herramienta/dictador.js";

class AspirantesApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      background: #ffffff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #0f3d6e;
    }

    section { width: 100%; padding: 4rem 2rem; box-sizing: border-box; background: #ffffff; }

    .container {
      max-width: 90rem; margin: 0 auto; padding: 3rem 2rem; border-radius: 1.5rem;
      box-shadow: 0 1rem 2.5rem rgba(0, 90, 170, 0.08);
      border: 1px solid rgba(2, 132, 199, 0.1);
      animation: fadeInUp .7s ease;
    }

    h2 { text-align: center; color: #0f3d6e; font-size: 2.5rem; margin-bottom: 2rem; letter-spacing: .5px; }

    p { margin-bottom: 1.5rem; max-width: 75ch; margin-left: auto; margin-right: auto; line-height: 1.7; }

    .button-link {
      display: inline-block; padding: 0.8rem 2rem; background-color: #0f3d6e; color: #fff; text-decoration: none;
      border-radius: 9999px; font-weight: 600; transition: transform .25s ease, box-shadow .25s ease, opacity .25s ease;
    }
    .button-link:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(15,61,110,0.25); opacity: .95; }

    .actions { text-align: center; margin: 2.5rem 0; }

    /* TTS */
    .tts-bar {
      display:flex; gap:.5rem; justify-content:center; align-items:center; margin: 0 0 1.25rem;
      position: sticky; top: .5rem; z-index: 5;
    }
    .btn {
      cursor: pointer; border: none; padding: .6rem 1.2rem; border-radius: 9999px; font-weight: 700;
      transition: background .3s ease, transform .2s ease, opacity .2s ease; font-size:.95rem;
    }
    .btn--play { background:#1d4ed8; color:#fff; }
    .btn--stop { background:#ef4444; color:#fff; }
    .btn:hover { transform: translateY(-1px); }
    .btn[disabled] { opacity:.6; cursor:not-allowed; transform:none; }

    /* Acordeón */
    .toggle-btn { margin-top: 1rem; background: #1d4ed8; color: white; }
    .toggle-btn:hover { background: #0f3d6e; transform: translateY(-1px); }

    .accordion { overflow: hidden; max-height: 0; transition: max-height 0.5s ease, opacity 0.5s ease; opacity: 0; }
    .accordion.open { max-height: 1500px; opacity: 1; }

    /* Títulos con icono */
    .icon-title { font-weight: 800; font-size: 1.25rem; margin: 1.5rem 0 .75rem; display:flex; align-items:center; gap:.5rem; color:#0f3d6e; }
    .emoji { font-size: 1.25rem; }

    /* Chips de dictado por bloque */
    .pill { background:#e6f0ff; color:#0f3d6e; margin:.25rem .25rem 1rem; }
    .pill-wrap { display:flex; gap:.5rem; flex-wrap:wrap; justify-content:center; }

    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  `;

  static properties = {
    showDirectorio: { type: Boolean },
    _isSpeaking: { type: Boolean, state: true }
  };

  constructor() {
    super();
    this.showDirectorio = false;
    this._isSpeaking = dictador.isSpeaking ?? false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._off = dictador.onEstado(({ isSpeaking }) => {
      this._isSpeaking = !!isSpeaking;
      this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (typeof this._off === 'function') this._off();
  }

  toggleDirectorio() { this.showDirectorio = !this.showDirectorio; }

  // ===== Textos para TTS =====
  get tIntro(){ return 'Portal de Aspirantes. Transparencia en los procesos de selección del Hospital San Jorge de Ayapel.'; }
  get tHojaVida(){ return 'Las hojas de vida están en el portal oficial de la Presidencia, en el aplicativo Aspirantes a Cargos Públicos.'; }
  get tObjetivo(){ return 'Fortalecemos confianza, acceso a la información y participación ciudadana en los procesos de designación.'; }
  get tDisponibilidad(){ return 'Las hojas de vida de libre nombramiento y remoción están disponibles para consulta ciudadana.'; }
  get tDirectorio(){ return 'Directorio Institucional por Proceso del HSJA: responsables y contactos por proceso.'; }
  get tPlanCargos(){ return 'Plan de cargos vigente con niveles directivo, asesor, profesional, técnico, asistencial y trabajadores oficiales.'; }
  get tEscala(){ return 'Escala salarial conforme al Decreto 0611 de 2025, promoviendo equidad, legalidad y transparencia.'; }
  get tContratistas(){ return 'Relación de contratistas: objeto del contrato y fechas de inicio, disponible para consulta.'; }
  get tTodo(){
    return [this.tIntro, this.tHojaVida, this.tObjetivo, this.tDisponibilidad, this.tDirectorio, this.tPlanCargos, this.tEscala, this.tContratistas].join(' ');
  }

  render() {
    return html`
      <section>
        <div class="container">
          <h2>Portal de Aspirantes</h2>

          <!-- Barra global de TTS -->
          <div class="tts-bar" role="toolbar" aria-label="Lectura en voz alta">
            <button class="btn btn--play" ?disabled=${this._isSpeaking} @click=${() => dictador.dictar(this.tTodo)}>🔊 Dictar todo</button>
            <button class="btn btn--stop" ?disabled=${!this._isSpeaking} @click=${() => dictador.detener()}>⏹️ Detener</button>
          </div>

          <p>${this.tIntro}</p>
          <div class="pill-wrap">
            <button class="btn pill" ?disabled=${this._isSpeaking} @click=${() => dictador.dictar(this.tHojaVida)}>🔊 Hojas de vida</button>
            <button class="btn pill" ?disabled=${this._isSpeaking} @click=${() => dictador.dictar(this.tObjetivo)}>🔊 Objetivo</button>
            <button class="btn pill" ?disabled=${this._isSpeaking} @click=${() => dictador.dictar(this.tDisponibilidad)}>🔊 Disponibilidad</button>
          </div>

          <p>
            En cumplimiento de la normatividad vigente y con el propósito de garantizar la transparencia en los procesos de selección, 
            el <strong>Hospital San Jorge de Ayapel</strong> pone a disposición de la ciudadanía el acceso a la información de quienes aspiran 
            a ocupar cargos públicos en nuestra institución.
          </p>

          <p>
            Las hojas de vida de los aspirantes se encuentran publicadas en el enlace oficial de la 
            <strong>Presidencia de la República</strong>, dentro del aplicativo de <em>Aspirantes a Cargos Públicos</em>, 
            permitiendo la consulta abierta por parte de cualquier ciudadano.
          </p>

          <p>
            Este espacio busca fortalecer la confianza, el acceso a la información y la participación ciudadana, 
            asegurando procesos claros y verificables en la designación de cargos públicos.
          </p>

          <p>
            Las hojas de vida de los aspirantes a cargos públicos de libre nombramiento y remoción se encuentran disponibles 
            para consulta ciudadana en el sistema oficial de la Presidencia de la República de Colombia.
          </p>

          <!-- Directorio -->
          <div class="icon-title"><span class="emoji">📒</span> Directorio Institucional por Proceso (HSJA)</div>
          <div class="pill-wrap">
            <button class="btn pill" ?disabled=${this._isSpeaking} @click=${() => dictador.dictar(this.tDirectorio)}>🔊 Directorio</button>
          </div>
          <button class="btn toggle-btn"
            @click=${this.toggleDirectorio}
            aria-expanded=${this.showDirectorio}
            aria-controls="panel-directorio">
            ${this.showDirectorio ? 'Ocultar directorio' : 'Ver directorio'}
          </button>
          <div id="panel-directorio" class="accordion ${this.showDirectorio ? 'open' : ''}" role="region" aria-label="Directorio Institucional por Proceso">
            <p><strong>Directorio Institucional Por Proceso HSJA</strong></p>
            <lectot-wie urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Directorio%20Institucional%20Por%20Proceso%20HSJA.pdf"></lectot-wie>
          </div>

          <!-- Plan de Cargos -->
          <div class="icon-title"><span class="emoji">🗂️</span> Plan de Cargos</div>
          <div class="pill-wrap">
            <button class="btn pill" ?disabled=${this._isSpeaking} @click=${() => dictador.dictar(this.tPlanCargos)}>🔊 Plan de Cargos</button>
          </div>
          <p>
            El Hospital cuenta con un plan de cargos vigente que organiza los empleos en distintos niveles (directivo, asesor, profesional, técnico, asistencial y trabajadores oficiales), asegurando una estructura clara y eficiente para la prestación de servicios de salud.
          </p>
          <p><strong>PLAN DE CARGOS ESE HOSPITAL SAN JORGE VIGENCIA 2024 - 2025</strong></p>
          <lectot-wie urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/PLAN%20DE%20CARGOS%20ESE%20HOSPITAL%20SAN%20JORGE%20VIGENCIA%202024.pdf"></lectot-wie>

          <!-- Escala Salarial -->
          <div class="icon-title"><span class="emoji">💰</span> Escala Salarial</div>
          <div class="pill-wrap">
            <button class="btn pill" ?disabled=${this._isSpeaking} @click=${() => dictador.dictar(this.tEscala)}>🔊 Escala Salarial</button>
          </div>
          <p>
            La escala salarial define la remuneración de los servidores de acuerdo con su cargo y nivel, conforme a la normatividad nacional (<strong>Decreto 0611 de 2025</strong>), promoviendo equidad, legalidad y transparencia en la gestión del talento humano.
          </p>
          <p><strong>Escala Salarial según Categorías</strong></p>
          <lectot-wie urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Escala%20Salarial%20seg%C3%BAn%20Categor%C3%ADas.pdf"></lectot-wie>

          <!-- Anexo Contratistas -->
          <div class="icon-title"><span class="emoji">📎</span> Contratistas</div>
          <div class="pill-wrap">
            <button class="btn pill" ?disabled=${this._isSpeaking} @click=${() => dictador.dictar(this.tContratistas)}>🔊 Contratistas</button>
          </div>
          <p><strong>Anexo Relación de Contratistas: Objeto del contrato y fechas de inicio</strong></p>
          <lectot-wie urlpdf="https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Relaci%C3%B3n%20de%20Contratistas%20Objeto%20del%20contrato%20y%20fechas%20de%20inicio.pdf"></lectot-wie>

          <!-- Enlace oficial -->
          <p style="text-align:center;margin-top:2rem;"><strong>Puedes acceder directamente al portal aquí:</strong></p>
          <div class="actions">
            <a href="https://aspirantes.presidencia.gov.co" target="_blank" rel="noopener" class="button-link">
              Ir al Portal de Aspirantes
            </a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('personal-app', AspirantesApp);
