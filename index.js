const args = require("args");

args
  .option("apiPort", "The API port", process.env.GREEDY_HTTP_API_PORT ?? 3000)
  .option("uiPort", "The admin UI port", process.env.GREEDY_HTTP_UI_PORT ?? 3001)
  .option("wsPort", "The local websocket port", process.env.GREEDY_HTTP_WS_PORT ?? 3002)
  .option("ui", "Enables the admin interface", true)
  .option("api", "Enables the api", true);

const flags = args.parse(process.argv);
flags.A && require("./api").run(flags.a, flags.w);
flags.U && require("./ui").run(flags.u);
