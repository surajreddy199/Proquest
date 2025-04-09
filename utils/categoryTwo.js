const CocurricularActivities = require('../models/Category-2/CocurricularActivities');
const CorporateLife = require('../models/Category-2/CorporateLife');
const ProfessionalDevelopment = require('../models/Category-2/ProfessionalDevelopment');

async function calculateCategoryTwoTotalScore(userId, academicYear) {
    try {
        const [cocurricularActivities, corporateLife, professionalDevelopment] = await Promise.all([
            CocurricularActivities.findOne({ user: userId, academic_year: academicYear }).exec(),
            CorporateLife.findOne({ user: userId, academic_year: academicYear }).exec(),
            ProfessionalDevelopment.findOne({ user: userId, academic_year: academicYear }).exec()
        ]);

        // Debugging logs
        // console.log('Fetched Data:', { cocurricularActivities });

        // Calculate individual scores
        const cocurricularActivitiesScore = cocurricularActivities?.scoreSix || 0;
        const corporateLifeScore = corporateLife?.scoreSeven || 0;
        const professionalDevelopmentScore = professionalDevelopment?.scoreEight || 0;

        const categoryTwoTotalScore = cocurricularActivitiesScore + corporateLifeScore + professionalDevelopmentScore;

        return {
            cocurricularActivitiesScore,
            corporateLifeScore,
            professionalDevelopmentScore,
            categoryTwoTotalScore
        };
    } catch (err) {
        throw new Error('Error calculating Category 2 total score: ' + err.message);
    }
}

module.exports = { calculateCategoryTwoTotalScore };