import express from "express";

export const startApp = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.listen(3000, () => console.log("hello world my port is 3000"));
  return app;
};
