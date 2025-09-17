import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { cloudinary } from "../utils/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    const profileImage = req.file?.path || "default.png";
    const publicId = req.file?.filename || null;

    if (!fullName || !email || !password) {
        await deleteCloudinaryImage(publicId);
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            await deleteCloudinaryImage(publicId);
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            profileImage,
        });

        const token = generateToken(newUser._id);

        return res.status(201).json({
            message: "User registered successfully",
            token,
            newUser,
        });

    } catch (error) {
        console.error("Signup error:", error);
        await deleteCloudinaryImage(publicId);
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


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            message: "Login successful",
            token,
            user
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = generateToken(user._id);

        return res.status(200).json({
            message: "Profile fetched successfully",
            token,
            user
        });
    } catch (error) {
        console.error("Get profile error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
};
