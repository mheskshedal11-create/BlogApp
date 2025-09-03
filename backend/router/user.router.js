import express from 'express';
import { signup, login } from '../controllers/user.controller.js';
import { upload } from '../utils/cloudinary.js';
import { authMiddleware } from '../utils/jwt.js';

export const userRouter = express.Router();

userRouter.post('/register', upload.single('profileImage'), signup);
userRouter.post('/login', login);
// userRouter.get('/profile', authMiddleware, getProfile);