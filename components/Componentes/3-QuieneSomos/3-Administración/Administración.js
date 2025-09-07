import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class AdministracionElement extends LitElement {
  createRenderRoot(){ return this } // Light DOM → aplica Tachyons/Bulma

  // --- ICONOS (inline SVG, reemplazo de lucide) ---
  #iShield({size=20,color='currentColor'}={}){return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`}
  #iUsers({size=20,color='currentColor'}={}){return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`}
  #iClipboard({size=20,color='currentColor'}={}){return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`}
  #iBuilding({size=20,color='currentColor'}={}){return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h18M3 12h18M3 16h18"/></svg>`}

  render(){
    return html`
      <style>
        .bg-grad-hero{
          background: radial-gradient(60% 60% at 50% 0%, #e0f2fe 0%, #ffffff 60%, #ffffff 100%);
        }
        .fade-up{ opacity:0; transform: translateY(12px); animation: fadeUp .6s ease forwards; }
        .fade-up.delay-1{ animation-delay: .1s }
        @keyframes fadeUp{ to{ opacity:1; transform:none } }
        .card{ background: rgba(255,255,255,.9); border:1px solid rgba(2,132,199,.15); border-radius: 1rem; box-shadow: 0 8px 24px rgba(2,8,20,.06); }
        .ring-sky{ box-shadow: 0 0 0 1px rgba(2,132,199,.15) inset; }
        .chip{ display:inline-flex; align-items:center; border-radius:9999px; background:#0284c7; color:#fff; font-weight:600; padding:.2rem .6rem; font-size:.75rem; box-shadow:0 4px 10px rgba(2,132,199,.25);}
        .grad-line{ height:.25rem; width:5rem; border-radius:9999px; background:linear-gradient(90deg,#38bdf8,#1d4ed8); }
      </style>

      <div class="min-vh-100 bg-near-white dark-gray">
        <!-- Hero -->
        <section class="relative overflow-hidden bg-grad-hero">
          <div class="mw8 center ph3 ph4-ns pv4 pv5-ns">
            <div class="flex flex-column flex-row-l items-start-l gap3-l">
              <div class="w-100 w-60-l fade-up">
                <span class="chip">Institucional</span>
                <h1 class="mt3 f2 f1-ns fw7 near-black lh-title">
                  Mapa Conceptual Institucional – ESE HSJA
                </h1>
                <p class="mt2 mid-gray measure">
                  Presentación ejecutiva del marco institucional, programas prioritarios y estructura organizacional para la gestión hospitalaria.
                </p>
              </div>

              <div class="w-100 w-40-l fade-up delay-1">
                <div class="card pa3 pa4-ns">
                  <h3 class="f5 fw6 dark-gray mb3">Ficha documental</h3>
                  <div class="grid">
                    <div class="cf">
                      <div class="fl w-100 w-50-m w-50-l pr2">
                        <span class="db silver f6">Planeación – MIPG – SGC</span>
                        <span class="db fw6 dark-gray">Código: PT-AD-PL-007</span>
                      </div>
                      <div class="fl w-100 w-50-m w-50-l pl2">
                        <span class="db silver f6">Versión</span>
                        <span class="db fw6 dark-gray">V.1</span>
                      </div>
                    </div>
                    <div class="cf mt2">
                      <div class="fl w-100 w-50-m w-50-l pr2">
                        <span class="db silver f6">Página</span>
                        <span class="db fw6 dark-gray">2 de 3</span>
                      </div>
                      <div class="fl w-100 w-50-m w-50-l pl2">
                        <span class="db silver f6">Fecha de emisión</span>
                        <span class="db fw6 dark-gray">18-08-2025</span>
                      </div>
                    </div>
                    <div class="mt2">
                      <span class="db silver f6">Título</span>
                      <span class="db fw6 dark-gray">Anexo Junta Directiva – Directivos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </section>

        <!-- Mapa Conceptual -->
        <section class="mw8 center ph3 ph4-ns pb4 pb5-ns">
          <div class="card pa3 pa4-ns fade-up">
            <figure class="br3 overflow-hidden ring-sky">
              <img src="https://hospitalsanjorgeayapel.info/LectorPdf/Img/mapa.png"
                   alt="Mapa conceptual de la ESE HSJA"
                   class="w-100 h-auto bg-near-white"/>
            </figure>
            <p class="tc f7 silver mt2">
              Mapa conceptual institucional (versión vigente). Clic derecho para abrir en nueva pestaña y ver en tamaño completo.
            </p>
          </div>
        </section>

        <!-- Junta Directiva / Programas -->
        <section class="mw8 center ph3 ph4-ns pb4 pb5-ns">
          <div class="cf">
            <!-- Junta Directiva -->
            <div class="fl w-100 w-two-thirds-l pr0 pr3-l">
              <div class="card pa3 pa4-ns mb3 fade-up">
                <div class="flex items-center gap2 mb2">
                  <span class="blue">${this.#iShield({size:20, color:'#0284c7'})}</span>
                  <h2 class="f4 fw6 dark-gray ma0">Junta Directiva</h2>
                </div>
                <p class="mid-gray lh-copy">
                  El actual Señor Gobernador, <strong>Doctor Erasmo Elías Zuleta Bechara</strong>, y el Alcalde, <strong>doctor Hugo Armando Pinedo Contreras</strong>, establecieron programas y objetivos transversales e intersectoriales por 5 ejes: Córdoba equitativa e incluyente, Córdoba primera en competitividad, Córdoba más sostenible, Córdoba segura en paz y con justicia, y Alianzas y fortalecimiento institucional.
                </p>
                <ul class="mt2 pl3">
                  <li class="mid-gray lh-copy">Mejorar el acceso a programas de salud y ampliar la atención en todo el municipio.</li>
                  <li class="mid-gray lh-copy">Garantizar derecho a vivir libre de enfermedades transmisibles y reducir riesgos.</li>
                  <li class="mid-gray lh-copy">Fortalecer institucionalmente la red hospitalaria.</li>
                </ul>
              </div>
            </div>

            <!-- Aside: Programas / Subprogramas -->
            <aside class="fl w-100 w-third-l mt3 mt0-l">
              <div class="card pa3 pa4-ns mb3 fade-up">
                <div class="flex items-center gap2">
                  <span class="blue">${this.#iUsers({size:18, color:'#0284c7'})}</span>
                  <h3 class="f5 fw6 dark-gray ma0">Programas Generales</h3>
                </div>
                <ul class="mt2 pl3 f6 mid-gray">
                  <li>Cambio por la salud</li>
                  <li>Cambio por la alimentación</li>
                </ul>
              </div>

              <div class="card pa3 pa4-ns fade-up">
                <div class="flex items-center gap2">
                  <span class="blue">${this.#iClipboard({size:18, color:'#0284c7'})}</span>
                  <h3 class="f5 fw6 dark-gray ma0">Subprogramas</h3>
                </div>
                <ul class="mt2 pl3 f6 mid-gray">
                  <li>Aseguramiento por la vida</li>
                  <li>Médico en tu casa</li>
                  <li>Red pública hospitalaria para el cambio</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <!-- Footer -->
        <footer class="bt b--black-10 bg-white">
          <div class="mw8 center ph3 ph4-ns pv3 tc silver f7">
            ESE Hospital San Jorge de Ayapel • Documento de divulgación institucional
          </div>
        </footer>
      </div>
    `;
  }
}

customElements.define('administracion-element', AdministracionElement);
