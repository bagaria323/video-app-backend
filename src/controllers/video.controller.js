
import { asyncHandler } from "../utils/asysncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadcloudinary  , deletefromcloudinary} from "../utils/cloudinary.js";
import { Video } from "../models/video.models.js";  
import mongoose from "mongoose";
import { Like } from "../models/like.models.js";


const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  console.log(`BACKEND: Received DELETE request for ID: ${videoId}`);
  // Use an aggregation pipeline to get the video and its like count
  const video = await Video.aggregate([
    // Stage 1: Match the video by its id
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
    // Stage 2: Look up likes for this video
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    // stage 3 : getting the owner deatils
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
    // Stage 4: Adding  new fields for like count and if the current user has liked it
    {
      $addFields: {
        likeCount: { $size: "$likes" },
        isLiked: {
          $in: [req.user?._id, "$likes.likedBy"],
        },
      },
    },

    //stage 5 : removing unnecessary fields 
    {
      $project: {
        ownerDetails: 0, 
        likes: 0, 
      },
    },
  ]);

  if (!video.length) {
    throw new ApiError(404, "Video not found");
  }

  // The result is an array, so we send the first element
  return res
    .status(200)
    .json(new apiResponse(200, video[0], "Video fetched successfully"));
});


// In src/controllers/video.controller.js

const publishAVideo = asyncHandler(async (req, res) => {
  try { // Added for detailed logging
    const { title, description } = req.body;
    if (!title || !description) {
      throw new ApiError(400, "Title and description are required.");
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoLocalPath) {
      throw new ApiError(400, "Video file is required.");
    }

    const videoFile = await uploadcloudinary(videoLocalPath);
    const thumbnail = thumbnailLocalPath ? await uploadcloudinary(thumbnailLocalPath) : null;

    if (!videoFile) {
      throw new ApiError(500, "Failed to upload video to Cloudinary.");
    }
    
    const video = await Video.create({
      title,
      description,
      videoFile: videoFile.url,
      thumbnail: thumbnail?.url || "",
      duration: videoFile.duration, 
      owner: req.user._id,
    });

    return res.status(201).json(new apiResponse(201, video, "Video published successfully."));
  
  } catch (error) {
    // This will print the exact error to your backend terminal
    console.error("DETAILED VIDEO UPLOAD ERROR:", error); 
    throw error; // Re-throw the error for the global handler
  }
});

const getAllVideos = asyncHandler(async (req, res) => {
  
  const videos = await Video.find({}).populate("owner", "username avatar");

  return res
    .status(200)
    .json(new apiResponse(200, videos, "Videos fetched successfully."));
});



const deleteVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    console.log(`BULLETPROOF: Received DELETE request for ID: ${videoId}`);

    const video = await Video.findById(videoId);
    if (!video) {
      console.log("BULLETPROOF: Video not found in DB.");
      return res.status(404).json({ message: "Video not found" });
    }

    if (video.owner.toString() !== req.user._id.toString()) {
      console.log("BULLETPROOF: User is not the owner.");
      return res.status(403).json({ message: "User not authorized" });
    }

    console.log("BULLETPROOF: Deleting from Cloudinary...");
    await deletefromcloudinary(video.videoFile, "video");
    await deletefromcloudinary(video.thumbnail, "image");
    console.log("BULLETPROOF: Cloudinary deletion complete.");

    console.log("BULLETPROOF: Deleting from database...");
    await Video.findByIdAndDelete(videoId);
    await Like.deleteMany({ video: videoId });
    console.log("BULLETPROOF: Database deletion complete.");

    return res
      .status(200)
      .json(new apiResponse(200, {}, "Video deleted successfully"));
  } catch (error) {
    // THIS IS THE MOST IMPORTANT PART
    // We will catch the silent crash here.
    console.error("--- !!! FATAL CRASH CAUGHT !!! ---");
    console.error(error); // Print the full error object
    console.error("--- !!! END OF CRASH REPORT !!! ---");

    // Send a proper error response instead of letting the server die
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred during deletion.",
      error: error.message,
    });
  }
};
export { publishAVideo, getAllVideos,getVideoById ,deleteVideo};
