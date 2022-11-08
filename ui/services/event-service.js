function getEventClient(name) {
  return {
    publish: (payload) => {
      window.dispatchEvent(new CustomEvent(name, payload));
    },

    subscribe: (handler) => {
      window.addEventListener(name, handler);
    },
  };
}

export default class EventService {
  static get RequestReceived() {
    return getEventClient("request-received");
  }

  static get ConnectionOpened() {
    return getEventClient("connection-opened");
  }

  static get ConnectionClosed() {
    return getEventClient("connection-closed");
  }

  static get ViewDetails() {
    return getEventClient("view-details");
  }
}
