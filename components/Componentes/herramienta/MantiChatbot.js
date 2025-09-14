import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class MantiChatbot extends LitElement {
  static properties = {
    avatar: { type: String },
    title: { type: String },
    subtitle: { type: String },
    open: { type: Boolean, reflect: true },
    floating: { type: Boolean, reflect: true },
    position: { type: String, reflect: true }, // 'br'|'bl'|'tr'|'tl'
    _sending: { state: true },
    _messages: { state: true },
    _suggested: { state: true },
  };

  static styles = css`
    :host {
      /* Paleta hospitalaria clara */
      --blue-50:  #f0f9ff;
      --blue-100: #e6f7ff;
      --blue-200: #d7effe;
      --blue-300: #bfe5fd;
      --blue-400: #89cdfb;
      --blue-500: #3aa7f0;   /* CTA principal */
      --blue-600: #1d7ed6;   /* hover */
      --teal-400: #2dd4bf;   /* acento salud */
      --surface:  #ffffff;
      --bg-chat:  #f9fcff;
      --text:     #0b2742;   /* azul clínico */
      --muted:    #4b6a86;
      --border:   #d7ecfa;
      --shadow:   0 8px 28px rgba(29,126,214,0.16);
      --radius-xl: 22px;
      --radius-md: 14px;
      font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: var(--text);
    }

    .wrap {
      position: fixed;
      inset: auto 1.2rem 1.2rem auto;
      display: flex; flex-direction: column; gap: .9rem;
      align-items: flex-end;
      z-index: 2147483000;
    }
    :host([position="bl"]) .wrap { inset: auto auto 1.2rem 1.2rem; align-items: flex-start; }
    :host([position="tr"]) .wrap { inset: 1.2rem 1.2rem auto auto; align-items: flex-end; }
    :host([position="tl"]) .wrap { inset: 1.2rem auto auto 1.2rem; align-items: flex-start; }

    /* FAB */
    .fab {
      width: 60px; height: 60px; border-radius: 16px;
      border: none; background: var(--blue-500);
      box-shadow: var(--shadow); cursor: pointer; overflow: hidden;
    }
    .fab img { width: 100%; height: 100%; object-fit: cover; }
    :host([open]) .fab { display: none; }

    /* Ventana chat */
    .chat {
      width: min(100vw - 2.4rem, 420px);
      max-height: min(82vh, 660px);
      display: grid; grid-template-rows: auto 1fr auto;
      background: var(--bg-chat);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    /* Header */
    .header {
      display: flex; align-items: center; gap: 12px;
      padding: .9rem 1rem;
      background: var(--blue-100);
      border-bottom: 1px solid var(--border);
    }
    .avatar { width: 42px; height: 42px; border-radius: 50%; overflow: hidden; }
    .avatar img { width: 100%; height: 100%; object-fit: cover; }
    .title { font-weight: 800; color: var(--blue-600); line-height: 1.1; }
    .subtitle { font-size: 12px; color: var(--muted); }
    .close {
      margin-left: auto; border: 0; border-radius: 12px;
      background: var(--blue-500); color: #fff;
      padding: .45rem .8rem; cursor: pointer;
    }

    /* Feed */
    .feed {
      padding: 1rem; overflow-y: auto;
      display: grid; gap: .8rem;
      scrollbar-gutter: stable;
    }
    .row { display: flex; }
    .row.user { justify-content: flex-end; }

    .bubble {
      max-width: 85%;
      padding: .85rem 1rem;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0,0,0,.04);
    }
    .bubble.user { background: var(--blue-500); color: #fff; }
    .bubble.assistant { background: var(--blue-100); color: var(--text); }

    .chip {
      font-size: 11px; font-weight: 800; letter-spacing: .04em;
      text-transform: uppercase;
      display: inline-block; margin-bottom: .35rem;
      padding: .15rem .55rem; border-radius: 999px;
    }
    .row.user .chip { background: var(--blue-600); color: #fff; }
    .row.assistant .chip { background: var(--blue-300); color: var(--text); }

    /* Sugerencias (reemplaza el input) */
    .suggestions {
      padding: .9rem .9rem 1.1rem;
      background: var(--surface);
      border-top: 1px solid var(--border);
    }
    .group-title {
      font-size: 12px; font-weight: 800; color: var(--muted);
      letter-spacing: .06em; text-transform: uppercase; margin-bottom: .5rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: .5rem;
    }
    .qbtn {
      border: 1px solid var(--border);
      background: #fff;
      border-radius: 12px;
      padding: .6rem .7rem;
      text-align: left;
      cursor: pointer;
      color: var(--text);
      transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
      box-shadow: 0 2px 8px rgba(61,130,186,0.06);
    }
    .qbtn:hover { transform: translateY(-1px); border-color: var(--blue-300); box-shadow: 0 6px 18px rgba(61,130,186,0.12); }
    .qbtn:active { transform: translateY(0); }

    /* Responsivo */
    @media (max-width: 480px) {
      .chat { width: min(100vw - 2rem, 400px); }
      .grid { grid-template-columns: 1fr; }
    }
  `;

  constructor() {
    super();
    this.avatar = 'https://hospitalsanjorgeayapel.info/LectorPdf/Img/manti/manti.png';
    this.title = 'MANTI';
    this.subtitle = 'Tu guía de salud y bienestar';
    this.open = false;
    this.floating = true;
    this.position = 'br';
    this._sending = false;

    // Mensaje inicial (solo Respuesta)
    this._messages = [
      { id: 'm1', role: 'assistant', content: '¡Hola! Soy MANTI 🫶🏽. Elige una pregunta para comenzar.' }
    ];

    // Sugerencias iniciales
    this._suggested = this._getRootSuggestions();
  }

  // Sugerencias raíz
  _getRootSuggestions() {
    return [
      {
        title: 'Citas y servicios',
        items: [
          '¿Cómo puedo agendar una cita?',
          '¿Qué documentos debo llevar a mi cita?',
          '¿Cuál es el horario de atención?',
          '¿Dónde están ubicadas las sedes?'
        ]
      },
      {
        title: 'Resultados y trámites',
        items: [
          '¿Dónde consulto resultados de Ayudas Diagnósticas?',
          '¿Cómo solicito copia de la historia clínica?',
          '¿Quién emite certificados y constancias?',
          '¿Cómo radico una PQRSDF?'
        ]
      },
      {
        title: 'Urgencias y transparencia',
        items: [
          '¿Qué hago en caso de urgencia?',
          '¿Cómo reporto un acto de corrupción?'
        ]
      },
      {
        title: 'Promoción y prevención',
        items: [
          '¿Qué programas de vacunación tienen?',
          '¿Ofrecen salud oral?',
          '¿Tienen control prenatal?'
        ]
      }
    ];
  }

  // Siguientes sugerencias según tema detectado
  _nextSuggestionsFor(topic) {
    switch (topic) {
      case 'cita':
        return [
          { title: 'Agendamiento', items: [
            'Quiero agendar medicina general',
            'Confirmar horarios disponibles',
            'Requisitos para especialidades',
            '¿Cómo reprogramo o cancelo una cita?'
          ]}
        ];
      case 'horario':
        return [
          { title: 'Horarios por servicio', items: [
            'Laboratorio clínico', 'Imágenes diagnósticas', 'Consulta externa', '¿Atienden sábados y festivos?'
          ]}
        ];
      case 'programas':
        return [
          { title: 'Programas PYP', items: [
            'Vacunación', 'Control prenatal', 'Salud oral', 'Crecimiento y desarrollo'
          ]}
        ];
      case 'tramites':
        return [
          { title: 'Trámites frecuentes', items: [
            'Certificado de asistencia', 'Autorizaciones', 'PQRSDF', 'Historia clínica: requisitos'
          ]}
        ];
      default:
        return this._getRootSuggestions();
    }
  }

  // Router de respuestas (sin entrada libre; clasifica la pregunta elegida)
  _router(question) {
    const s = question.toLowerCase();
    if (/(cita|agend|turno|horarios disponibles)/.test(s)) {
      return {
        topic: 'cita',
        text: 'Para agendar una cita, puedes hacerlo por whatsapp 3147989334 , en ventanilla o vía portal web (si tu asegurador lo permite). Ten a la mano tu documento y datos de contacto. Para especialidades puede requerirse remisión.'
      };
    }
    if (/(horario|abren|cierran|atención|atencion|feriad|festiv)/.test(s)) {
      return {
        topic: 'horario',
        text: 'Nuestro horario administrativo es lun–vie 7:00–17:00 y sáb 8:00–12:00. Urgencias 24/7. Para festivos, consulta el aviso semanal del servicio.'
      };
    }
    if (/(vacuna|prevenci|control|promoci|salud oral|prenatal|pyp)/.test(s)) {
      return {
        topic: 'programas',
        text: 'Contamos con vacunación, control prenatal, salud oral y otros programas de promoción y prevención. Indícame qué programa te interesa.'
      };
    }
    if (/(certificado|autorizaci|tramite|trámite|copago|pqrsdf|historia cl|resultados?)/.test(s)) {
      return {
        topic: 'tramites',
        text: 'En trámites te indicamos requisitos, tiempos de respuesta y canales de radicación (en línea o presencial). \'Historia clínica\' requiere identificación y, para terceros, autorización.'
      };
    }
    if (/(urgencia|emergenc)/.test(s)) {
      return {
        topic: 'general',
        text: 'En caso de urgencia, acude directamente al servicio de Urgencias más cercano. No requiere autorización previa. Lleva tu documento y, si es posible, información clínica relevante.'
      };
    }
    return {
      topic: 'general',
      text: 'Puedo ayudarte con información sobre servicios, citas, trámites y programas de salud. Elige una opción para continuar.'
    };
  }

  // Acción al elegir una pregunta sugerida
  async _choose(q) {
    if (this._sending) return;
    this._sending = true;

    // Añadimos Pregunta
    this._messages = [
      ...this._messages,
      { id: (self.crypto?.randomUUID?.() || String(Math.random())), role: 'user', content: q }
    ];

    // Latencia simulada
    await new Promise(r => setTimeout(r, 500 + Math.random() * 300));

    // Calculamos Respuesta
    const { topic, text } = this._router(q);

    // Añadimos Respuesta
    this._messages = [
      ...this._messages,
      { id: (self.crypto?.randomUUID?.() || String(Math.random())), role: 'assistant', content: text }
    ];

    // Actualizamos sugerencias según el tema
    this._suggested = this._nextSuggestionsFor(topic);
    this._sending = false;

    // Scroll al final
    await new Promise(r => requestAnimationFrame(r));
    const feed = this.renderRoot?.querySelector('.feed');
    if (feed) feed.scrollTop = feed.scrollHeight;
  }

  render() {
    const hasAvatar = !!(this.avatar && this.avatar.trim());
    return html`
      <div class="wrap">
        ${this.floating ? html`
          <button class="fab" @click=${() => (this.open = !this.open)} aria-label=${this.open ? 'Cerrar MANTI' : 'Abrir MANTI'}>
            ${this.avatar ? html`<img src=${this.avatar} alt="MANTI">` : ''}
          </button>` : null}

        ${(!this.floating || this.open) ? html`
          <section class="chat" role="dialog" aria-label="Chat MANTI (selección de preguntas)">
            <header class="header">
              <div class="avatar" aria-hidden=${hasAvatar ? 'true' : 'false'}>
                ${hasAvatar ? html`<img src=${this.avatar} alt="Avatar de MANTI" loading="lazy">` : html`M`}
              </div>
              <div style="min-width:0">
                <div class="title">${this.title}</div>
                <div class="subtitle">${this.subtitle}</div>
              </div>
              ${this.floating ? html`<button class="close" @click=${() => (this.open = false)}>Cerrar</button>` : null}
            </header>

            <div class="feed" part="feed">
              ${this._messages.map(m => html`
                <div class="row ${m.role}">
                  <div class="bubble ${m.role === 'user' ? 'user' : 'assistant'}">
                    <div class="chip">${m.role === 'user' ? 'Pregunta' : 'Respuesta'}</div>
                    <div>${m.content}</div>
                  </div>
                </div>
              `)}
            </div>

            <!-- Sin textarea: solo preguntas sugeridas -->
            <div class="suggestions" part="suggestions">
              ${this._suggested.map(group => html`
                <div>
                  <div class="group-title">${group.title}</div>
                  <div class="grid">
                    ${group.items.map(item => html`
                      <button class="qbtn" @click=${() => this._choose(item)} ?disabled=${this._sending}>
                        ${item}
                      </button>
                    `)}
                  </div>
                </div>
              `)}
            </div>
          </section>
        ` : null}
      </div>
    `;
  }
}

customElements.define('manti-chatbot', MantiChatbot);
