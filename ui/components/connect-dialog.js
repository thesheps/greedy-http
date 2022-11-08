import { html, LitElement } from "https://unpkg.com/lit?module";

import styles from "../../styles/styles.js";
import StoreService from "../services/store-service.js";
import WebSocketService from "../services/web-socket-service.js";

class ConnectDialog extends LitElement {
  constructor() {
    super();
  }

  get apiUrlElement() {
    return this.shadowRoot.getElementById("apiUrl");
  }

  static styles = [...styles];

  async handleClick(i) {
    StoreService.apiUrl = this.apiUrlElement.value;
    WebSocketService.connect();
  }

  render() {
    return html`<dialog open>
      <article>
        <header>
          <a href="#close" aria-label="Close" class="close"></a>
          Welcome to greedy-http!
        </header>
        <p>To get started, just connect to a greedy-http server!</p>

        <br />

        <label for="websocket">
          Server address
          <input
            id="apiUrl"
            type="text"
            placeholder="Server address"
            value="${StoreService.apiUrl}"
          />
        </label>

        <button @click="${this.handleClick}">Connect</button>
      </article>
    </dialog>`;
  }
}

customElements.define("connect-dialog", ConnectDialog);
