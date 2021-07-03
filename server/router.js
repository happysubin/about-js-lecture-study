import express from "express";
import "express-async-errors";
import {
  allTweet,
  postTweet,
  deleteTweet,
  putTweet,
  oneTweet,
} from "./controller";

const Router = express.Router();

Router.get("/", allTweet); // main tweet을 보여줌, 유저의 전체 트윗을 가져옴 2가지 경우를 처리
Router.get("/:id", oneTweet); //트윗 하나를 가져옴

Router.post("/", postTweet); //이걸로 트윗을 올림
Router.delete("/:id", deleteTweet); //트윗을 삭제
Router.put("/:id", putTweet); //트윗을 수정

export default Router;
