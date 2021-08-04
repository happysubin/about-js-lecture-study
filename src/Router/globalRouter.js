import express from "express";
import {
  getLogin,
  getSignup,
  postLogin,
  postSignup,
} from "../Controller/userController";

import { home, search } from "../Controller/videoController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.route("/signUp").get(getSignup).post(postSignup);
globalRouter.get("/search", search);

export default globalRouter;
