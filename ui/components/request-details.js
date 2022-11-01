import { css, html, LitElement } from "https://unpkg.com/lit?module";
import styles from "../../styles/styles.js";

class RequestDetails extends LitElement {
  constructor() {
    super();

    this.requestIndex = 0;

    window.addEventListener("view-details", async (e) => {
      this.requestIndex = e.detail.i;
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
    const request = JSON.parse(localStorage.getItem("requests"))[
      this.requestIndex
    ];

    const headers = (Object.keys(request.headers) ?? []).map(
      (h) =>
        html`<tr>
          <td>${h}</td>
          <td>${request.headers[h]}</td>
        </tr> `
    );

    const details = html`<small
      ><details>
        <summary>Headers</summary>
        <table role="grid">
          <thead>
            <th>Key</th>
            <th>Value</th>
          </thead>

          <tbody>
            ${headers}
          </tbody>
        </table>
      </details></small
    >`;

    return html`<aside>
      <nav id="request-details" class="container-fluid">${details}</nav>
    </aside>`;
  }
}

customElements.define("request-details", RequestDetails);
