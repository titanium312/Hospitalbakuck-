import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

const ICONS = new Map([
  ['facebook',  'M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.19 8.44 9.95v-7.03H7.9v-2.92h2.4V9.73c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.1.18 2.1.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.45v1.75h2.59l-.41 2.92h-2.18v7.03c4.78-.76 8.44-4.93 8.44-9.95z'],
  ['instagram', 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z'],
  ['x',         'M3 3h4.7l4.1 5.5L16.4 3H21l-7 8.2L21 21h-4.7l-4.6-6.1L7.5 21H3l7.4-8.6L3 3z'],
  ['youtube',   'M23.5 7.5s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.9 3.8 12 3.8 12 3.8h0s-4.9 0-8.2.4c-.5.1-1.5.1-2.4 1C.7 5.9.5 7.5.5 7.5S0 9.5 0 11.6v.8c0 2.1.5 4.1.5 4.1s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.9.4 8.1.4h0s4.9 0 8.2-.4c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.5-2 .5-4.1v-.8c0-2.1-.5-4.1-.5-4.1zM9.6 9.6v5.3l5.2-2.7-5.2-2.6z'],
  ['tiktok',    'M16.5 3.5c1.2 1.5 2.7 2.3 4.5 2.4v3.2c-1.9 0-3.6-.6-4.5-1.4v6.8a6.7 6.7 0 1 1-5.6-6.6v3.4a3.5 3.5 0 1 0 2.9 3.5V2h2.7v1.5z'],
  ['linkedin',  'M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3V9zm7 0h3.8v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.2c0-1.2 0-2.7-1.6-2.7-1.6 0-1.9 1.3-1.9 2.6V21H10V9z'],
  ['whatsapp',  'M17.5 14.5c-.3.8-1.7 1.5-2.4 1.6-.6.1-1.3.1-2.1-.1a9.3 9.3 0 0 1-3.1-1.6 10.2 10.2 0 0 1-2.2-2.2c-.7-1-1.2-2-1.4-3.1-.2-1 .2-2 .7-2.3.4-.3.9-.7 1.5-.6.4 0 .6.6.8 1 .2.5.5 1.1.4 1.4-.1.3-.4.5-.7.8-.2.1-.4.3-.2.7.2.4.9 1.5 2 2.4 1.4 1.2 2.6 1.6 3 .1.1-.3.5-.6.8-.5.3 0 1.8.8 2 .9.2.1.4.2.4.4zM12 2a10 10 0 1 1 0 20c-1.7 0-3.2-.4-4.6-1.1L2 22l1.1-5.2A10 10 0 0 1 12 2z'],
]);

export class BloqueInformacion extends LitElement {
  static properties = {
    nombre:     { type: String },
    telefono1:  { type: String },
    telefono2:  { type: String },
    direccion:  { type: String },
    correo:     { type: String },
    sitio:      { type: String },
    biblioteca: { type: String },
    redes:      { type: Array },  // [{nombre, url, icono}]
  };

  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  constructor(){
    super();
    this.nombre     = 'E.S.E. Hospital San Jorge de Ayapel';
    this.telefono1  = '770 5150';
    this.telefono2  = '770 5004';
    this.direccion  = 'Cl. 6 # 19–21 (Cl 6 Dg19-21), Ayapel, Córdoba';
    this.correo     = 'esesanjorgeayapel@gmail.com';
    this.sitio      = 'https://hospitalsanjorgeayapel.com/';
    this.biblioteca = 'https://hospitalsanjorgeayapel.info/';
    this.redes      = [
      { nombre: 'Facebook', url: 'https://www.facebook.com/Ese-Hospital-san-Jorge-Ayapel-101046746268709/', icono: 'facebook' },
      // { nombre:'Instagram', url:'https://instagram.com/usuario', icono:'instagram' },
      // { nombre:'X (Twitter)', url:'https://x.com/usuario', icono:'x' },
      // { nombre:'YouTube', url:'https://youtube.com/@usuario', icono:'youtube' },
      // { nombre:'TikTok', url:'https://www.tiktok.com/@usuario', icono:'tiktok' },
      // { nombre:'LinkedIn', url:'https://www.linkedin.com/company/usuario', icono:'linkedin' },
      // { nombre:'WhatsApp', url:'https://wa.me/57XXXXXXXXXX', icono:'whatsapp' },
    ];

    // id único para aria-labelledby
    this._titleId = `info-title-${Math.random().toString(36).slice(2, 9)}`;
  }

  static styles = css`
    :host{
      --azul-50:#e0f2fe; --azul-100:#bae6fd; --azul-600:#0284c7; --azul-700:#0369a1;
      --borde:#d6f0fa; --texto:#0f172a; --texto-suave:#475569; color:var(--texto);
      display:block; font:400 16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Apple Color Emoji","Segoe UI Emoji";
    }
    .container{ max-width:1120px; margin:0 auto; padding:2rem 1rem; }
    .ribbon{ height:.4rem; width:7rem; margin:0 auto; border-radius:9999px; background:linear-gradient(90deg,#38bdf8,#06b6d4,#3b82f6); }
    .wrap{ margin-top:1rem; padding:1rem; border-radius:20px; border:1px solid var(--borde); background:#ffffffcc; box-shadow:0 8px 24px rgba(2,8,20,.06); backdrop-filter:blur(4px); }
    .grid{ display:grid; gap:1rem; }
    @media (min-width:768px){ .grid{ grid-template-columns:repeat(3,1fr); } }
    .card{ border-radius:16px; border:1px solid var(--borde); background:#fff; padding:1rem; box-shadow:0 6px 18px rgba(2,8,20,.05); transition:transform .12s, box-shadow .12s; }
    .card:hover{ transform:translateY(-2px); box-shadow:0 10px 28px rgba(2,8,20,.08); }
    h3{ margin:0; font-weight:700; font-size:1.125rem; color:var(--texto); }
    p, li, dd, dt{ color:var(--texto-suave); }
    .pill{ margin-top:.75rem; display:inline-block; padding:.5rem 1rem; border-radius:9999px; border:1px solid var(--azul-100); background:var(--azul-50); color:var(--azul-700); font-weight:600; }
    .links a{ color:var(--azul-700); text-decoration:none; border-bottom:1px solid transparent; }
    .links a:hover{ border-bottom-color:var(--azul-700); }
    .list{ margin:.5rem 0 0 0; padding-left:1.25rem; }
    .quick-grid{ display:grid; gap:.75rem; margin-top:1rem; grid-template-columns:1fr; }
    @media (min-width:768px){ .quick-grid{ grid-template-columns:repeat(3,1fr); } }
    .quick{ display:block; text-align:center; padding:.9rem 1rem; border-radius:12px; border:1px solid var(--borde); background:#f9fbff; color:var(--texto); text-decoration:none; transition:box-shadow .12s, transform .12s; }
    .quick:hover{ box-shadow:0 8px 20px rgba(2,8,20,.06); transform:translateY(-1px); }
    .socials{ margin-top:.75rem; display:flex; gap:.5rem; flex-wrap:wrap; align-items:center; }
    .socials-label{ font-weight:700; font-size:.95rem; color:var(--texto); margin-right:.25rem; }
    .social-btn{ display:inline-flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:50%; border:1px solid var(--borde); background:#f8fafc; text-decoration:none; transition:transform .12s, box-shadow .12s, background .12s; }
    .social-btn:hover{ transform:translateY(-1px); box-shadow:0 8px 20px rgba(2,8,20,.06); background:#fff; }
    .social-btn svg{ width:20px; height:20px; }
    .social-name{ position:absolute; left:-9999px; }
    a:focus-visible, button:focus-visible{ outline:3px solid var(--azul-600); outline-offset:2px; border-radius:6px; }
    @media (prefers-reduced-motion:reduce){ .card, .quick, .social-btn{ transition:none !important; } }
  `;

  // --- Helpers
  #tel(t){ return `+57${(t||'').replace(/\D/g,'')}`; }
  #safeUrl(u){
    try { const url = new URL(u); return url.href; } catch { return '#'; }
  }
  #icon(nombre){
    const path = ICONS.get((nombre||'').toLowerCase());
    return path ? html`<svg part="icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d=${path}></path></svg>` : null;
  }
  get #mapsHref(){
    if(!this.direccion) return null;
    const q = encodeURIComponent(this.direccion);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }

  willUpdate(changed){
    if(changed.has('redes') && Array.isArray(this.redes)){
      // normaliza y filtra redes inválidas
      this.redes = this.redes
        .filter(r => r && typeof r.url === 'string' && r.url.trim())
        .map(r => ({ nombre: r.nombre?.trim() || 'Red', url: this.#safeUrl(r.url), icono: (r.icono||'').toLowerCase() }));
    }
  }

  render(){
    return html`
      <section class="container" aria-labelledby=${this._titleId}>
        <div class="ribbon" aria-hidden="true"></div>

        <div class="wrap">
          <div class="grid">
            <!-- Presentación -->
            <article class="card">
              <h3 id=${this._titleId}>${this.nombre}</h3>
              <p class="mt-2">
                <slot name="descripcion">
                  Empresa Social del Estado que presta servicios de salud de baja y mediana complejidad.
                  Priorizamos la seguridad del paciente, la confianza y la calidez humana.
                </slot>
              </p>
              <span class="pill">Atención segura y humanizada</span>
            </article>

            <!-- Atención al usuario -->
            <article class="card">
              <h3>Atención al usuario</h3>
              <p class="mt-2">
                Conmutador:
                <a href="tel:${this.#tel(this.telefono1)}">${this.telefono1}</a>
                <span aria-hidden="true"> · </span>
                <a href="tel:${this.#tel(this.telefono2)}">${this.telefono2}</a>
              </p>
              <p class="mt-2">
                Correo:
                <a href="mailto:${this.correo}">${this.correo}</a>
              </p>
              <p style="font-size:.9rem;opacity:.8;margin-top:.5rem;">
                Horario referencial: Urgencias 24/7; otros servicios según agenda institucional.
              </p>
              <div class="links" style="margin-top:.5rem;">
                <a href=${this.#safeUrl(this.sitio)} target="_blank" rel="noopener noreferrer">Sitio oficial</a>
                <span aria-hidden="true"> · </span>
                <a href=${this.#safeUrl(this.biblioteca)} target="_blank" rel="noopener noreferrer">Biblioteca</a>
              </div>

              ${Array.isArray(this.redes) && this.redes.length ? html`
                <nav class="socials" aria-label="Redes sociales">
                  <span class="socials-label">Redes:</span>
                  ${this.redes.map((r, i) => html`
                    <a class="social-btn"
                       href=${this.#safeUrl(r.url)}
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label=${r.nombre || 'Red social'}
                       title=${r.nombre || 'Red social'}>
                      <span class="social-name">${r.nombre || 'Red'}</span>
                      ${this.#icon(r.icono)}
                    </a>
                  `)}
                </nav>
              ` : null}
            </article>

            <!-- Información general -->
            <article class="card">
              <h3>Nuestra información</h3>
              <dl style="margin-top:.5rem;">
                <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
                  <dt style="font-weight:700;">Dirección:</dt><dd>${this.direccion}</dd>
                </div>
                <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
                  <dt style="font-weight:700;">Municipio:</dt><dd>Ayapel, Córdoba</dd>
                </div>
                <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
                  <dt style="font-weight:700;">Naturaleza:</dt><dd>Empresa Social del Estado (E.S.E.)</dd>
                </div>
              </dl>

              <h3 style="font-size:1rem;margin-top:1rem;">Trámites destacados</h3>
              <ul class="list">
                <li><a href="#tramites" target="_blank" rel="noopener noreferrer">Historia clínica</a></li>
                <li><a href="#pida-cita" target="_blank" rel="noopener noreferrer">Pedir una cita</a></li>
                <li><a href="#mapa-de-procesos" target="_blank" rel="noopener noreferrer">Mapa de procesos</a></li>
              </ul>
            </article>
          </div>

          <!-- Accesos rápidos -->
          <div class="quick-grid" role="navigation" aria-label="Accesos rápidos">
            <a class="quick" href="#servicios" aria-label="Llamar a Urgencias 24/7">Urgencias 24/7</a>
            <a class="quick" href="#pida-cita" target="_blank" rel="noopener noreferrer">Pedir cita</a>
            ${this.#mapsHref
              ? html`<a class="quick" href=${this.#mapsHref} target="_blank" rel="noopener noreferrer">Cómo llegar</a>`
              : html`<span class="quick" aria-disabled="true" title="Mapa no disponible">Cómo llegar</span>`
            }
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('bloque-informacion', BloqueInformacion);
