import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Pidaunacita extends LitElement {
  static styles = css`
    :host{
      display:block; background:#fff;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
      color:#17324d;
      --b900:#0a3d91; --b800:#1356b0; --b700:#2a6cc2; --b600:#2f7dd3; --b050:#f3f9ff; --b025:#f8fbff; --line:#d6f0fa;
      --ink:#17324d; --ink-soft:#3e5872; --toast:#0f5132; --toast-bg:#d1e7dd; --danger:#b00020;
      --font-scale:1; /* Control dinámico de fuente */
    }

    .shell{ max-width:1200px; margin-inline:auto; padding:16px; }

    .wrap{ background:#fff; border:1px solid var(--line); border-radius:20px;
      box-shadow:0 18px 50px rgba(10,61,145,.08); overflow:hidden; position:relative;
      animation:fadeUp .6s ease-out both; }

    .ribbon{ height:10px; background:linear-gradient(90deg,var(--b800),var(--b600)); position:relative; }
    .ribbon::after{ content:""; position:absolute; inset:0; background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.45) 35%,transparent 70%); transform:translateX(-100%); animation:shine 3.4s ease-in-out infinite; }

    .head{ background:var(--b025); border-bottom:1px solid var(--line); padding:20px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }
    .title{ color:var(--b900); font-weight:800; letter-spacing:.2px; font-size:clamp(22px,3vw,32px); margin:0 0 4px; }
    .subtitle{ color:#3a6fb0; font-weight:600; font-size:14px; margin:0; }

    .actions{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .btn{ background:#fff; color:var(--b700); border:1px solid var(--line); border-radius:9999px; padding:8px 14px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:transform .12s ease, box-shadow .12s ease, border-color .12s ease; box-shadow:0 4px 14px rgba(19,86,176,.08); cursor:pointer; }
    .btn:hover{ transform:translateY(-1px); box-shadow:0 8px 22px rgba(19,86,176,.14); border-color:#cde8fb; }
    .btn:focus{ outline:none; box-shadow:0 0 0 3px rgba(47,125,211,.2); }

    .btn.secondary{ background:var(--b050); }
    .btn.danger{ color:#fff; background:var(--danger); border-color:#a51b2b; }

    .dash{ height:1px; background:repeating-linear-gradient(90deg,#eaf4fd 0 14px,transparent 14px 28px); }

    .note{ background:var(--b050); border:1px solid var(--line); border-radius:12px; margin:16px 24px; padding:12px 14px; display:flex; align-items:center; gap:10px; color:var(--ink-soft); font-size:14px; }

    .toolbar{ display:flex; flex-wrap:wrap; gap:8px; padding: 0 24px 8px; }

    .content{ padding: 8px 24px 24px; }
    .literal{ white-space:pre-wrap; line-height:1.58; font-size: calc(1.05rem * var(--font-scale)); color:var(--ink); }

    .ico{ width:18px; height:18px; display:inline-block; }

    .toast{ position:fixed; z-index:1000; left:50%; transform:translateX(-50%); bottom:20px; background:var(--toast-bg); color:var(--toast); border:1px solid #badbcc; border-radius:9999px; padding:8px 14px; box-shadow:0 8px 24px rgba(0,0,0,.12); opacity:0; pointer-events:none; transition:opacity .2s ease, transform .2s ease; }
    .toast.show{ opacity:1; transform:translateX(-50%) translateY(-4px); }

    /* Alto contraste opcional */
    :host([contrast="high"]) { --ink:#0b1f33; --b050:#e9f3ff; --b025:#f2f7ff; --line:#bcdcf6; }

    @keyframes fadeUp{ from{ opacity:0; transform:translateY(10px);} to{ opacity:1; transform:translateY(0);} }
    @keyframes shine{ 0%{ transform:translateX(-100%);} 60%{ transform:translateX(100%);} 100%{ transform:translateX(100%);} }

    @media (prefers-reduced-motion:reduce){ .wrap{ animation:none; } .ribbon::after{ display:none; } .btn{ transition:none; } }
    @media (min-width:1200px){ .shell{ padding-inline:40px; } }
  `;

  static properties = {
    fontScale: { type: Number, state: true },
    _toast: { type: String, state: true },
  };

  constructor(){
    super();
    this.fontScale = 1;
    this._toast = '';
  }

  // Texto íntegro, sin modificaciones
  get _contenido(){ return `Canales de Atención
Canales de Atención al Usuario.
CANALES DE ATENCIÓN
CANAL PRESENCIAL
Ventanilla Única — Servicio de Información y Atención al Usuario.
Horario: Lunes a viernes: 7:00 a.m. – 12:00 m / 2:00 p.m. – 6:00 p.m.

CANAL TELEFÓNICO / WHATSAPP:
(604) 7705083
Línea transparencia

CANAL VIRTUAL
https://hospitalsanjorgeayapel.com/
principal_gerencia@hospitalayapel.gov.co
esesanjorgedeayapel@gmail.com

CANAL ESCRITO
Buzón físico en Ventanilla Única — Radicación presencial o formulario en línea.`; }

  // Derivados útiles (no alteran el texto, solo extraen)
  get _telefono(){
    const m = this._contenido.match(/\(\s*\d+\s*\)\s*\d+/) || this._contenido.match(/\+?\d[\d\s-]{6,}/);
    return m ? m[0].replace(/\s+/g,'').replace(/[()\-]/g,'') : '';
  }
  get _web(){ const m = this._contenido.match(/https?:\/\/\S+/); return m ? m[0] : ''; }
  get _emails(){ return Array.from(this._contenido.matchAll(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g)).map(x=>x[0]); }

  // Utilidades
  _setToast(msg){ this._toast = msg; clearTimeout(this._toastTimer); this._toastTimer = setTimeout(()=>{ this._toast=''; }, 1800); }
  async _copy(text){ try{ await navigator.clipboard.writeText(text); this._setToast('Copiado al portapapeles'); }catch{ this._setToast('No se pudo copiar'); } }
  _incFont(){ this.fontScale = Math.min(1.3, +(this.fontScale + 0.05).toFixed(2)); this.style.setProperty('--font-scale', String(this.fontScale)); }
  _decFont(){ this.fontScale = Math.max(0.85, +(this.fontScale - 0.05).toFixed(2)); this.style.setProperty('--font-scale', String(this.fontScale)); }
  _resetFont(){ this.fontScale = 1; this.style.setProperty('--font-scale', '1'); }
  _toggleContrast(){ this.toggleAttribute('contrast', !this.hasAttribute('contrast')); }

  render(){
    return html`
      <section>
        <div class="shell">
          <div class="wrap">
            <div class="ribbon" aria-hidden="true"></div>

            <div class="head">
              <div>
                <h1 class="title">Canales de Atención</h1>
                <p class="subtitle">E.S.E. Hospital San Jorge de Ayapel</p>
              </div>
              <div class="actions">
                ${this._telefono ? html`<a class="btn" href="tel:+${this._telefono}" aria-label="Llamar">${this._svgPhone()}<span>Llamar</span></a>`: ''}
                ${this._telefono ? html`<a class="btn" href="https://wa.me/${this._telefono}" target="_blank" rel="noopener" aria-label="WhatsApp">${this._svgWhats()}<span>WhatsApp</span></a>`: ''}
                ${this._emails[0] ? html`<a class="btn" href="mailto:${this._emails[0]}" aria-label="Escribir correo">${this._svgMail()}<span>Escribir</span></a>`: ''}
                ${this._web ? html`<a class="btn" href="${this._web}" target="_blank" rel="noopener" aria-label="Sitio web">${this._svgGlobe()}<span>Sitio web</span></a>`: ''}
              </div>
            </div>

            <div class="dash" aria-hidden="true"></div>

            <div class="note" role="status" aria-live="polite">
              <div>${this._svgInfo()}</div>
              <div>Información institucional. El contenido a continuación se muestra <strong>textualmente</strong> tal como fue suministrado.</div>
            </div>

            <!-- Herramientas interactivas -->
            <div class="toolbar" aria-label="Herramientas de texto">
              <button class="btn secondary" @click=${()=>this._copy(this._contenido)} title="Copiar todo">${this._svgCopy()}<span>Copiar todo</span></button>
              ${this._telefono ? html`<button class="btn secondary" @click=${()=>this._copy(this._telefono)} title="Copiar teléfono">${this._svgPhone()}<span>Copiar teléfono</span></button>`: ''}
              ${this._emails.length ? html`<button class="btn secondary" @click=${()=>this._copy(this._emails.join(', '))} title="Copiar correos">${this._svgMail()}<span>Copiar correos</span></button>`: ''}
              <button class="btn secondary" @click=${()=>window.print()} title="Imprimir">${this._svgPrint()}<span>Imprimir</span></button>
              <button class="btn secondary" @click=${this._toggleContrast} title="Alto contraste">${this._svgContrast()}<span>Alto contraste</span></button>
              <button class="btn secondary" @click=${this._incFont} title="Aumentar tamaño">A+</button>
              <button class="btn secondary" @click=${this._resetFont} title="Restablecer tamaño">A∘</button>
              <button class="btn secondary" @click=${this._decFont} title="Reducir tamaño">A−</button>
            </div>

            <div class="content">
              <div class="literal" id="texto-completo">${this._contenido}</div>
            </div>
          </div>
        </div>

        <div class="toast ${this._toast? 'show':''}" role="status" aria-live="polite">${this._toast}</div>
      </section>
    `;
  }

  // Iconos SVG minimalistas (puros, sin dependencias)
  _svgPhone(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.09 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.67-1.09a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92z"/></svg>`; }
  _svgWhats(){ return html`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.44 0 0.06 5.38 0.06 12a11.9 11.9 0 0 0 1.78 6.22L0 24l5.93-1.8a12 12 0 0 0 6.13 1.7h.01c6.62 0 12-5.38 12-12 0-3.2-1.24-6.2-3.55-8.42zm-8.46 18.5h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.52 1.07 1.05-3.43-.23-.35A9.94 9.94 0 0 1 2.12 12c0-5.48 4.46-9.94 9.94-9.94 2.66 0 5.16 1.04 7.04 2.93a9.9 9.9 0 0 1 2.9 7.03c0 5.48-4.46 9.94-9.94 9.94zm5.44-7.45c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.28-.2-.58-.35z"/></svg>`; }
  _svgMail(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>`; }
  _svgGlobe(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`; }
  _svgInfo(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`; }
  _svgCopy(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`; }
  _svgPrint(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>`; }
  _svgContrast(){ return html`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/></svg>`; }
}

customElements.define('pidaunacita-view', Pidaunacita);
