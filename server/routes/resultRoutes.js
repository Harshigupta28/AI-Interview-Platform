const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    createResult,
    getMyResults,
    getResultById,
    updateResult,
    deleteResult,
} = require("../controllers/resultController");

const router = express.Router();

// General operations (Protected)
router.route("/")
    .post(protect, createResult);

// Fetch logged-in user results (Protected)
router.get("/my", protect, getMyResults);

// Single scorecard operations (Protected)
router.route("/:id")
    .get(protect, getResultById)
    .put(protect, updateResult)
    .delete(protect, deleteResult);

module.exports = router;
