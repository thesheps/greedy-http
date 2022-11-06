import Store from "./store-service.js";

export default class WebSocketService {
  static connect() {
    WebSocketService.webSocket = new WebSocket(Store.apiUrl);

    WebSocketService.webSocket.onmessage = (event) => {
      Store.addRequest(JSON.parse(event.data));
      window.dispatchEvent(new CustomEvent("request-received"));
    };

    WebSocketService.webSocket.onopen = () => {
      Store.isConnected = true;
      window.dispatchEvent(new CustomEvent("connection-opened"));
    };

    WebSocketService.webSocket.onclose = () => {
      Store.isConnected = false;
      window.dispatchEvent(new CustomEvent("connection-closed"));
    };
  }

  static disconnect() {
    Store.isConnected = false;
    WebSocketService.webSocket.close();
  }
}
