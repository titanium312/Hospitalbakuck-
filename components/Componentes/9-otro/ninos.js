import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class TratamientodeDatos extends LitElement {
  static properties = {
    menuOpen: { state: true },
  };

  constructor() {
    super();
    this.menuOpen = false;
  }

  static styles = css`
    :host {
      /* Paleta hospitalaria */
      --brand: #1679f2;
      --brand-600: #0f5ec0;
      --accent: #ffbd59;
      --ink: #0b2a42;
      --muted: #4b6274;
      --surface: #f3f8ff;
      --panel: #ffffff;
      --border: #d6e4f0;
      --shadow: 0 8px 24px rgba(2,24,53,.06), 0 2px 6px rgba(2,24,53,.05);

      display: block;
      color: var(--ink);
      font-family: 'Comic Sans MS', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      background:
        radial-gradient(1200px 400px at -10% -10%, #eaf3ff 20%, transparent 60%),
        radial-gradient(900px 400px at 110% 0%, #e6f2ff 20%, transparent 60%),
        linear-gradient(180deg, var(--surface) 0%, #ffffff 26%, var(--surface) 100%);
      min-height: 100vh;
      padding: 20px;
      text-align: center;
    }

    h1 {
      font-size: clamp(1.8rem, 1.2rem + 2.4vw, 2.6rem);
      color: var(--brand-600);
      margin: 0 0 20px 0;
      text-shadow: 0 1px 0 #fff;
    }

    .main-card {
      background: #ffefba;
      border: 5px solid #ff5733;
      border-radius: 18px;
      padding: 18px;
      margin: 0 auto 22px;
      max-width: 320px;
      box-shadow: var(--shadow);
      animation: blink 1s infinite;
      display: grid;
      place-items: center;
      gap: 6px;
    }
    .main-card button {
      all: unset;
      cursor: pointer;
      display: grid;
      place-items: center;
      gap: 6px;
    }
    .main-card img { width: 80px; height: 80px; }
    .main-card h3 { margin: 0; color: #2e4053; font-size: 1.2rem; }
    .main-card p  { margin: 0; color: #2e4053; }

    @keyframes blink {
      0%, 100% { border-color: #ff5733; background: #f6d365; }
      50% { border-color: #2ecc71; background: #ffefba; }
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 15px;
      max-width: 860px;
      margin: 20px auto;
    }
    .grid[hidden] { display: none; }

    .card {
      background: var(--panel);
      border-radius: 16px;
      padding: 20px;
      border: 4px dashed var(--accent);
      box-shadow: var(--shadow);
      text-decoration: none;
      color: #2e4053;
      transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
      display: grid;
      place-items: center;
      gap: 8px;
    }
    .card:hover,
    .card:focus-visible {
      transform: translateY(-2px) scale(1.02);
      background: #fef5e7;
      box-shadow: 0 12px 28px rgba(2,24,53,.12);
      outline: none;
    }
    .card img { width: 60px; height: 60px; }
    .card h3 { font-size: 1.05rem; margin: 6px 0 0 0; }

    .faq {
      margin: 40px auto 0;
      text-align: left;
      max-width: 860px;
    }
    .faq h2 {
      text-align: center;
      color: var(--brand-600);
      margin-bottom: 18px;
    }

    details {
      background: var(--panel);
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 12px;
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
    }
    summary {
      font-weight: bold;
      cursor: pointer;
      color: var(--ink);
      list-style: none;
    }
    summary::-webkit-details-marker { display: none; }
    summary::after {
      content: "▼";
      float: right;
      color: var(--brand);
      transition: transform .2s ease;
    }
    details[open] summary::after { transform: rotate(180deg); }
    details p { color: var(--muted); margin: 10px 0 0 0; }

    @media (max-width: 760px) {
      .grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 480px) {
      .grid { grid-template-columns: 1fr; }
    }
  `;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  render() {
    return html`
      <h1>🌟 Portal Infantil de Salud 🌟</h1>

      <!-- Card principal accesible -->
      <div class="main-card">
        <button @click=${this.toggleMenu} aria-expanded=${this.menuOpen} aria-controls="menuGrid">
          <img src="https://img.icons8.com/color/96/kids.png" alt="Portal Niños y Niñas">
          <h3>Portal Niños y Niñas</h3>
          <p>Haz clic para entrar 👆</p>
        </button>
      </div>

      <!-- Cajones -->
      <div class="grid" id="menuGrid" ?hidden=${!this.menuOpen}>
        <a class="card" href="https://www.minsalud.gov.co/pais-protegido/higiene.html" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluency/96/sun.png" alt="Higiene">
          <h3>Higiene</h3>
        </a>
        <a class="card" href="https://www.minsalud.gov.co/pais-protegido/vacunacion.html" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluency/96/syringe.png" alt="Vacunación">
          <h3>Vacunación</h3>
        </a>
        <a class="card" href="https://www.minsalud.gov.co/pais-protegido/nutricioninfantil.html" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluency/96/chicken-leg.png" alt="Nutrición Infantil">
          <h3>Nutrición Infantil</h3>
        </a>
        <a class="card" href="https://www.minsalud.gov.co/pais-protegido/lasmascotas.html" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluency/96/dog.png" alt="Mascotas y salud">
          <h3>Mascotas</h3>
        </a>
        <a class="card" href="https://www.minsalud.gov.co/pais-protegido/derechos-ninos.html" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluency/96/child-safe-zone.png" alt="Derechos de la niñez">
          <h3>Derechos de Niños y Niñas</h3>
        </a>
      </div>

      <!-- Preguntas frecuentes -->
      <section class="faq" aria-label="Preguntas frecuentes">
        <h2>❓ Pregúntanos lo que quieras</h2>

        <details>
          <summary>¿Qué hago si me siento enfermo o me duele algo?</summary>
          <p>Cuéntale de inmediato a tu mamá, papá o al adulto que te cuida. Te llevarán al hospital o al médico para que te revisen.</p>
        </details>

        <details>
          <summary>¿Qué servicios hay para los niños en el hospital?</summary>
          <p>Consulta con pediatría, vacunación, odontología infantil, urgencias pediátricas, apoyo psicológico, nutrición y promoción de la salud.</p>
        </details>

        <details>
          <summary>¿Me van a poner inyecciones si voy al hospital?</summary>
          <p>A veces es necesario para protegerte o ayudarte a mejorar. Siempre te explicarán antes y estarán contigo para que te sientas tranquilo.</p>
        </details>

        <details>
          <summary>¿Puedo llevar a mi juguete favorito al hospital?</summary>
          <p>Sí, puedes llevar un juguete pequeño o un libro para sentirte acompañado mientras te atienden.</p>
        </details>

        <details>
          <summary>¿Quién me atiende en el hospital?</summary>
          <p>Un equipo de médicos, enfermeras y otros profesionales que cuidan a los niños y niñas. Todos están allí para ayudarte.</p>
        </details>

        <details>
          <summary>¿Cómo me preparo para una cita médica?</summary>
          <p>Pídele a tu familia que lleve tus documentos, carné de vacunas y cuéntales todo lo que sientas o quieras preguntar.</p>
        </details>

        <details>
          <summary>¿Qué hago si tengo miedo de ir al hospital?</summary>
          <p>Es normal sentir un poco de miedo, pero el hospital es un lugar seguro donde trabajan para que te sientas mejor.</p>
        </details>

        <details>
          <summary>¿Puedo jugar o aprender cosas en el hospital?</summary>
          <p>Sí, hay actividades recreativas y educativas para que el tiempo sea más divertido mientras te cuidan.</p>
        </details>

        <details>
          <summary>¿Qué hago si necesito ayuda rápida?</summary>
          <p>Dile a un adulto que llame a emergencias (123 en Colombia) o te lleve enseguida a urgencias.</p>
        </details>
      </section>
    `;
  }
}

customElements.define('nino-x', TratamientodeDatos);
