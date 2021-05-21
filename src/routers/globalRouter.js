import express from "express";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { trending, search } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.get("/search", search);
globalRouter.route("/login").get(getLogin).post(postLogin);

export default globalRouter;
