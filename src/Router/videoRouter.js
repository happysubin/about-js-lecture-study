import express from "express";
import {
  deleteVideo,
  getEditVideo,
  getUpload,
  postEditVideo,
  postUpload,
  videoDetail,
} from "../Controller/videoController";
import { privateProtector, uploadVideo } from "../localMiddleware";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .all(privateProtector)
  .get(getUpload)
  .post(uploadVideo.single("video"), postUpload); //비디오 업로드

videoRouter
  .route("/:id/edit")
  .all(privateProtector)
  .get(getEditVideo)
  .post(postEditVideo); //비디오 수정

videoRouter.get("/:id/delete", privateProtector, deleteVideo); //비디오 삭제
videoRouter.get("/:id", videoDetail); //비디오 하나를 가져옴

export default videoRouter;
