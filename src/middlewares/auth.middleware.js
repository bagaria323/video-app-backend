import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asysncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";

// Middleware to verify a user is logged in
 const protect = asyncHandler(async (req, res, next) => {
  try {
    // Get the token from the "Authorization" header
    const token = req.headers.authorization?.split(" ")[1]; // Format: "Bearer TOKEN"

    // If there's no token, the user isn't logged in
    if (!token) {
      throw new ApiError(401, "Not authorized, no token provided.");
    }

    // Verify the token is valid and not expired
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find the user from the database using the ID stored in the token
    const user = await User.findById(decoded?._id).select(
      "-password -refreshtoken"
    );

    // If the user from the token doesn't exist in the DB anymore
    if (!user) {
      throw new ApiError(401, "Not authorized, user not found.");
    }

    // Attach the user object to the request for the next function to use
    req.user = user;

    // Everything is good, proceed to the actual route handler (e.g., publishAVideo)
    next();
  } catch (error) {
    // This will catch errors from jwt.verify (e.g., expired token)
    throw new ApiError(401, error?.message || "Not authorized, token failed.");
  }
});


export {protect}