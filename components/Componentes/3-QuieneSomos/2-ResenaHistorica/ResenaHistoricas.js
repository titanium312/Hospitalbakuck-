import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../../herramienta/lectopdf.js';
import '../../herramienta/dictador.js';

class ResenaHistorica extends LitElement {
  // Light DOM para que las utilidades (Tachyons) apliquen
  createRenderRoot() { return this; }

  // ======== Adaptador de dictado ========
  #utterance = null;
  #isSpeaking = false;

  // ======== Progreso de lectura ========
  static properties = {
    _progress: { state: true }, // 0..100
  };

  constructor(){
    super();
    this._progress = 0;
  }

  connectedCallback(){
    super.connectedCallback();
    // Precarga voces
    window.speechSynthesis?.getVoices?.();
    // Progreso lectura
    this._onScroll = () => this.#calcProgress();
    window.addEventListener('scroll', this._onScroll, { passive: true });
  }

  disconnectedCallback(){
    super.disconnectedCallback?.();
    window.removeEventListener('scroll', this._onScroll);
  }

  firstUpdated(){
    // Calcular al montar
    this.#calcProgress();
  }

  #calcProgress(){
    const art = this.querySelector('[data-article]');
    if (!art) return;
    const rect = art.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const total = rect.height + vh * 0.6; // pequeño buffer
    const read = Math.min(Math.max(vh - Math.max(0, rect.top), 0), total);
    const p = Math.round((read / total) * 100);
    this._progress = Math.max(0, Math.min(100, p));
  }

  _tryDictadorAPI(text){
    try {
      if (window.Dictador?.speak) { window.Dictador.speak(text); return true; }
      if (window.Dictador?.leer)  { window.Dictador.leer(text);  return true; }
      if (window.dictador?.speak) { window.dictador.speak(text); return true; }
      if (typeof window.dictar === 'function') { window.dictar(text); return true; }
      const ev = new CustomEvent('dictar-texto', { detail:{ texto:text } });
      window.dispatchEvent?.(ev);
      return false;
    } catch(_e){ return false; }
  }

  _selectSpanishVoice(){
    const voices = window.speechSynthesis?.getVoices?.() || [];
    return voices.find(v => /spanish.*colom|es-CO/i.test(`${v.name} ${v.lang}`))
        || voices.find(v => /es-|spanish/i.test(`${v.name} ${v.lang}`))
        || voices[0]
        || null;
  }

  _dictar(text){
    if (this._tryDictadorAPI(text)) return;
    if (!('speechSynthesis' in window)){
      alert('Tu navegador no soporta síntesis de voz. Usa Chrome, Edge o Safari.');
      return;
    }
    this._detener();
    const u = new SpeechSynthesisUtterance(text);
    const v = this._selectSpanishVoice();
    if (v) u.voice = v;
    u.rate = 1; u.pitch = 1; u.volume = 1;
    u.onend = () => { this.#isSpeaking = false; this.requestUpdate(); };
    u.onerror = () => { this.#isSpeaking = false; this.requestUpdate(); };
    this.#utterance = u;
    this.#isSpeaking = true;
    window.speechSynthesis.speak(u);
    this.requestUpdate();
  }

  _detener(){
    try { if (window.Dictador?.stop) { window.Dictador.stop(); } } catch(_e){}
    try { if (window.dictador?.stop) { window.dictador.stop(); } } catch(_e){}
    if (this.#isSpeaking && window.speechSynthesis){
      window.speechSynthesis.cancel();
    }
    this.#utterance = null;
    this.#isSpeaking = false;
    this.requestUpdate();
  }

  #botonDictar(texto){
    return html`
      <button class="ui-btn ui-btn--listen" @click=${() => this._dictar(texto)} title="Escuchar este bloque">
        🔊 Escuchar
      </button>`;
  }
  #botonDetener(){
    return html`
      <button class="ui-btn ui-btn--stop" @click=${() => this._detener()} title="Detener lectura">
        ⏹️ Detener
      </button>`;
  }

  // ======== Texto principal ========
  get #textoResena(){
    return (
      'El Hospital San Jorge de Ayapel, ubicado en el sur del departamento de Córdoba, '+
      'ha sido desde sus inicios una institución esencial para garantizar el derecho a la salud '+
      'de la población ayapelense y de las comunidades aledañas. '+
      'Su origen se remonta a mediados del siglo veinte, cuando, impulsado por la necesidad de contar '+
      'con servicios médicos permanentes, el municipio gestionó la creación de un centro hospitalario básico. '+
      'En sus primeros años, el hospital se dedicó principalmente a la atención de urgencias, partos y enfermedades comunes, '+
      'constituyéndose en un punto de apoyo vital para una región caracterizada por dificultades de acceso geográfico y social. '+
      'Con el paso del tiempo y la consolidación del Sistema General de Seguridad Social en Salud en Colombia, '+
      'el Hospital San Jorge de Ayapel se transformó en una Entidad Social del Estado, de primer nivel de complejidad, '+
      'fortaleciendo su infraestructura, ampliando sus servicios y promoviendo programas de promoción de la salud y prevención de la enfermedad. '+
      'A lo largo de su historia, ha enfrentado retos relacionados con la dispersión poblacional, los riesgos epidemiológicos propios de la región '+
      'y la necesidad de garantizar atención oportuna en zonas rurales de difícil acceso. Sin embargo, el compromiso de su talento humano, '+
      'la participación comunitaria y el respaldo de las autoridades territoriales han permitido que la institución se mantenga como referente '+
      'de atención integral y humanizada. '+
      'Hoy, el Hospital San Jorge de Ayapel se consolida como una institución pública integral, centrada en el paciente y su familia, '+
      'reconocida por su compromiso con la calidad, la seguridad del paciente, la competitividad y la innovación en modelos de atención. '+
      'Su misión trasciende lo asistencial, pues también se proyecta como gestora de conocimiento y promotora del bienestar de toda la comunidad '+
      'ayapelense y del sur de Córdoba.'
    );
  }

  render() {
    const tTodo = 'Reseña histórica. ' + this.#textoResena + ' Anexo PDF disponible al final.';

    return html`
      <style>
        /* ==================== THEME ==================== */
        :root, :host {
          --bg: #f7fbff;
          --surface: #ffffff;
          --glass: rgba(255,255,255,.78);
          --line: rgba(15,39,66,.08);
          --text: #0f243f;
          --muted: #45607a;
          --brand-50: #eef6ff;
          --brand-100:#e2efff;
          --brand-200:#cfe3ff;
          --brand-300:#a9caff;
          --brand-500:#2b79ff;   /* azul hospitalario */
          --brand-600:#1f60e6;
          --mint-500:#2eb9ab;    /* acento menta */
          --ring: 0 0 0 3px rgba(31,96,230,.28);
          --shadow-sm: 0 1px 2px rgba(16, 42, 67, .06);
          --shadow-md: 0 12px 28px rgba(16, 42, 67, .10);
          --radius: 16px;
        }

        /* ====== Hero ====== */
        .hero {
          position: relative;
          padding: 3.5rem 1rem 2.25rem;
          text-align: center;
          color: var(--text);
          background:
            radial-gradient(1200px 600px at 50% -200px, var(--brand-50), transparent 60%),
            linear-gradient(180deg, #fff, var(--bg));
        }
        .hero h1 {
          font-size: clamp(1.75rem, 2.2vw, 2.2rem);
          font-weight: 800;
          letter-spacing:-.02em;
          margin: 0 0 .25rem 0;
        }
        .hero p {
          margin: 0 auto;
          max-width: 70ch;
          color: var(--muted);
        }
        .wave {
          position:absolute; inset:auto 0 -1px 0; height: 40px; pointer-events:none;
          background: linear-gradient(180deg, transparent, rgba(31,96,230,.06));
          mask: radial-gradient(1200px 40px at 50% -10px, #000 40%, transparent 41%);
        }

        /* ====== Barra Progreso ====== */
        .progress {
          position: sticky; top: 0; z-index: 50; height: 4px; width: 100%;
          background: linear-gradient(90deg, var(--brand-100), transparent);
          overflow: hidden;
        }
        .progress__bar {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, var(--mint-500), var(--brand-600));
          transition: width .15s ease-out;
        }

        /* ====== Contenedor ====== */
        .container { max-width: 1100px; margin: 0 auto; padding: 0 1rem; }

        /* ====== Tarjetas ====== */
        .card {
          border: 1px solid var(--line);
          background: var(--glass);
          backdrop-filter: blur(6px);
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, background .18s ease;
        }
        .card:hover, .card:focus-within { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: rgba(15,39,66,.12); }

        /* ====== Tipografía ====== */
        .lead { color: var(--muted); }
        .copy { color: var(--text); }
        .copy p { line-height: 1.7; font-size: clamp(1rem, 1.05vw, 1.075rem); }
        .dropcap:first-letter {
          float:left; font-weight:900; font-size: 2.5em; line-height:.9; padding:.1rem .4rem .1rem 0;
          color: var(--brand-600);
        }

        /* ====== Separadores decorativos ====== */
        .accent { height:4px; width:100px; margin:.5rem auto 0; border-radius:999px;
          background: linear-gradient(90deg, var(--mint-500), var(--brand-600));
          opacity:.75;
        }

        /* ====== Toolbar TTS superior ====== */
        .tts-toolbar {
          position: sticky; top: .5rem; z-index: 5;
          display:flex; gap:.5rem; justify-content:center;
        }

        /* ====== Botones UI ====== */
        .ui-btn {
          border:1px solid var(--brand-200);
          background: linear-gradient(180deg, #ffffff, var(--brand-50));
          color: var(--brand-600);
          font-weight:700; letter-spacing:.2px;
          padding: .55rem .9rem; border-radius: 12px; cursor:pointer;
          transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease, background .12s ease;
          box-shadow: var(--shadow-sm); outline: none;
        }
        .ui-btn:hover { transform: translateY(-1px); border-color: var(--brand-300); box-shadow: var(--shadow-md); background: linear-gradient(180deg, #ffffff, var(--brand-100)); }
        .ui-btn:focus-visible{ box-shadow: var(--shadow-md), var(--ring); }
        .ui-btn--listen {}
        .ui-btn--stop   { border-color: rgba(46,185,171,.35); color:#0b3a37; background: linear-gradient(180deg, #ffffff, #f2fbfa); }
        .ui-btn--stop:hover { border-color: rgba(46,185,171,.5); background: linear-gradient(180deg, #ffffff, #e7f8f5); }

        /* ====== Botonera flotante TTS ====== */
        .fab-tts {
          position: fixed; right: 16px; bottom: 16px; z-index: 60;
          display:flex; gap:.5rem; align-items:center;
          background: var(--surface); border:1px solid var(--line); border-radius: 999px; padding:.4rem;
          box-shadow: var(--shadow-md);
        }

        /* ====== Bloque PDF ====== */
        lectot-wie {
          display:block; min-height: 540px; border:1px solid var(--line);
          border-radius: 14px; overflow: hidden; background:#fff;
        }

        /* ====== Citas y timeline ====== */
        .quote {
          margin: 1.25rem auto; max-width: 64ch; color: #0c2c4f; font-weight: 600; text-align: center;
          background: linear-gradient(180deg, #fff, #f5faff);
          border: 1px solid var(--brand-100); border-radius: 12px; padding: .9rem 1rem;
        }

        .timeline {
          position: relative; margin: 2rem auto; max-width: 760px; padding-left: 1rem;
        }
        .timeline::before {
          content:""; position:absolute; left: 10px; top: 0; bottom: 0;
          width: 2px; background: linear-gradient(180deg, var(--brand-200), transparent);
        }
        .t-item { position: relative; padding-left: 1.5rem; margin: .75rem 0; color: var(--muted); }
        .t-item::before {
          content:""; position:absolute; left: 4px; top: .4rem; width: 12px; height: 12px;
          border-radius: 999px; background: var(--brand-600); box-shadow: 0 0 0 3px #eaf1ff;
        }

        /* ====== Accesibilidad ====== */
        .focus-ring:focus-visible { outline: 3px solid rgba(31,96,230,.45); outline-offset: 3px; border-radius: 12px; }

        /* ====== Responsive ====== */
        .mw { max-width: 1160px; margin: 0 auto; }
        .mw-narrow { max-width: 880px; margin: 0 auto; }

        @media (max-width: 640px){
          .hero { padding: 2.5rem 1rem 1.5rem; }
          lectot-wie { min-height: 440px; }
        }

        @media (prefers-reduced-motion: reduce){
          .ui-btn, .card { transition: none !important; }
          .progress__bar { transition: none !important; }
        }
      </style>

      <!-- HERO -->
      <header class="hero">
        <div class="mw">
          <h1>Reseña Histórica — Hospital San Jorge de Ayapel</h1>
          <p class="lead">Memoria, territorio y servicio: una trayectoria pública con enfoque humano y calidad asistencial.</p>
          <div class="accent" aria-hidden="true"></div>
          <div class="wave" aria-hidden="true"></div>
        </div>
      </header>

      <!-- PROGRESO -->
      <div class="progress" aria-hidden="true">
        <div class="progress__bar" style="width:${this._progress}%;"></div>
      </div>

      <!-- CONTENIDO -->
      <main class="container mw">
        <!-- Toolbar TTS Global -->

        <!-- Card principal -->
        <article class="card pa4 pa5-ns mv4" data-article aria-label="Reseña histórica">
          <header class="tc">
            <h2 class="ma0 f3 f2-ns" style="font-weight:800; letter-spacing:-.01em; color:var(--text);">
              Reseña Histórica
              ${this.#botonDictar('Reseña histórica. ' + this.#textoResena)}
            </h2>
          </header>

          <section class="mw-narrow copy mt3">
            <!-- Cita motivacional -->
            <p class="quote" aria-label="Mensaje institucional">
              “La salud como derecho, la atención como vocación, la historia como compromiso con la comunidad.”
            </p>

            <!-- Texto con dropcap -->
            <p class="dropcap">
              El Hospital San Jorge de Ayapel, ubicado en el sur del departamento de Córdoba, ha sido desde sus inicios una institución esencial para garantizar el derecho a la salud de la población ayapelense y de las comunidades aledañas.
            </p>
            <p>
              Su origen se remonta a mediados del siglo XX, cuando, impulsado por la necesidad de contar con servicios médicos permanentes, el municipio gestionó la creación de un centro hospitalario básico. En sus primeros años, el hospital se dedicó principalmente a la atención de urgencias, partos y enfermedades comunes, constituyéndose en un punto de apoyo vital para una región caracterizada por dificultades de acceso geográfico y social.
            </p>
            <p>
              Con el paso del tiempo y la consolidación del Sistema General de Seguridad Social en Salud en Colombia, el Hospital San Jorge de Ayapel se transformó en una Entidad Social del Estado (ESE) de primer nivel de complejidad, fortaleciendo su infraestructura, ampliando sus servicios y promoviendo programas de promoción de la salud y prevención de la enfermedad.
            </p>
            <p>
              A lo largo de su historia, ha enfrentado retos relacionados con la dispersión poblacional, los riesgos epidemiológicos propios de la región y la necesidad de garantizar atención oportuna en zonas rurales de difícil acceso. Sin embargo, el compromiso de su talento humano, la participación comunitaria y el respaldo de las autoridades territoriales han permitido que la institución se mantenga como referente de atención integral y humanizada.
            </p>
            <p>
              Hoy, el Hospital San Jorge de Ayapel se consolida como una institución pública integral, centrada en el paciente y su familia, reconocida por su compromiso con la calidad, la seguridad del paciente, la competitividad y la innovación en modelos de atención. Su misión trasciende lo asistencial, pues también se proyecta como gestora de conocimiento y promotora del bienestar de toda la comunidad ayapelense y del sur de Córdoba.
            </p>

            <!-- Timeline sutil -->
            <div class="timeline" aria-label="Hitos históricos">
              <div class="t-item"><strong>1950s–1960s:</strong> Centro hospitalario básico para urgencias y partos.</div>
              <div class="t-item"><strong>1990s:</strong> Fortalecimiento institucional con el SGSSS.</div>
              <div class="t-item"><strong>2000s–hoy:</strong> ESE de primer nivel, enfoque en calidad, seguridad del paciente y promoción de la salud.</div>
            </div>
          </section>
        </article>

        <!-- PDF -->
        <section class="mv4">
          <div class="card pa3 pa4-ns">
            <h3 class="ma0 mb3 tc" style="color:var(--text); font-weight:800; letter-spacing:-.01em;">
              Anexo PDF
              ${this.#botonDictar('Anexo PDF. Documento complementario disponible a continuación.')}
            </h3>
            <div class="mw-narrow center">
              <lectot-wie
                class="focus-ring"
                urlpdf="https://img1.wsimg.com/blobby/go/2a2c3ae8-dfb2-48fa-9fcf-4e2478b682dc/Anexo%20Rese%C3%B1a%20Hist%C3%B3rica.pdf">
              </lectot-wie>
            </div>
          </div>
        </section>
      </main>

      <!-- FAB TTS -->
      <div class="fab-tts" role="toolbar" aria-label="Accesos rápidos de voz">
        <button class="ui-btn ui-btn--listen" @click=${() => this._dictar('Reseña histórica. ' + this.#textoResena + ' Anexo PDF disponible al final.')}>🔊 Leer</button>
        ${this.#botonDetener()}
      </div>
    `;
  }
}

customElements.define('resena-historica', ResenaHistorica);
