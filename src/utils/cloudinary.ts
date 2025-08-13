"use server";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export const getCloudinaryResponse = async (buffer: Buffer) => {
  try {
    const cloudinaryResponse = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as UploadApiResponse);
            }
          }
        );
        uploadStream.end(buffer);
      }
    );

    if (!cloudinaryResponse) {
      throw new Error("Cloudinary upload failed");
    }

    return cloudinaryResponse.url;
  } catch (error) {
    console.log(error);
  }
};
