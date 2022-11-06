import { html, LitElement } from "https://unpkg.com/lit?module";

import styles from "../../styles/styles.js";
import Store from "../services/store.js";

class GreedyHttp extends LitElement {
  constructor() {
    super();
    
    this.store = new Store();
  }

  static styles = [...styles];

  render() {
    const connection = html`<div></div>`;
    const requests = html`<div class="grid">
      <request-lister></request-lister>
      <request-details></request-details>
    </div>`;

    return html`<div>
      <nav-bar></nav-bar>
      ${requests}
    </div>`;
  }
}

customElements.define("greedy-http", GreedyHttp);
