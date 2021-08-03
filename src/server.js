import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import globalRouter from "./Router/globalRouter";
import userRouter from "./Router/userRouter";
import videoRouter from "./Router/videoRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(morgan("dev"));

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

app.listen(process.env.PORT);
