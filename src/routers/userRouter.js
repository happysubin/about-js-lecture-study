import express from "express";
import {
  edit,
  deleteUser,
  see,
  logout,
  startGithubLogin,
  finalGithubLogin,
  getEdit,
  postEdit,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";
const userRouter = express.Router();

userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/delete", deleteUser);
userRouter.get("/logout", protectorMiddleware, logout);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/final", publicOnlyMiddleware, finalGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
