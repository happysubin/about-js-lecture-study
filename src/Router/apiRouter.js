import express from "express";
import { registerView } from "../Controller/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id/view", registerView);

export default apiRouter;
