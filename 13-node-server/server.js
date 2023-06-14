const fs = require("fs");
const http = require("http");
const server = http.createServer((req, res) => {
  /*console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
  console.log(req.httpVersion);*/
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    const read = fs.createReadStream("./13-node-server/html/index.html");
    read.pipe(res);
  } else if (req.url === "/users") {
    const read = fs.createReadStream("./13-node-server/html/user.html");
    read.pipe(res);
  } else {
    const read = fs.createReadStream("./13-node-server/html/else.html");
    read.pipe(res);
  }
});

server.listen("3000");
