import express from "express";
import Router from "./router";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
import "express-async-errors";

const app = express();
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/tweets", Router);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen("8080");
