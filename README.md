# greedy-http

Hello and welcome! `greedy-http` is a dead-simple http interceptor build in `nodeJS` with a minimal set of dependencies.

## What is it?
- A web service to greedily intercept all web requests
- An admin UI to show the details of all web requests
- A websocket service to join the web service and admin UI together

## Quickstart
Although the app is split into 2 halves (api and ui), you can get going with this just by invoking the package directly:

```bash
$ npx greedy-http
```

We also provide a `docker` image courtesy of `ghcr.io`:

```bash
$ docker run -it -p 3000:3000 -p 3001:3001 -p 3002:3002 greedy-http 
```

This will spin the Api, UI and Websocket service up:

```bash
greedy-http api listening on port: 3000...
greedy-http ui listening on port: 3001...
greedy-http websocket listening on port: 3002...
```

## Configuration
`greedy-http` is configured by a few different environment variables:

```bash
GREEDY_HTTP_API_PORT=3000
GREEDY_HTTP_UI_PORT=3001
GREEDY_HTTP_WS_PORT=3002
```

These can be overridden by configuration flags:

```bash
$ npx greedy-http --help

  Usage: greedy http [options] [command]
  
  Commands:
    help     Display help
    version  Display version
  
  Options:
    -A, --api          Enables the api (enabled by default)
    -a, --apiPort <n>  The API port (defaults to 3000)
    -h, --help         Output usage information
    -U, --ui           Enables the admin interface (enabled by default)
    -u, --uiPort <n>   The admin UI port (defaults to 3001)
    -v, --version      Output the version number
    -w, --wsPort <n>   The local websocket port (defaults to 3002)
```

There's a `docker-compose` at the root of this repo that you can also use as a reference!