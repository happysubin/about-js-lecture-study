import express from "express";
import { editVideo, watch } from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.get("/watch", watch);
videoRouter.get("/edit", editVideo);

export default videoRouter;
