const http = require("http");
const static = require("node-static");

const uiPort = process.env.UI_PORT ?? 3001;

function run() {
  const staticServer = new static.Server(`${__dirname}/ui`);
  http.createServer((req, res) => staticServer.serve(req, res)).listen(uiPort);

  console.log(`greedy-http ui listening on port: ${uiPort}...`);
}

module.exports = { run };
