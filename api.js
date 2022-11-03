const http = require("http");
const ws = require("ws");

function run(apiPort, wsPort) {
  const wsServer = new ws.WebSocketServer({ port: wsPort }, () =>
    console.log(`greedy-http websocket listening on port: ${wsPort}...`)
  );

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
