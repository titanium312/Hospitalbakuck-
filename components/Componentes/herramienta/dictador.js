// ../../herramienta/dictador.js
// API programática `dictador` + Web Component <dictador-tts>

class Dictador {
  #utterance = null;
  #isSpeaking = false;
  #subs = new Set();

  constructor() {
    try { window.speechSynthesis?.getVoices?.(); } catch {}
  }

  get isSpeaking() { return this.#isSpeaking; }

  onEstado(cb) {
    if (typeof cb !== 'function') return () => {};
    const handler = (e) => cb(e.detail);
    window.addEventListener('dictador:estado', handler);
    queueMicrotask(() => cb({ isSpeaking: this.#isSpeaking }));
    return () => window.removeEventListener('dictador:estado', handler);
  }

  #emit() {
    window.dispatchEvent(new CustomEvent('dictador:estado', {
      detail: { isSpeaking: this.#isSpeaking }
    }));
  }

  #selectVoice(prefLang){
    const voices = window.speechSynthesis?.getVoices?.() || [];
    if (!voices.length) return null;
    if (prefLang){
      const exact = voices.find(v => (v.lang || '').toLowerCase() === prefLang.toLowerCase());
      if (exact) return exact;
      const base = prefLang.split('-')[0];
      const partial = voices.find(v => (v.lang || '').toLowerCase().startsWith(base.toLowerCase()));
      if (partial) return partial;
    }
    return voices.find(v => /spanish.*colom|es-CO/i.test(`${v.name} ${v.lang}`))
        || voices.find(v => /(^|\s)(es-|spanish)/i.test(`${v.name} ${v.lang}`))
        || voices[0]
        || null;
  }

  dictar(texto, { rate = 1, pitch = 1, volume = 1, lang = null } = {}) {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta síntesis de voz. Prueba en Chrome, Edge o Safari.');
      return;
    }
    this.detener();
    const u = new SpeechSynthesisUtterance(texto);
    const v = this.#selectVoice(lang);
    if (v) u.voice = v;
    if (lang) u.lang = lang;
    u.rate = rate; u.pitch = pitch; u.volume = volume;
    u.onend = () => { this.#isSpeaking = false; this.#emit(); };
    u.onerror = () => { this.#isSpeaking = false; this.#emit(); };
    this.#utterance = u;
    this.#isSpeaking = true;
    this.#emit();
    window.speechSynthesis.speak(u);
  }

  detener() {
    try { window.speechSynthesis?.cancel?.(); } catch {}
    this.#utterance = null;
    this.#isSpeaking = false;
    this.#emit();
  }
}

export const dictador = new Dictador();
// Compat global opcional (por si hay código legado)
try { window.dictador = window.dictador || dictador; window.Dictador = window.Dictador || dictador; } catch {}

// ======== <dictador-tts> ========
class DictadorTTS extends HTMLElement {
  static get observedAttributes(){ return ['lang','rate','pitch','volume','ui']; }
  constructor(){
    super();
    this.attachShadow({ mode: 'open' });
    this._isSpeaking = dictador.isSpeaking ?? false;
    this._off = dictador.onEstado(({ isSpeaking }) => {
      this._isSpeaking = !!isSpeaking;
      this.#updateButtons();
    });
  }
  connectedCallback(){ this.#render(); }
  disconnectedCallback(){ if (typeof this._off === 'function') this._off(); }
  attributeChangedCallback(){ /* Los getters leen los atributos en cada acción */ }

  get lang(){ return this.getAttribute('lang') || null; }
  get rate(){ return Number(this.getAttribute('rate') ?? 1) || 1; }
  get pitch(){ return Number(this.getAttribute('pitch') ?? 1) || 1; }
  get volume(){ return Number(this.getAttribute('volume') ?? 1) || 1; }
  get ui(){ return this.hasAttribute('ui'); }

  #render(){
    const style = `
      :host{display:block}
      .tts-bar{
        display:flex; gap:.5rem; justify-content:center; align-items:center; margin: 0 0 1rem;
        position: sticky; top:.5rem; z-index:5;
      }
      button{
        cursor:pointer; border:none; padding:.6rem 1.2rem; border-radius:9999px; font-weight:700;
        transition: background .3s ease, transform .2s ease, opacity .2s ease; font-size:.95rem;
      }
      button:hover{ transform: translateY(-1px); }
      button[disabled]{ opacity:.6; cursor:not-allowed; transform:none; }
      .play{ background:#1d4ed8; color:#fff; }
      .stop{ background:#ef4444; color:#fff; }
      @media (prefers-reduced-motion: reduce){
        button{ transition:none!important }
        button:hover{ transform:none!important }
      }
      .slot-wrap{ display:block }
    `;
    this.shadowRoot.innerHTML = `
      <style>${style}</style>
      ${this.ui ? `
        <div class="tts-bar" role="toolbar" aria-label="Lectura en voz alta">
          <button class="play" id="btnPlay" type="button">🔊 Dictar</button>
          <button class="stop" id="btnStop" type="button">⏹️ Detener</button>
        </div>` : ``}
      <div class="slot-wrap"><slot></slot></div>
    `;
    if (this.ui){
      this.shadowRoot.getElementById('btnPlay')?.addEventListener('click', () => this.#play());
      this.shadowRoot.getElementById('btnStop')?.addEventListener('click', () => this.#stop());
      this.#updateButtons();
    }
  }

  #updateButtons(){
    if (!this.ui) return;
    const play = this.shadowRoot.getElementById('btnPlay');
    const stop = this.shadowRoot.getElementById('btnStop');
    if (!play || !stop) return;
    play.disabled = this._isSpeaking;
    stop.disabled = !this._isSpeaking;
  }

  #play(){
    const text = this.#getVisibleText();
    if (!text) return;
    dictador.dictar(text, { rate: this.rate, pitch: this.pitch, volume: this.volume, lang: this.lang });
  }
  #stop(){ dictador.detener(); }

  // Toma SOLO el texto visible dentro del slot (omite PDFs, scripts, secciones colapsadas, etc.)
  #getVisibleText(){
    const slot = this.shadowRoot.querySelector('slot');
    const nodes = slot ? slot.assignedNodes({ flatten:true }) : [];
    const container = document.createElement('div');
    nodes.forEach(n => container.appendChild(n.cloneNode(true)));

    container.querySelectorAll('script, style, iframe, audio, video').forEach(n => n.remove());
    container.querySelectorAll('lectot-wie').forEach(n => n.remove());
    container.querySelectorAll('.accordion:not(.open), [aria-hidden="true"]').forEach(n => n.remove());
    container.querySelectorAll('a').forEach(a => { a.replaceWith(document.createTextNode(a.textContent || '')); });
    container.querySelectorAll('button').forEach(b => { b.remove(); });

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
    const chunks = [];
    while (walker.nextNode()){
      const t = walker.currentNode.nodeValue.replace(/\s+/g, ' ').trim();
      if (t) chunks.push(t);
    }
    return chunks.join('. ').replace(/\. \./g, '. ');
  }
}

customElements.define('dictador-tts', DictadorTTS);
