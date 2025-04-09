const CocurricularActivities = require('../models/Category-2/CocurricularActivities');

async function calculateCategoryTwoTotalScore(userId, academicYear) {
    try {
        const [cocurricularActivities] = await Promise.all([
            CocurricularActivities.findOne({ user: userId, academic_year: academicYear }).exec()
        ]);

        // Debugging logs
        // console.log('Fetched Data:', { cocurricularActivities });

        // Calculate individual scores
        const cocurricularActivitiesScore = cocurricularActivities?.scoreSix || 0;

        const categoryTwoTotalScore = cocurricularActivitiesScore;

        return {
            cocurricularActivitiesScore,
            categoryTwoTotalScore
        };
    } catch (err) {
        throw new Error('Error calculating Category 2 total score: ' + err.message);
    }
}

module.exports = { calculateCategoryTwoTotalScore };