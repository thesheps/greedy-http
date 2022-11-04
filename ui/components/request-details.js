import { css, html, LitElement } from "https://unpkg.com/lit?module";
import styles from "../../styles/styles.js";

class RequestDetails extends LitElement {
  constructor() {
    super();

    this.selectedRequestIndex = null;

    window.addEventListener("view-details", async (e) => {
      this.selectedRequestIndex = e.detail.selectedRequestIndex;
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
      .request-details {
        max-height: calc(100vh - 600px);
        overflow-y: scroll;
      }
    `,
  ];

  render() {
    const requests = JSON.parse(localStorage.getItem("requests"));
    const request = (requests && requests[this.selectedRequestIndex]) || {
      headers: [],
      body: "",
    };

    const headers = (Object.keys(request.headers) ?? []).map(
      (key) =>
        html`<tr>
          <td>${key}</td>
          <td>${request.headers[key]}</td>
        </tr>`
    );

    const headerDetails = html`<small
      ><details>
        <summary>Headers</summary>

        <div class="request-details">
          <table role="grid">
            <thead>
              <th>Key</th>
              <th>Value</th>
            </thead>

            <tbody>
              ${headers}
            </tbody>
          </table>
        </div>
      </details></small
    >`;

    const bodyDetails = html`<small
      ><details>
        <summary>Body</summary>

        <div class="request-details">${request.body}</div>
      </details></small
    >`;

    return html`<aside>
      <h2>Details</h2>
      <nav class="container-fluid">${headerDetails}</nav>
      <nav class="container-fluid">${bodyDetails}</nav>
    </aside>`;
  }
}

customElements.define("request-details", RequestDetails);
