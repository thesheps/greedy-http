const http = require("http");

const webdisHost = process.env.WEBDIS_HOST;
const webdisPort = process.env.WEBDIS_PORT;
const serverPort = process.env.SERVER_PORT;
const server = http.createServer();

async function getClients() {
  const clients = await fetch(`http://${webdisHost}:${webdisPort}/GET/clients`);
  const clientsText = await clients.text();
  const clientsValue = JSON.parse(clientsText)["GET"];

  return JSON.parse(clientsValue);
}

async function updateClients(remoteAddress) {
  const clients = (await getClients()) ?? [];

  if (clients.includes(remoteAddress)) return;

  clients.push(remoteAddress);
  const payload = encodeURIComponent(JSON.stringify(clients));
  await fetch(`http://${webdisHost}:${webdisPort}/SET/clients/${payload}`);
}

async function saveRequest(req, remoteAddress) {
  const timestamp = new Date().getTime();
  const key = `${remoteAddress}-${timestamp}`;
  const payload = encodeURIComponent({
    timestamp,
    remoteAddress,
    headers: req.headers,
  });

  await fetch(`http://${webdisHost}:${webdisPort}/SET/${key}/${payload}`);
}

server.on("request", async (req, res) => {
  const remoteAddress = req.socket.remoteAddress;

  await updateClients(remoteAddress);
  await saveRequest(req, remoteAddress);

  res.statusCode = 200;
  res.end();
});

server.listen(serverPort);
