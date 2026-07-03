const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    createQuestion,
    getQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
} = require("../controllers/questionController");

const router = express.Router();

// Fetch and create questions (Protected)
router.route("/")
    .get(protect, getQuestions)
    .post(protect, createQuestion);

// Single question operations (Protected)
router.route("/:id")
    .get(protect, getQuestionById)
    .put(protect, updateQuestion)
    .delete(protect, deleteQuestion);

module.exports = router;
