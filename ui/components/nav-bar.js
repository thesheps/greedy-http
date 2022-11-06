import { css, html, LitElement } from "https://unpkg.com/lit?module";

import styles from "../../styles/styles.js";
import Store from "../services/store-service.js";
import WebSocketService from "../services/web-socket-service.js";

class NavBar extends LitElement {
  constructor() {
    super();
  }

  static styles = [
    ...styles,
    css`
      nav {
        box-shadow: 0 0.2px 0;
        background: #12191f;
      }
      a {
        color: white;
      }
      .shimmer {
        text-color: radial-gradient(
          circle,
          rgba(18, 25, 31, 1) 0%,
          rgba(15, 38, 48, 1) 100%,
          rgba(0, 212, 255, 1) 100%
        );
      }
    `,
  ];

  async handleClick() {
    WebSocketService.disconnect();
  }

  render() {
    const notListening = html`<li>
      <strong>Not listening...</strong>
    </li>`;

    const listening = html`<li class="shimmer">
        <strong>Listening on: </strong>${Store.apiUrl}
      </li>
      <li><a href="#" @click=${this.handleClick}>Disconnect</a></li>`;

    const contents = html`<ul>
        <li>
          <h1><a href="/">greedy-http</a></h1>
        </li>
      </ul>

      <ul>
        ${(Store.isConnected && listening) || notListening}
      </ul>`;

    return html`<nav id="nav-bar" class="container-fluid">${contents}</nav>`;
  }
}

customElements.define("nav-bar", NavBar);
