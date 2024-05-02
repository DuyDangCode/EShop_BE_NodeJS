import { v2 as cloudinary, uploader } from "cloudinary";

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

const cloudinaryUploader = uploader;

export { cloudinaryConfig, cloudinaryUploader };
