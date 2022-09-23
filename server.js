// const http = require('http');
// const debug = require("debug")("node-angular");
// const app = require("./backend/app");

// const port = process.env.PORT || "3000";
// app.set("port", port);

// // const server = http.createServer((req, res) => {
// //   res.end('Hello World!This is my first nodejs server');
// // });
// const server = http.createServer(app);/*we need to store that server in a new constant because we'll not change this value and thereafter we

// can call server listen and to listen, we need to pass a port number. */

// server.listen(port);
//--------------------------------------------------------------------------------------------
//After lesson37.

const http = require('http');
const debug = require("debug")("node-angular");
const app = require("./backend/app");

const normalizePort = val => {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  };

  const onError = error => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  const onListening = () => {
    const addr = server.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    debug("Listening on " + bind);
  };

const port = process.env.PORT || "3000";
app.set("port", port);

// const server = http.createServer((req, res) => {
//   res.end('Hello World!This is my first nodejs server');
// });
/*we need to store that server in a new constant because we'll not change this value and thereafter we
can call server listen and to listen, we need to pass a port number. */
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);




