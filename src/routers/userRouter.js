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
  getChangepassword,
  postChangepassword,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  uploadAvatar,
} from "../middlewares";
const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(uploadAvatar.single("avatar"), postEdit);

userRouter.get("/delete", deleteUser);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangepassword)
  .post(postChangepassword);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/final", publicOnlyMiddleware, finalGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
