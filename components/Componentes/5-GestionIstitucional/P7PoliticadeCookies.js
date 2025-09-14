import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import '../herramienta/dictador.js'; // ✅ agregado

export class Pol extends LitElement {
  createRenderRoot(){ return this; } // Light DOM para Tachyons

  static properties = { q: { type: String } };

  constructor(){
    super();
    this.q = '';
  }

  #onSearch = (e) => {
    this.q = (e.target.value || '').trim();
    this.requestUpdate();
  };

  // Resaltado simple usando <mark>
  #highlight(text){
    if (!this.q) return text;
    try{
      const re = new RegExp(`(${this.q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(re, '<mark>$1</mark>');
    } catch {
      return text;
    }
  }

  render(){
    // ===== CONTENIDO LIMPIO Y ESTRUCTURADO =====
    const contenido = {
      titulo: 'Política de Uso de Cookies',
      desc: 'Describe los mecanismos que el sitio web del HSJA utiliza con cookies para mejorar la experiencia de navegación, asegurando el respeto de la privacidad.',
      intro: 'En www.hospitalsanjorgeayapel.com se utilizan cookies para facilitar la relación de los usuarios con nuestro portal relacionado a servicios médicos, información institucional, noticias, fotografías, videos y demás formatos web alojados en el sitio web, con el propósito de permitir mejorar la experiencia del usuario y elaborar estrategias de comunicación que respondan a sus intereses.',
      q1_t: '¿Qué son las cookies?',
      q1_p1: 'Son archivos de información que se almacenan en el navegador del usuario al visitar un sitio web. Permiten recordar el comportamiento del visitante.',
      q1_p2: 'Esta información no da acceso a datos personales ni a la información almacenada en el dispositivo; permite identificar que un usuario visitó un portal y qué tipo de interacción tuvo, para mejorar la experiencia de navegación.',
      q2_t: '¿Qué cookies se usan en www.hospitalsanjorgeayapel.com?',
      q2_p: 'En el Hospital San Jorge de Ayapel se usan cookies esenciales, técnicas, de personalización, de análisis y publicitarias. A continuación se realiza una breve explicación de cada una.',
      tipos: [
        { h: 'Cookies esenciales', p: 'Permiten un acceso más rápido y seguro a contenidos seleccionados y optimizan el rendimiento del portal.' },
        { h: 'Cookies técnicas', p: 'Mejoran la navegación: identificar sesión, solicitar citas/servicios, diligenciar formularios, participar en eventos, usar elementos de seguridad, almacenar y compartir contenidos.' },
        { h: 'Cookies de personalización', p: 'Adaptan la experiencia según idioma, navegador, servicios consultados, ubicación, tiempo de permanencia, entre otros.' },
        { h: 'Cookies de análisis', p: 'Permiten cuantificar usuarios y medir/analizar el uso del servicio para fines estadísticos.' },
        { h: 'Cookies publicitarias', p: 'Gestionan espacios publicitarios y muestran anuncios relacionados con el perfil de navegación.' }
      ],
      q3_t: 'Propósito y razón de ser',
      q3_p: 'Informar a los usuarios del sitio web institucional sobre el uso de cookies y su finalidad, garantizando transparencia y respeto a la privacidad digital.',
      q4_t: 'Alcance',
      q4_p: 'Aplica a todos los visitantes del portal web institucional del HSJ y a los administradores de los sistemas informáticos que gestionan las cookies.',
      q5_t: 'Condiciones y restricciones',
      q5_list: [
        'Se podrán usar cookies para mejorar la navegación y personalizar la experiencia.',
        'No se recolectará información personal sensible mediante cookies.',
        'El usuario podrá aceptar, rechazar o eliminar las cookies desde su navegador.'
      ],
      q6_t: 'Procedimientos de implementación',
      q6_list: [
        'Publicación de un aviso visible en la web sobre el uso de cookies.',
        'Opción para que el usuario configure sus preferencias de cookies.',
        'Registro y monitoreo del uso de cookies técnicas, de análisis y de personalización.',
        'Actualización de la política conforme a cambios tecnológicos o normativos.'
      ],
      q7_t: 'Definiciones',
      q7_list: [
        'Cookie: Archivo pequeño que se almacena en el dispositivo del usuario al navegar en el sitio web.',
        'Cookies técnicas: Permiten el funcionamiento básico del sitio.',
        'Cookies de análisis: Permiten conocer hábitos de navegación.',
        'Cookies de personalización: Adaptan la navegación según preferencias del usuario.'
      ],
      q8_t: 'Normatividad aplicable',
      q8_list: [
        'Ley 1581 de 2012 – Protección de Datos Personales.',
        'Decreto 1377 de 2013 – Reglamentación de la Ley 1581.',
        'Directrices de la SIC sobre uso de cookies (2013 y posteriores).',
        'Reglamento General de Protección de Datos de la Unión Europea (GDPR) como estándar de referencia.'
      ],
      enlaces: [
        { label: 'Configuración de cookies en Chrome', url: 'https://support.google.com/chrome/answer/95647?hl=es' },
        { label: 'Configuración de cookies en Firefox', url: 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias' },
        { label: 'Configuración de cookies en Edge', url: 'https://support.microsoft.com/es-es/microsoft-edge/ver-borrar-y-administrar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' }
      ]
    };

    return html`
      <style>
        /* Estilos locales (prefijados) manteniendo estética hospitalaria; Tachyons puede coexistir */
        .ckx { --ckx-accent:#2b7bbb; --ckx-accent-weak:#e6f1fb; --ckx-text:#0f172a; --ckx-muted:#475569; background:#fff; color:var(--ckx-text); }
        .ckx-title { line-height:1.15; letter-spacing:-.01em; }
        .ckx-sub { color:var(--ckx-muted); }
        .ckx-card { background:#fff; border:1px solid rgba(43,123,187,.18); border-radius:1rem; box-shadow:0 6px 24px rgba(43,123,187,.08); }
        .ckx-chip { background:var(--ckx-accent-weak); color:var(--ckx-accent); border:1px solid rgba(43,123,187,.25); }
        .ckx-link { color:var(--ckx-accent); text-decoration:underline; } .ckx-link:hover{ text-decoration:none; }
        mark { background:#fff2a8; padding:0 .15em; }
      </style>

      <!-- ✅ envuelto en dictador-tts -->
      <dictador-tts ui lang="es-CO" rate="0.95" pitch="1" volume="1">
        <section class="ckx w-100">
          <div class="mw8 center ph3 ph4-m ph5-l pv4 pv5-l">
            <!-- Encabezado -->
            <header class="tc">
              <div class="ckx-chip dib br-pill ph3 pv1 fw6 f6 mb3">Privacidad y Cookies</div>
              <h1 class="ckx-title f2 f1-ns fw7 mv2">${contenido.titulo}</h1>
              <p class="ckx-sub f5 f4-ns mt0">${contenido.desc}</p>

              <!-- Acciones -->
              <div class="mt3 flex items-center justify-center flex-wrap">
                <button class="ba b--black-20 br2 bg-white ph3 pv2 mh2 mb2 pointer"
                        @click=${() => navigator.share?.({ title: contenido.titulo, text: contenido.desc, url: location.href })}>
                  Compartir
                </button>
                <label class="mb2 mh2 flex items-center">
                  <span class="mr2">Buscar</span>
                  <input type="search" class="input-reset ba b--black-20 br2 ph2 pv1"
                         placeholder="Escribe para resaltar…" @input=${this.#onSearch}>
                </label>
              </div>

              <!-- Índice -->
              <nav class="mt3">
                <a href="#intro" class="ckx-link mh2">Introducción</a>
                <a href="#q1" class="ckx-link mh2">Qué son</a>
                <a href="#q2" class="ckx-link mh2">Tipos</a>
                <a href="#q3" class="ckx-link mh2">Propósito</a>
                <a href="#q4" class="ckx-link mh2">Alcance</a>
                <a href="#q5" class="ckx-link mh2">Condiciones</a>
                <a href="#q6" class="ckx-link mh2">Procedimientos</a>
                <a href="#q7" class="ckx-link mh2">Definiciones</a>
                <a href="#q8" class="ckx-link mh2">Normatividad</a>
              </nav>
            </header>

            <!-- Intro -->
            <article id="intro" class="ckx-card pa3 pa4-ns mt4">
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.intro)}></p>
            </article>

            <!-- ¿Qué son? -->
            <article id="q1" class="ckx-card pa3 pa4-ns mt3">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q1_t}</h2>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q1_p1)}></p>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q1_p2)}></p>
            </article>

            <!-- Tipos -->
            <article id="q2" class="ckx-card pa3 pa4-ns mt3">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q2_t}</h2>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q2_p)}></p>
              <div class="mt3 flex flex-wrap nl2 nr2">
                ${contenido.tipos.map((t) => html`
                  <section class="w-100 w-50-m pa2">
                    <div class="ckx-card pa3 h-100">
                      <h3 class="f5 fw7 mt0 mb2">${t.h}</h3>
                      <p class="lh-copy f6 f5-ns" .innerHTML=${this.#highlight(t.p)}></p>
                    </div>
                  </section>
                `)}
              </div>
            </article>

            <!-- Propósito -->
            <article id="q3" class="ckx-card pa3 pa4-ns mt3">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q3_t}</h2>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q3_p)}></p>
            </article>

            <!-- Alcance -->
            <article id="q4" class="ckx-card pa3 pa4-ns mt3">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q4_t}</h2>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q4_p)}></p>
            </article>

            <!-- Condiciones -->
            <article id="q5" class="ckx-card pa3 pa4-ns mt3">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q5_t}</h2>
              <ul class="pl3">
                ${contenido.q5_list.map(i => html`<li class="lh-copy f5 mb2" .innerHTML=${this.#highlight(i)}></li>`)}
              </ul>
            </article>

            <!-- Procedimientos -->
            <article id="q6" class="ckx-card pa3 pa4-ns mt3">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q6_t}</h2>
              <ul class="pl3">
                ${contenido.q6_list.map(i => html`<li class="lh-copy f5 mb2" .innerHTML=${this.#highlight(i)}></li>`)}
              </ul>
            </article>

            <!-- Definiciones -->
            <article id="q7" class="ckx-card pa3 pa4-ns mt3">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q7_t}</h2>
              <ul class="pl3">
                ${contenido.q7_list.map(i => html`<li class="lh-copy f5 mb2" .innerHTML=${this.#highlight(i)}></li>`)}
              </ul>
            </article>

            <!-- Normatividad -->
            <article id="q8" class="ckx-card pa3 pa4-ns mt3">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q8_t}</h2>
              <ul class="pl3">
                ${contenido.q8_list.map(i => html`<li class="lh-copy f5 mb2" .innerHTML=${this.#highlight(i)}></li>`)}
              </ul>

              <!-- Enlaces útiles -->
              <h3 class="f5 fw7 mt3">Configurar cookies en su navegador</h3>
              <ul class="pl3">
                ${contenido.enlaces.map(e => html`
                  <li class="mb2">
                    <a class="ckx-link" target="_blank" rel="noopener noreferrer" href=${e.url}>${e.label}</a>
                  </li>
                `)}
              </ul>
            </article>
          </div>
        </section>
      </dictador-tts>
    `;
  }
}

customElements.define('politica-cookies', Pol);
