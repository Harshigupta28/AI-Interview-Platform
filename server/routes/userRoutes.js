const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { updateUserProfile, uploadResume } = require("../controllers/userController");

const router = express.Router();

// Update profile details (Protected)
router.put("/profile", protect, updateUserProfile);

// Upload resume document (Protected, Multipart form)
router.post("/resume", protect, upload.single("resume"), uploadResume);

module.exports = router;
