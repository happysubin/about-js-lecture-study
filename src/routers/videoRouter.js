import express from "express";
import {
  getEdit,
  postEdit,
  see,
  getUpload,
  deleteVideo,
  postUpload,
} from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", see); // 정규식
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit); //몽고 db 아이디를 위한 정규식이다

videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);

videoRouter.route("/upload").get(getUpload).post(postUpload);
export default videoRouter;
