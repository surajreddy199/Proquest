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

module.exports = {
    groupByProperty,
    groupJournalsByPublicationType,
    groupBooksChaptersByPublicationType,
    groupSponsoredProjectsByProjectType,
    groupCompletedProjectsByProjectType,
};