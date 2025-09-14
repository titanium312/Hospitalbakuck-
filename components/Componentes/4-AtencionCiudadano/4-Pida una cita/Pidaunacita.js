import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../../herramienta/dictador.js';
import { dictador } from '../../herramienta/dictador.js';

export class Pidaunacita extends LitElement {
  static styles = css`
    :host{
      display:block; background:#fff;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
      color:#17324d;
      --b900:#0a3d91; --b800:#1356b0; --b700:#2a6cc2; --b600:#2f7dd3; --b050:#f3f9ff; --b025:#f8fbff; --line:#d6f0fa;
      --ink:#17324d; --ink-soft:#3e5872; --toast:#0f5132; --toast-bg:#d1e7dd; --danger:#b00020;
      --font-scale:1;
    }

    .shell{ max-width:1200px; margin-inline:auto; padding:16px; }
    .wrap{ background:#fff; border:1px solid var(--line); border-radius:20px; box-shadow:0 18px 50px rgba(10,61,145,.08); overflow:hidden; position:relative; animation:fadeUp .6s ease-out both; }
    .ribbon{ height:10px; background:linear-gradient(90deg,var(--b800),var(--b600)); position:relative; }
    .ribbon::after{ content:""; position:absolute; inset:0; background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.45) 35%,transparent 70%); transform:translateX(-100%); animation:shine 3.4s ease-in-out infinite; }
    .head{ background:var(--b025); border-bottom:1px solid var(--line); padding:20px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }
    .title{ color:var(--b900); font-weight:800; letter-spacing:.2px; font-size:clamp(22px,3vw,32px); margin:0 0 4px; }
    .subtitle{ color:#3a6fb0; font-weight:600; font-size:14px; margin:0; }
    .crumbs{ font-size:13px; color:var(--ink-soft); }
    .crumbs a{ color:#2a6cc2; text-decoration:none; }
    .crumbs a:hover{ text-decoration:underline; }

    .actions{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .btn{ background:#fff; color:var(--b700); border:1px solid var(--line); border-radius:9999px; padding:8px 14px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:transform .12s ease, box-shadow .12s ease, border-color .12s ease; box-shadow:0 4px 14px rgba(19,86,176,.08); cursor:pointer; }
    .btn:hover{ transform:translateY(-1px); box-shadow:0 8px 22px rgba(19,86,176,.14); border-color:#cde8fb; }
    .btn:focus{ outline:none; box-shadow:0 0 0 3px rgba(47,125,211,.2); }
    .btn.primary{ background:linear-gradient(90deg,var(--b700),var(--b600)); color:#fff; border-color:transparent; }
    .btn.secondary{ background:var(--b050); }

    .dash{ height:1px; background:repeating-linear-gradient(90deg,#eaf4fd 0 14px,transparent 14px 28px); }

    /* PASOS */
    .steps{ padding:18px 24px; }
    .steps h2{ margin:0 0 6px; font-size:clamp(18px,2vw,22px); color:var(--b900); }
    .steps p.lead{ margin:0 0 12px; color:var(--ink-soft); }
    .steps-grid{ display:grid; gap:12px; grid-template-columns: 1fr; }
    @media (min-width: 768px){ .steps-grid{ grid-template-columns: repeat(3,1fr); } }
    .step{ border:1px solid var(--line); border-radius:14px; padding:14px; background:#fff; box-shadow:0 10px 26px rgba(10,61,145,.06); position:relative; }
    .badge{ width:28px; height:28px; border-radius:9999px; display:grid; place-items:center; background:linear-gradient(90deg,#93c5fd,#2f7dd3); color:#fff; font-weight:800; font-size:13px; margin-bottom:8px; }
    .step h3{ margin:0 0 6px; font-size:16px; color:#17324d; }
    .step p{ margin:0; color:#4a627b; font-size:14px; }
    .step ul{ margin:8px 0 0 18px; padding:0; color:#4a627b; font-size:14px; }
    .cta-row{ display:flex; flex-wrap:wrap; gap:10px; padding: 6px 24px 0; }

    .note{ background:var(--b050); border:1px solid var(--line); border-radius:12px; margin:16px 24px; padding:12px 14px; display:flex; align-items:center; gap:10px; color:var(--ink-soft); font-size:14px; }

    .toolbar{ display:flex; flex-wrap:wrap; gap:8px; padding: 0 24px 8px; }

    .content{ padding: 8px 24px 24px; }
    .literal{ white-space:pre-wrap; line-height:1.58; font-size: calc(1.05rem * var(--font-scale)); color:var(--ink); }

    .law{ padding: 0 24px 18px; font-size:13px; color:#3e5872; }
    .law a{ color:#2a6cc2; text-decoration:none; }
    .law a:hover{ text-decoration:underline; }

    .evid{ padding: 0 24px 24px; font-size:13px; color:#3e5872; }
    .evid a{ color:#2a6cc2; text-decoration:none; }
    .evid a:hover{ text-decoration:underline; }

    .ico{ width:18px; height:18px; display:inline-block; }

    .toast{ position:fixed; z-index:1000; left:50%; transform:translateX(-50%); bottom:20px; background:var(--toast-bg); color:var(--toast); border:1px solid #badbcc; border-radius:9999px; padding:8px 14px; box-shadow:0 8px 24px rgba(0,0,0,.12); opacity:0; pointer-events:none; transition:opacity .2s ease, transform .2s ease; }
    .toast.show{ opacity:1; transform:translateX(-50%) translateY(-4px); }

    :host([contrast="high"]) { --ink:#0b1f33; --b050:#e9f3ff; --b025:#f2f7ff; --line:#bcdcf6; }

    @keyframes fadeUp{ from{ opacity:0; transform:translateY(10px);} to{ opacity:1; transform:translateY(0);} }
    @keyframes shine{ 0%{ transform:translateX(-100%);} 60%{ transform:translateX(100%);} 100%{ transform:translateX(100%);} }

    @media (prefers-reduced-motion:reduce){ .wrap{ animation:none; } .ribbon::after{ display:none; } .btn{ transition:none; } }
    @media (min-width:1200px){ .shell{ padding-inline:40px; } }
  `;

  static properties = {
    fontScale: { type: Number, state: true },
    _toast: { type: String, state: true },
    // URLs de funcionalidad
    urls: { type: Object },
    fundamentoUrl: { type: String },
  };

  constructor(){
    super();
    this.fontScale = 1;
    this._toast = '';

    // URLs reales: cámbialas según tu backend/portal
    this.urls = {
      solicitar: '/citas/solicitar',
      consultar: '/citas/consultar-cancelar',
      requisitos: '/requisitos-costos',
      guiaPdf: '/guias/guia-citas.pdf'
    };

    // Enlace oficial (si tienes PDF/acto administrativo)
    this.fundamentoUrl = '#'; // reemplace por URL oficial al Decreto 2106/2019 o repositorio normativo
  }

  /* ===== Texto institucional íntegro (no se modifica) ===== */
  get _contenido(){ return `Canales de Atención
Canales de Atención al Usuario.
CANALES DE ATENCIÓN
CANAL PRESENCIAL
Ventanilla Única — Servicio de Información y Atención al Usuario.
Horario: Lunes a viernes: 7:00 a.m. – 12:00 m / 2:00 p.m. – 6:00 p.m.

CANAL TELEFÓNICO / WHATSAPP:
3147989334
Línea transparencia

CANAL VIRTUAL
https://hospitalsanjorgeayapel.com/
principal_gerencia@hospitalayapel.gov.co
esesanjorgedeayapel@gmail.com

CANAL ESCRITO
Buzón físico en Ventanilla Única — Radicación presencial o formulario en línea.`; }

  /* ===== Derivados útiles (no alteran el texto) ===== */
  get _telefono(){
    const re = /(?:\(\s*\d{2,4}\s*\)|\+?\d{1,4})[\s.-]*\d{3,4}[\s.-]?\d{3,4}/g;
    const m = this._contenido.match(re);
    if (!m || !m.length) return '';
    return m[0].replace(/[^\d+]/g,'');
  }
  get _web(){ const m = this._contenido.match(/https?:\/\/\S+/); return m ? m[0] : ''; }
  get _emails(){ return Array.from(this._contenido.matchAll(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g)).map(x=>x[0]); }

  /* ===== Utils ===== */
  _setToast(msg){ this._toast = msg; clearTimeout(this._toastTimer); this._toastTimer = setTimeout(()=>{ this._toast=''; }, 1800); }
  async _copy(text){ try{ await navigator.clipboard.writeText(text); this._setToast('Copiado al portapapeles'); }catch{ this._setToast('No se pudo copiar'); } }
  _incFont(){ this.fontScale = Math.min(1.3, +(this.fontScale + 0.05).toFixed(2)); this.style.setProperty('--font-scale', String(this.fontScale)); }
  _decFont(){ this.fontScale = Math.max(0.85, +(this.fontScale - 0.05).toFixed(2)); this.style.setProperty('--font-scale', String(this.fontScale)); }
  _resetFont(){ this.fontScale = 1; this.style.setProperty('--font-scale', '1'); }
  _toggleContrast(){ this.toggleAttribute('contrast', !this.hasAttribute('contrast')); }

  /* ===== Texto para TTS ===== */
  #ttsPasos(){
    const pasos = [
      'Paso 1. Identifique el servicio: elija el tipo de consulta: medicina general, prioritaria, odontología o laboratorio.',
      'Paso 2. Autenticación: ingrese su número de documento y datos de contacto.',
      'Paso 3. Fecha y horario: seleccione sede, profesional y horario disponible.',
      'Paso 4. Requisitos y adjuntos: confirme autorizaciones u órdenes y adjunte soportes.',
      'Paso 5. Confirmación: revise el resumen y confirme. Recibirá comprobante por correo o SMS.',
      'Paso 6. Consulta o cancelación: con su documento y código puede gestionar su cita.'
    ];
    return pasos.join(' ');
  }
  #ttsCanales(){
    // Lee exactamente el bloque de canales (texto íntegro)
    return this._contenido;
  }

  /* ===== Render ===== */
  render(){
    return html`
      <section>
        <div class="shell">
          <div class="wrap">
            <!-- Barra global: lee todo el contenido visible dentro -->
            <dictador-tts ui lang="es-CO" rate="1" pitch="1">
              <div class="ribbon" aria-hidden="true"></div>

              <div class="head">
                <div>
                  <div class="crumbs" aria-label="Ubicación">
                    <a href="/atencion-ciudadania">Atención al Ciudadano</a> · <strong>Pida una cita</strong>
                  </div>
                  <h1 class="title">Pida una cita</h1>
                  <p class="subtitle">Solicitud de citas en línea — E.S.E. Hospital San Jorge de Ayapel</p>
                </div>
                <div class="actions">
                  <a class="btn primary" href="${this.urls.solicitar}" aria-label="Solicitar cita ahora" role="button">${this._svgCalendar()}<span>Solicitar cita</span></a>
                  <a class="btn" href="${this.urls.consultar}" aria-label="Consultar o cancelar cita" role="button">${this._svgSearch()}<span>Consultar / Cancelar</span></a>
                  <a class="btn" href="${this.urls.requisitos}" aria-label="Requisitos y tiempos de atención" role="button">${this._svgInfo()}<span>Requisitos y tiempos</span></a>
                  <a class="btn" href="${this.urls.guiaPdf}" target="_blank" rel="noopener" aria-label="Guía paso a paso en PDF" role="button">${this._svgDownload()}<span>Guía PDF</span></a>
                </div>
              </div>

              <div class="dash" aria-hidden="true"></div>

              <!-- PASOS CLAROS -->
              <div class="steps">
                <h2>¿Cómo solicitar su cita?</h2>
                <p class="lead">Siga estos pasos. Tenga a mano su documento de identidad y la información del servicio requerido.</p>

                <div class="cta-row" role="group" aria-label="Lectura por voz">
                  <button class="btn secondary" type="button"
                          @click=${() => dictador.dictar(this.#ttsPasos(), { lang:'es-CO' })}>
                    🔊 Leer pasos
                  </button>
                  <button class="btn secondary" type="button"
                          @click=${() => dictador.dictar(this.#ttsCanales(), { lang:'es-CO' })}>
                    🔊 Leer canales
                  </button>
                </div>

                <div class="steps-grid">
                  ${this._step(1, 'Identifique el servicio', html`Elija el tipo de consulta (medicina general, prioritaria, odontología, laboratorio, etc.).`)}
                  ${this._step(2, 'Autenticación', html`Ingrese su número de documento y datos básicos de contacto (correo y/o celular).`)}
                  ${this._step(3, 'Fecha y horario', html`Seleccione la sede (si aplica), el profesional y el horario disponible.`)}
                  ${this._step(4, 'Requisitos y adjuntos', html`Confirme si requiere autorización, orden médica u otros soportes. Adjunte en PDF o imagen.`)}
                  ${this._step(5, 'Confirmación', html`Revise el resumen de su cita y confirme. Recibirá comprobante por correo/SMS.`)}
                  ${this._step(6, 'Consulta/Cancelación', html`Use su documento y código de cita para consultar o cancelar oportunamente.`)}
                </div>

                <div class="cta-row" role="group" aria-label="Accesos rápidos">
                  <a class="btn primary" href="${this.urls.solicitar}" role="button">${this._svgCalendar()}<span>Iniciar solicitud</span></a>
                  <a class="btn secondary" href="${this.urls.consultar}" role="button">${this._svgSearch()}<span>Consultar / Cancelar</span></a>
                </div>
              </div>

              <div class="note" role="status" aria-live="polite">
                <div>${this._svgInfo()}</div>
                <div>
                  <strong>Tip:</strong> si no encuentra disponibilidad en línea, contacte nuestros canales telefónicos o virtuales. También puede acercarse a Ventanilla Única.
                  ${this._telefono ? html`&nbsp;Tel:&nbsp;<a href="tel:${this._telefono}">${this._telefono}</a>` : ''}
                  ${this._web ? html`&nbsp;•&nbsp;Web:&nbsp;<a href="${this._web}" target="_blank" rel="noopener">${this._web}</a>` : ''}
                </div>
              </div>

              <!-- Herramientas -->
              <div class="toolbar" aria-label="Herramientas de accesibilidad">
                <button class="btn secondary" type="button" @click=${()=>this._copy(this._contenido)} title="Copiar información institucional">${this._svgCopy()}<span>Copiar info</span></button>
                ${this._telefono ? html`<button class="btn secondary" type="button" @click=${()=>this._copy(this._telefono)} title="Copiar teléfono">${this._svgPhone()}<span>Copiar teléfono</span></button>`: ''}
                ${this._emails.length ? html`<button class="btn secondary" type="button" @click=${()=>this._copy(this._emails.join(', '))} title="Copiar correos">${this._svgMail()}<span>Copiar correos</span></button>`: ''}
                <button class="btn secondary" type="button" @click=${()=>window.print()} title="Imprimir">${this._svgPrint()}<span>Imprimir</span></button>
                <button class="btn secondary" type="button" @click=${this._toggleContrast} title="Alto contraste">${this._svgContrast()}<span>Alto contraste</span></button>
                <button class="btn secondary" type="button" @click=${this._incFont} title="Aumentar tamaño">A+</button>
                <button class="btn secondary" type="button" @click=${this._resetFont} title="Restablecer tamaño">A∘</button>
                <button class="btn secondary" type="button" @click=${this._decFont} title="Reducir tamaño">A−</button>
              </div>

              <!-- Contenido institucional íntegro -->
              <div class="content">
                <h3 class="sr-only">Información institucional (texto íntegro)</h3>
                <div class="literal" id="texto-completo">${this._contenido}</div>
              </div>

              <!-- Fundamento legal -->
              <div class="law">
                <strong>Fundamento legal:</strong> Art. 14 del Decreto 2106 de 2019.
                ${this.fundamentoUrl && this.fundamentoUrl !== '#' ? html` Consulte: <a href="${this.fundamentoUrl}" target="_blank" rel="noopener">ver norma</a>.` : ''}
              </div>

              <!-- Evidencia (para QA/auditoría) -->
              <div class="evid">
                <strong>Evidencia:</strong>
                <ul>
                  <li>URL de solicitud: <a href="${this.urls.solicitar}">${this.urls.solicitar}</a></li>
                  <li>URL de consulta/cancelación: <a href="${this.urls.consultar}">${this.urls.consultar}</a></li>
                  <li>Requisitos y tiempos: <a href="${this.urls.requisitos}">${this.urls.requisitos}</a></li>
                  <li>Guía paso a paso (PDF): <a href="${this.urls.guiaPdf}">${this.urls.guiaPdf}</a></li>
                </ul>
              </div>
            </dictador-tts>
          </div>
        </div>

        <div class="toast ${this._toast? 'show':''}" role="status" aria-live="polite">${this._toast}</div>
      </section>
    `;
  }

  /* ===== Paso reutilizable ===== */
  _step(num, titulo, desc){
    return html`
      <article class="step">
        <div class="badge" aria-hidden="true">${num}</div>
        <h3>${titulo}</h3>
        <p>${desc}</p>
      </article>
    `;
  }

  /* ===== Iconos SVG ===== */
  _svgPhone(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.09 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.67-1.09a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92z"/></svg>`; }
  _svgMail(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>`; }
  _svgPrint(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>`; }
  _svgContrast(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/></svg>`; }
  _svgCopy(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`; }
  _svgInfo(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`; }
  _svgDownload(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>`; }
  _svgSearch(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`; }
  _svgCalendar(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`; }
}

customElements.define('pidaunacita-view', Pidaunacita);
