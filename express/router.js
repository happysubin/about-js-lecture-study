import express from "express";

const app = express();
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.send("GET");
  })
  .post((req, res) => {
    res.send("POST");
  })
  .put((req, res) => {
    res.send("put");
  });

export default Router;
