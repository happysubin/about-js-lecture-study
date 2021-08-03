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

const userRouter = express.Router();

userRouter.route("/edit-profile").get(getEditProfile).post(postEditProfile);
userRouter
  .route("/change-password")
  .get(getChangepassword)
  .post(postChangepassword);
userRouter.get("/delete", deleteUser);
userRouter.get("/logout", logout);
userRouter.get("/:id", profile); //user 개인 정보를 가져옴

export default userRouter;
