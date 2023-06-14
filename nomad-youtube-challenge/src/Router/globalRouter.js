import express from "express";
import {
  getLogin,
  getSignup,
  postLogin,
  postSignup,
} from "../Controller/userController";

import { home, search } from "../Controller/videoController";
import { publicProtector, uploadAvatar } from "../localMiddleware";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/login").all(publicProtector).get(getLogin).post(postLogin);
globalRouter
  .route("/signUp")
  .all(publicProtector)
  .get(getSignup)
  .post(uploadAvatar.single("avatar"), postSignup);
globalRouter.get("/search", search);

export default globalRouter;
