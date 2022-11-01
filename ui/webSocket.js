const webSocket = new WebSocket("ws://localhost:3002/");

webSocket.onmessage = (event) => {
  const requests = JSON.parse(localStorage.getItem("requests") ?? "[]");
  requests.push(JSON.parse(event.data));

  localStorage.setItem("requests", JSON.stringify(requests));
  window.dispatchEvent(new CustomEvent("request-received"));
};
