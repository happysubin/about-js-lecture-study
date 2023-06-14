import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import mongoStore from "connect-mongo";
import flash from "express-flash";
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
app.use(express.urlencoded({ extended: true })); //이걸 통해 req.body 사용가능 from 으로부터 오는 데이터 이해가능
app.use(express.json()); // 문자열로 바뀐 json 파일을 js object(json)로 바꿔주는 미들웨어다. json.parse라고 생각!!!
app.use(logger);
//flash 설치한 순간부터 req.flash 라는 함수를 사용할 수 있다.
// cookieParser session을 필요로 한다.

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
app.use(flash());
//req.flash 함수가 res.locals와 같은 속성을 만든다. messages locals 를 만들어준다. 그걸 template engine에서 사용 가능!

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
