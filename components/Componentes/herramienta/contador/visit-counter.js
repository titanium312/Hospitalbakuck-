// view-counter.js
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

const ENDPOINT = 'https://hospitalsanjorgeayapel.info/vue/components/Componentes/herramienta/contador/visitas.php';

class ViewCounter extends LitElement {
  static properties = {
    key: { type: String, reflect: true },
    mode: { type: String, reflect: true },      // "inc" | "get" (default: "inc")
    endpoint: { type: String, reflect: true },  // opcional sobrescribir
    views: { type: Number, state: true },
    loading: { type: Boolean, state: true },
    error: { type: String, state: true },
    variant: { type: String, reflect: true },   // "soft" | "outline" | "glass" | "badge"
    size: { type: String, reflect: true },      // "sm" | "lg"
  };

  static styles = css`
    :host{
      /* tokens */
      --vc-bg:        hsl(240 10% 10%);
      --vc-fg:        hsl(0 0% 100%);
      --vc-border:    hsl(240 5% 26%);
      --vc-accent:    hsl(212 100% 50%);
      --vc-radius:    999px;
      --vc-pad-y:     .25rem;
      --vc-pad-x:     .6rem;
      --vc-gap:       .4rem;
      --vc-shadow:    0 4px 16px hsl(0 0% 0% / .25);
      --vc-font:      600 .95rem/1.15 ui-sans-serif, system-ui, Segoe UI, Roboto, sans-serif;

      display:inline-flex;
      align-items:center;
      gap:var(--vc-gap);
      padding:var(--vc-pad-y) var(--vc-pad-x);
      border:1px solid var(--vc-border);
      border-radius:var(--vc-radius);
      background:linear-gradient(180deg, hsl(240 12% 15%), var(--vc-bg));
      color:var(--vc-fg);
      font:var(--vc-font);
      box-shadow:var(--vc-shadow);
      user-select:none;
      -webkit-tap-highlight-color: transparent;
    }

    :host::before{
      content:"👁️";
      font-size:1rem;
      opacity:.9;
      transform:translateY(1px);
    }

    .muted{ opacity:.65 }

    /* loading */
    :host([loading]){ position:relative; overflow:hidden }
    :host([loading]) .muted::after{
      content:"";
      position:absolute; inset:0;
      background:linear-gradient(120deg, transparent 0%, hsl(0 0% 100% / .06) 30%, transparent 60%);
      animation:vc-shimmer 1.2s infinite linear;
      pointer-events:none;
    }
    @keyframes vc-shimmer{ to { transform:translateX(100%) } }

    /* error */
    :host([error]){
      border-color:hsl(0 75% 50% / .7);
      background:hsl(0 65% 18%);
      color:hsl(0 100% 96%);
    }
    :host([error])::before{ content:"⚠️" }

    /* variantes */
    :host([variant="soft"]){
      background:hsl(212 90% 53% / .10);
      border-color:hsl(212 90% 53% / .25);
      color:hsl(212 100% 60%);
    }
    :host([variant="outline"]){
      background:transparent;
      border-color:var(--vc-accent);
      color:var(--vc-accent);
      box-shadow:none;
    }
    :host([variant="glass"]){
      background:linear-gradient(180deg, hsl(0 0% 100% / .06), hsl(0 0% 100% / .03));
      backdrop-filter:saturate(140%) blur(8px);
      border-color:hsl(0 0% 100% / .18);
    }
    :host([variant="badge"]){
      --vc-radius:.6rem;
      --vc-pad-y:.15rem; --vc-pad-x:.5rem;
      box-shadow:none;
      font:600 .83rem/1 ui-sans-serif, system-ui, Segoe UI, Roboto, sans-serif;
    }

    /* tamaños */
    :host([size="sm"]){ --vc-pad-y:.15rem; --vc-pad-x:.5rem; font-size:.85rem }
    :host([size="lg"]){ --vc-pad-y:.4rem;  --vc-pad-x:.8rem; font-size:1.05rem }
  `;

  constructor() {
    super();
    this.key = '';
    this.mode = 'inc';
    this.endpoint = ENDPOINT;
    this.views = 0;
    this.loading = false;
    this.error = '';
  }

  connectedCallback() {
    super.connectedCallback();
    queueMicrotask(() => this.#fetchCount());
  }

  updated(changed) {
    if ((changed.has('key') || changed.has('mode') || changed.has('endpoint')) && this.key) {
      this.#fetchCount();
    }
  }

  render() {
    if (this.error) return html`<span class="muted">⚠️ ${this.error}</span>`;
    return html`${this.loading ? html`<span class="muted">…</span>` : this.views}`;
  }

  async #fetchCount() {
    if (!this.key) { this.error = 'Falta key'; this.toggleAttribute('error', true); return; }
    this.loading = true; this.error = '';
    this.toggleAttribute('loading', true);
    this.removeAttribute('error');
    try {
      const url = new URL(this.endpoint);
      url.search = new URLSearchParams({ action: this.mode === 'get' ? 'get' : 'inc', key: this.key }).toString();
      const r = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      if (!data?.ok || typeof data.views !== 'number') throw new Error('Respuesta inválida');
      this.views = data.views;
      this.dispatchEvent(new CustomEvent('view-counter:updated', { detail: { key: this.key, views: this.views } }));
    } catch (e) {
      this.error = e?.message ?? 'Error';
      this.toggleAttribute('error', true);
    } finally {
      this.loading = false;
      this.toggleAttribute('loading', this.loading);
    }
  }
}

customElements.define('view-counter', ViewCounter);
export default ViewCounter;
