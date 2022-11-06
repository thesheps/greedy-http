import Store from "./store.js";

const webSocket = new WebSocket("ws://localhost:3002/");
const store = new Store();

webSocket.onmessage = (event) => {
  store.addRequest(JSON.parse(event.data));
  window.dispatchEvent(new CustomEvent("request-received"));
};
