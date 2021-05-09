import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
const app = express();
const logger = morgan("dev");
const PORT = 4000;

const serverListening = () => {
  console.log(`server listening on PORT http://localhost:${PORT}`);
};

app.use(logger);

app.use("/users", userRouter);
app.use("/", globalRouter);
app.use("/videos", videoRouter);

app.listen(PORT, serverListening);
