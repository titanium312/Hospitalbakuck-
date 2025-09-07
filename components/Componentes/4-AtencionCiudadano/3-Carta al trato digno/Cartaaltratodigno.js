import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class Cartaaltratodigno extends LitElement {
  createRenderRoot() { return this; } // Light DOM para Tachyons / estilos globales

  render() {
    return html`
      <style>
        .wrap {
          background: #fff;
          border: 1px solid #D6F0FA;
          border-radius: 1rem;
          box-shadow: 0 8px 28px rgba(0,0,0,0.06);
        }
        .ribbon {
          background: #E6F7FD;
          height: .5rem;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          border-bottom: 1px solid #D6F0FA;
        }
        .literal {
          white-space: pre-wrap;
          color: #333;
        }
      </style>

      <section class="pa3 pa4-ns">
        <div class="wrap">
          <div class="ribbon"></div>
          <div class="pa3 pa4-ns literal lh-copy f5">
Carta al trato digno
Compartir
Buscar
El Hospital San Jorge de Ayapel a través de sus colaboradores, reconoce y garantiza los derechos constitucionales y legales de todas las personas naturales y jurídicas. En consecuencia, expide y divulga la presente "Carta de Trato Digno al Paciente", en la que se reiteran los derechos que les corresponden a todas las personas usuarias de nuestros servicios y se establecen los diferentes canales de atención habilitados para garantizarlos.

Derechos de los usuarios:
Recibir atención oportuna, digna, segura y respetuosa.
Acceder a información clara sobre su estado de salud, diagnósticos y tratamientos.
Confidencialidad y manejo reservado de la historia clínica.
Elegir entre las opciones terapéuticas disponibles cuando proceda y recibir segunda opinión si lo desea.
Ser informado sobre costos y servicios prestados.
Presentar quejas, reclamos y sugerencias a través de los canales oficiales sin represalias.
Recibir acompañamiento y trato humano durante todo el proceso de atención.

Deberes de las personas:
Asi mismo es importante divulgar, de conformidad con lo establecido en el artículo 6° de la ley 1437 de 2011, los deberes de las personas:

Cuidar su salud, la de su familia y su comunidad.
Cumplir las indicaciones y recomendaciones del personal de salud.
Suministrar información veraz y completa para el adecuado manejo clínico.
Respetar turnos, protocolos y normas internas del hospital.
Conservar y entregar la documentación requerida para trámites.
Colaborar con las medidas de bioseguridad y seguridad del paciente.
Asumir los costos o aportes correspondientes cuando apliquen, conforme a su capacidad.

Mecanismos de atención al usuario.
CANALES DE ATENCIÓN

CANAL PRESENCIAL
Ventanilla Única — Servicio de Información y Atención al Usuario.
Horario: Lunes a viernes: 7:00 a.m. – 12:00 m / 2:00 p.m. – 6:00 p.m.

CANAL TELEFÓNICO / WHATSAPP:
(604) 7705083
Línea transparencia

CANAL VIRTUAL
https://hospitalsanjorgeayapel.com/
principal_gerencia@hospitalayapel.gov.co
esesanjorgedeayapel@gmail.com

CANAL ESCRITO
Buzón físico en Ventanilla Única — Radicación presencial o formulario en línea.
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('cartaaltratodigno-view', Cartaaltratodigno);
