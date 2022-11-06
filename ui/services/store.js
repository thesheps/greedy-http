export default class Store {
  get apiUrl() {
    return localStorage.getItem("apiUrl") ?? "ws://localhost:3002/";
  }

  set apiUrl(value) {
    localStorage.setItem("apiUrl", value);
  }

  get requests() {
    return JSON.parse(localStorage.getItem("requests") ?? "[]");
  }

  addRequest(r) {
    const requests = JSON.parse(localStorage.getItem("requests") ?? "[]");
    requests.push(r);
    localStorage.setItem("requests", JSON.stringify(requests));
  }
}
