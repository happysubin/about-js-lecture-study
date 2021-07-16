import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
import "express-async-errors";
import tweetRouter from "./router/tweetRouter";
import authRouter from "./router/authRouter";
import dotenv from "dotenv";

const app = express();
dotenv.config();
//console.log(typeof process.env.JWT_EXPIRES_SEC); 이 타입이 문자열로 나온다 parseInt 사용!!

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/tweets", tweetRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen("8080");
