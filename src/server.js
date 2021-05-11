import "./db";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import mongoose from "mongoose";

const app = express();
const logger = morgan("dev");
const PORT = 4000;

const serverListening = () => {
  console.log(`server listening on PORT http://localhost:${PORT}`);
};
app.set("views", process.cwd() + "/src/views"); //현재작업죽인 디렉토리pwd + src/views
app.set("view engine", "pug"); //view engine 을 pug로 설정
app.use(express.urlencoded({ extended: true })); //이걸 통해 req.body 사용가능
app.use(logger);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.listen(PORT, serverListening);
