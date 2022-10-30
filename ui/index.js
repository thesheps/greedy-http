const webSocket = new WebSocket("ws://localhost:3002/");

webSocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};
