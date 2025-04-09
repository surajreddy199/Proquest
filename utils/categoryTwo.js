const CocurricularActivities = require('../models/Category-2/CocurricularActivities');
const CorporateLife = require('../models/Category-2/CorporateLife');

async function calculateCategoryTwoTotalScore(userId, academicYear) {
    try {
        const [cocurricularActivities, corporateLife] = await Promise.all([
            CocurricularActivities.findOne({ user: userId, academic_year: academicYear }).exec(),
            CorporateLife.findOne({ user: userId, academic_year: academicYear }).exec()
        ]);

        // Debugging logs
        // console.log('Fetched Data:', { cocurricularActivities });

        // Calculate individual scores
        const cocurricularActivitiesScore = cocurricularActivities?.scoreSix || 0;
        const corporateLifeScore = corporateLife?.scoreSeven || 0;

        const categoryTwoTotalScore = cocurricularActivitiesScore + corporateLifeScore;

        return {
            cocurricularActivitiesScore,
            corporateLifeScore,
            categoryTwoTotalScore
        };
    } catch (err) {
        throw new Error('Error calculating Category 2 total score: ' + err.message);
    }
}

module.exports = { calculateCategoryTwoTotalScore };