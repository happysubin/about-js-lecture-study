import express from "express";
import {
  deleteUser,
  getChangepassword,
  getEditProfile,
  logout,
  profile,
  postChangepassword,
  postEditProfile,
} from "../Controller/userController";
import { privateProtector } from "../localMiddleware";

const userRouter = express.Router();

userRouter
  .route("/edit-profile")
  .all(privateProtector)
  .get(getEditProfile)
  .post(postEditProfile);
userRouter
  .route("/change-password")
  .all(privateProtector)
  .get(getChangepassword)
  .post(postChangepassword);
userRouter.get("/delete", privateProtector, deleteUser);
userRouter.get("/logout", privateProtector, logout);
userRouter.get("/:id", profile); //user 개인 정보를 가져옴

export default userRouter;
