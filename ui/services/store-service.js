export default class Store {
  static get apiUrl() {
    return localStorage.getItem("apiUrl") ?? "ws://localhost:3002";
  }

  static set apiUrl(value) {
    localStorage.setItem("apiUrl", value);
  }

  static get isConnected() {
    return localStorage.getItem("isConnected") === "true";
  }

  static set isConnected(value) {
    localStorage.setItem("isConnected", "" + value);
  }

  static get requests() {
    return JSON.parse(localStorage.getItem("requests") ?? "[]");
  }

  static addRequest(r) {
    const requests = JSON.parse(localStorage.getItem("requests") ?? "[]");
    requests.push(r);
    localStorage.setItem("requests", JSON.stringify(requests));
  }
}
