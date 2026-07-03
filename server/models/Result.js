const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        jobRole: {
            type: String,
            required: true,
            trim: true,
        },
        duration: {
            type: String, // e.g., "25 mins"
            default: "",
        },
        overallScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        categoriesScore: {
            technical: { type: Number, default: 0 },
            communication: { type: Number, default: 0 },
            confidence: { type: Number, default: 0 },
            structure: { type: Number, default: 0 },
        },
        strengths: {
            type: [String],
            default: [],
        },
        weaknesses: {
            type: [String],
            default: [],
        },
        transcript: [
            {
                question: { type: String, required: true },
                answer: { type: String, default: "" },
                aiFeedback: { type: String, default: "" },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Result", resultSchema);
