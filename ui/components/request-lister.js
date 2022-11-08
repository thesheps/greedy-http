import { css, html, LitElement } from "https://unpkg.com/lit?module";

import styles from "../../styles/styles.js";
import EventService from "../services/event-service.js";
import StoreService from "../services/store-service.js";

class RequestLister extends LitElement {
  constructor() {
    super();

    this.selectedRequestIndex = null;
    EventService.RequestReceived.subscribe(() => this.requestUpdate());
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
        background-color: #43525b !important;
      }
      tr.selected-request {
        background-color: #73828b !important;
      }
      #request-lister {
        max-height: calc(100vh - 300px);
        overflow-y: scroll;
      }
    `,
  ];

  async handleClick(i) {
    this.selectedRequestIndex = i;
    this.requestUpdate();

    EventService.ViewDetails.publish({ detail: { selectedRequestIndex: i } });
  }

  render() {
    const requestsHtml = (StoreService.requests ?? []).map(
      (r, i) =>
        html`<tr
          class="${(this.selectedRequestIndex == i && "selected-request") ||
          "request"}"
          @click="${() => this.handleClick(i)}"
        >
          <td>${new Date(r.timestamp).toUTCString()}</td>
          <td>${r.remoteAddress}</td>
          <td>${r.method}</td>
          <td>${r.path}</td>
        </tr>`
    );

    const lister = html`<small>
      <h2>Requests</h2>
      <div id="request-lister">
        <table role="grid">
          <thead>
            <th scope="col">Timestamp</th>
            <th scope="col">IP address</th>
            <th scope="col">Method</th>
            <th scope="col">Path</th>
          </thead>

          <tbody>
            ${requestsHtml}
          </tbody>
        </table>
      </div>
    </small>`;

    return html`<aside>
      <nav class="container-fluid">${lister}</nav>
    </aside>`;
  }
}

customElements.define("request-lister", RequestLister);
