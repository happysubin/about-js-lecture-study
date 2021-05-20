import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import mongoStore from "connect-mongo";
import { localmiddlewares } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("views", process.cwd() + "/src/views"); //현재작업죽인 디렉토리pwd + src/views
app.set("view engine", "pug"); //view engine 을 pug로 설정
app.use(express.urlencoded({ extended: true })); //이걸 통해 req.body 사용가능
app.use(logger);

app.use(
  session({
    secret: "Hello!",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl:
        "mongodb+srv://admin:kAuOOf2e7vCyf9MR@mongodbtutorial.9kx8g.mongodb.net/wetube?retryWrites=true&w=majority",
    }),
  })
);
app.use(localmiddlewares);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

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
