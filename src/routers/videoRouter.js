import express from "express";
import {
  getEdit,
  postEdit,
  see,
  getUpload,
  deleteVideo,
  postUpload,
} from "../controllers/videoController";
import { protectorMiddleware, uploadVideo } from "../middlewares";
const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", see); // 정규식
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit); //몽고 db 아이디를 위한 정규식이다

videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteVideo);

videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(uploadVideo.fields([{ name: "video" }, { name: "thumb" }]), postUpload);
export default videoRouter;
