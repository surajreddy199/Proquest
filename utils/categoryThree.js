const ResearchPapersPublished = require('../models/Category-3/ResearchPapersPublished');
const BooksChaptersPublished = require('../models/Category-3/BooksChaptersPublished');
const SponsoredProjects = require('../models/Category-3/SponsoredProjects'); // Import SponsoredProjects model
const ConsultancyProjects = require('../models/Category-3/ConsultancyProjects'); // Import ConsultancyProjects model
const CompletedProjects = require('../models/Category-3/CompletedProjects'); // Import CompletedProjects model

async function calculateCategoryThreeTotalScore(userId, academicYear) {
    try {
        const [researchPapers, booksChapters, sponsoredProjects, consultancyProjects, completedProjects] = await Promise.all([
            ResearchPapersPublished.find({ user: userId, academic_year: academicYear }).exec(),
            BooksChaptersPublished.find({ user: userId, academic_year: academicYear }).exec(),
            SponsoredProjects.find({ user: userId, academic_year: academicYear }).exec(),
            ConsultancyProjects.find({ user: userId, academic_year: academicYear }).exec(), 
            CompletedProjects.find({ user: userId, academic_year: academicYear }).exec() 
        ]);

        // Calculate total score for Research Papers Published
        let totalThreeOneScore = 0;
        researchPapers.forEach(entry => {
            totalThreeOneScore += entry.journals.reduce((sum, journal) => sum + (journal.score || 0), 0);
        });

        // Calculate total score for Books/Chapters Published
        let totalThreeTwoScore = 0;
        booksChapters.forEach(entry => {
            totalThreeTwoScore += entry.entries.reduce((sum, book) => sum + (book.score || 0), 0);
        });

        // Calculate total score for Sponsored Projects
        let totalThreeThreeScore = 0;
        sponsoredProjects.forEach(entry => {
            totalThreeThreeScore += entry.entries.reduce((sum, project) => sum + (project.score || 0), 0);
        });

        // Calculate total score for Consultancy Projects
        let totalThreeFourScore = 0;
        consultancyProjects.forEach(entry => {
            totalThreeFourScore += entry.entries.reduce((sum, project) => sum + (project.score || 0), 0);
        });

        // Calculate total score for Completed Projects
        let totalThreeThreeThreeScore = 0;
        completedProjects.forEach(entry => {
            totalThreeThreeThreeScore += entry.entries.reduce((sum, project) => sum + (project.score || 0), 0);
        });

        // Calculate total score for Category 3
        const categoryThreeTotalScore = totalThreeOneScore + totalThreeTwoScore + totalThreeThreeScore + totalThreeFourScore + totalThreeThreeThreeScore;

        return {
            totalThreeOneScore,
            totalThreeTwoScore,
            totalThreeThreeScore, // Include SponsoredProjects score
            totalThreeFourScore, // Include ConsultancyProjects score
            totalThreeThreeThreeScore,
            categoryThreeTotalScore
        };
    } catch (err) {
        throw new Error('Error calculating Category 3 total score: ' + err.message);
    }
}

module.exports = { calculateCategoryThreeTotalScore };