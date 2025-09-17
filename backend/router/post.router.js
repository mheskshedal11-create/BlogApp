import express from 'express'
import { userPost } from '../controllers/post.controller.js'
import { upload } from '../utils/cloudinary.js'
const postRouter = express.Router()

postRouter.post('/', upload.single('postImage'), userPost)
export default postRouter