
import { Router } from "express";
import { toggleVideoLike } from "../controllers/like.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);


router.route("/toggle/v/:videoId").post(toggleVideoLike);

export default router;
