import Post from "../models/post.model.js";
import { cloudinary } from "../utils/cloudinary.js";

export const userPost = async (req, res) => {
    const { title, description, tag: tagRaw, isPrivate } = req.body;

    // Parse tags (ensure it's an array)
    const tag = Array.isArray(tagRaw)
        ? tagRaw
        : typeof tagRaw === 'string'
            ? tagRaw.split(',').map(t => t.trim()).filter(Boolean)
            : [];

    const postImage = req.file?.path || "default.png";
    const publicId = req.file?.filename || null;

    try {
        if (!title || !description || tag.length === 0) {
            if (publicId) await deleteCloudinaryImage(publicId);
            return res.status(400).json({ message: "All fields are required" });
        }

        const newPost = await Post.create({
            title,
            description,
            tag,
            image: postImage,
            isPrivate: isPrivate || false,
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error("Post error:", error);
        if (publicId) await deleteCloudinaryImage(publicId);
        return res.status(500).json({ message: "Server error" });
    }
};

const deleteCloudinaryImage = async (publicId) => {
    if (!publicId) return;
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted Cloudinary image: ${publicId}`);
    } catch (error) {
        console.error(`Failed to delete Cloudinary image: ${publicId}`, error);
    }
};