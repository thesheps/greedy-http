const http = require("http");
const ws = require("ws");

const apiServer = http.createServer();
const websocketServer = new ws.WebSocketServer({
  port: process.env.WEBSOCKET_PORT,
});

apiServer
  .on("request", async (req, res) => {
    const remoteAddress = req.socket.remoteAddress;
    const timestamp = new Date().getTime();
    const payload = JSON.stringify({
      timestamp,
      remoteAddress,
      headers: req.headers,
    });

    websocketServer.clients.forEach((client) => client.send(payload));

    res.statusCode = 200;
    res.end();
  })
  .listen(process.env.API_PORT);
