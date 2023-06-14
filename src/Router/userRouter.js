import express from "express";
import {
  deleteUser,
  getChangepassword,
  getEditProfile,
  logout,
  profile,
  postChangepassword,
  postEditProfile,
  getGithub,
  finalGithub,
} from "../Controller/userController";
import {
  privateProtector,
  publicProtector,
  uploadAvatar,
} from "../localMiddleware";

const userRouter = express.Router();

userRouter
  .route("/edit-profile")
  .all(privateProtector)
  .get(getEditProfile)
  .post(uploadAvatar.single("avatar"), postEditProfile);
userRouter
  .route("/change-password")
  .all(privateProtector)
  .get(getChangepassword)
  .post(postChangepassword);
userRouter.get("/delete", privateProtector, deleteUser);
userRouter.get("/logout", privateProtector, logout);
userRouter.get("/:id", profile); //user 개인 정보를 가져옴

userRouter.get("/github/login", publicProtector, getGithub);
userRouter.get("/github/callback", publicProtector, finalGithub);

export default userRouter;
