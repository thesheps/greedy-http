import { html, LitElement } from "https://unpkg.com/lit?module";

import styles from "../../styles/styles.js";
import Store from "../services/store-service.js";
import WebSocketService from "../services/web-socket-service.js";

class GreedyHttp extends LitElement {
  constructor() {
    super();

    if (Store.isConnected) {
      WebSocketService.connect();
    }

    window.addEventListener("connection-opened", async (e) =>
      this.requestUpdate()
    );

    window.addEventListener("connection-closed", async (e) => {
      this.requestUpdate();
    });
  }

  static styles = [...styles];

  render() {
    const connect = html`<div>
      <nav-bar></nav-bar>
      <connect-dialog></connect-dialog>
    </div>`;

    const requests = html`<div class="grid">
      <request-lister></request-lister>
      <request-details></request-details>
    </div>`;

    return (
      (Store.isConnected &&
        html`<div>
          <nav-bar></nav-bar>
          ${requests}
        </div>`) ||
      html`${connect}`
    );
  }
}

customElements.define("greedy-http", GreedyHttp);
