import { registerUser , logoutUser , loginUser } from "../controllers/user.controller.js"
import { Router } from "express"
import {upload} from "../middlewares/multers.middleware.js"

import { protect } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.models.js";

const UserRouter = Router() ; 


// registering the user 

UserRouter.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);


// login the user 

UserRouter.route("/login").post(loginUser);

// log out  the user 
UserRouter.route("/logout").post(protect, logoutUser); 


export default  UserRouter; 
