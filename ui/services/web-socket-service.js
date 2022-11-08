import EventService from "./event-service.js";
import StoreService from "./store-service.js";

export default class WebSocketService {
  static connect() {
    WebSocketService.webSocket = new WebSocket(StoreService.apiUrl);

    WebSocketService.webSocket.onmessage = (event) => {
      StoreService.addRequest(JSON.parse(event.data));
      EventService.RequestReceived.publish();
    };

    WebSocketService.webSocket.onopen = () => {
      StoreService.isConnected = true;
      EventService.ConnectionOpened.publish();
    };

    WebSocketService.webSocket.onclose = () => {
      StoreService.isConnected = false;
      EventService.ConnectionClosed.publish();
    };
  }

  static disconnect() {
    StoreService.isConnected = false;
    WebSocketService.webSocket.close();
  }
}
