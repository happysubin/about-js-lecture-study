import express from "express";
import {
  editVideo,
  see,
  upload,
  deleteVideo,
} from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", see); // 정규식
videoRouter.get("/:id(\\d+)/edit", editVideo);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", upload);
export default videoRouter;
