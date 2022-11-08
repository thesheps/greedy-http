import { html, LitElement } from "https://unpkg.com/lit?module";

import styles from "../../styles/styles.js";
import EventService from "../services/event-service.js";
import StoreService from "../services/store-service.js";
import WebSocketService from "../services/web-socket-service.js";

class GreedyHttp extends LitElement {
  constructor() {
    super();

    if (StoreService.isConnected) {
      WebSocketService.connect();
    }

    EventService.ConnectionOpened.subscribe(() => this.requestUpdate());
    EventService.ConnectionClosed.subscribe(() => this.requestUpdate());
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
      (StoreService.isConnected &&
        html`<div>
          <nav-bar></nav-bar>
          ${requests}
        </div>`) ||
      html`${connect}`
    );
  }
}

customElements.define("greedy-http", GreedyHttp);
