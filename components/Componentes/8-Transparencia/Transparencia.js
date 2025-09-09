import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

/**
 * <transparencia-hsja>
 * Esquema de Información Pública del Hospital (Ley 1712 de 2014)
 * - Componente Lit con Shadow DOM y CSS encapsulado (sin <html>/<head>/<body>)
 * - Acordeón accesible con <details>
 * - Botón TTS dentro del componente (usa Web Speech API)
 * - Mantiene los textos y enlaces originales
 */
export class TransparenciaHsja extends LitElement {
  static properties = {
    _leyendo: { state: true },
    _pausado: { state: true },
  };

  constructor(){
    super();
    this._leyendo = false;
    this._pausado = false;
    this._utter = null;
  }

  static styles = css`
    :host{ display:block; background:#f8f9fa; color:#0a0505; font-family: 'Roboto', Arial, sans-serif; }
    .main{ padding:40px 20px; min-height:100vh; }
    .container{ max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 300px; gap:40px; }
    .page-header{ grid-column:1 / -1; display:flex; justify-content:space-between; align-items:center; margin-bottom:28px; padding-bottom:18px; border-bottom:3px solid #000; }
    .title{ font-size:32px; font-weight:800; color:#333; margin:0; }

    .document{ background:#fff; padding:20px; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,.08); display:flex; gap:16px; align-items:flex-start; }
    .pdf-box{ width:64px; height:86px; border-radius:6px; background:#d32f2f; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; font-weight:700; }
    .pdf-box small{ font-weight:500; opacity:.9; }

    .accordion{ display:grid; gap:12px; margin-top:20px; }
    .acc{ border:1px solid #e5e7eb; border-radius:8px; background:#fff; overflow:hidden; }
    .acc__head{ background:#c3f6f7; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:16px 18px; cursor:pointer; }
    .acc__title{ font-size:16px; font-weight:700; color:#000; margin:0; }
    .acc__chev{ font-size:12px; color:#444; transition:transform .2s; }
    .acc[open] .acc__chev{ transform:rotate(180deg); }
    .acc__panel{ padding:16px 18px; border-top:1px solid #e5e7eb; }
    .acc__panel ul{ margin:6px 0 0 20px; }
    .acc__panel li{ margin:6px 0; }
    .acc__panel a{ color:#000; text-decoration:none; }
    .acc__panel a:hover{ text-decoration:underline; }

    .notice{ margin-top:28px; background:#fff; border:1px solid #e5e7eb; border-radius:10px; padding:18px; box-shadow:0 2px 10px rgba(0,0,0,.06); }
    .notice h2{ margin:0 0 10px; font-size:20px; color:#0a0a0a; }
    .notice p{ margin:8px 0; color:#333; }
    .bullets{ margin:10px 0 0 0; padding:0; list-style:none; display:grid; gap:6px; }
    .bullets li::before{ content:'✔️'; margin-right:8px; }

    .ttsBtn{ position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer; font-size: 24px; font-weight: bold; box-shadow: 0 8px 25px rgba(0,0,0,0.3); transition: transform .25s; z-index: 10; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color:#fff; }
    .ttsBtn:hover{ transform: scale(1.05); }
    .ttsBtn.reading{ background: linear-gradient(135deg, #ff9966 0%, #ff5e62 100%); }
    .ttsBtn.paused{ background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); }

    @media (max-width:768px){ .container{ grid-template-columns:1fr; gap:20px; } .title{ font-size:24px; } .document{ flex-direction:column; align-items:center; text-align:center; } }
    @media (prefers-reduced-motion:reduce){ *{ transition:none !important; scroll-behavior:auto !important; } }
  `;

  // ---- TTS ----
  _toggleLectura(){
    const synth = window.speechSynthesis;
    const contentEl = this.renderRoot?.querySelector('#contenido');
    if (!contentEl){ return; }

    if (this._leyendo && !this._pausado){
      synth.pause();
      this._pausado = true;
      this.requestUpdate();
      return;
    }
    if (this._pausado){
      synth.resume();
      this._pausado = false;
      this.requestUpdate();
      return;
    }
    if (this._leyendo){
      synth.cancel();
      this._resetTTS();
      return;
    }

    const texto = (contentEl.innerText || '').trim();
    if (!texto){ return; }
    this._utter = new SpeechSynthesisUtterance(texto);
    this._utter.lang = 'es-ES';
    this._utter.rate = 0.9;
    this._utter.pitch = 1;
    this._utter.volume = 1;
    this._utter.onstart = () => { this._leyendo = true; this._pausado = false; this.requestUpdate(); };
    this._utter.onend = () => { this._resetTTS(); };
    this._utter.onerror = () => { this._resetTTS(); };
    synth.speak(this._utter);
  }
  _resetTTS(){
    this._leyendo = false; this._pausado = false; this._utter = null; this.requestUpdate();
  }

  // ---- TEMPLATE ----
  render(){
    const btnClass = this._leyendo ? (this._pausado ? 'ttsBtn paused' : 'ttsBtn reading') : 'ttsBtn';
    const btnIcon = this._leyendo ? (this._pausado ? '⏸️' : '⏹️') : '🗣️';
    return html`
      <main class="main" id="contenido">
        
      
          <header class="page-header">
            <h1 class="title">Esquema de Información Pública del Hospital</h1>
          </header>

<p>El Hospital San Jorge de Ayapel publica su Esquema de Información Pública en cumplimiento de la Ley de Transparencia, garantizando el acceso oportuno y organizado a la información de carácter institucional, misional y de interés ciudadano.</p>

          </section>




          <section class="content">
            <div class="document">
              <div class="pdf-box">PDF<small>1.98MB</small></div>
              <div><p style="margin:0;color:#666">Use las secciones de abajo para navegar por la información pública (Ley 1712 de 2014).</p></div>
            </div>

            <div class="accordion">
              ${this._acc('Procesos, Procedimientos y Lineamientos', html`
                <ul>
                  <li><a href="https://vercel-pearl-omega.vercel.app/pdfs/Procedimiento%20para%20la%20Toma%20de%20Decisiones%20en%20las%20Diferentes%20%C3%81reas.pdf" target="_blank" rel="noopener noreferrer">Procedimiento para la Toma de Decisiones en las Diferentes Áreas</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Procesos Procedimientos lineamiento</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Caracterización de Proceso</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Manual%20de%20Talento%20Humano.pdf" target="_blank" rel="noopener noreferrer">Manual de Talento Humano</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">RESOLUCIÓN N° 047 - Manual Interno de Contratación</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Manual%20de%20Estad%C3%ADstica%20Hospitalaria.pdf" target="_blank" rel="noopener noreferrer">Manual de SSSTG - Ambiente</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Manual%20de%20Estad%C3%ADstica%20Hospitalaria.pdf" target="_blank" rel="noopener noreferrer">Manual de Estadística Hospitalaria</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Manual%20de%20Procesos%20PYM.pdf" target="_blank" rel="noopener noreferrer">Manual de Procesos PYM</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Manual%20de%20TICs.pdf" target="_blank" rel="noopener noreferrer">Manual de TICs</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Manual%20Operativo%20del%20Modelo%20de%20Atenci%C3%B3n%20en%20Salud.pdf" target="_blank" rel="noopener noreferrer">Manual Operativo del Modelo de Atención en Salud</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Modelo%20de%20Atenci%C3%B3n%20en%20Salud%20HSJA.pdf" target="_blank" rel="noopener noreferrer">Modelo de Atención en Salud HSJA</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Manual%20de%20Calidad.pdf" target="_blank" rel="noopener noreferrer">Manual de Calidad</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Manual%20de%20Referencia%20y%20Contrarreferencia.pdf" target="_blank" rel="noopener noreferrer">Manual de Referencia y Contrarreferencia</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Manual%20de%20Hospitalizaci%C3%B3n.pdf" target="_blank" rel="noopener noreferrer">Manual de Hospitalización</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Manual%20de%20Consulta%20Externa.pdf" target="_blank" rel="noopener noreferrer">Manual de Consulta Externa</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Manual%20de%20Urgencias.pdf" target="_blank" rel="noopener noreferrer">Manual de Urgencias</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Caracterización de Procesos</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Proceso%20de%20Gestion%20de%20Planeaci%C3%B3n%20Caracterizaci%C3%B3n.pdf" target="_blank" rel="noopener noreferrer">Proceso de Gestión de Planeación - Caracterización</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Procedimiento para la Caracterización de los Macroprocesos</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Procedimiento%20para%20la%20Elaboraci%C3%B3n%20y%20Seguimiento%20de%20Planes%20de%20Mejoramiento.pdf" target="_blank" rel="noopener noreferrer">Procedimiento para la Elaboración y Seguimiento de Planes de Mejoramiento</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/PROCEDIMIENTO%20PARA%20LA%20CODIFICACI%C3%93N%20Y%20NOMENCLATURA%20DE%20DOCUMENTOS%20INSTITUCIONALES.pdf" target="_blank" rel="noopener noreferrer">Procedimiento para la Codificación y Nomenclatura de Documentos Institucionales</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Procedimiento%20para%20la%20Elaboraci%C3%B3n%20de%20Soportes%20Solicitados%20por%20Organismos%20de%20Control.pdf" target="_blank" rel="noopener noreferrer">Procedimiento para la Elaboración de Soportes Solicitados por Organismos de Control</a></li>
                </ul>
              `)}

              ${this._acc('Normatividad', html`
                <ul>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/DECRETO%20UNICO%20REGLAMENTARIO%20780.pdf" target="_blank" rel="noopener noreferrer">DECRETO ÚNICO REGLAMENTARIO 780</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Procedimiento%20para%20la%20Clasificaci%C3%B3n%20y%20Aplicaci%C3%B3n%20de%20la%20Normatividad%20HSJA.pdf" target="_blank" rel="noopener noreferrer">Procedimiento para la Clasificación y Aplicación de la Normatividad HSJA</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Normograma%20Por%20Proceso.pdf" target="_blank" rel="noopener noreferrer">Normograma por Proceso</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Normatividad%20SUIN.pdf" target="_blank" rel="noopener noreferrer">Normatividad SUIN</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Pol%C3%ADticas%20Institucionales.pdf" target="_blank" rel="noopener noreferrer">Políticas Institucionales</a></li>
                </ul>
              `)}

              ${this._acc('Contratación', html`
                <ul>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">RESOLUCIÓN N° 047 - Manual Interno de Contratación</a></li>
                </ul>
              `)}

              ${this._acc('Datos abiertos', html`
                <ul>
                  <li><a href="https://vercel-pearl-omega.vercel.app/pdfs/Programa%20de%20Gesti%C3%B3n%20Documental.pdf" target="_blank" rel="noopener noreferrer">Procedimiento Datos Abiertos</a></li>
                  <li><a href="https://vercel-pearl-omega.vercel.app/pdfs/Programa%20de%20Gesti%C3%B3n%20Documental.pdf" target="_blank" rel="noopener noreferrer">Instrumentos de gestión de la información</a></li>
                  <li><a href="https://vercel-pearl-omega.vercel.app/pdfs/Programa%20de%20Gesti%C3%B3n%20Documental.pdf" target="_blank" rel="noopener noreferrer">Instrumento de gestión de la información</a></li>
                  <li><a href="https://vercel-pearl-omega.vercel.app/pdfs/Programa%20de%20Gesti%C3%B3n%20Documental.pdf" target="_blank" rel="noopener noreferrer">PGD</a></li>
                  <li><a href="https://vercel-pearl-omega.vercel.app/pdfs/Anexo%20Registro%20de%20Activos.pdf" target="_blank" rel="noopener noreferrer">Anexo Registro de Activos</a></li>
                  <li><a href="https://vercel-pearl-omega.vercel.app/pdfs/Anexo%20Esquema%20de%20publicaci%C3%B3n%20de%20la%20Informaci%C3%B3n%20en%20el%20HSJ.pdf" target="_blank" rel="noopener noreferrer">Anexo Esquema de publicación de la Información en el HSJ</a></li>
                  <li><a href="https://vercel-pearl-omega.vercel.app/pdfs/Anexo%20Datos%20Clasificados%20o%20Reservado%20en%20el%20Inventario.pdf" target="_blank" rel="noopener noreferrer">Anexo Datos Clasificados o Reservado en el Inventario</a></li>
                  <li><a href="https://vercel-pearl-omega.vercel.app/pdfs/Procedimiento%20para%20la%20Publicaci%C3%B3n%20de%20Informaci%C3%B3n%20Espec%C3%ADfica%20para%20Grupos%20de%20Inter%C3%A9s.pdf" target="_blank" rel="noopener noreferrer">Procedimiento para la Publicación de Información Específica para Grupos de Interés</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Esquema publicación de la Información</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Datos con reserva</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Registro de activos</a></li>
                </ul>
              `)}

              ${this._acc('Información de la entidad', html`
                <ul>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Protocolo%20Entes%20de%20Control%20y%20Mecanismos%20de%20Supervisi%C3%B3n.pdf" target="_blank" rel="noopener noreferrer">Protocolo Entes de Control y Mecanismos de Supervisión</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Listado%20de%20Entidades%20de%20Supervisi%C3%B3n%20y%20Control%20Externo%20e%20Interno.pdf" target="_blank" rel="noopener noreferrer">Listado de Entidades de Supervisión y Control</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Procedimiento%20para%20la%20publicaci%C3%B3n%20de%20decisiones%20%20y%20pol%C3%ADticas.pdf" target="_blank" rel="noopener noreferrer">Procedimiento para la publicación de decisiones y políticas</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Calendario.pdf" target="_blank" rel="noopener noreferrer">Calendario</a></li>
                  <li><a href="https://vercel-pearl-omega.vercel.app/pdfs/Documento%20Directorio%20Nacional%20e%20Internacional%20Agremiaciones%20.pdf" target="_blank" rel="noopener noreferrer">Documento Directorio Nacional e Internacional Agremiaciones</a></li>
                  <li><a href="https://vercel-pearl-omega.vercel.app/pdfs/Documento%20Directorio%20Entidades.pdf" target="_blank" rel="noopener noreferrer">Documento Directorio Entidades</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Directorio%20Institucional%20ESE%20HSJA%20(1).pdf" target="_blank" rel="noopener noreferrer">Directorio Institucional ESE HSJA (1)</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Anexo%20DEBERES%20Y%20DERECHOS.pdf" target="_blank" rel="noopener noreferrer">Anexo Deberes y Derechos</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Anexo%20Carta%20Trato%20Digno.pdf" target="_blank" rel="noopener noreferrer">Anexo Carta Trato Digno</a></li>
                  <li><a href="https://pdf-2ss.vercel.app/pdfs/Anexo%20Directorio%20de%20Servidores%20p%C3%BAblicos.pdf" target="_blank" rel="noopener noreferrer">Anexo Directorio de Servidores públicos</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Manual de Auditoría Interna</a></li>
                </ul>
              `)}

              ${this._acc('Obligación de reporte', html`
                <ul>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Anexo Reportes Obligatorios del HSJ</a></li>
                </ul>
              `)}

              ${this._acc('Publicación grupos de interés', html`
                <ul>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Información para grupos específicos</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Rendición de cuentas / participación</a></li>
                </ul>
              `)}

              ${this._acc('Comunicaciones', html`
                <ul>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Noticias</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Boletines y comunicados</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Políticas de Accesibilidad - Identidad Visual de la Página Web.docx</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Procedimiento de Mecanismos de Participación.docx</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Procedimiento para la Gestión de Trámites en el Hospital San Jorge de Ayapel E.docx</a></li>
                  <li><a href="https://hospitalsanjorgeayapel.info/" target="_blank" rel="noopener noreferrer">Procedimiento Identidad Visual.docx</a></li>
                </ul>
              `)}
            </div>

            

          <aside class="sidebar"></aside>
      
      </main>

      <button class="${btnClass}" @click=${this._toggleLectura} title="Leer contenido" aria-label="Leer contenido">
        ${btnIcon}
      </button>
    `;
  }

  _acc(titulo, contenido){
    return html`
      <details class="acc">
        <summary class="acc__head">
          <span class="acc__title">${titulo}</span>
          <span class="acc__chev">▼</span>
        </summary>
        <div class="acc__panel">${contenido}</div>
      </details>
    `;
  }
}

customElements.define('transparencia-x', TransparenciaHsja);
