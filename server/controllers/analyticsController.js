const Result = require("../models/Result");

// Fetch performance analytics details for logged-in user
const getAnalytics = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch results chronological ascending order
        const results = await Result.find({ user: userId }).sort({ createdAt: 1 });

        const totalMocks = results.length;
        let avgScore = 0;
        let totalTechnical = 0;
        let totalCommunication = 0;
        let totalConfidence = 0;
        let totalStructure = 0;

        if (totalMocks > 0) {
            const sumScore = results.reduce((acc, curr) => acc + curr.overallScore, 0);
            avgScore = Math.round(sumScore / totalMocks);

            results.forEach((r) => {
                totalTechnical += r.categoriesScore.technical || 0;
                totalCommunication += r.categoriesScore.communication || 0;
                totalConfidence += r.categoriesScore.confidence || 0;
                totalStructure += r.categoriesScore.structure || 0;
            });

            totalTechnical = Math.round(totalTechnical / totalMocks);
            totalCommunication = Math.round(totalCommunication / totalMocks);
            totalConfidence = Math.round(totalConfidence / totalMocks);
            totalStructure = Math.round(totalStructure / totalMocks);
        }

        // Format weekly progress trends
        const weeklyProgress = results.map((r, index) => ({
            label: `Mock #${index + 1}`,
            score: r.overallScore,
            date: r.createdAt.toISOString().split("T")[0],
        }));

        // Format categorical skill vectors
        const skillTrends = {
            technical: totalTechnical || 0,
            communication: totalCommunication || 0,
            confidence: totalConfidence || 0,
            structure: totalStructure || 0,
        };

        // Format heatmap tracking timestamps
        const heatmap = {};
        results.forEach((r) => {
            const dateStr = r.createdAt.toISOString().split("T")[0];
            heatmap[dateStr] = (heatmap[dateStr] || 0) + 1;
        });

        // Progress indicators against set targets
        const goals = [
            {
                title: "Practice Mock Sessions",
                target: 15,
                current: totalMocks,
                percent: Math.min(Math.round((totalMocks / 15) * 100), 100),
            },
            {
                title: "Target Average Grade",
                target: 85,
                current: avgScore,
                percent: Math.min(Math.round((avgScore / 85) * 100), 100),
            },
        ];

        return res.status(200).json({
            success: true,
            analytics: {
                cumulative: {
                    totalMocks,
                    avgScore,
                    totalDuration: `${totalMocks * 20} mins`,
                },
                weeklyProgress,
                skillTrends,
                heatmap,
                goals,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error fetching analytics data",
        });
    }
};

module.exports = { getAnalytics };
