const http = require("http");
const ws = require("ws");

const apiPort = process.env.API_PORT ?? 3000;
const wsPort = process.env.WEBSOCKET_PORT ?? 3002;

function run() {
  const wsServer = new ws.WebSocketServer({ port: wsPort });

  http
    .createServer(async (req, res) => {
      const payload = JSON.stringify({
        timestamp: new Date().getTime(),
        remoteAddress: req.socket.remoteAddress,
        headers: req.headers,
        path: req.url,
      });

      wsServer.clients.forEach((client) => client.send(payload));

      res.statusCode = 200;
      res.end();
    })
    .listen(apiPort);

  console.log(`greedy-http api listening on port: ${apiPort}...`);
}

module.exports = { run };
