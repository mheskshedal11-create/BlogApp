import express from 'express'
import { signup } from '../controllers/user.controller.js'
export const userRouter = express.Router()

userRouter.post('/register', signup)