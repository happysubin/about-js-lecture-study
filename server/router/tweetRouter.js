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

import { isAuth } from "../middleware/auth";
const Router = express.Router();

const validateTweet = [
  body("text").trim().isLength({ min: 2 }).withMessage("조금만 더 쓰세요"),
  validator,
];

Router.get("/", isAuth, allTweet); // main tweet을 보여줌, 유저의 전체 트윗을 가져옴 2가지 경우를 처리
Router.get("/:id", isAuth, oneTweet); //트윗 하나를 가져옴

Router.post("/", validateTweet, isAuth, postTweet); //이걸로 트윗을 올림
Router.delete("/:id", isAuth, deleteTweet); //트윗을 삭제
Router.put("/:id", validateTweet, isAuth, putTweet); //트윗을 수정

export default Router;
