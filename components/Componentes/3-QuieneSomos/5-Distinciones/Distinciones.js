// distinciones-galeria.js (con dictado + guía de diseño aplicada)
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class DistincionesGaleria extends LitElement {
  static properties = {
    titulo: { type: String },
    subtitulo: { type: String },
    fotos: { type: Array },
    destacados: { type: Array },     // índices de fotos para el carrusel (opcional)

    // Acciones estratégicas (máx. 2)
    boton1Texto: { type: String },
    boton2Texto: { type: String },

    // FAB (opcional)
    fabTexto: { type: String },
    fabIcono: { type: String },      // por ej: "+", "❓", "✉️"

    // estados internos
    _abierto: { state: true },
    _indice: { state: true },

    // carrusel
    _cIndex: { state: true },
    _cHover: { state: true },
  };

  static styles = css`
    :host {
      /* 🎨 Paleta según guía */
      --blanco: #ffffff;
      --celeste-claro: #e0f7fa;
      --celeste-base: #00bcd4;
      --azul-cielo: #81d4fa;
      --celeste-oscuro: #0097a7;
      --gris: #5f6b7a;
      --borde: #e5eaf0;

      display: block;
      font-family: Arial, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      color: #0b2030;
      background:
        linear-gradient(90deg, rgba(224,247,250,.45), rgba(255,255,255,1) 40%, rgba(224,247,250,.35)),
        var(--blanco);
      padding: 2rem 1rem;
    }

    .wrapper { max-width: 1200px; margin: 0 auto; }

    /* Header */
    .header { text-align: center; margin-bottom: 1.25rem; }
    .title {
      font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
      font-weight: 800; color: #0a2a3a; letter-spacing: .2px; margin: 0 0 .25rem 0;
    }
    .subtitle { margin: 0 auto; max-width: 780px; color: var(--gris); font-size: 1rem; line-height: 1.6; }
    .divider { width: 120px; height: 6px; margin: 1rem auto 0; border-radius: 999px;
      background: linear-gradient(90deg, var(--celeste-oscuro), var(--celeste-base));
      filter: drop-shadow(0 2px 4px rgba(0,0,0,.06));
    }

    /* Botones estratégicos (máx. 2) */
    .primary-actions { display: flex; gap: .75rem; justify-content: center; margin: 1rem 0 0; flex-wrap: wrap; }
    .btn-primary {
      border: 1px solid color-mix(in srgb, var(--celeste-base) 50%, #ffffff);
      background: var(--celeste-base);
      color: white;
      border-radius: 12px;
      padding: .6rem 1rem;
      font-weight: 700;
      font-size: .95rem;
      box-shadow: 0 6px 18px rgba(0, 188, 212, .18);
      cursor: pointer;
      transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
    }
    .btn-primary:hover {
      background: var(--celeste-oscuro);
      transform: translateY(-1px) scale(1.02);
      box-shadow: 0 10px 26px rgba(0, 151, 167, .22);
    }
    .btn-primary:active { transform: translateY(0) scale(1); }

    /* ---------- CARRUSEL ---------- */
    .carousel-wrap {
      position: relative;
      margin: 1.5rem auto 1.75rem;
      width: min(100%, 1100px);
      border-radius: 18px;
      background: linear-gradient(180deg, #ffffff, #fbfeff);
      border: 1px solid #d7eef2;
      box-shadow: 0 14px 40px rgba(0, 188, 212, .12);
      overflow: hidden;
    }
    .toolbar { position: sticky; top: .5rem; z-index: 5; display:flex; gap:.5rem; justify-content:center; margin-bottom: .25rem; }
    .tts-btn { border: 1px solid #d7eef2; background: rgba(255,255,255,.96); color: #0a2a3a; border-radius: 12px; padding: .35rem .6rem; font-weight: 700; font-size: .85rem; box-shadow: 0 6px 18px rgba(0, 188, 212, .18); cursor: pointer; }

    .carousel { position: relative; width: 100%; aspect-ratio: 21 / 9; background: var(--celeste-claro); }
    .track { display: flex; height: 100%; transition: transform .45s cubic-bezier(.2,.8,.2,1); will-change: transform; }
    .slide { min-width: 100%; display: grid; place-items: center; position: relative; overflow: hidden; }
    .slide img { width: 100%; height: 100%; object-fit: cover; display: block; transform: scale(1.01); transition: transform 1.2s ease; }
    .slide[aria-current="true"] img { transform: scale(1); }

    .grad { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,23,66,.28) 92%); pointer-events: none; }

    .slide-caption { position: absolute; left: 0; right: 0; bottom: 0; padding: 1rem 1.25rem; color: white; text-shadow: 0 1px 2px rgba(0,0,0,.35); display: flex; align-items: flex-end; gap: .75rem; justify-content: space-between; }
    .cap-title { margin: 0; font-weight: 800; letter-spacing: .2px; font-size: clamp(1rem, 1.2vw + .8rem, 1.35rem); }
    .cap-sub { margin: .2rem 0 0 0; opacity: .95; font-size: .95rem; }

    .c-btn { position: absolute; top: 50%; transform: translateY(-50%); border: 1px solid #d7eef2; background: rgba(255,255,255,.96); color: #0a2a3a; border-radius: 12px; padding: .6rem .75rem; font-weight: 700; font-size: .95rem; box-shadow: 0 6px 18px rgba(0, 188, 212, .18); cursor: pointer; transition: transform .15s ease, box-shadow .15s ease, background .15s ease; }
    .c-btn:hover { transform: translateY(calc(-50% - 2px)); box-shadow: 0 10px 26px rgba(0, 151, 167, .22); }
    .c-left { left: .6rem; } .c-right { right: .6rem; }

    .c-close { position: absolute; top: .6rem; right: .6rem; border: 1px solid #d7eef2; background: rgba(255,255,255,.96); color: #0a2a3a; border-radius: 12px; padding: .4rem .55rem; font-weight: 800; cursor: pointer; box-shadow: 0 6px 18px rgba(0, 188, 212, .18); }

    .dots { position: absolute; bottom: .55rem; left: 0; right: 0; display: flex; justify-content: center; gap: .45rem; }
    .dot { width: 10px; height: 10px; border-radius: 999px; border: 1px solid #cfeaf0; background: rgba(255,255,255,.9); cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,.1); transition: transform .15s ease, background .15s ease; }
    .dot[aria-current="true"] { background: linear-gradient(180deg, var(--azul-cielo), var(--celeste-base)); transform: scale(1.1); }

    /* Grid de tarjetas */
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.1rem; }
    .card { background: var(--blanco); border-radius: 16px; border: 1px solid var(--borde); box-shadow: 0 1px 2px rgba(16,24,40,.04), 0 8px 24px rgba(0, 188, 212, .08); overflow: hidden; transform: translateZ(0); transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; cursor: zoom-in; }
    .card:hover { transform: translateY(-4px); box-shadow: 0 2px 6px rgba(16,24,40,.06), 0 16px 36px rgba(0, 151, 167, .12); border-color: #cdeff3; }
    .image-wrap { position: relative; aspect-ratio: 4 / 3; overflow: hidden; background: var(--celeste-claro); }
    .img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; will-change: transform; }
    .card:hover .img { transform: scale(1.02); }
    .badge { position: absolute; top: .6rem; left: .6rem; background: rgba(255,255,255,.9); backdrop-filter: blur(6px); border: 1px solid var(--borde); color: #0a2a3a; font-weight: 700; font-size: .75rem; padding: .28rem .55rem; border-radius: 999px; box-shadow: 0 2px 6px rgba(0,0,0,.06); }
    .caption { padding: .8rem .9rem 1rem; text-align: center; }
    .caption-title { margin: .2rem 0 .25rem 0; font-size: 1rem; font-weight: 700; color: #143244; }
    .caption-sub { margin: 0; font-size: .9rem; color: var(--gris); line-height: 1.5; }

    /* Modal (lightbox) */
    .modal { position: fixed; inset: 0; display: grid; place-items: center; background: color-mix(in hsl, rgba(10, 22, 52, .82) 84%, #0a1634 16%); backdrop-filter: blur(6px) saturate(1.05); z-index: 9999; animation: fadeIn .18s ease-out; }
    @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
    .dialog { width: min(92vw, 1040px); background: linear-gradient(180deg, #ffffff, #fbfdff); border: 1px solid #d7eef2; border-radius: 18px; box-shadow: 0 10px 30px rgba(0,0,0,.08), 0 40px 80px rgba(0, 188, 212, .18); overflow: hidden; transform: translateY(6px); animation: pop .22s ease-out forwards; }
    @keyframes pop { to { transform: translateY(0) } }
    .dialog-media { position: relative; background: var(--celeste-claro); aspect-ratio: 16 / 10; }
    .dialog-img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .dialog-footer { display: flex; align-items: center; justify-content: space-between; gap: .75rem; padding: .9rem 1rem .95rem; border-top: 1px solid #e8f0ff; }
    .dialog-text { min-width: 0; }
    .dialog-title { margin: 0 0 .2rem 0; font-size: 1.05rem; font-weight: 800; color: #0a2a3a; }
    .dialog-sub { margin: 0; color: var(--gris); font-size: .95rem; text-wrap: balance; }

    .btn { pointer-events: auto; user-select: none; border: 1px solid #d7eef2; background: rgba(255,255,255,.96); color: #0a2a3a; border-radius: 12px; padding: .55rem .7rem; font-weight: 700; font-size: .95rem; box-shadow: 0 6px 18px rgba(0, 188, 212, .18); transition: transform .15s ease, box-shadow .15s ease, background .15s ease; display: inline-flex; align-items: center; gap: .5rem; cursor: pointer; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(0, 151, 167, .22); }
    .btn:active { transform: translateY(0); box-shadow: 0 6px 16px rgba(0, 188, 212, .18); }
    .btn-ghost { background: rgba(255,255,255,.88); }
    .btn-close { position: absolute; top: .75rem; right: .75rem; }
    .btn-left { position: absolute; left: .6rem; top: 50%; transform: translateY(-50%); }
    .btn-right { position: absolute; right: .6rem; top: 50%; transform: translateY(-50%); }

    .btn-tts { border: 1px solid #d7eef2; background: rgba(255,255,255,.96); color: #0a2a3a; border-radius: 12px; padding: .35rem .6rem; font-weight: 700; font-size: .85rem; box-shadow: 0 6px 18px rgba(0, 188, 212, .18); cursor: pointer; }

    .btn:focus-visible, .card:focus-visible, .c-btn:focus-visible, .c-close:focus-visible, .dot:focus-visible, .btn-tts:focus-visible, .btn-primary:focus-visible { outline: 3px solid #9ee7f2; outline-offset: 2px; }

    .skeleton { background: linear-gradient(90deg, #eef9fc 25%, #f7fdff 37%, #eef9fc 63%); background-size: 400% 100%; animation: shimmer 1.4s ease infinite; }
    @keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }

    /* FAB */
    .fab {
      position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 10000;
      width: 3.25rem; height: 3.25rem; border-radius: 999px;
      display: grid; place-items: center;
      border: 1px solid color-mix(in srgb, var(--celeste-base) 50%, #ffffff);
      background: var(--celeste-base); color: white;
      font-size: 1.25rem; font-weight: 800; line-height: 1;
      box-shadow: 0 10px 24px rgba(0, 188, 212, .28);
      cursor: pointer;
      transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
    }
    .fab:hover { background: var(--celeste-oscuro); transform: translateY(-2px) scale(1.03); box-shadow: 0 16px 34px rgba(0,151,167,.32); }
    .fab:focus-visible { outline: 3px solid #9ee7f2; outline-offset: 3px; }

    /* Reduce motion */
    @media (prefers-reduced-motion: reduce) {
      .track, .slide img, .card, .btn, .btn-primary, .fab { transition: none !important; }
      .slide img { transform: none !important; }
      .modal, .dialog { animation: none !important; }
    }
  `;

  constructor() {
    super();
    this.titulo = 'Premiación y Distinciones';
    this.subtitulo = 'Reconocimientos al personal del Hospital San Jorge. Un homenaje a la excelencia clínica y humana.';
    this.fotos = [
      { url: 'https://hospitalsanjorgeayapel.info/LectorPdf/Img/WhatsApp%20Image%202025-09-05%20at%2014.34.31%20%281%29.jpeg', titulo: 'Reconocimiento a Mavel', descripcion: 'Por su compromiso y liderazgo en la atención al paciente.' },
      { url: 'https://hospitalsanjorgeayapel.info/LectorPdf/Img/WhatsApp%20Image%202025-09-05%20at%2014.34.31.jpeg', titulo: 'Distinción institucional', descripcion: 'Excelencia en servicio y calidad asistencial.' },
      { url: 'https://hospitalsanjorgeayapel.info/LectorPdf/Img/WhatsApp%20Image%202025-09-05%20at%2014.34.32%20%281%29.jpeg', titulo: 'Aidee Cristina Niebles Pupo', descripcion: 'Bacterióloga destacada por su aporte a diagnósticos de alta precisión.' },
      { url: 'https://hospitalsanjorgeayapel.info/LectorPdf/Img/WhatsApp%20Image%202025-09-05%20at%2014.34.32%20%282%29.jpeg', titulo: 'Mavel y Aidee', descripcion: 'Reconocimiento conjunto por trabajo interdisciplinario.' }
    ];

    this.destacados = [];
    this._abierto = false;
    this._indice = 0;

    // Botones por defecto (puedes asignarlos desde fuera o dejar vacío para ocultar)
    this.boton1Texto = '';
    this.boton2Texto = '';
    this.fabTexto = '';  // si vacío, no se muestra tooltip (title)
    this.fabIcono = '';  // si vacío, intenta usar '+'

    // Carrusel
    this._cIndex = 0;
    this._cHover = false;

    this._onKey = (e) => {
      if (this._abierto) {
        if (e.key === 'Escape') this._cerrar();
        if (e.key === 'ArrowRight') this._siguiente();
        if (e.key === 'ArrowLeft') this._anterior();
        return;
      }
      if (e.key === 'ArrowRight') this._cNext();
      if (e.key === 'ArrowLeft') this._cPrev();
    };
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._onKey);
    this._startAuto();
    // Pre-cargar voces
    try { window.speechSynthesis?.getVoices?.(); } catch(_){}
  }
  disconnectedCallback() {
    window.removeEventListener('keydown', this._onKey);
    this._stopAuto();
    super.disconnectedCallback();
  }

  // ======== Dictado ========
  _tryDictadorSpeak(text){
    try {
      if (window.Dictador?.speak) { window.Dictador.speak(text); return true; }
      if (window.Dictador?.leer)  { window.Dictador.leer(text);  return true; }
      if (window.dictador?.speak) { window.dictador.speak(text); return true; }
      if (typeof window.dictar === 'function') { window.dictar(text); return true; }
      window.dispatchEvent?.(new CustomEvent('dictar-texto', { detail:{ texto:text } }));
      return false;
    } catch(_) { return false; }
  }
  _tryDictadorStop(){
    try { if (window.Dictador?.stop)     { window.Dictador.stop();     return true; } } catch(_){}
    try { if (window.Dictador?.detener)  { window.Dictador.detener();  return true; } } catch(_){}
    try { if (window.Dictador?.cancel)   { window.Dictador.cancel();   return true; } } catch(_){}
    try { if (window.Dictador?.cancelar) { window.Dictador.cancelar(); return true; } } catch(_){}
    try { if (window.dictador?.stop)     { window.dictador.stop();     return true; } } catch(_){}
    try { if (window.dictador?.detener)  { window.dictador.detener();  return true; } } catch(_){}
    try { if (window.dictador?.cancel)   { window.dictador.cancel();   return true; } } catch(_){}
    try { if (window.dictador?.cancelar) { window.dictador.cancelar(); return true; } } catch(_){}
    try { window.dispatchEvent?.(new CustomEvent('detener-dictado')); } catch(_){}
    return false;
  }
  _selectSpanishVoice(){
    const voices = window.speechSynthesis?.getVoices?.() || [];
    return voices.find(v => /spanish.*colom|es-CO/i.test(`${v.name} ${v.lang}`)) || voices.find(v => /es-|spanish/i.test(`${v.name} ${v.lang}`)) || null;
  }
  _dictar(text){
    if (this._tryDictadorSpeak(text)) return;
    if (!('speechSynthesis' in window)) { console.warn('Síntesis de voz no soportada'); return; }
    this._detener();
    const u = new SpeechSynthesisUtterance(text);
    const v = this._selectSpanishVoice();
    if (v) u.voice = v;
    u.rate = 1; u.pitch = 1; u.volume = 1;
    window.speechSynthesis.speak(u);
  }
  _detener(){
    this._tryDictadorStop();
    if ('speechSynthesis' in window){
      try { if (window.speechSynthesis.paused) window.speechSynthesis.resume(); window.speechSynthesis.cancel(); } catch(_){}
    }
  }
  _btnDictar(text){ return html`<button class="btn-tts" @click=${() => this._dictar(text)} title="Escuchar">🔊 Escuchar</button>`; }
  _btnDetener(){ return html`<button class="btn-tts" @click=${this._detener} title="Detener">⏹️ Detener</button>`; }

  // ---- Lightbox (grid) ----
  _abrir(i) { this._indice = i; this._abierto = true; this._dictar(this._textoFoto(this.fotos[i])); }
  _cerrar() { this._abierto = false; this._detener(); }
  _anterior() { this._indice = (this._indice - 1 + this.fotos.length) % this.fotos.length; this._dictar(this._textoFoto(this.fotos[this._indice])); }
  _siguiente() { this._indice = (this._indice + 1) % this.fotos.length; this._dictar(this._textoFoto(this.fotos[this._indice])); }
  _onImgError(ev) { ev.target.alt = 'Imagen no disponible'; ev.target.classList.add('skeleton'); }

  // ---- Carrusel ----
  get _slides() { return this.destacados?.length ? this.destacados.map(i => this.fotos[i]).filter(Boolean) : this.fotos.slice(0, Math.min(5, this.fotos.length)); }
  _cGo(i) { this._cIndex = (i + this._slides.length) % this._slides.length; this._announceSlide(); }
  _cNext() { this._cGo(this._cIndex + 1); }
  _cPrev() { this._cGo(this._cIndex - 1); }
  _startAuto() { this._stopAuto(); this._auto = setInterval(() => { if (!this._cHover) this._cNext(); }, 4500); }
  _stopAuto() { if (this._auto) { clearInterval(this._auto); this._auto = null; } }
  _touchStart(e) { this._x0 = e.touches?.[0]?.clientX ?? 0; this._dx = 0; }
  _touchMove(e) { if (this._x0 != null) this._dx = (e.touches?.[0]?.clientX ?? 0) - this._x0; }
  _touchEnd() { const TH = 40; if (Math.abs(this._dx) > TH) { this._dx < 0 ? this._cNext() : this._cPrev(); } this._x0 = null; this._dx = 0; }

  // Textos a dictar
  _textoHeader(){ return `${this.titulo}. ${this.subtitulo ?? ''}`; }
  _textoFoto(f){ return `${f?.titulo ?? 'Reconocimiento'}. ${f?.descripcion ?? ''}`; }
  _textoCarrusel(){ return `Carrusel de reconocimientos. ${this._slides.map(s => s?.titulo).filter(Boolean).join(', ')}`; }

  // Anuncio accesible discreto del slide activo
  _announceSlide(){
    const live = this.renderRoot?.querySelector?.('#live');
    if (!live) return;
    const s = this._slides[this._cIndex];
    if (s?.titulo) live.textContent = `Slide activo: ${s.titulo}`;
  }

  // -------- Render helpers --------
  renderCard(f, i) {
    return html`
      <article class="card" tabindex="0" @click=${() => this._abrir(i)}
        @keydown=${(e)=>{ if(e.key==='Enter' || e.key===' ') {e.preventDefault(); this._abrir(i);} }}>
        <div class="image-wrap">
          <span class="badge">Distinción</span>
          <img class="img" src="${f.url}" alt="${f.titulo || 'Distinción'}" loading="lazy" decoding="async" @error=${this._onImgError} />
        </div>
        <div class="caption">
          <h3 class="caption-title">${f.titulo || 'Reconocimiento'}</h3>
          ${f.descripcion ? html`<p class="caption-sub">${f.descripcion}</p>` : null}
          <div class="mt2">${this._btnDictar(this._textoFoto(f))} ${this._btnDetener()}</div>
        </div>
      </article>
    `;
  }

  renderModal() {
    if (!this._abierto) return null;
    const f = this.fotos[this._indice] ?? {};
    return html`
      <div class="modal" role="dialog" aria-modal="true" aria-label="Vista ampliada de reconocimiento" @click=${this._cerrar}>
        <div class="dialog" @click=${(e)=> e.stopPropagation()}>
          <button class="btn btn-ghost btn-close" @click=${this._cerrar} aria-label="Cerrar (Esc)">✕</button>
          <div class="dialog-media">
            <img class="dialog-img" src="${f.url}" alt="${f.titulo || 'Distinción'}" @error=${this._onImgError} />
            <button class="btn btn-left" @click=${this._anterior} aria-label="Anterior (←)">←</button>
            <button class="btn btn-right" @click=${this._siguiente} aria-label="Siguiente (→)">→</button>
          </div>
          <footer class="dialog-footer">
            <div class="dialog-text">
              <p class="dialog-title">${f.titulo || 'Reconocimiento'}</p>
              ${f.descripcion ? html`<p class="dialog-sub">${f.descripcion}</p>` : null}
            </div>
            <div class="flex items-center gap1">
              ${this._btnDictar(this._textoFoto(f))}
              ${this._btnDetener()}
              <button class="btn" @click=${this._cerrar} aria-label="Cerrar">Cerrar</button>
            </div>
          </footer>
        </div>
      </div>
    `;
  }

  renderCarousel() {
    const slides = this._slides;
    const translate = `translateX(-${this._cIndex * 100}%)`;
    return html`
      <section class="carousel-wrap" role="region" aria-label="Reconocimientos destacados"
        @mouseenter=${()=>{this._cHover = true;}}
        @mouseleave=${()=>{this._cHover = false;}}
      >
       
        <button class="c-close" @click=${()=>this._cHover = !this._cHover}
          aria-pressed="${this._cHover ? 'true' : 'false'}" title="${this._cHover ? 'Autoplay pausado' : 'Autoplay activo'}">
          ${this._cHover ? '⏸' : '▶'}
        </button>

        <div class="carousel"
          @touchstart=${this._touchStart} @touchmove=${this._touchMove} @touchend=${this._touchEnd}
        >
          <div class="track" style="transform:${translate}">
            ${slides.map((s, idx) => html`
              <div class="slide" aria-current="${idx===this._cIndex ? 'true' : 'false'}">
                <img src="${s.url}" alt="${s.titulo || 'Reconocimiento destacado'}" @error=${this._onImgError} />
                <div class="grad"></div>
                <div class="slide-caption">
                  <div>
                    <h3 class="cap-title">${s.titulo || 'Reconocimiento'}</h3>
                    ${s.descripcion ? html`<p class="cap-sub">${s.descripcion}</p>` : null}
                  </div>
                  <div>${this._btnDictar(this._textoFoto(s))}</div>
                </div>
              </div>
            `)}
          </div>

          <button class="c-btn c-left" @click=${this._cPrev} aria-label="Anterior (←)">←</button>
          <button class="c-btn c-right" @click=${this._cNext} aria-label="Siguiente (→)">→</button>

          <div class="dots" role="tablist" aria-label="Paginación del carrusel">
            ${slides.map((_, i) => html`
              <button class="dot" role="tab" aria-label="Ir al slide ${i+1}"
                aria-current="${i===this._cIndex ? 'true' : 'false'}"
                @click=${()=>this._cGo(i)}></button>
            `)}
          </div>

          <!-- aria-live discreto para lectores de pantalla -->
          <span id="live" aria-live="polite" style="position:absolute;left:-9999px;"></span>
        </div>
      </section>
    `;
  }

  render() {
    const textoTodo = `${this.titulo}. ${this.subtitulo ?? ''}. ${this._textoCarrusel()}. ${this.fotos.map(f => this._textoFoto(f)).join('. ')}`;

    return html`
      <section class="wrapper">
        <header class="header">
          <h2 class="title">
            ${this.titulo}
            <span style="margin-left:.5rem">${this._btnDictar(this._textoHeader())} ${this._btnDetener()}</span>
          </h2>
          ${this.subtitulo ? html`<p class="subtitle">${this.subtitulo}</p>` : null}
          <div class="divider" aria-hidden="true"></div>

          <!-- Botones estratégicos (máx. 2) -->
          ${(this.boton1Texto || this.boton2Texto) ? html`
            <div class="primary-actions">
              ${this.boton1Texto ? html`
                <button class="btn-primary" @click=${() => this.dispatchEvent(new CustomEvent('boton1-click', { bubbles: true, composed: true }))}>
                  ${this.boton1Texto}
                </button>` : null}
              ${this.boton2Texto ? html`
                <button class="btn-primary" @click=${() => this.dispatchEvent(new CustomEvent('boton2-click', { bubbles: true, composed: true }))}>
                  ${this.boton2Texto}
                </button>` : null}
            </div>
          ` : null}

         
        </header>

        ${this.renderCarousel()}

        <div class="grid" role="list">
          ${this.fotos.map((f, i) => html`<div role="listitem">${this.renderCard(f, i)}</div>`)}
        </div>
      </section>

      ${this.renderModal()}

      <!-- FAB -->
      ${this.fabIcono || this.fabTexto ? html`
        <button class="fab" title="${this.fabTexto || 'Acción rápida'}"
          @click=${() => this.dispatchEvent(new CustomEvent('fab-click', { bubbles: true, composed: true }))}>
          ${this.fabIcono || '+'}
        </button>
      ` : null}
    `;
  }
}

customElements.define('distinciones-galeria', DistincionesGaleria);
