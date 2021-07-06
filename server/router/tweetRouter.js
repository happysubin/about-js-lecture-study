import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import validator from "../middleware/validator";
import {
  allTweet,
  postTweet,
  deleteTweet,
  putTweet,
  oneTweet,
} from "../controller/tweet";

const Router = express.Router();

const validateTweet = [
  body("text").trim().isLength({ min: 2 }).withMessage("조금만 더 쓰세요"),
  validator,
];

Router.get("/", allTweet); // main tweet을 보여줌, 유저의 전체 트윗을 가져옴 2가지 경우를 처리
Router.get("/:id", oneTweet); //트윗 하나를 가져옴

Router.post("/", validateTweet, postTweet); //이걸로 트윗을 올림
Router.delete("/:id", deleteTweet); //트윗을 삭제
Router.put("/:id", validateTweet, putTweet); //트윗을 수정

export default Router;
