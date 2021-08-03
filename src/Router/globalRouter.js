import express from "express";
import {
  getLogin,
  getSignup,
  home,
  postLogin,
  postSignup,
  search,
} from "../Controller/globalController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.route("/signUp").get(getSignup).post(postSignup);
globalRouter.get("/search", search);

export default globalRouter;
