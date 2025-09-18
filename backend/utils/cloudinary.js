import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const type = req.query.type;
        return {
            folder: type === "post" ? "post_images" : "user_profiles",
            allowed_formats: ["jpg", "png", "jpeg"],
        };
    },
});

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export { cloudinary };
