import express from 'express';
import { userPost, getAllPost, editPost, deletePost } from '../controllers/post.controller.js';
import { upload } from '../utils/cloudinary.js';

const postRouter = express.Router();

postRouter.post('/', (req, res, next) => {
    const contentType = req.headers['content-type'] || '';
    if (contentType.startsWith('multipart/form-data')) {
        upload.single('postImage')(req, res, next);
    } else {
        next();
    }
}, userPost);

postRouter.get('/', getAllPost);
postRouter.put('/', editPost)
postRouter.delete('/', deletePost)

export default postRouter;
