const ResearchPapersPublished = require('../models/Category-3/ResearchPapersPublished');
const BooksChaptersPublished = require('../models/Category-3/BooksChaptersPublished');
const SponsoredProjects = require('../models/Category-3/SponsoredProjects'); // Import SponsoredProjects model
const ConsultancyProjects = require('../models/Category-3/ConsultancyProjects'); // Import ConsultancyProjects model
const CompletedProjects = require('../models/Category-3/CompletedProjects'); // Import CompletedProjects model
const ProjectOutcomes = require('../models/Category-3/ProjectOutcomes'); // Import ProjectOutcomes model
const ResearchGuidance = require('../models/Category-3/ResearchGuidance'); // Import ResearchGuidance model

async function calculateCategoryThreeTotalScore(userId, academicYear) {
    try {
        const [researchPapers, booksChapters, sponsoredProjects, consultancyProjects, completedProjects, projectOutcomes, researchGuidance] = await Promise.all([
            ResearchPapersPublished.find({ user: userId, academic_year: academicYear }).exec(),
            BooksChaptersPublished.find({ user: userId, academic_year: academicYear }).exec(),
            SponsoredProjects.find({ user: userId, academic_year: academicYear }).exec(),
            ConsultancyProjects.find({ user: userId, academic_year: academicYear }).exec(), 
            CompletedProjects.find({ user: userId, academic_year: academicYear }).exec(),
            ProjectOutcomes.find({ user: userId, academic_year: academicYear }).exec(),
            ResearchGuidance.find({ user: userId, academic_year: academicYear }).exec()
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
        let totalThreeThreeOneScore = 0;
        sponsoredProjects.forEach(entry => {
            totalThreeThreeOneScore += entry.entries.reduce((sum, project) => sum + (project.score || 0), 0);
        });

        // Calculate total score for Consultancy Projects
        let totalThreeThreeTwoScore = 0;
        consultancyProjects.forEach(entry => {
            totalThreeThreeTwoScore += entry.entries.reduce((sum, project) => sum + (project.score || 0), 0);
        });

        // Calculate total score for Completed Projects
        let totalThreeThreeThreeScore = 0;
        completedProjects.forEach(entry => {
            totalThreeThreeThreeScore += entry.entries.reduce((sum, project) => sum + (project.score || 0), 0);
        });

        // Calculate total score for Project Outcomes
        let totalThreeThreeFourScore = 0;
        projectOutcomes.forEach(entry => {
            totalThreeThreeFourScore += entry.entries.reduce((sum, outcome) => sum + (outcome.score || 0), 0);
        });
        // Calculate total score for Research Guidance
        let totalThreeFourScore = 0;
        researchGuidance.forEach(entry => {
            entry.entries.forEach(guidance => {
                if (guidance.status === 'degree_awarded') {
                    totalThreeFourScore += (entry.guidance_type === 'mphil' ? 3 : 10); // 3 for M.Phil., 10 for Ph.D.
                } else if (guidance.status === 'thesis_submitted') {
                    totalThreeFourScore += 7; // 7 for Ph.D. Thesis Submitted
                }
            });
        });

        // Calculate total score for Category 3
        const categoryThreeTotalScore = totalThreeOneScore + totalThreeTwoScore + totalThreeThreeOneScore + totalThreeThreeTwoScore + totalThreeThreeThreeScore + totalThreeThreeFourScore + totalThreeFourScore;

        return {
            totalThreeOneScore,
            totalThreeTwoScore,
            totalThreeThreeOneScore, // Include SponsoredProjects score
            totalThreeThreeTwoScore, // Include ConsultancyProjects score
            totalThreeThreeThreeScore,
            totalThreeThreeFourScore, // Include ProjectOutcomes score
            totalThreeFourScore,
            categoryThreeTotalScore
        };
    } catch (err) {
        throw new Error('Error calculating Category 3 total score: ' + err.message);
    }
}

module.exports = { calculateCategoryThreeTotalScore };