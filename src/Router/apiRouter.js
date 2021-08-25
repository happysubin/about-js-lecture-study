import express from "express";
import {
  createComment,
  deleteComment,
  registerView,
} from "../Controller/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id/view", registerView);
apiRouter
  .route("/videos/:id/comment")
  .post(createComment)
  .delete(deleteComment);

export default apiRouter;
