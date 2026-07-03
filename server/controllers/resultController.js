const Result = require("../models/Result");

// Create Interview Result
const createResult = async (req, res) => {
    try {
        const { jobRole, duration, overallScore, categoriesScore, strengths, weaknesses, transcript } = req.body;

        if (!jobRole || overallScore === undefined) {
            return res.status(400).json({
                message: "Job role and overall score are required",
            });
        }

        const result = await Result.create({
            user: req.user._id,
            jobRole,
            duration,
            overallScore,
            categoriesScore,
            strengths,
            weaknesses,
            transcript,
        });

        return res.status(201).json({
            success: true,
            result,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error saving interview result",
        });
    }
};

// Get Logged-in User's Results
const getMyResults = async (req, res) => {
    try {
        const results = await Result.find({ user: req.user._id }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: results.length,
            results,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error fetching your results",
        });
    }
};

// Get Single Result details
const getResultById = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id).populate("user", "fullName email");

        if (!result) {
            return res.status(404).json({
                message: "Result scorecard not found",
            });
        }

        // Verify ownership
        if (result.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to view this result",
            });
        }

        return res.status(200).json({
            success: true,
            result,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error fetching result scorecard details",
        });
    }
};

// Update Result details
const updateResult = async (req, res) => {
    try {
        const { jobRole, duration, overallScore, categoriesScore, strengths, weaknesses, transcript } = req.body;

        const result = await Result.findById(req.params.id);
        if (!result) {
            return res.status(404).json({
                message: "Result scorecard not found",
            });
        }

        // Verify ownership
        if (result.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to modify this result",
            });
        }

        // Update fields
        if (jobRole) result.jobRole = jobRole;
        if (duration) result.duration = duration;
        if (overallScore !== undefined) result.overallScore = overallScore;
        if (categoriesScore) result.categoriesScore = categoriesScore;
        if (strengths) result.strengths = strengths;
        if (weaknesses) result.weaknesses = weaknesses;
        if (transcript) result.transcript = transcript;

        const updatedResult = await result.save();

        return res.status(200).json({
            success: true,
            message: "Result scorecard updated successfully",
            result: updatedResult,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error updating result details",
        });
    }
};

// Delete Result
const deleteResult = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) {
            return res.status(404).json({
                message: "Result scorecard not found",
            });
        }

        // Verify ownership
        if (result.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to delete this result",
            });
        }

        await result.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Result scorecard deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error deleting result",
        });
    }
};

module.exports = {
    createResult,
    getMyResults,
    getResultById,
    updateResult,
    deleteResult,
};
