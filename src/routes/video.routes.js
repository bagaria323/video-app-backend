// src/routes/video.routes.js
import { Router } from "express";
import {
  publishAVideo,
  getAllVideos,
  getVideoById,
deleteVideo
} from "../controllers/video.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multers.middleware.js";

const VideoRouter = Router();


 

VideoRouter.route("/")
  .get(getAllVideos)
  .post(
    protect,
    upload.fields([
      { name: "videoFile", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    publishAVideo
  )
  
  

VideoRouter
.route("/:videoId")
.get(getVideoById)
.delete(protect , deleteVideo)



export default VideoRouter;
