import express from "express";
import passport from "passport";

import authRouter from "../Router/authRouter";

export const startApp = () => {
  const app = express();
  app.use(passport.initialize()); //패스포트 등록
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/auth", authRouter);
  app.listen(3000, () => console.log("hello world my port is 3000"));
  return app;
};
