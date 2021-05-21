import express from "express";
import {
  edit,
  deleteUser,
  see,
  logout,
  startGithubLogin,
  finalGithubLogin,
} from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);
userRouter.get("/logout", logout);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/final", finalGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
