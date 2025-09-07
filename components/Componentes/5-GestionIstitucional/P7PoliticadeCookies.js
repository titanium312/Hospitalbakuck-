
  import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

  export class Pol extends LitElement {
    createRenderRoot() { return this; } // light DOM para Tachyons

    static properties = {
      // control simple de búsqueda en el texto
      q: { type: String }
    };

    constructor() {
      super();
      this.q = '';
    }

    #onSearch = (e) => {
      this.q = (e.target.value || '').trim();
      this.requestUpdate();
    };

    // resaltado básico (no altera el texto original, solo lo envuelve en <mark>)
    #highlight(text) {
      if (!this.q) return text;
      try {
        const re = new RegExp(`(${this.q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(re, '<mark>$1</mark>');
      } catch {
        return text;
      }
    }

    render() {
      // Texto original en bloques (sin modificar contenido)
      const contenido = {
        titulo: 'Política de Uso de Cookies',
        desc: 'Describe los mecanismos que el sitio web del HSJA utiliza con cookies para mejorar la experiencia de navegación, asegurando el respeto de la privacidad.',
        intro: 'En www.hospitalsanjorgeayapel.com se utilizan cookies para facilitar la relación de los usuarios con nuestro portal relacionado a servicios médicos, información institucional, noticias, fotografías, videos y demás formatos web alojados en el sitio web, con el propósito de permitir mejorar la experiencia del usuario y elaborar estrategias de comunicación que responda al detalle de los intereses.',
        q1_t: '¿Qué son las cookies?',
        q1_p1: 'Son archivos de información que se graban o almacenan en cada navegador usado por el usuario para visitar un sitio web. Estos funcionan para recordar el comportamiento del visitante en un portal.',
        q1_p2: 'Esta información no afecta procesos de privacidad como acceso a datos personales ni tampoco a la información almacenada en los dispositivos desde donde se navega, pero sí permite al sistema identificar qué determinado usuario visitó un portal y qué tipo de interacción tuvo con la finalidad de mejorar la experiencia de navegación.',
        q2_t: '¿Qué cookies se usan en www.hospitalsanjorgeayapel.com?',
        q2_p: 'En el Hospital San Jorge de Ayapel se usan cookies esenciales, técnicas, de personalización, de análisis y publicitarias. A continuación se realiza una breve explicación de cada una de ellas.',
        tipos: [
          { h: 'Cookies esenciales', p: 'Permiten a los ciudadanos un acceso más rápido y seguro a los contenidos seleccionados dentro de la página web, de esta manera se optimiza el rendimiento del portal.' },
          { h: 'Cookies técnicas', p: 'Permiten mejorar la navegación del usuario en el portal. Se vale de la comunicación de los datos asociados a los contenidos alojados en el sitio web: identificar la sesión, realizar la solicitud de citas médicas o servicios, diligenciamiento de formularios, participación en eventos médicos, uso de elementos de seguridad durante la navegación, almacenamiento de contenidos para la difusión de material informativo o compartir información desde el portal hacia canales externos tipo plataformas de redes sociales.' },
          { h: 'Cookies de personalización', p: 'Permiten identificar los gustos, intereses, comportamientos y necesidades de un usuario con relación al idioma, tipo de navegador usado, servicios médicos más consultados, ubicación de navegación, tiempo de permanencia en el portal, entre otros.' },
          { h: 'Cookies de análisis', p: 'Permiten cuantificar el número de usuarios, tipos de usuarios para realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado.' },
          { h: 'Cookies publicitarias', p: 'Son aquellas que permiten a www.hospitalsanjorgeayapel.com gestionar de la forma más eficaz posible la oferta de los espacios publicitarios que hay en la página web, adecuando el contenido del anuncio al contenido del servicio solicitado o al uso que realice de nuestra página. Para ello podemos analizar sus hábitos de navegación en Internet y podemos mostrarle publicidad relacionada con su perfil de navegación.' }
        ],
        q3_t: '¿Cómo obtiene www.hospitalsanjorgeayapel.com las cookies?',
        q3_p: 'Las cookies se crean y/o actualizan en el dispositivo del usuario de manera automática, cuando éste accede a la página web de www.hospitalsanjorgeayapel.com, lo cual permite realizar seguimiento a las cookies y por ende a la información que estas contienen u obtienen del usuario.',
        q4_t: '¿www.hospitalsanjorgeayapel.com comparte la información obtenida a través de las cookies con terceros?',
        q4_p1: 'www.hospitalsanjorgeayapel.com comparte información obtenida a través de las cookies con personas externas o terceros, con el fin exclusivo de mejorar la usabilidad y servicios de la página web al interesado. Así mismo, la información que se recibe a través de las cookies será utilizada por www.hospitalsanjorgeayapel.com y los terceros para los fines descritos en el presente documento, y cualquiera de sus actualizaciones. Cualquier destinación diferente de tal información queda prohibida para todos los intervinientes conocedores de las Cookies.',
        q4_p2: 'www.hospitalsanjorgeayapel.com y los terceros con los que contrate servicios para el uso de cookies, son los únicos que podrán acceder a la información almacenada en las cookies que se han instalado dentro del equipo del usuario. La información almacenada en las cookies no puede ser leída por otros usuarios, ni estos podrán acceder a la misma.',
        q5_t: 'Almacenamiento de la información obtenida a través de las cookies',
        q5_p: 'En www.hospitalsanjorgeayapel.com se podrá contratar terceras personas encargadas de almacenar y obtener la información a través de las cookies, o que incluyan cookies dentro de la página web; personas que podrán estar localizadas dentro de Colombia o en el exterior. Asimismo, www.hospitalsanjorgeayapel.com se podrá entregar a terceros, la información que se obtenga de las cookies para identificar usuarios, ofrecer campañas personalizadas, sin que lo anterior, implique entrega de información personal ni destinación para fines distintos a los plasmados en el presente documento.',
        q6_t: 'Autorización de cookies',
        q6_p1: 'El usuario acepta, por la utilización de la página web, el tratamiento de la información recopilada en la forma y con los fines anteriormente mencionados. Y, asimismo, reconoce estar al tanto de la posibilidad de rechazar el tratamiento de tales datos o información rechazando el uso de Cookies mediante la selección de la configuración apropiada a tal fin en su navegador. Puede ocurrir que esta opción de bloqueo de cookies en su navegador, no le permita el uso pleno de todas las funcionalidades de la página web.',
        q6_p2: 'Recuerde que usted puede permitir, bloquear o eliminar las Cookies en cualquier momento, o rechazarlas antes de su instalación configurando el programa de navegación que utiliza. Para el efecto, podrá visitar la página de ayuda de su navegador para aprender cómo gestionar las cookies en su equipo, las siguientes pueden apoyarlo en tal proceso:',
        enlaces: [
          { label: 'Chrome', url: 'https://support.google.com/chrome/bin/answer.py?hl=es&answer=95647' },
          { label: 'Explorer', url: 'https://windows.microsoft.com/es-es/windows7/how-to-manage-cookies-in-internet-explorer-9' },
          { label: 'Firefox', url: 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we' },
          { label: 'Safari', url: 'https://support.apple.com/kb/ph5042' },
          { label: 'Opera', url: 'https://help.opera.com/Windows/11.50/es-ES/cookies.html' }
        ],
        q6_p3: 'Si el usuario deshabilita la instalación o el uso de las cookies de la página web, podrá perder o afectar algunas funcionalidades de la misma, como, por ejemplo: acceso a servicios médicos en línea, publicación de comentarios, acceso a contenido sin restricción, y rapidez en el uso de algún servicio dentro de los portales.',
        cierre1: 'La presente Política contiene la información necesaria que debe conocer todo usuario de la página web sobre el uso de las cookies que realiza www.hospitalsanjorgeayapel.com o los terceros que este contrate. www.hospitalsanjorgeayapel.com podrá modificar la presente política de cookies en cualquier momento y sin previo aviso para mantenerlos vigentes y actualizados; por lo anterior, recomendamos revisar la fecha de elaboración o actualización.',
        cierre2: 'Al navegar en el portal www.hospitalsanjorgeayapel.com, se acepta el consentimiento del uso de las cookies que nos permitan obtener más información acerca de sus preferencias y personalizar el portal del Hospital San Jorge de Ayapel conforme a los intereses individuales.',
        cierre3: 'En caso de dudas o inquietudes adicionales acerca del uso de cookies en el portal del Hospital San Jorge de Ayapel por favor ingrese al Formulario de PQRSD.',
      };

      return html`
        <style>
          /* Fondo SIEMPRE blanco con estética hospitalaria (azules claros) */
          .ckx {
            --ckx-accent: #2b7bbb;
            --ckx-accent-weak: #e6f1fb;
            --ckx-text: #0f172a;
            --ckx-muted: #475569;
            background: #ffffff; /* fondo blanco */
            color: var(--ckx-text);
          }
          .ckx-title { line-height: 1.15; letter-spacing: -.01em; }
          .ckx-sub { color: var(--ckx-muted); }

          .ckx-card {
            background: #fff;
            border: 1px solid rgba(43,123,187,.18);
            border-radius: 1rem;
            box-shadow: 0 6px 24px rgba(43,123,187,.08);
            transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          }
          .ckx-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(43,123,187,.14); }

          .ckx-chip {
            background: var(--ckx-accent-weak);
            color: var(--ckx-accent);
            border: 1px solid rgba(43,123,187,.25);
          }

          .ckx-link { color: var(--ckx-accent); text-decoration: underline; }
          .ckx-link:hover { text-decoration: none; }

          @keyframes fadeUp { from{opacity:0; transform:translateY(6px)} to{opacity:1; transform:none} }
          .ckx-anim { animation: fadeUp .35s ease both; }
          .ckx-anim:nth-child(2) { animation-delay: .05s }
          .ckx-anim:nth-child(3) { animation-delay: .1s }

          mark { background: #fff2a8; padding: 0 .15em; }

          @media (prefers-color-scheme: dark) {
            /* Mantener blanco aunque el sistema esté en dark */
            .ckx { background: #ffffff; color: var(--ckx-text); }
            .ckx-card { background: #fff; border-color: rgba(43,123,187,.18); }
          }
        </style>

        <section class="ckx w-100">
          <div class="mw8 center ph3 ph4-m ph5-l pv4 pv5-l">
            <!-- Encabezado -->
            <header class="tc ckx-anim">
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

              <!-- Navegación interna -->
              <nav class="mt3">
                <a href="#intro" class="ckx-link mh2">Introducción</a>
                <a href="#q1" class="ckx-link mh2">¿Qué son las cookies?</a>
                <a href="#q2" class="ckx-link mh2">Tipos de cookies</a>
                <a href="#q3" class="ckx-link mh2">Obtención</a>
                <a href="#q4" class="ckx-link mh2">Terceros</a>
                <a href="#q5" class="ckx-link mh2">Almacenamiento</a>
                <a href="#q6" class="ckx-link mh2">Autorización</a>
              </nav>
            </header>

            <!-- Intro -->
            <article id="intro" class="ckx-card pa3 pa4-ns mt4 ckx-anim">
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.intro)}></p>
            </article>

            <!-- ¿Qué son las cookies? -->
            <article id="q1" class="ckx-card pa3 pa4-ns mt3 ckx-anim">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q1_t}</h2>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q1_p1)}></p>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q1_p2)}></p>
            </article>

            <!-- ¿Qué cookies se usan...? -->
            <article id="q2" class="ckx-card pa3 pa4-ns mt3 ckx-anim">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q2_t}</h2>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q2_p)}></p>

              <!-- Tarjetas por tipo -->
              <div class="mt3 flex flex-wrap nl2 nr2">
                ${contenido.tipos.map((t, i) => html`
                  <section class="w-100 w-50-m pa2">
                    <div class="ckx-card pa3 h-100" style="animation-delay:${i*35}ms">
                      <h3 class="f5 fw7 mt0 mb2">${t.h}</h3>
                      <p class="lh-copy f6 f5-ns" .innerHTML=${this.#highlight(t.p)}></p>
                    </div>
                  </section>
                `)}
              </div>
            </article>

            <!-- ¿Cómo obtiene...? -->
            <article id="q3" class="ckx-card pa3 pa4-ns mt3 ckx-anim">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q3_t}</h2>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q3_p)}></p>
            </article>

            <!-- ¿Comparte con terceros? -->
            <article id="q4" class="ckx-card pa3 pa4-ns mt3 ckx-anim">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q4_t}</h2>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q4_p1)}></p>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q4_p2)}></p>
            </article>

            <!-- Almacenamiento -->
            <article id="q5" class="ckx-card pa3 pa4-ns mt3 ckx-anim">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q5_t}</h2>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q5_p)}></p>
            </article>

            <!-- Autorización y enlaces -->
            <article id="q6" class="ckx-card pa3 pa4-ns mt3 ckx-anim">
              <h2 class="f4 fw7 mt0 mb2">${contenido.q6_t}</h2>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q6_p1)}></p>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q6_p2)}></p>
              <ul class="mt2 pl3">
                ${contenido.enlaces.map(e => html`
                  <li class="mb2">
                    <a class="ckx-link" target="_blank" rel="noopener noreferrer" href=${e.url}>${e.label}: ${e.url}</a>
                  </li>
                `)}
              </ul>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.q6_p3)}></p>
            </article>

            <!-- Cierre -->
            <article class="ckx-card pa3 pa4-ns mt3 ckx-anim">
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.cierre1)}></p>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.cierre2)}></p>
              <p class="lh-copy f5" .innerHTML=${this.#highlight(contenido.cierre3)}></p>
            </article>
          </div>
        </section>
      `;
    }
  }

  customElements.define('politica-cookies', Pol);
