import { css, html, LitElement } from "https://unpkg.com/lit?module";
import styles from "../../styles/styles.js";

class RequestLister extends LitElement {
  constructor() {
    super();

    window.addEventListener("request-received", async (e) => {
      this.requestUpdate();
    });
  }

  static styles = [
    ...styles,
    css`
      aside {
        margin-top: 24px;
      }
      a {
        color: white;
      }
    `,
  ];

  render() {
    const requests = JSON.parse(localStorage.getItem("requests"));
    const requestsHtml = (requests ?? []).map(
      (r) =>
        html`<li>
          ${new Date(r.timestamp).toUTCString()} - ${r.remoteAddress}
        </li>`
    );

    const lister = html`<div>
      <h2>Requests</h2>
      <ul>
        ${requestsHtml}
      </ul>
    </div>`;

    return html`<aside>
      <nav id="request-lister" class="container-fluid">${lister}</nav>
    </aside>`;
  }
}

customElements.define("request-lister", RequestLister);
