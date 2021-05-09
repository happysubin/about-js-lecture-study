import express from "express";
import morgan from "morgan";
const app = express();
const logger = morgan("dev");
const PORT = 4000;
const handleHome = (req, res) => {
  res.send("<h1>what is it?</h1>");
};

const middleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const serverListening = () => {
  console.log(`server listening on PORT http://localhost:${PORT}`);
};
app.use(logger);
app.use(middleware);

app.get("/", handleHome);

app.listen(PORT, serverListening);
