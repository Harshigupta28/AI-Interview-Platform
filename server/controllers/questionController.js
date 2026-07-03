const Question = require("../models/Question");

// Create Question
const createQuestion = async (req, res) => {
    try {
        const { text, category, difficulty, duration, suggestedPoints } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "Question text is required",
            });
        }

        const question = await Question.create({
            text,
            category,
            difficulty,
            duration,
            suggestedPoints,
        });

        return res.status(201).json({
            success: true,
            question,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error creating question",
        });
    }
};

// Get All Questions (with filters)
const getQuestions = async (req, res) => {
    try {
        const { category, difficulty } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (difficulty) filter.difficulty = difficulty;

        const questions = await Question.find(filter);

        return res.status(200).json({
            success: true,
            count: questions.length,
            questions,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error fetching questions",
        });
    }
};

// Get Single Question
const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        return res.status(200).json({
            success: true,
            question,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error fetching question details",
        });
    }
};

// Update Question
const updateQuestion = async (req, res) => {
    try {
        const { text, category, difficulty, duration, suggestedPoints } = req.body;

        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        // Update fields
        if (text) question.text = text;
        if (category) question.category = category;
        if (difficulty) question.difficulty = difficulty;
        if (duration) question.duration = duration;
        if (suggestedPoints) question.suggestedPoints = suggestedPoints;

        const updatedQuestion = await question.save();

        return res.status(200).json({
            success: true,
            message: "Question updated successfully",
            question: updatedQuestion,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error updating question",
        });
    }
};

// Delete Question
const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        await question.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Question deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error deleting question",
        });
    }
};

module.exports = {
    createQuestion,
    getQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
};
