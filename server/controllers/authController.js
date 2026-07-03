const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // 1. Input Validation
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "Full name, email, and password are required",
            });
        }

        if (fullName.trim().length < 2) {
            return res.status(400).json({
                message: "Full name must be at least 2 characters long",
            });
        }

        // Email validation regex
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
            });
        }

        // 2. Check if user exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email address",
            });
        }

        // 3. Hash password with bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user record
        const user = await User.create({
            fullName: fullName.trim(),
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        // Hide password in output JSON
        const userObject = user.toObject();
        delete userObject.password;

        return res.status(201).json({
            success: true,
            message: "Registration Successful",
            user: userObject,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error occurred during registration",
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Input Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // 2. Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                message: "User not found with this email",
            });
        }

        // 3. Compare hashed password using bcryptjs
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // 4. Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Hide password in output JSON
        const userObject = user.toObject();
        delete userObject.password;

        return res.status(200).json({
            success: true,
            token,
            user: userObject,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error occurred during login",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};