const http = require("http");
const ejs = require("ejs");

const name = "develop";
const courses = [
  {
    name: "HTML",
  },
  {
    name: "CSS",
  },
];
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    ejs
      .renderFile("./13-node-server/template/index.ejs", { name })
      .then((data) => {
        res.end(data);
      });
  } else if (req.url === "/users") {
    ejs
      .renderFile("./13-node-server/template/user.ejs", { courses })
      .then((data) => {
        res.end(data);
      });
  } else {
    ejs
      .renderFile("./13-node-server/template/else.ejs", { name })
      .then((data) => {
        res.end(data);
      });
  }
});

server.listen("3000");
