// /components/canal-interaccion-hsja.js
import { LitElement, html, css } from 'https://unpkg.com/lit@3/index.js?module';

/**
 * <canal-interaccion>
 * Canal de Interacción Deliberatoria – HSJA
 * Componente Lit con CSS encapsulado (sin <html>/<head>/<body>)
 * Mantiene el mismo contenido y textos. Modales accesibles.
 */
export class CanalInteraccionHsja extends LitElement {
  static properties = {
    openId: { type: String, state: true }
  };

  constructor(){
    super();
    this.openId = '';
    this._onKeyDown = (e) => { if (e.key === 'Escape') this.closeAll(); };
  }
  connectedCallback(){ super.connectedCallback(); window.addEventListener('keydown', this._onKeyDown); }
  disconnectedCallback(){ window.removeEventListener('keydown', this._onKeyDown); super.disconnectedCallback(); }

  static styles = css`
    :host { display:block; background:#f4f8fb; padding:24px; color:#334155; font-family: Arial, Helvetica, sans-serif; line-height:1.6; }
    h1{ text-align:center; color:#003366; margin:0 0 12px; }
    .intro{ max-width:1000px; margin:0 auto 24px; text-align:center; }
    .grid{ max-width:1200px; margin:0 auto; display:grid; gap:20px; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); }
    .card{ background:#fff; border:1px solid #e6e9ef; border-radius:14px; padding:18px; box-shadow:0 6px 16px rgba(2,6,23,.06); transition:transform .18s ease, box-shadow .18s ease; }
    .card:hover{ transform:translateY(-4px); box-shadow:0 10px 24px rgba(2,6,23,.1); }
    .chip{ display:inline-flex; align-items:center; gap:8px; font-weight:700; font-size:14px; background:#eaf4fb; color:#006699; border-radius:999px; padding:6px 12px; margin-bottom:10px; }
    .card h2{ margin:6px 0 8px; font-size:18px; color:#0f172a; }
    .card p{ margin:0 0 14px; font-size:14px; color:#475569; }
    .btn{ display:inline-block; width:100%; text-align:center; text-decoration:none; background:#006699; color:#fff; font-weight:700; border-radius:10px; padding:10px 14px; transition:background .2s ease; cursor:pointer; border:none; }
    .btn:hover{ background:#004466; }

    /* Modal */
    .modal{ display:none; position:fixed; z-index:1000; inset:0; background:rgba(0,0,0,0.6); justify-content:center; align-items:center; padding:20px; }
    .modal[open]{ display:flex; }
    .modal-content{ background:#fff; max-width:900px; width:100%; max-height:90%; overflow-y:auto; border-radius:14px; padding:20px; box-shadow:0 10px 30px rgba(0,0,0,0.25); animation:fadeIn .3s ease; }
    .modal-content h3{ color:#003366; margin-top:0; }
    .close{ float:right; font-size:22px; font-weight:bold; color:#333; cursor:pointer; border:none; background:none; }
    .close:hover{ color:#000; }
    @keyframes fadeIn{ from{opacity:0; transform:translateY(-20px)} to{opacity:1; transform:translateY(0)} }

    table{ width:100%; border-collapse:collapse; font-size:14px; margin-top:10px; }
    th,td{ border:1px solid #ccc; padding:6px; text-align:left; vertical-align:top; }
    th{ background:#eaf4fb; color:#003366; }
    input,textarea,select{ border:1px solid #ccc; border-radius:6px; width:100%; padding:8px; margin-bottom:10px; box-sizing:border-box; }

    .linkbtns{ display:flex; gap:12px; flex-wrap:wrap; }
  `;

  openModal(id){ this.openId = id; }
  closeAll(){ this.openId = ''; }
  _backdrop(e){ if (e.target === e.currentTarget) this.closeAll(); }

  render(){
    return html`
      <h1>Canal de Interacción Deliberatoria – HSJA</h1>
      <p class="intro">
        Espacio institucional para promover la <strong>transparencia, el diálogo y la corresponsabilidad</strong> con la ciudadanía.
        Participa en las diferentes etapas: desde el <em>diagnóstico</em> hasta la <em>rendición de cuentas</em>, el <em>control social</em> y la <em>gestión presupuestal</em>.
      </p>

      <div class="grid">
        ${this.card('🩺 Diagnóstico','Identificación de necesidades','Encuestas y talleres para reconocer problemáticas.','modalDiag')}
        ${this.card('🗺️ Planeación','Definición de prioridades','Participación en la construcción de planes y metas.','modalPlan')}
        ${this.card('🗣️ Consulta','Postulación de temáticas','HSJA actúa como puente en consultas ciudadanas.','modalCons')}
        ${this.card('🤝 Colaboración','Co-creación de soluciones','Trabajo conjunto con comunidad y academia.','modalCola')}
        ${this.card('📊 Rendición','Transparencia y diálogo','Audiencias públicas e informes de gestión.','modalRend')}
        ${this.card('🛡️ Control','Veeduría ciudadana','Seguimiento ciudadano a la gestión institucional.','modalCont')}
        ${this.card('🧰 Herramientas','Formatos y canales','PQRSDF, formularios, actas y guías.','modalHerr')}
        ${this.card('💰 Presupuesto','Gestión presupuestal','Procesos internos para transparencia en recursos.','modalPres')}
      </div>

      ${this.modals()}
    `;
  }

  card(chip, title, desc, id){
    return html`
      <article class="card">
        <span class="chip">${chip}</span>
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="btn" aria-haspopup="dialog" aria-controls=${id} @click=${() => this.openModal(id)}>Ver más</button>
      </article>
    `;
  }

  modalShell(id, title, body){
    const open = this.openId === id;
    return html`
      <div class="modal" ?open=${open} @click=${this._backdrop} role="dialog" aria-modal="true" aria-labelledby="${id}-title" id=${id}>
        <div class="modal-content">
          <button class="close" aria-label="Cerrar" @click=${this.closeAll}>&times;</button>
          <h3 id="${id}-title">${title}</h3>
          ${body}
        </div>
      </div>
    `;
  }

  modals(){
    return html`
      ${this.modalShell('modalDiag','Diagnóstico', html`
        <table>
          <tr><th>Componente</th><th>Problemas</th></tr>
          <tr><td>Político</td><td>Baja confianza, débil participación, fragmentación.</td></tr>
          <tr><td>Administrativo</td><td>Limitaciones en recurso humano, déficit de servicios, brechas tecnológicas.</td></tr>
          <tr><td>Social</td><td>Violencia intrafamiliar, inseguridad, migración.</td></tr>
          <tr><td>Económico</td><td>Dependencia de minería, informalidad, poca diversificación.</td></tr>
          <tr><td>Ambiental</td><td>Impactos de minería, contaminación, inundaciones, pérdida de biodiversidad.</td></tr>
        </table>
      `)}

      ${this.modalShell('modalPlan','Planeación', html`
        <p>La ciudadanía colabora en definir <strong>metas, objetivos y estrategias</strong> de la planeación institucional, aportando insumos que orientan los programas del hospital.</p>
      `)}

      ${this.modalShell('modalCons','Consulta Ciudadana', html`
        <p>El HSJA no adelanta consulta ciudadana directa. Sin embargo, puede actuar como <strong>puente</strong> con el MSPS u otros actores.</p>
        <form action="mailto:siauesehospitalsanjorge@gmail.com" method="post" enctype="text/plain">
          <label>Nombre completo:</label><input type="text" name="nombre" required>
          <label>Documento (opcional):</label><input type="text" name="documento">
          <label>Correo/Teléfono:</label><input type="text" name="contacto" required>
          <label>Tema propuesto:</label><textarea name="tema" required></textarea>
          <label>Justificación:</label><textarea name="justificacion" required></textarea>
          <label>Sugerencias:</label><textarea name="sugerencias"></textarea>
          <button type="submit" class="btn">Enviar al SIAU</button>
        </form>
      `)}

      ${this.modalShell('modalCola','Colaboración – Ciencia, Tecnología e Innovación', html`
        <p>Convocatoria a actores del ecosistema de <strong>Ciencia, Tecnología e Innovación</strong> para identificar nuevos modelos y enfoques en salud.</p>
        <div style="margin:20px 0;padding:15px;background:#eef6ff;border-radius:10px;text-align:center;">
          <h4 style="color:#003366;">📂 Documento oficial</h4>
          <a class="btn" href="docs/Convocatoria_Reto_Institucional_2025.pdf" target="_blank">Abrir PDF</a>
        </div>
        <h4 style="color:#003366;">📸 Convocatorias vigentes</h4>
        <div style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;">
          <img src="img/Convocatoria_Rabia.png" alt="Convocatoria Rabia" style="max-width:400px;border-radius:12px;">
          <img src="img/Convocatoria_Violencia.png" alt="Convocatoria Violencia" style="max-width:400px;border-radius:12px;">
        </div>
        <h4 style="color:#003366;margin-top:25px;">📝 Formulario de inscripción</h4>
        <form action="mailto:siauesehospitalsanjorge@gmail.com" method="post" enctype="text/plain">
          <label>Nombre completo:</label><input type="text" name="nombre" required>
          <label>Correo / Teléfono:</label><input type="text" name="contacto" required>
          <label>Entidad u organización (opcional):</label><input type="text" name="entidad">
          <label>Propuesta o interés en participar:</label><textarea name="propuesta" rows="3" required></textarea>
          <button type="submit" class="btn">Enviar al SIAU</button>
        </form>
        <h4 style="color:#003366;margin-top:25px;">📑 Resultados publicados</h4>
        <table>
          <tr><th>Propuesta</th><th>Responsable</th><th>Estado</th><th>Documento</th></tr>
          <tr><td>Convocatoria Rabia</td><td>Epidemiología HSJA</td><td>Aprobada</td><td><a href="docs/Resultados_Convocatoria_Rabia.pdf" target="_blank">📄 Descargar</a></td></tr>
          <tr><td>Convocatoria Violencia Intrafamiliar</td><td>Psicología HSJA</td><td>En ejecución</td><td><a href="docs/Resultados_Convocatoria_Violencia.pdf" target="_blank">📄 Descargar</a></td></tr>
          <tr><td>Reto Institucional 2025</td><td>Innovación y TIC HSJA</td><td>Convocatoria cerrada</td><td><a href="docs/Propuestas_Seleccionadas.pdf" target="_blank">📄 Descargar</a></td></tr>
        </table>
      `)}

      ${this.modalShell('modalRend','Rendición de Cuentas', html`
        <p>Proceso anual de informes de gestión, respuesta a inquietudes ciudadanas y garantía de transparencia.</p>
        <div style="margin:20px 0;padding:15px;background:#eef6ff;border-radius:10px;">
          <h4 style="color:#003366;">📂 Documentos de apoyo – Rendición de Cuentas</h4>
          <ul>
            <li><a href="docs/Documento_Etapas_Rendicion.pdf" target="_blank">Documento Etapas de Rendición de Cuentas</a></li>
            <li><a href="docs/Informe_Gestion_2025.pdf" target="_blank">Informe de Gestión 2025</a></li>
            <li><a href="docs/Plan_Mejoramiento.pdf" target="_blank">Plan de Mejoramiento Institucional</a></li>
          </ul>
        </div>
      `)}

      ${this.modalShell('modalCont','Control Social', html`
        <p>La comunidad ejerce <strong>veeduría ciudadana</strong> sobre recursos y gestión institucional.</p>
      `)}

      ${this.modalShell('modalHerr','Herramientas', html`
        <p>Accede a recursos prácticos para la participación y el control social:</p>
        <div class="linkbtns">
          <a class="btn" href="biblioteca.html" target="_blank">📚 Ir a Biblioteca</a>
          <a class="btn" href="presupuesto.html" target="_blank">💰 Gestión Presupuestal</a>
        </div>
        <div style="margin-top:20px;padding:15px;background:#eef6ff;border-radius:10px;">
          <h4 style="color:#003366;">🗂️ Caja de Herramientas</h4>
          <ul>
            <li><a href="docs/Guia_Participacion.pdf" target="_blank">Guía para la Participación Ciudadana</a></li>
            <li><a href="docs/Formato_Seguimiento.pdf" target="_blank">Formato de Seguimiento y Control</a></li>
          </ul>
        </div>
      `)}

      ${this.modalShell('modalPres','Presupuesto', html`
        <p>El HSJA no delibera con la ciudadanía la asignación de recursos (Ley 1757 de 2015). Sin embargo, tiene procesos internos para garantizar transparencia.</p>
        <div style="display:flex;gap:20px;flex-wrap:wrap;margin-top:20px;">
          <div style="flex:1;min-width:200px;background:#eef6ff;padding:15px;border-radius:10px;text-align:center;">
            <h4 style="color:#003366;">📂 Carpeta 1</h4>
            <a class="btn" href="docs/presupuesto1.pdf" target="_blank">Abrir PDF</a>
          </div>
          <div style="flex:1;min-width:200px;background:#eef6ff;padding:15px;border-radius:10px;text-align:center;">
            <h4 style="color:#003366;">📂 Carpeta 2</h4>
            <a class="btn" href="docs/presupuesto2.pdf" target="_blank">Abrir PDF</a>
          </div>
        </div>
      `)}
    `;
  }
}

customElements.define('canal-interaccion', CanalInteraccionHsja);
