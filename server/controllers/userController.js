const User = require("../models/User");

// Update User Profile details
const updateUserProfile = async (req, res) => {
    try {
        const { fullName } = req.body;
        
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Update parameters
        if (fullName) user.fullName = fullName.trim();

        const updatedUser = await user.save();

        const userObject = updatedUser.toObject();
        delete userObject.password;

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: userObject,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error updating profile",
        });
    }
};

// Upload Resume file
const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a file",
            });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Store relative path
        const resumePath = `/uploads/${req.file.filename}`;
        user.resume = resumePath;
        await user.save();

        const userObject = user.toObject();
        delete userObject.password;

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            resumeUrl: resumePath,
            user: userObject,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error uploading resume",
        });
    }
};

module.exports = {
    updateUserProfile,
    uploadResume,
};
