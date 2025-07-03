// src/models/like.models.js
import mongoose, { Schema } from "mongoose";

// Define the schema for a 'Like' document
const likeSchema = new Schema(
  {
    // The video that was liked
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video", 
    },
    

   
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } 
);

// Create and export the model
export const Like = mongoose.model("Like", likeSchema);
