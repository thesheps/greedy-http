import { css, html, LitElement } from "https://unpkg.com/lit?module";
import styles from "../../styles/styles.js";

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
    `,
  ];

  render() {
    const brand = html`<ul>
        <li>
          <h1><a href="/">greedy-http</a></h1>
        </li>
      </ul>
      <ul>
        <li>I'm listening...</li>
      </ul>`;

    return html`<nav id="nav-bar" class="container-fluid">${brand}</nav>`;
  }
}

customElements.define("nav-bar", NavBar);
