import Post from "../models/post.model.js";
import { cloudinary } from "../utils/cloudinary.js";

export const userPost = async (req, res) => {
    const { title, description, tag: tagRaw, isPrivate } = req.body;

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
        if (publicId) await deleteCloudinaryImage(publicId);
        return res.status(500).json({ message: "Server error" });
    }
};

const deleteCloudinaryImage = async (publicId) => {
    if (!publicId) return;
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error(`Failed to delete Cloudinary image: ${publicId}`, error);
    }
};

export const getAllPost = async (req, res) => {
    try {
        const allPost = await Post.find()
        return res.status(201).json(allPost)
    } catch (error) {
        res.status(400).json({ message: "server error" })
    }

}

export const editPost = async (req, res) => {
    const postId = req.params.id;
    const { title, description, tag: tagRaw, isPrivate } = req.body;

    const tag = Array.isArray(tagRaw)
        ? tagRaw
        : typeof tagRaw === 'string'
            ? tagRaw.split(',').map(t => t.trim()).filter(Boolean)
            : [];

    const newImagePath = req.file?.path;
    const newPublicId = req.file?.filename;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            if (newPublicId) await deleteCloudinaryImage(newPublicId);
            return res.status(404).json({ message: "Post not found" });
        }


        if (newImagePath) {
            if (post.image !== "default.png") {
                const oldPublicId = post.image.split('/').pop().split('.')[0];
                await deleteCloudinaryImage(oldPublicId);
            }
            post.image = newImagePath;
        }

        post.title = title || post.title;
        post.description = description || post.description;
        post.tag = tag.length > 0 ? tag : post.tag;
        post.isPrivate = typeof isPrivate === 'boolean' ? isPrivate : post.isPrivate;

        await post.save();

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        if (newPublicId) await deleteCloudinaryImage(newPublicId);
        res.status(500).json({ message: "Server error" });
    }
};


export const deletePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }


        if (post.image !== "default.png") {
            const publicId = post.image.split('/').pop().split('.')[0];
            await deleteCloudinaryImage(publicId);
        }

        await post.deleteOne();

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
