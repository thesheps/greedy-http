const http = require("http");
const static = require("node-static");
const ws = require("ws");

const apiPort = process.env.API_PORT ?? 3000;
const uiPort = process.env.UI_PORT ?? 3001;
const wsPort = process.env.WEBSOCKET_PORT ?? 3002;

function run() {
  const wsServer = new ws.WebSocketServer({ port: wsPort });
  const staticServer = new static.Server(`${__dirname}/ui`);

  http.createServer((req, res) => staticServer.serve(req, res)).listen(uiPort);

  http
    .createServer(async (req, res) => {
      const payload = JSON.stringify({
        timestamp: new Date().getTime(),
        remoteAddress: req.socket.remoteAddress,
        headers: req.headers,
      });

      wsServer.clients.forEach((client) => client.send(payload));

      res.statusCode = 200;
      res.end();
    })
    .listen(apiPort);
}

module.exports = {
  run,
};
