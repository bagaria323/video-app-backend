
import { asyncHandler } from "../utils/asysncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Like } from "../models/like.models.js";
import mongoose from "mongoose";

// Controller to toggle a like on a video
// In src/controllers/like.controller.js

const toggleVideoLike = asyncHandler(async (req, res) => {
  try { // Added for detailed logging
    const { videoId } = req.params;
    const userId = req.user._id;

    const existingLike = await Like.findOne({
      video: videoId,
      likedBy: userId,
    });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      return res.status(200).json(new apiResponse(200, {}, "Like removed"));
    } else {
      await Like.create({
        video: videoId,
        likedBy: userId,
      });
      return res.status(201).json(new apiResponse(201, {}, "Like added"));
    }
  } catch (error) {
    // This will print the exact error to your backend terminal
    console.error("DETAILED LIKE TOGGLE ERROR:", error); 
    throw error; // Re-throw the error
  }
});
export { toggleVideoLike };
