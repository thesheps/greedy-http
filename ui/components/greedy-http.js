import { html, LitElement } from "https://unpkg.com/lit?module";
import styles from "../../styles/styles.js";

class GreedyHttp extends LitElement {
  constructor() {
    super();
  }

  static styles = [...styles];

  render() {
    return html`<div>
      <nav-bar></nav-bar>
      <div class="grid">
        <request-lister></request-lister>
        <request-details></request-details>
      </div>
    </div>`;
  }
}

customElements.define("greedy-http", GreedyHttp);
