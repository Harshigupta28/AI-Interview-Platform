const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getAnalytics } = require("../controllers/analyticsController");

const router = express.Router();

// Fetch summary metrics (Protected)
router.get("/", protect, getAnalytics);

module.exports = router;
