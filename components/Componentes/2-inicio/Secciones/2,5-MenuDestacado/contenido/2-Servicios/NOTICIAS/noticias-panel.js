// noticias-panel.js
import { LitElement, html, css, nothing } from "https://cdn.jsdelivr.net/npm/lit@3/+esm";

export class NoticiasPanel extends LitElement {
  static styles = css`
    :host { display: block; }

    .wrap {
      font-family: Arial, sans-serif;

      color: #003366;
      text-align: center;
      padding: 16px;
      border-radius: 12px;
    }

    h2 {
      margin: 12px 0 16px;
      font-size: 1.6rem;
      color: #0055a5;
    }

    /* --- Contenedor de Noticias --- */
    .news-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      margin: 0 auto;
      max-width: 500px;
    }

    .news-card {
      background: #ffffff;
      border: 1px solid #ccc;
      border-radius: 12px;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      cursor: pointer;
      transition: transform 0.2s;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      text-align: left;
    }

    .news-card:hover { transform: scale(1.02); }

    .thumb {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      object-fit: cover;
      flex: 0 0 auto;
    }

    .title {
      margin: 0;
      font-size: 1rem;
      color: #003366;
    }

    /* --- Modal Noticias --- */
    .modal {
      position: fixed;
      inset: 0;
      z-index: 2000;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-content {
      position: relative;
      background: #fff;
      max-width: 500px;
      width: 90%;
      padding: 20px;
      border-radius: 12px;
      text-align: left;
      box-shadow: 0 10px 24px rgba(0,0,0,.2);
    }
    .modal-img {
      width: 100%;
      border-radius: 10px;
      margin-bottom: 12px;
      display: block;
    }
    .modal-title {
      margin: 0 0 10px;
      color: #0055a5;
      font-size: 1.25rem;
    }

    .close {
      position: absolute;
      top: 8px;
      right: 10px;
      border: 0;
      background: transparent;
      font-size: 24px;
      line-height: 1;
      cursor: pointer;
      color: #666;
    }
    .close:hover { color: #000; }
  `;

  static properties = {
    open: { type: Boolean, state: true },
    selected: { type: Number, state: true },
  };

  constructor() {
    super();
    this.open = false;
    this.selected = 0;


    this.noticias = [
      {


 titulo: " “Nuestra gerente da la bienvenida a la 4ª revolución digital en salud”",
    contenido: `Con un mensaje lleno de optimismo, la gerente del Hospital San Jorge de Ayapel abre las puertas a una nueva etapa en la historia de la institución.

La presentación de la renovada página web marca el inicio de la transformación digital y nos invita a recorrer juntos este camino hacia la innovación en salud.

Este logro ha sido posible gracias al liderazgo del ingeniero Neder Jerónimo Ortega, acompañado por Roberto Barreto, quienes asumieron la estructuración, la arquitectura tecnológica y el desarrollo de la plataforma.

En la arquitectura de contenidos y la gestión del conocimiento estuvo al frente la asesora Martha Ibarra, asegurando que cada componente reflejara la misión y visión del hospital.

Un momento especial que nos invita a descubrir nuevas formas de conexión con nuestra comunidad.`,
    imagen: "https://hospitalsanjorgeayapel.info/LectorPdf/Img/noticias/2025-09-09/gerente.png",
    thumb: "https://hospitalsanjorgeayapel.info/LectorPdf/Img/noticias/2025-09-09/gerente.png"
  },


  {
    titulo: "“Día Mundial para la Prevención del Suicidio: una fecha para reflexionar juntos”",
    contenido: `Cada 10 de septiembre, el mundo se une en una voz común: la prevención del suicidio.

El Hospital San Jorge de Ayapel se suma a esta causa con un llamado a la reflexión y al acompañamiento mutuo, porque ninguna persona debería enfrentar sola sus silencios ni sus batallas internas.

La salud mental es un compromiso de todos. Reconocer las señales, escuchar sin juzgar y tender una mano puede marcar la diferencia entre la desesperanza y la vida.

Hoy invitamos a nuestra comunidad a detenerse, a conversar y a recordar que cada vida importa.`,
    imagen: "https://hospitalsanjorgeayapel.info/LectorPdf/Img/noticias/2025-09-09/Salud%20Mental%201%20.jpeg",
    thumb: "https://hospitalsanjorgeayapel.info/LectorPdf/Img/noticias/2025-09-09/Salud%20Mental%201%20.jpeg"
  },


  {
    titulo: "“Una nueva mascota llega al Hospital San Jorge para acompañar nuestros días”",
    contenido: `En la tarde de ayer, el personal del Hospital San Jorge de Ayapel se reunió en un espacio virtual, lleno de entusiasmo para participar en la selección de nuestra nueva mascota institucional.

Este nuevo integrante, que nace del sentir de nuestra gente, será un símbolo de cercanía y cuidado, acompañándonos en campañas de salud, jornadas de promoción y mantenimiento de la salud, mensajes institucionales y también como imagen de nuestro chatbot.

Hoy damos un paso más en esta historia: la elección de su nombre estará en manos de todos, a través de una votación general.

Una invitación especial a nuestra comunidad para ser parte de este momento único y darle identidad a quien nos acompañará en cada mensaje de salud y esperanza.`,
    imagen: "https://hospitalsanjorgeayapel.info/LectorPdf/Img/noticias/2025-09-09/manati.jpeg",
    thumb: "https://hospitalsanjorgeayapel.info/LectorPdf/Img/noticias/2025-09-09/manati.jpeg"
  },

/*
  {
    titulo: "Un nuevo amigo virtual llega a nuestra página web",
    contenido: `La innovación ahora tiene rostro en el Hospital San Jorge de Ayapel. Nuestro chatbot evoluciona y se convierte en una mascota institucional: un amigo virtual que acompaña a la comunidad en la resolución de dudas y en el acceso a información confiable.

Más que un asistente digital, este nuevo compañero combina la tecnología con la cercanía, respondiendo con agilidad y transmitiendo confianza. Será un aliado en cada visita, un puente más humano entre el hospital y sus usuarios.

Desde hoy, lo encontrarás en un espacio especial dentro de nuestra página web, para que cada experiencia sea más cálida, intuitiva y cercana.`,
    imagen: "",
    thumb: ""
      
    
    }

*/

    ];






  }

  connectedCallback() {
    super.connectedCallback();
    this._onEsc = (e) => { if (e.key === "Escape") this.close(); };
    window.addEventListener("keydown", this._onEsc);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this._onEsc);
    super.disconnectedCallback();
  }

  openNews(index) {
    this.selected = index;
    this.open = true;
  }
  close() { this.open = false; }
  stop(e) { e.stopPropagation(); }

  render() {
    const sel = this.noticias[this.selected] ?? this.noticias[0];

    return html`
      <section class="wrap">
        <h2>Noticias</h2>

        <div class="news-container">
          ${this.noticias.map((n, i) => html`
            <button class="news-card" @click=${() => this.openNews(i)} aria-haspopup="dialog">
              <img class="thumb" src="${n.thumb}" alt="${n.titulo}">
              <h3 class="title">${n.titulo}</h3>
            </button>
          `)}
        </div>

        ${this.open ? html`
          <div class="modal" role="dialog" aria-modal="true" @click=${this.close}>
            <div class="modal-content" @click=${this.stop}>
              <button class="close" @click=${this.close} aria-label="Cerrar">&times;</button>
              <img class="modal-img" src="${sel.imagen}" alt="${sel.titulo}">
              <h3 class="modal-title">${sel.titulo}</h3>
              <p>${sel.contenido}</p>
            </div>
          </div>
        ` : nothing}
      </section>
    `;
  }
}

customElements.define("noticias-panel", NoticiasPanel);

