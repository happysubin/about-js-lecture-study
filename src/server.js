import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import mongoStore from "connect-mongo";
import cors from "cors";
import { localmiddlewares } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev");

app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
//https://developer.chrome.com/blog/enabling-shared-array-buffer/ 오류를 위한 참고 링크

app.set("views", process.cwd() + "/src/views"); //현재작업죽인 디렉토리pwd + src/views
app.set("view engine", "pug"); //view engine 을 pug로 설정
app.use(express.urlencoded({ extended: true })); //이걸 통해 req.body 사용가능
app.use(logger);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);
app.use("/uploads", express.static("uploads"));
app.use(
  "/assets",
  express.static("assets"),
  express.static("node_modules/@ffmpeg/core/dist")
); //정적파일을 제공하자!

app.use(localmiddlewares);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;

/*
  app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions); //모든 세션 출력
    next();
  });
});
  app.get("/add-one", (req, res, next) => {
  req.session.potato += 1;
  return res.send(`${req.session.id} ${req.session.potato}`);
});*/
