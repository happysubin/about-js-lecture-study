//api 백엔드와 프론트엔드가 통신. 템플릿을 렌더링하지 않고 백엔드와 프론트엔드가 통신
//우리는 템플릿을 렌더링 하지 않을 예정
//view api를 이용해 렌더링하지 않고 조회수 기능을 구현
import express from "express";
import {
  createComment,
  deleteComment,
  registerView,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView); //프론트에서 요청을 실행!
apiRouter
  .route("/videos/:id([0-9a-f]{24})/comment")
  .post(createComment)
  .delete(deleteComment);

//조회수를 기록하자 유저가 영상을 시청 시 백엔드에 요청을 보낸다
//url이동없이 url을 요청하는 법을 학습

export default apiRouter;
