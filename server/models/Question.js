const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            enum: ["tech", "behavioral", "system"],
            default: "tech",
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium",
        },
        duration: {
            type: Number, // in seconds
            default: 120,
        },
        suggestedPoints: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Question", questionSchema);
