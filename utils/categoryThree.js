const ResearchPapersPublished = require('../models/Category-3/ResearchPapersPublished');
const BooksChaptersPublished = require('../models/Category-3/BooksChaptersPublished');

async function calculateCategoryThreeTotalScore(userId, academicYear) {
    try {
        const [researchPapers, booksChapters] = await Promise.all([
            ResearchPapersPublished.find({ user: userId, academic_year: academicYear }).exec(),
            BooksChaptersPublished.find({ user: userId, academic_year: academicYear }).exec()
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

        // Calculate total score for Category 3
        const categoryThreeTotalScore = totalThreeOneScore + totalThreeTwoScore;

        return {
            totalThreeOneScore,
            totalThreeTwoScore,
            categoryThreeTotalScore
        };
    } catch (err) {
        throw new Error('Error calculating Category 3 total score: ' + err.message);
    }
}

module.exports = { calculateCategoryThreeTotalScore };