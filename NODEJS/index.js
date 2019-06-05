const http = require("http");

http
  .createServer(function(request, response) {
    if (request.method === "GET") {
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.end(
        JSON.stringify({
          msg: "hello cors"
        })
      );
    }
  })
  .listen(8123, () => console.log("Server running at http://127.0.0.1:8123/"));
