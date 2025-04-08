/**
 * Groups items by a specified property.
 * @param {Array} items - The array of items to group.
 * @param {string} groupByProperty - The property to group by.
 * @returns {Object} - An object where keys are the group names and values are arrays of grouped items.
 */
function groupByProperty(items, groupByProperty) {
    if (!Array.isArray(items)) return {};

    return items.reduce((acc, item) => {
        const groupKey = item[groupByProperty] || "Unknown";
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
    }, {});
}

/**
 * Combines and groups journals by publication type.
 * @param {Array} researchPapers - The array of research papers.
 * @returns {Object} - An object where keys are publication types and values are arrays of journals.
 */
function groupJournalsByPublicationType(researchPapers) {
    const allJournals = Array.isArray(researchPapers)
        ? researchPapers.reduce((acc, paper) => acc.concat(paper.journals || []), [])
        : [];

    return groupByProperty(allJournals, "publication_type");
}

/**
 * Combines and groups books/chapters by publication type.
 * @param {Object} booksChapters - The object containing books/chapters data.
 * @returns {Object} - An object where keys are publication types and values are arrays of books/chapters.
 */
function groupBooksChaptersByPublicationType(booksChapters) {
    const allEntries = Array.isArray(booksChapters)
        ? booksChapters.reduce((acc, paper) => acc.concat(paper.entries || []), [])
        : [];


    // Use groupByProperty to group by "publication_type"
    return groupByProperty(allEntries, "publication_type");
}

/**
 * Combines and groups sponsored projects by project type.
 * @param {Object} sponsoredProjects - The object containing sponsored projects data.
 * @returns {Object} - An object where keys are project types and values are arrays of sponsored projects.
 */
function groupSponsoredProjectsByProjectType(sponsoredProjects) {
    const allEntries = Array.isArray(sponsoredProjects)
        ? sponsoredProjects.reduce((acc, project) => acc.concat(project.entries || []), [])
        : [];

    // Use groupByProperty to group by "project_type"
    return groupByProperty(allEntries, "project_type");
}

/**
 * Combines and groups completed projects by project type.
 * @param {Object} completedProjects - The object containing completed projects data.
 * @returns {Object} - An object where keys are project types and values are arrays of completed projects.
 */
function groupCompletedProjectsByProjectType(completedProjects) {
    const allEntries = Array.isArray(completedProjects)
        ? completedProjects.reduce((acc, project) => acc.concat(project.entries || []), [])
        : [];

    // Use groupByProperty to group by "project_type"
    return groupByProperty(allEntries, "project_type");
}

/**
 * Combines and groups project outcomes by type.
 * @param {Object} projectOutcomes - The object containing project outcomes data.
 * @returns {Object} - An object where keys are outcome types and values are arrays of project outcomes.
 */
function groupProjectOutcomesByType(projectOutcomes) {
    const allEntries = Array.isArray(projectOutcomes)
        ? projectOutcomes.reduce((acc, outcome) => acc.concat(outcome.entries || []), [])
        : [];

    // Use groupByProperty to group by "type"
    return groupByProperty(allEntries, "outcome_level");
}

/**
 * Combines and groups research guidance entries by guidance type.
 * @param {Object} researchGuidance - The object containing research guidance data.
 * @returns {Object} - An object where keys are guidance types (e.g., 'mphil', 'phd') and values are arrays of research guidance entries.
 */
function groupResearchGuidanceByType(researchGuidance) {
    const allEntries = Array.isArray(researchGuidance)
        ? researchGuidance.reduce((acc, guidance) => acc.concat(guidance.entries || []), [])
        : [];

    // Use groupByProperty to group by "guidance_type"
    return groupByProperty(allEntries, "guidance_type");
}

/**
 * Combines and groups training courses by course type.
 * @param {Object} trainingCourses - The object containing training courses data.
 * @returns {Object} - An object where keys are course types and values are arrays of training courses.
 */
function groupTrainingCoursesByType(trainingCourses) {
    const allEntries = Array.isArray(trainingCourses)
        ? trainingCourses.reduce((acc, course) => acc.concat(course.entries || []), [])
        : [];


    return groupByProperty(allEntries, "duration_type");
}

/**
 * Combines and groups conference papers by a specified property.
 * @param {Object} conferencePapers - The object containing conference papers data.
 * @param {string} groupBy - The property to group by (e.g., 'event_type', 'presentation_type').
 * @returns {Object} - An object where keys are the group names and values are arrays of conference papers.
 */
function groupConferencePapersByType(conferencePapers) {
    const allEntries = Array.isArray(conferencePapers)
        ? conferencePapers.reduce((acc, paper) => acc.concat(paper.entries || []), [])
        : [];

    // Use groupByProperty to group by the specified property
    return groupByProperty(allEntries, "event_type");
}

/**
 * Combines and groups invited lectures by lecture type.
 * @param {Object} invitedLectures - The object containing invited lectures data.
 * @returns {Object} - An object where keys are lecture types (e.g., 'international', 'national') and values are arrays of invited lectures.
 */
function groupInvitedLecturesByType(invitedLectures) {
    const allEntries = Array.isArray(invitedLectures)
        ? invitedLectures.reduce((acc, lecture) => acc.concat(lecture.entries || []), [])
        : [];

    // Use groupByProperty to group by "lecture_type"
    return groupByProperty(allEntries, "lecture_type");
}

module.exports = {
    groupByProperty,
    groupJournalsByPublicationType,
    groupBooksChaptersByPublicationType,
    groupSponsoredProjectsByProjectType,
    groupCompletedProjectsByProjectType,
    groupProjectOutcomesByType,
    groupResearchGuidanceByType,
    groupTrainingCoursesByType,
    groupConferencePapersByType,
    groupInvitedLecturesByType,  
};