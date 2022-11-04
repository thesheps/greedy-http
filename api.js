const http = require("http");
const ws = require("ws");

function run(apiPort, wsPort) {
  const wsServer = new ws.WebSocketServer({ port: wsPort }, () =>
    console.log(`greedy-http websocket listening on port: ${wsPort}...`)
  );

  http
    .createServer(async (req, res) => {
      const payload = {
        timestamp: new Date().getTime(),
        remoteAddress: req.socket.remoteAddress,
        headers: req.headers,
        method: req.method,
        path: req.url,
      };

      if (req.method === "POST") {
        var body = "";
        req.on("data", function (chunk) {
          body += chunk;
        });

        req.on("end", function () {
          wsServer.clients.forEach((client) =>
            client.send(JSON.stringify({ ...payload, body }))
          );
        });

        res.statusCode = 200;
        res.end();
      } else {
        res.statusCode = 200;
        res.end();
      }
    })
    .listen(apiPort);

  console.log(`greedy-http api listening on port: ${apiPort}...`);
}

module.exports = { run };
