// filepath: c:\Users\suraj\Documents\Major Project\Staff_Appraisal_System\utils\categoryOne.js
const TeachingContribution = require('../models/Category-1/TeachingContribution');
const LecturesExcess = require('../models/Category-1/LecturesExcess');
const AdditionalResources = require('../models/Category-1/AdditionalResources');
const InnovativeTeaching = require('../models/Category-1/InnovativeTeaching');
const ExaminationDuties = require('../models/Category-1/ExaminationDuties');

async function calculateCategoryOneTotalScore(userId, academicYear) {
    try {
        const [teachingContribution, lecturesExcess, additionalResources, innovativeTeaching, examinationDuties] = await Promise.all([
            TeachingContribution.findOne({ user: userId, academic_year: academicYear }).exec(),
            LecturesExcess.findOne({ user: userId, academic_year: academicYear }).exec(),
            AdditionalResources.findOne({ user: userId, academic_year: academicYear }).exec(),
            InnovativeTeaching.findOne({ user: userId, academic_year: academicYear }).exec(),
            ExaminationDuties.findOne({ user: userId, academic_year: academicYear }).exec()
        ]);

        //  // Debugging logs
        //  console.log('Fetched Data:', {
        //     teachingContribution,
        //     lecturesExcess,
        //     additionalResources,
        //     innovativeTeaching,
        //     examinationDuties
        // });

        // Calculate individual scores
        const teachingContributionScore = teachingContribution?.scoreOne || 0;
        const lecturesExcessScore = lecturesExcess?.scoreTwo || 0;
        const additionalResourcesScore = additionalResources?.scoreThree || 0;
        const innovativeTeachingScore = innovativeTeaching?.scoreFour || 0;
        const examinationDutiesScore = examinationDuties?.scoreFive || 0;

        const categoryOneTotalScore =
            teachingContributionScore +
            lecturesExcessScore +
            additionalResourcesScore +
            innovativeTeachingScore +
            examinationDutiesScore;

        return {
            teachingContributionScore,
            lecturesExcessScore,
            additionalResourcesScore,
            innovativeTeachingScore,
            examinationDutiesScore,
            categoryOneTotalScore
        };
    } catch (err) {
        throw new Error('Error calculating Category 1 total score: ' + err.message);
    }
}

module.exports = { calculateCategoryOneTotalScore };