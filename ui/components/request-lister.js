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
      tr.request:hover {
        background-color: #73828B;
      }
    `,
  ];

  async handleClick(i) {
    window.dispatchEvent(new CustomEvent("view-details", { detail: { i } }));
  }

  render() {
    const requests = JSON.parse(localStorage.getItem("requests"));
    const requestsHtml = (requests ?? []).map(
      (r, i) =>
        html`<tr class="request" @click="${() => this.handleClick(i)}">
          <td>${new Date(r.timestamp).toUTCString()}</td>
          <td>${r.remoteAddress}</td>
          <td>${r.path}</td>
        </tr>`
    );

    const lister = html`<div>
      <h2>Requests</h2>
      <table role="grid">
        <thead>
          <th scope="col">Timestamp</th>
          <th scope="col">IP address</th>
          <th scope="col">Path</th>
        </thead>

        <tbody>
          ${requestsHtml}
        </tbody>
      </table>
    </div>`;

    return html`<aside>
      <nav id="request-lister" class="container-fluid">${lister}</nav>
    </aside>`;
  }
}

customElements.define("request-lister", RequestLister);
