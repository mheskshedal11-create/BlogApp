import express from 'express';
import { signup, login, getProfile } from '../controllers/user.controller.js';
import { authMiddleware } from '../utils/jwt.js';
import { upload } from '../utils/cloudinary.js';

export const userRouter = express.Router();

userRouter.post('/register', upload.single('profileImage'), signup);
userRouter.post('/login', login);
userRouter.get('/profile/:id', getProfile);