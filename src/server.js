import "./db";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import session from "express-session";
import globalRouter from "./Router/globalRouter";
import userRouter from "./Router/userRouter";
import videoRouter from "./Router/videoRouter";
import { localMiddlewares } from "./localMiddleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(
  session({
    //인수로 세션 설정을 받는다.
    secret: process.env.COOKIE_SECRET,
    resave: false, //resave는 세션에 수정 사항이생기더라도 세션을 다시 저장할지 설정.
    saveUninitialized: false, //세션에 저장할 내용이 없더라도 처음부터 세션을 생성할지 설정
    store: MongoStore.create({
      //db에 session이라는 collection이 생겼다
      mongoUrl: process.env.DB_URL,
      touchAfter: 24 * 3600, //수명이다. 24시간이 수명기간이라는 뜻!
      //dbName: "MySession", 이러면 아예 새로운 dbName라는 새로운 db가 생겨서 세션이 저장된다. 콜렉션이 아닌 db가 생긴다
    }),
  })
);

app.use(localMiddlewares);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

app.listen(process.env.PORT);
