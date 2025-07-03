import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// UPLOAD TO CLOUDINARY
const uploadcloudinary = async (localfilepath) => {
  try {
    if (!localfilepath){ console.log("No local file path provided") ; return null ;};  

    const uploaderresult = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });

    console.log("File uploaded on Cloudinary:", uploaderresult.url);

    fs.unlinkSync(localfilepath);

    return uploaderresult;
  } catch (error) {
    console.log("Error on Cloudinary upload:", error);



    return null;
  }
};

// DELETE FROM CLOUDINARY AND LOCAL
const deletefromcloudinary = async (url, resourceType = "image") => {
  if (!url) {
    console.log("No URL provided for deletion.");
    return null;
  }

  try {
    
    const urlParts = url.split("/");
    const publicIdWithFormat = urlParts[urlParts.length - 1];
    const publicId = publicIdWithFormat.split(".")[0];

    if (!publicId) {
      throw new Error("Could not extract public_id from URL");
    }

  
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    console.log("Cloudinary deletion result:", result);
    return result;
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error);
    return null;
  }
};



export { uploadcloudinary, deletefromcloudinary };
