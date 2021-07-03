import express from "express";
import "express-async-errors";
import {} from "./controller";

const Router = express.Router();

Router.get("/"); // main twit을 보여줌
Router.post("/"); //이걸로 트윗을 올림

Router.delete("/:id"); //트윗을 삭제
Router.put("/:id"); //트윗을 수정
Router.get("/:id"); //트윗 하나를 가져옴

Router.get("/user"); // 유저의 전체 트윗을 가져옴

export default Router;
