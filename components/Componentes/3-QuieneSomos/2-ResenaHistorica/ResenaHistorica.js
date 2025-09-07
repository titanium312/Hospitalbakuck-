import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class ResenaHistorica extends LitElement {
  static properties = {
    currentStory: { type: Number },
    isVisible: { type: Boolean },
  };

  constructor() {
    super();
    this.currentStory = 0;
    this.isVisible = false;

    // Historias de la línea de tiempo
    this.timelineStories = [
      {
        year: '1950s',
        title: 'Los Primeros Pasos',
        description: 'Un sueño se hace realidad en el corazón de Córdoba',
        content:
          'En medio de las dificultades geográficas del sur de Córdoba, nace la visión de crear un centro de salud que sirva a toda la comunidad ayapelense.',
        color: 'linear-gradient(90deg,#60a5fa,#2563eb)',
        icon: this.#iconBuilding,
      },
      {
        year: '1960s-70s',
        title: 'Crecimiento y Dedicación',
        description: 'Atendiendo urgencias, partos y esperanzas',
        content:
          'Cada día, médicos y enfermeras dedicaban sus vidas a salvar otras vidas, convirtiéndose en el refugio de salud para miles de familias.',
        color: 'linear-gradient(90deg,#3b82f6,#1d4ed8)',
        icon: this.#iconHeart,
      },
      {
        year: '1990s-2000s',
        title: 'Transformación Institucional',
        description: 'De centro básico a ESE de primer nivel',
        content:
          'Con el Sistema General de Seguridad Social en Salud, el hospital evolucionó, amplió servicios y fortaleció su compromiso con la prevención.',
        color: 'linear-gradient(90deg,#2563eb,#1e40af)',
        icon: this.#iconAward,
      },
      {
        year: 'Hoy',
        title: 'Referente de Excelencia',
        description: 'Innovación, calidad y atención humanizada',
        content:
          'Un hospital moderno que no solo cura, sino que educa, previene y construye un futuro más saludable para toda la región.',
        color: 'linear-gradient(90deg,#1d4ed8,#1e3a8a)',
        icon: this.#iconStar,
      },
    ];
  }

  createRenderRoot() { return this; }

  connectedCallback() {
    super.connectedCallback();
    // Mostrar con animación
    requestAnimationFrame(() => (this.isVisible = true));
    // Carrusel automático
    this._interval = setInterval(() => {
      this.currentStory = (this.currentStory + 1) % this.timelineStories.length;
    }, 5000);
  }

  disconnectedCallback() {
    clearInterval(this._interval);
    super.disconnectedCallback();
  }

  #iconHeart({ size = 24, color = 'currentColor' } = {}) {
    return html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
    </svg>`;
  }
  #iconUsers({ size=24, color='currentColor'}={}) {
    return html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>`;
  }
  #iconAward({ size=24, color='currentColor'}={}) {
    return html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="7"></circle>
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path>
    </svg>`;
  }
  #iconCalendar({ size=24, color='currentColor'}={}) {
    return html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>`;
  }
  #iconMapPin({ size=24, color='currentColor'}={}) {
    return html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20.5 10.5c0 7-8.5 12-8.5 12S3.5 17.5 3.5 10.5a8.5 8.5 0 1 1 17 0z"></path>
      <circle cx="12" cy="10.5" r="3"></circle>
    </svg>`;
  }
  #iconShield({ size=24, color='currentColor'}={}) {
    return html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>`;
  }
  #iconClock({ size=24, color='currentColor'}={}) {
    return html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>`;
  }
  #iconStar({ size=24, color='currentColor'}={}) {
    return html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2"></polygon>
    </svg>`;
  }
  #iconBuilding({ size=24, color='currentColor'}={}) {
    return html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2"></rect>
      <path d="M7 3v18M17 3v18M3 8h18M3 12h18M3 16h18"></path>
    </svg>`;
  }

  #chip(text){ return html`<span class="inline-flex items-center br-pill ba b--blue bg-washed-blue ph3 pv1 f7 fw6 dark-blue">${text}</span>`; }

  render() {
    const s = this.timelineStories[this.currentStory];
    return html`
      <style>
        .bg-grad { background: linear-gradient(135deg, #f8fafc, #eff6ff 35%, #ffffff 70%); }
        .fade-up { opacity:0; transform: translateY(10px); transition: opacity 600ms ease, transform 600ms ease; }
        .fade-up.on { opacity:1; transform: translateY(0); }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        .ping { position: relative; }
        .ping::after { content:""; position:absolute; inset:0; border-radius:9999px; background: rgba(59,130,246,.5); animation: ping 1.2s cubic-bezier(0,0,.2,1) infinite; }
        @keyframes ping { 0%{ transform: scale(1); opacity:.7 } 75%,100%{ transform: scale(2); opacity:0 } }
        .card { border-radius: 1.25rem; background: #fff; border: 1px solid rgba(29,78,216,.15); box-shadow: 0 8px 24px rgba(2,8,20,.06); }
        .grad-btn { background: linear-gradient(90deg,#2563eb,#1e40af); color:#fff; }
        .timeline-line { position:absolute; left:50%; top:0; transform:translateX(-50%); width:.35rem; background: linear-gradient(180deg,#bfdbfe,#60a5fa,#2563eb); height:100%; border-radius:9999px; }
        .grad-head { color:#fff; border-radius:1rem; }
        .dot { width:.6rem; height:.6rem; border-radius:9999px; display:inline-block; background:#3b82f6; }
        .dot--active { background:#1d4ed8; transform: scale(1.25); }
      </style>

      <div class="min-vh-100 bg-grad overflow-hidden">
        <!-- Hero -->
        <div class="relative min-vh-100 flex items-center">
          <div class="absolute top--5 right--5 w5 h5 br-100 bg-light-blue pulse o-30" aria-hidden="true"></div>
          <div class="absolute bottom-2 left-2 w4 h4 br-100 bg-washed-blue pulse o-40" aria-hidden="true"></div>

          <div class="mw8 center ph3 ph4-ns pv5 relative z-1">
            <div class="flex-l items-center-l">
              <!-- Col izquierda -->
              <div class="w-100 w-50-l pr0 pr4-l fade-up ${this.isVisible ? 'on' : ''}">
                <div class="flex items-center mb3">
                  <div class="relative">
                    <div class="w3 h3 br3 flex items-center justify-center shadow-4" style="background:linear-gradient(135deg,#3b82f6,#1d4ed8);">
                      ${this.#iconHeart({ size:20, color:'#fff' })}
                    </div>
                    <div class="absolute top--1 right--1 w1 h1 br-100 bg-light-blue ping" aria-hidden="true"></div>
                  </div>
                  <div class="ml3">
                    <span class="blue fw6">Desde 1950</span>
                    <div class="w3 h0-5 bg-blue o-60"></div>
                  </div>
                </div>

                <h1 class="lh-title fw8 dark-gray f2 f1-ns mb3">
                  Hospital <span class="db" style="background:linear-gradient(90deg,#2563eb,#1e3a8a); -webkit-background-clip:text; background-clip:text; color:transparent;">San Jorge</span>
                  <span class="db f3 silver fw4 mt1">de Ayapel</span>
                </h1>

                <p class="f5 mid-gray lh-copy">
                  Una historia de más de <span class="fw6 blue">70 años</span> cuidando vidas, construyendo esperanza y siendo el corazón médico del sur de Córdoba.
                </p>

                <div class="flex flex-wrap mt3">
                  <div class="flex items-center bg-white ph3 pv2 br-pill shadow-4 mr2 mb2">
                    ${this.#iconMapPin({size:18, color:'#2563eb'})}
                    <span class="ml2 mid-gray fw6">Ayapel, Córdoba</span>
                  </div>
                  <div class="flex items-center bg-white ph3 pv2 br-pill shadow-4 mr2 mb2">
                    ${this.#iconShield({size:18, color:'#2563eb'})}
                    <span class="ml2 mid-gray fw6">ESE Nivel I</span>
                  </div>
                  <div class="flex items-center bg-white ph3 pv2 br-pill shadow-4 mr2 mb2">
                    ${this.#iconUsers({size:18, color:'#2563eb'})}
                    <span class="ml2 mid-gray fw6">Atención 24/7</span>
                  </div>
                </div>
              </div>

              <!-- Col derecha (tarjeta animada) -->
              <div class="w-100 w-50-l mt4 mt0-l fade-up ${this.isVisible ? 'on' : ''}">
                <div class="card pa4">
                  <div class="pa3 mb3 grad-head" style="background:${s.color}">
                    <div class="flex items-center justify-between">
                      <span class="white fw8 f3">${s.year}</span>
                      <span>${s.icon({size:28, color:'#fff'})}</span>
                    </div>
                    <h3 class="white fw8 mt2 f4">${s.title}</h3>
                    <p class="o-80 white mt1">${s.description}</p>
                  </div>
                  <p class="mid-gray lh-copy mb3">${s.content}</p>

                  <div class="tc">
                    ${this.timelineStories.map((_, i) => html`
                      <button
                        class="bn br-100 w1 h1 mh1 ${i===this.currentStory ? 'dot--active' : 'dot'}"
                        aria-label="Historia ${i+1}"
                        @click=${() => (this.currentStory = i)}>
                      </button>
                    `)}
                  </div>
                </div>
              </div>
            </div>

            <!-- Indicador scroll -->
            <div class="absolute bottom-2 left-50 transform translate--50">
              <div class="o-60">
                ${this.#iconClock({ size:20, color:'#60a5fa' })}
              </div>
            </div>
          </div>
        </div>

        <!-- Journey -->
        <div class="pv5 bg-white">
          <div class="mw8 center ph3 ph4-ns">
            <div class="tc mb4">
              <h2 class="f2 fw8 dark-gray">Nuestro Viaje a Través del Tiempo</h2>
              <div class="center w3 h0-5 bg-blue br-pill mt2 mb3"></div>
              <p class="f5 mid-gray measure center">
                Cada década ha traído nuevos desafíos, logros y la dedicación inquebrantable de servir a nuestra comunidad con excelencia médica.
              </p>
            </div>

            <div class="relative">
              <div class="timeline-line"></div>

              <div class="mt4">
                ${this.timelineStories.map((story, index) => html`
                  <div class="flex items-center mv4 ${index % 2 === 0 ? '' : 'flex-row-reverse'}">
                    <div class="w-50 ${index % 2 === 0 ? 'pr4 tr' : 'pl4 tl'}">
                      <div class="card pa4">
                        <div class="dib pa2 mb3" style="background:${story.color}; border-radius:.75rem;">
                          ${story.icon({size:28, color:'#fff'})}
                        </div>
                        <span class="blue fw7">${story.year}</span>
                        <h3 class="f3 fw8 dark-gray mt1 mb1">${story.title}</h3>
                        <p class="blue fw6 mb2">${story.description}</p>
                        <p class="mid-gray lh-copy">${story.content}</p>
                      </div>
                    </div>

                    <div class="relative mh3">
                      <div class="w1-5 h1-5 bg-white ba b--blue br-100 shadow-4" style="width:1.25rem;height:1.25rem;"></div>
                      <div class="absolute top-0 left-0 right-0 bottom-0 br-100" style="animation: ping 1.2s cubic-bezier(0,0,.2,1) infinite;"></div>
                    </div>

                    <div class="w-50"></div>
                  </div>
                `)}
              </div>
            </div>
          </div>
        </div>

        <!-- Impacto -->
        <div class="pv5 bg-near-white">
          <div class="mw8 center ph3 ph4-ns">
            <div class="tc mb4">
              <h2 class="f2 fw8 dark-gray">Más Que Un Hospital</h2>
              <div class="center w3 h0-5 bg-blue br-pill mt2 mb3"></div>
              <p class="f5 mid-gray measure center">
                Gestores de conocimiento, promotores del bienestar y guardianes de la salud de toda la comunidad ayapelense.
              </p>
            </div>

            <div class="flex flex-wrap nl2 nr2">
              ${[
                { icon: this.#iconHeart, title: 'Atención Humanizada', desc: 'Cuidado integral con calidez humana y profesionalismo.' },
                { icon: this.#iconShield, title: 'Excelencia Médica', desc: 'Calidad, seguridad del paciente e innovación constante.' },
                { icon: this.#iconUsers, title: 'Compromiso Social', desc: 'Llevamos salud a cada rincón de la región.' },
              ].map(card => html`
                <div class="w-100 w-third-l pa2">
                  <div class="card pa4 h-100">
                    <div class="w3 h3 br3 flex items-center justify-center mb3" style="background:linear-gradient(135deg,#2563eb,#1e40af);">
                      ${card.icon({size:22, color:'#fff'})}
                    </div>
                    <h3 class="f4 fw8 dark-gray mb2">${card.title}</h3>
                    <p class="mid-gray">${card.desc}</p>
                  </div>
                </div>
              `)}
            </div>

            <div class="mt4 br3 pa4 white grad-btn tc">
              <div class="flex justify-around">
                <div>
                  <div class="f2 fw8">70+</div>
                  <div class="o-80">Años de Historia</div>
                </div>
                <div>
                  <div class="f2 fw8">24/7</div>
                  <div class="o-80">Atención Continua</div>
                </div>
                <div>
                  <div class="f2 fw8">ESE</div>
                  <div class="o-80">Nivel I</div>
                </div>
                <div>
                  <div class="f2 fw8">100%</div>
                  <div class="o-80">Compromiso Social</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Servicios -->
        <div class="pv5 bg-white">
          <div class="mw8 center ph3 ph4-ns">
            <div class="tc mb4">
              <h2 class="f2 fw8 dark-gray">Servicios Integrales de Salud</h2>
              <div class="center w3 h0-5 bg-blue br-pill mt2 mb3"></div>
            </div>

            <div class="flex flex-wrap nl2 nr2">
              ${[
                { icon: this.#iconClock, title: 'Urgencias 24/7', desc: 'Atención inmediata' },
                { icon: this.#iconHeart, title: 'Maternidad', desc: 'Cuidado especializado' },
                { icon: this.#iconCalendar, title: 'Medicina General', desc: 'Atención integral' },
                { icon: this.#iconShield, title: 'Prevención', desc: 'Promoción de salud' },
              ].map(service => html`
                <div class="w-100 w-50-m w-25-l pa2">
                  <div class="pa4 br3 ba b--light-blue bg-near-white hover-bg-washed-blue shadow-hover-2 h-100">
                    <div class="w3 h3 br2 flex items-center justify-center mb2 bg-white shadow-4">
                      ${service.icon({size:22, color:'#2563eb'})}
                    </div>
                    <h3 class="fw8 dark-gray mb1">${service.title}</h3>
                    <p class="mid-gray f6">${service.desc}</p>
                  </div>
                </div>
              `)}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('resena-historica', ResenaHistorica);
