import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

/**
 * <mipg-x page="Auditoría Interna"></mipg-x>
 * Vista en "carpeticas" (tarjetas tipo carpeta) elegante y limpia.
 * - Mantiene API: usa `page` y busca en `this.data[page]` (insensible a acentos/mayúsculas).
 * - Tarjetas accesibles (todo el card es un <a>), target="_blank", focus ring visible.
 * - Estética blanca/azules suaves, sombras y animación corta (respeta prefers-reduced-motion).
 */
export class MipgXCards extends LitElement {
  static properties = {
    page: { type: String, reflect: true },
  };

  static styles = css`
    :host{
      --ink: #0f172a;
      --muted: #64748b;
      --b-25:#f8fbff;
      --b-50:#eff6ff;
      --b-100:#dbeafe;
      --b-500:#1d4ed8;
      --b-600:#1e40af;
      --bd:#e5e7eb;
      --radius:14px;
      --shadow:0 6px 18px rgba(16,24,40,.10);
      display:block; color:var(--ink);
      font:16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
      background:transparent;
    }

    /* micro-Tachyons encapsulado */
    .pa3{padding:1rem}.pa4{padding:2rem}.mt3{margin-top:1rem}.mb0{margin-bottom:0}
    .br3{border-radius:var(--radius)}
    .visually-hidden{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px);white-space:nowrap}

    .wrap{background:linear-gradient(180deg,#fff 0%, var(--b-25) 100%); border:1px solid var(--bd); border-radius:var(--radius)}
    .title{margin:0; font-weight:800; color:var(--b-600); font-size:1.15rem}
    .desc{margin:.25rem 0 0 0; color:var(--muted); font-size:.95rem}

    /* Grid de carpetas */
    .grid{
      list-style:none; padding:0; margin:1rem 0 0 0;
      display:grid; gap:0.9rem;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    /* Tarjeta tipo carpeta */
    .card{
      position:relative; display:block; text-decoration:none; color:inherit;
      background:#fff; border:1px solid var(--bd); border-radius:14px;
      box-shadow:var(--shadow);
      transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease, background .18s ease;
      overflow:hidden;
    }
    /* Cinta superior (tapa de la carpeta) */
    .card::before{
      content:""; position:absolute; inset:0 0 auto 0; height:42px;
      background:linear-gradient(180deg, var(--b-100) 0%, var(--b-50) 100%);
    }
    /* Pestañita de la carpeta */
    .card::after{
      content:""; position:absolute; top:16px; left:14px; width:58px; height:14px;
      background:#fff; border:1px solid var(--bd); border-bottom:none;
      border-top-left-radius:8px; border-top-right-radius:8px;
      box-shadow:0 -2px 6px rgba(16,24,40,.06);
    }

    .inner{position:relative; padding:58px 14px 14px 14px}
    .name{
      font-weight:700; font-size:1rem; color:var(--ink);
      display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
      min-height:2.6em; /* mantiene altura pareja */
    }
    .meta{margin-top:.35rem; font-size:.85rem; color:var(--muted)}
    .meta .dot{margin:0 .4rem; opacity:.5}

    .card:hover{transform:translateY(-2px); box-shadow:0 12px 26px rgba(16,24,40,.14); border-color:var(--b-100); background:#fff}
    .card:focus-visible{outline:none; box-shadow:0 0 0 3px color-mix(in srgb, var(--b-500) 38%, transparent), var(--shadow); border-color:var(--b-100)}

    /* Icono carpeta */
    .ico{position:absolute; top:10px; right:10px; opacity:.22}
    .ico svg{display:block}

    /* Animación sutil */
    .fade-in{animation:fadeIn .22s ease both}
    @keyframes fadeIn{from{opacity:0; transform:translateY(2px)} to{opacity:1; transform:translateY(0)}}
    @media (prefers-reduced-motion: reduce){ .fade-in{animation:none} }
  `;

  /* ===== Utilidades ===== */
  _norm(s){return (s||'').toString().normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().trim();}
  _host(u){ try{ return new URL(u).hostname.replace(/^www\./,''); }catch{ return ''; } }

  get selectedDocs(){
    const key = this._norm(this.page);
    const entry = Object.entries(this.data || {}).find(([k]) => this._norm(k) === key);
    return entry ? entry[1] : [];
  }
  get data(){
    return {
      'Auditoría Interna': [
        { title: '7- Informe de auditoria interna de control interno 2023', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/7-%20Informe%20de%20auditoria%20interna%20de%20control%20interno%202023.pdf' },
        { title: 'AUDITORIA URGENCIAS', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/AUDITORIA%20URGENCIAS.pdf' },
        { title: 'AUDITORIA PRESUPUESTO', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/AUDITORIA%20PRESUPUESTO.pdf' },
        { title: 'AUDITORIA ALMACEN', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/AUDITORIA%20ALMACEN.pdf' },
        { title: 'AUDITORIA INTERNA GESTION DOCUMENTAL', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/AUDITORIA%20INTERNA%20GESTION%20DOCUMENTAL.pdf' },
        { title: 'PROGRAMA ANUAL DE AUDITORIAS INTERNAS', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/PROGRAMA%20ANUAL%20DE%20AUDITORIAS%20INTERNAS.pdf' },
        { title: 'AUDITORIA SIAU', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/AUDITORIA%20ALMACEN.pdf' },
      ],
      'Entes de control y mecanismos de supervisión': [
        { title: 'Protocolo Entes de Control y Mecanismos de Supervisión', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Protocolo%20Entes%20de%20Control%20y%20Mecanismos%20de%20Supervisi%C3%B3n.pdf' },
      ],
      'FURAG Certificados': [
        { title: 'Certificado FURAG 2021 CI', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Certificado%20FURAG%202021%20CI.pdf' },
        { title: 'Certificado FURAG 2022 CI', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Certificado%20FURAG%202022%20CI.pdf' },
        { title: 'Certificado FURAG 2023 CI', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Certificado%20FURAG%202023%20CI.pdf' },
        { title: 'Certificado FURAG 2023 PLANEACIÓN', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Certificado%20FURAG%202023%20PLANEACI%C3%93N.pdf' },
        { title: 'Certificado FURAG 2024 CI', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Certificado%20FURAG%202024%20CI.pdf' },
        { title: 'Certificado FURAG 2024 PLANEACIÓN', url: 'Certificado FURAG 2024 PLANEACIÓN' },
        { title: 'Certificasdo FURAG 2022 PLANECIÓN', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Certificasdo%20FURAG%202022%20PLANECI%C3%93N.pdf' },
      ],
      'Informes de Gestión': [
        { title: 'INFORME EJECUTIVO ANUAL DE CONTROL INTERNO 2024', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/1.%20INFORME%20EJECUTIVO%20ANUAL%20DE%20CONTROL%20INTERNO%202024.pdf' },
        { title: 'Informe de auditoria interna de control interno 2023', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/7-%20Informe%20de%20auditoria%20interna%20de%20control%20interno%202023.pdf' },
        { title: 'Informe de control interno contable', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Informe%20de%20control%20interno%20contable.pdf' },
        { title: 'EVALUACION DE CONTROL INTERNO CONTABLE 2021', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/EVALUACION%20DE%20CONTROL%20INTERNO%20CONTABLE%202021.pdf' },
        { title: 'EVALUACIÓN DE CONTROL INTERNO CONTABLE 2024', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/EVALUACI%C3%93N%20DE%20CONTROL%20INTERNO%20CONTABLE%202024.pdf' },
        { title: 'HSJ- INFORME EJECUCION PLAN DE GESTION - Vigencia 2022', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/HSJ-%20INFORME%20EJECUCION%20PLAN%20DE%20GESTION%20-%20Vigencia%202022.pdf' },
        { title: 'INFORME DE AUSTERIDAD Y EFICIENCIA DEL GASTO PUBLICO', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/INFORME%20DE%20AUSTERIDAD%20Y%20EFICIENCIA%20DEL%20GASTO%20PUBLICO.pdf' },
        { title: 'Informe de control interno contable', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Informe%20de%20control%20interno%20contable.pdf' },
        { title: 'INFORME DE SEGUIMIENTO SIAU 2024', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/INFORME%20DE%20SEGUIMIENTO%20SIAU%202024.pdf' },
        { title: 'Informe Defensa Pública Prevención Daño Antijurídico', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Informe%20Defensa%20P%C3%BAblica%20Prevenci%C3%B3n%20Da%C3%B1o%20Antijur%C3%ADdico.pdf' },
        { title: 'informe triste 1-3 siau', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/informe%20triste%201-3%20siau.pdf' },
        { title: 'informe triste 3-6  siau', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/informe%20triste%203-6%20%20siau.pdf' },
        { title: 'SIAU (1) 2024 PQRS (1)', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/SIAU%20%281%29%202024%20PQRS%20%281%29.pdf' },
      ],
      'Metas e Indicadores': [
        { title: 'INFORME GENERAL DE MEDICION DE PLANES DE ACCION', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/INFORME%20GENERAL%20DE%20MEDICION%20DE%20PLANES%20DE%20ACCION%20.pdf' },
      ],
      'MIPG': [
        { title: 'MANUAL PARA LA ARTICULACION DE LAS DIMENSIONES DE MIPG', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/MANUAL%20PARA%20LA%20ARTICULACION%20DE%20LAS%20DIMENSIONES%20DE%20MIPG.pdf' },
      ],
      'Normatividad': [
        { title: 'Anexo Obligaciones de Reporte', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/Anexo%20Obligaciones%20de%20Reporte.pdf' },
      ],
      'PDI': [
        { title: 'Plan Anticorrupción (PAAC)', url: '' },
        { title: 'PAAC ESE HSJ 2025', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/PAAC%20ESE%20HSJ%202025.pdf' },
        { title: 'PAAC ESE HSJ 2024', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/PAAC%20ESE%20HSJ%202024.pdf' },
        { title: '4- Seguimiento plan anticorrupcion', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/4-%20Seguimiento%20plan%20anticorrupcion.pdf' },
        { title: 'PAAC ESE HSJ 2023', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/PAAC%20ESE%20HSJ%202023.pdf' },
        { title: 'PAAC ESE HSJ 2022', url: 'https://hospitalsanjorgeayapel.info/LectorPdf/pdfs/PAAC%20ESE%20HSJ%202022.pdf' },
      ],
      'Plan de Acción': [],
      'Planes de mejoramiento': [],
    };
  }

  render(){
    const docs = this.selectedDocs;
    return html`
      <section class="wrap pa3 br3 fade-in">
        <h3 class="title">${this.page || 'Documentos'}</h3>
        <p class="desc mb0">${docs.length ? `(${docs.length}) enlaces` : 'Listado vacío'}</p>

        ${docs.length ? html`
          <ul class="grid" role="list" aria-label=${`Carpetas: ${this.page}`}>
            ${docs.map(d => {
              const host = this._host(d.url || '');
              return html`
                <li role="listitem">
                  <a class="card" href=${d.url || '#'} target="_blank" rel="noopener" title=${d.title}>
                    <span class="ico" aria-hidden="true">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 4l2 2h7a1 1 0 011 1v2H4V6a2 2 0 012-2h4z"></path>
                        <path d="M4 9h18v8a2 2 0 01-2 2H6a2 2 0 01-2-2V9z"></path>
                      </svg>
                    </span>
                    <div class="inner">
                      <div class="name">${d.title}</div>
                      <div class="meta">
                        ${host ? html`<span>${host}</span><span class="dot">•</span>` : ''}
                        <span>Abrir</span>
                      </div>
                    </div>
                  </a>
                </li>
              `;
            })}
          </ul>
        ` : html`
          <div class="pa3" role="status" aria-live="polite">
            <span class="desc">Sin documentos para «${this.page}».</span>
          </div>
        `}
      </section>
    `;
  }
}

const TAG = 'mipg-x';
if(!customElements.get(TAG)) customElements.define(TAG, MipgXCards);
