import { css, html, LitElement } from "https://unpkg.com/lit?module";

import styles from "../../styles/styles.js";
import Store from "../services/store.js";

class NavBar extends LitElement {
  constructor() {
    super();

    this.store = new Store();
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

  render() {
    const brand = html`<ul>
        <li>
          <h1><a href="/">greedy-http</a></h1>
        </li>
      </ul>
      <ul>
        <li class="shimmer">
          <strong>Listening on: </strong>${this.store.apiUrl}
        </li>
      </ul>`;

    return html`<nav id="nav-bar" class="container-fluid">${brand}</nav>`;
  }
}

customElements.define("nav-bar", NavBar);
