async function getClients() {
  const clientsResponse = await fetch(`http://localhost:7379/GET/clients`);
  const clientsText = await clientsResponse.text();
  console.log(JSON.parse(clientsText));
}

getClients();
