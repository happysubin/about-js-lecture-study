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

videoRouter.get("/:id(\\d+)", see); // 정규식
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

videoRouter.get("/:id(\\d+)/delete", deleteVideo);

videoRouter.route("/upload").get(getUpload).post(postUpload);
export default videoRouter;
