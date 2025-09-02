import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    const profileImage = req.file ? req.file.filename : 'default.png';

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            password: hashPassword,
            profileImage
        });

        return res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
