import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class BloqueInformacion extends LitElement {
  static properties = {
    nombre: { type: String },
    telefono1: { type: String },
    telefono2: { type: String },
    direccion: { type: String },
    correo: { type: String },
    sitio: { type: String },
    biblioteca: { type: String },
  };

  constructor(){
    super();
    this.nombre    = 'E.S.E. Hospital San Jorge de Ayapel';
    this.telefono1 = '770 5150';
    this.telefono2 = '770 5004';
    this.direccion = 'Cl. 6 # 19–21 (Cl 6 Dg19-21), Ayapel, Córdoba';
    this.correo    = 'esesanjorgeayapel@gmail.com';
    this.sitio     = 'https://hospitalsanjorgeayapel.com/';
    this.biblioteca= 'https://hospitalsanjorgeayapel.info/';
  }

  static styles = css`
    :host{
      --azul-50: #e0f2fe;
      --azul-100:#bae6fd;
      --azul-600:#0284c7;
      --azul-700:#0369a1;
      --borde:#d6f0fa;
      --texto:#0f172a;
      --texto-suave:#475569;
      color: var(--texto);
      display:block;
      font: 400 16px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji";
    }

    .container{
      max-width: 1120px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .ribbon{
      height:.4rem; width:7rem; margin:0 auto;
      border-radius:9999px;
      background:linear-gradient(90deg,#38bdf8,#06b6d4,#3b82f6);
    }

    .wrap{
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 20px;
      border: 1px solid var(--borde);
      background: #ffffffcc;
      box-shadow: 0 8px 24px rgba(2,8,20,.06);
      backdrop-filter: blur(4px);
    }

    .grid{
      display: grid;
      gap: 1rem;
    }
    @media (min-width: 768px){
      .grid{ grid-template-columns: repeat(3, 1fr); }
    }

    .card{
      border-radius: 16px;
      border: 1px solid var(--borde);
      background: #fff;
      padding: 1rem;
      box-shadow: 0 6px 18px rgba(2,8,20,.05);
      transition: transform .12s ease, box-shadow .12s ease;
    }
    .card:hover{
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(2,8,20,.08);
    }

    h3{
      margin:0;
      font-weight: 700;
      font-size: 1.125rem;
      color: var(--texto);
    }
    p, li, dd, dt { color: var(--texto-suave); }

    .pill{
      margin-top: .75rem;
      display: inline-block;
      padding: .5rem 1rem;
      border-radius: 9999px;
      border: 1px solid var(--azul-100);
      background: var(--azul-50);
      color: var(--azul-700);
      font-weight: 600;
      text-align: center;
    }

    .links a{
      color: var(--azul-700);
      text-decoration: none;
      border-bottom: 1px solid transparent;
    }
    .links a:hover{ border-bottom-color: var(--azul-700); }

    .list{
      margin: .5rem 0 0 0;
      padding-left: 1.25rem;
    }

    /* Accesos rápidos */
    .quick-grid{
      display:grid; gap:.75rem; margin-top: 1rem;
      grid-template-columns: 1fr;
    }
    @media (min-width: 768px){
      .quick-grid{ grid-template-columns: repeat(3,1fr); }
    }
    .quick{
      display:block; text-align:center;
      padding: .9rem 1rem;
      border-radius:12px;
      border:1px solid var(--borde);
      background: #f9fbff;
      color: var(--texto);
      text-decoration: none;
      transition: box-shadow .12s ease, transform .12s ease;
    }
    .quick:hover{ box-shadow:0 8px 20px rgba(2,8,20,.06); transform: translateY(-1px); }

    /* A11y */
    a:focus-visible, button:focus-visible{
      outline: 3px solid var(--azul-600);
      outline-offset: 2px;
      border-radius: 6px;
    }
    @media (prefers-reduced-motion: reduce){
      .card, .quick{ transition: none !important; }
    }
  `;

  #tel(t){ return `+57${(t||'').replace(/\D/g,'')}`; }

  render(){
    return html`
      <section class="container" aria-labelledby="info-title">
        <div class="ribbon" aria-hidden="true"></div>

        <div class="wrap">
          <div class="grid">
            <!-- Presentación -->
            <article class="card">
              <h3 id="info-title">${this.nombre}</h3>
              <p class="mt-2">
                Empresa Social del Estado que presta servicios de salud de baja y mediana complejidad.
                Priorizamos la seguridad del paciente, la confianza y la calidez humana.
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
                <a href="${this.sitio}" target="_blank" rel="noopener">Sitio oficial</a>
                <span aria-hidden="true"> · </span>
                <a href="${this.biblioteca}" target="_blank" rel="noopener">Biblioteca</a>
              </div>
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
                <li><a href="${this.sitio}historia-cl%C3%ADnica" target="_blank" rel="noopener">Historia clínica</a></li>
                <li><a href="${this.sitio}pida-una-cita" target="_blank" rel="noopener">Pedir una cita</a></li>
                <li><a href="${this.sitio}mapa-de-procesos" target="_blank" rel="noopener">Mapa de procesos</a></li>
              </ul>
            </article>
          </div>

          <!-- Accesos rápidos -->
          <div class="quick-grid">
            <a class="quick" href="tel:${this.#tel(this.telefono1)}">Urgencias 24/7</a>
            <a class="quick" href="${this.sitio}pida-una-cita" target="_blank" rel="noopener">Pedir cita</a>
            <a class="quick" href="https://maps.google.com/?q=${encodeURIComponent(this.direccion)}" target="_blank" rel="noopener">Cómo llegar</a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('bloque-informacion', BloqueInformacion);
