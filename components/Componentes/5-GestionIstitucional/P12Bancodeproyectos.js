import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

/**
 * <bancodeproyectos-view>
 * — Rehecho como componente Lit + Tachyons (fondo blanco, azules amables, animación elegante)
 * — Mantiene la integridad EXACTA del texto.
 * — Sin dependencias externas (Chart.js/Framer) para el gráfico: se usa SVG donut accesible.
 *
 * Requisito: cargar Tachyons en la página contenedora
 * <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css">
 */
export class Bancodeproyectos extends LitElement {
  createRenderRoot() { return this; } // Light DOM → Tachyons aplica globalmente

  render() {
    return html`
      ${this.#styles()}
      <section class="w-100 bg-white">
        <!-- Encabezado con animación suave -->
        <header class="bp-banner w-100 pv4 pv5-ns ph3 ph4-ns animate-fade-in tc">
          <h1 class="bp-title f2 f1-ns fw7 ma0">Banco de Proyectos de Inversión</h1>
          <h2 class="white-90 f4 f3-ns fw6 mt2 mb0">E.S.E. Hospital San Jorge de Ayapel</h2>
          <p class="white-80 f6 f5-ns mt3 mb0">Fortaleciendo la infraestructura y los servicios de salud de nuestra comunidad.</p>
        </header>

        <main class="w-100 ph3 ph5-ns pv4">
          <!-- Cuadro principal -->
          <section class="bp-card w-100 pa3 pa4-ns center tc animate-slide-up">
            <p class="bp-subtitle f4 fw6 dark-blue mt0 mb2"> 
              <span class="bp-kpi f-headline-ns f1 fw7 animate-pulse">4</span> Proyectos Estratégicos
            </p>
            <p class="mid-gray">Claves para mejorar la atención y cobertura en salud.</p>
          </section>

          <!-- Proyectos (grid a 2/4 col) -->
          <section class="w-100 mt4">
            <div class="bp-grid">
              <div class="bp-item">
                <div class="f3">🚑</div>
                <h3 class="bp-h3 mt2">Ambulancia TAB</h3>
                <p class="mid-gray f6 mt1">Adquisición de ambulancia básica para mejorar la respuesta en emergencias.</p>
                <span class="bp-chip bg-lightest-blue dark-blue">En trámite</span>
              </div>
              <div class="bp-item">
                <div class="f3">🩺</div>
                <h3 class="bp-h3 mt2">Equipos Biomédicos</h3>
                <p class="mid-gray f6 mt1">Dotación de equipos de diagnóstico, incluye Rayos X de última generación.</p>
                <span class="bp-chip bg-light-gray gray">Proyectado</span>
              </div>
              <div class="bp-item">
                <div class="f3">🏗️</div>
                <h3 class="bp-h3 mt2">Adecuaciones Menores</h3>
                <p class="mid-gray f6 mt1">Mejoras físicas en áreas de atención y espacios laborales.</p>
                <span class="bp-chip bg-light-gray gray">Proyectado</span>
              </div>
              <div class="bp-item">
                <div class="f3">🏥</div>
                <h3 class="bp-h3 mt2">Puestos de Salud</h3>
                <p class="mid-gray f6 mt1">Construcción de centros en Sincelejito y barrio San Jerónimo.</p>
                <span class="bp-chip bg-light-gray gray">Proyectado</span>
              </div>
            </div>
          </section>

          <!-- Gráfico (donut SVG accesible) -->
          <section class="bp-card w-100 pa3 pa4-ns center mt4 animate-slide-up">
            <h3 class="tc dark-blue f4 fw7 mt0 mb3">Foco de la Inversión</h3>
            <p class="tc mid-gray mb4">La prioridad está en ampliar la infraestructura de salud.</p>
            <div class="flex items-center justify-center">
              <figure class="ma0 tc">
                <svg width="240" height="240" viewBox="0 0 120 120" role="img" aria-label="Distribución de inversión: Infraestructura 60%, Equipamiento 20%, Movilidad 20%" class="db center">
                  <!-- Fondo -->
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#eef6ff" stroke-width="14" />
                  <!-- Usamos pathLength=100 para trabajar con porcentajes -->
                  <!-- Infraestructura 60% -->
                  <g transform="rotate(-90 60 60)">
                    <circle class="donut seg1" cx="60" cy="60" r="50" fill="none" stroke="#00429d" stroke-width="14" pathLength="100" stroke-dasharray="60 40" stroke-dashoffset="0" />
                    <!-- Equipamiento 20% (offset -60) -->
                    <circle class="donut seg2" cx="60" cy="60" r="50" fill="none" stroke="#3e67ae" stroke-width="14" pathLength="100" stroke-dasharray="20 80" stroke-dashoffset="-60" />
                    <!-- Movilidad 20% (offset -80) -->
                    <circle class="donut seg3" cx="60" cy="60" r="50" fill="none" stroke="#618dbe" stroke-width="14" pathLength="100" stroke-dasharray="20 80" stroke-dashoffset="-80" />
                  </g>
                  <!-- Centro blanco -->
                  <circle cx="60" cy="60" r="36" fill="#ffffff" />
                  <text x="60" y="60" text-anchor="middle" dominant-baseline="central" class="dark-blue" style="font: 700 12px/1 Inter, system-ui, sans-serif;">60% Infraestructura</text>
                </svg>
                <figcaption class="mt3 f6 mid-gray">Distribución: 3 Infraestructura • 1 Equipamiento • 1 Movilidad</figcaption>
              </figure>
            </div>
            <div class="tc mt3">
              <span class="legend dib mh2"><i class="legend-dot" style="background:#00429d"></i> Infraestructura</span>
              <span class="legend dib mh2"><i class="legend-dot" style="background:#3e67ae"></i> Equipamiento</span>
              <span class="legend dib mh2"><i class="legend-dot" style="background:#618dbe"></i> Movilidad</span>
            </div>
          </section>

          <!-- Fases del proyecto -->
          <section class="bp-card w-100 pa3 pa4-ns center mt4 animate-slide-up">
            <h3 class="tc dark-blue f4 fw7 mt0 mb4">Fases del Proyecto</h3>
            <div class="flex flex-column flex-row-ns items-center justify-center gap3-ns">
              <div class="bp-phase bg-bp1">Propuesta</div>
              <div class="bp-arrow">➔</div>
              <div class="bp-phase bg-bp2">Radicación</div>
              <div class="bp-arrow">➔</div>
              <div class="bp-phase bg-bp3">Aprobación</div>
              <div class="bp-arrow">➔</div>
              <div class="bp-phase bg-bp4">Ejecución</div>
            </div>
          </section>

          <!-- Footer -->
          <footer class="tc mt5 mid-gray">
            <p class="ma0">HSJA - Comprometidos con la salud de nuestra gente.</p>
          </footer>
        </main>
      </section>
    `;
  }

  #styles() {
    return html`<style>
      /* Paleta hospitalaria (azules + blanco) */
      :root{
        --bp-azul-900:#002a6b; --bp-azul-800:#0f3a6b; --bp-azul-700:#144f9b; --bp-azul-600:#1b5fbf;
        --bp-azul-500:#1f7ae0; --bp-azul-400:#3e67ae; --bp-azul-300:#618dbe; --bp-azul-200:#b1deee; --bp-azul-100:#eef6ff; --bp-blanco:#ffffff;
      }
      .bg-white{ background: var(--bp-blanco); }

      /* Banner con gradiente y brillo sutil */
      .bp-banner{ background: linear-gradient(90deg, var(--bp-azul-700), var(--bp-azul-500)); position:relative; overflow:hidden; }
      .bp-banner::after{ content:""; position:absolute; inset:0; background: radial-gradient(1100px 300px at 8% 115%, rgba(255,255,255,.10), transparent), radial-gradient(900px 240px at 92% -10%, rgba(255,255,255,.12), transparent); pointer-events:none; }
      .bp-title{ color:#fff; text-shadow:0 2px 12px rgba(0,0,0,.18); }

      /* Tarjetas */
      .bp-card{ max-width:1200px; background:var(--bp-blanco); border-radius:1rem; box-shadow:0 10px 28px rgba(20,79,155,.10); border:1px solid rgba(31,122,224,.10); }

      .dark-blue{ color: var(--bp-azul-800); }
      .bp-subtitle{ color: var(--bp-azul-800); }
      .bp-kpi{ color:#00429d; }

      /* Grid de proyectos */
      .bp-grid{ display:grid; gap:1rem; grid-template-columns:1fr; }
      @media (min-width:48em){ .bp-grid{ grid-template-columns:repeat(2,1fr); } }
      @media (min-width:75em){ .bp-grid{ grid-template-columns:repeat(4,1fr); } }
      .bp-item{ background:var(--bp-azul-100); border:1px solid rgba(31,122,224,.18); border-radius:.85rem; padding:1rem; box-shadow:0 6px 20px rgba(15,58,107,.08); transition: transform .25s ease, box-shadow .25s ease, background .25s ease; }
      .bp-item:hover{ transform:translateY(-3px); box-shadow:0 12px 32px rgba(15,58,107,.15); background:#fff; }
      .bp-h3{ color:#00429d; font-weight:700; font-size:1.1rem; }
      .bp-chip{ display:inline-block; margin-top:.5rem; padding:.35rem .6rem; border-radius:9999px; font-size:.75rem; font-weight:600; }

      /* Donut animaciones */
      .donut{ stroke-linecap: butt; transition: stroke-dashoffset .8s ease; }
      .seg1{ animation: draw1 .9s ease .1s both; }
      .seg2{ animation: draw2 1s ease .2s both; }
      .seg3{ animation: draw3 1.1s ease .25s both; }
      @keyframes draw1{ from{ stroke-dasharray:0 100; } to{ stroke-dasharray:60 40; } }
      @keyframes draw2{ from{ stroke-dasharray:0 100; } to{ stroke-dasharray:20 80; } }
      @keyframes draw3{ from{ stroke-dasharray:0 100; } to{ stroke-dasharray:20 80; } }

      .legend{ font-size:.85rem; color:#4a5568; }
      .legend-dot{ display:inline-block; width:.75rem; height:.75rem; border-radius:50%; margin-right:.35rem; vertical-align:middle; }

      /* Fases - burbujas */
      .bp-phase{ color:#fff; width:7rem; height:7rem; border-radius:9999px; display:flex; align-items:center; justify-content:center; text-align:center; padding:.5rem; font-weight:700; box-shadow:0 8px 24px rgba(0,66,157,.18); transition: transform .25s ease; margin:.5rem; }
      .bp-phase:hover{ transform:translateY(-3px); }
      .bg-bp1{ background:#00429d; } .bg-bp2{ background:#3e67ae; } .bg-bp3{ background:#618dbe; } .bg-bp4{ background:#85b4cf; }
      .bp-arrow{ margin: .5rem 0; color:#648; opacity:.6; }
      @media(min-width:48em){ .bp-arrow{ margin:0 .75rem; } }

      /* Animaciones generales */
      @keyframes fadeIn{ from{opacity:0} to{opacity:1} }
      @keyframes slideUp{ from{ transform:translateY(10px); opacity:0 } to{ transform:translateY(0); opacity:1 } }
      .animate-fade-in{ animation: fadeIn .8s ease both; }
      .animate-slide-up{ animation: slideUp .6s ease .1s both; }
    </style>`;
  }
}

customElements.define('bancodeproyectos-view', Bancodeproyectos);
