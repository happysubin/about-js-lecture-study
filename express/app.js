import express from "express";
import fs from "fs";
import Router from "./router";
import cors from "cors";

const app = express();

app.use(express.json()); //이 미들웨어를 통해 json req.body 사용가능!!! res api ->body
app.use(express.static); //html 과 같은 static file 사용 가능
app.use(express.urlencoded({ extended: true })); //이걸 통해 HTML FORM 정보를 req.body 로사용가능
app.use(
  cors({
    origin: ["http://localhost:3000/"],
  })
); //header을 자동으로

app.post("/", (req, res) => {
  console.log(req.body);
});

app.get("/file1", (req, res) => {
  try {
    const data = fs.readFileSync("text1.txt");
    res.send(data);
  } catch {
    res.sendStatus(404);
  }
});

app.get("/file2", (req, res) => {
  fs.promises
    .readFile("text2.txt")
    .then((data) => res.send(data))
    .catch((error) => res.sendStatus(404));
});

app.get("/file3", async (req, res) => {
  try {
    const data = await fs.promises.readFile("file3.txt");
    res.send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

app.use((err, req, res, next) => {
  //최종 에러 핸들러
  console.log(error);
  res.status(500).send("sorry,try later");
});

app.use("/route", Router);

app.listen("3000");

//express-async-error 라이브러리를 사용하면 프로미스 내부 전부에 에러핸들러를 안해도 비동기 에러를 다 잡을 수 있다!!!
