const modules = require('./modules');

    var loads = [
    modules.TeachingContribution.findOne({ user: req.user.id }).exec(),
    modules.LecturesExcess.findOne({ user: req.user.id }).exec(),
    modules.AdditionalResources.findOne({ user: req.user.id }).exec(),
    modules.InnovativeTeaching.findOne({ user: req.user.id }).exec(),
    modules.ExaminationDuties.findOne({ user: req.user.id }).exec(),


    modules.CocurricularActivities.findOne({ user: req.user.id }).exec(),
    modules.CorporateLife.findOne({ user: req.user.id }).exec(),
    modules.ProfessionalDevelopment.findOne({ user: req.user.id }).exec(),

   

    modules.PapersPublishedNationalConf.findOne({ user: req.user.id }).exec(),
    modules.PapersPublishedInternationalConf.findOne({ user: req.user.id }).exec(),
    modules.PapersPublishedJournals.findOne({ user: req.user.id }).exec(),
   
    modules.ShortTermTraining.findOne({ user: req.user.id }).exec(),
    modules.Seminars.findOne({ user: req.user.id }).exec(),

    modules.ResearchPapersPublished.find({ user: req.user.id }).exec(),
    modules.BooksChaptersPublished.find({ user: req.user.id }).exec(),
    modules.SponsoredProjects.find({ user: req.user.id }).exec(),
    modules.ConsultancyProjects.findOne({ user: req.user.id }).exec(),
    modules.CompletedProjects.find({ user: req.user.id }).exec(),
    modules.ProjectOutcomes.find({ user: req.user.id }).exec(),
    modules.ResearchGuidance.find({ user: req.user.id }).exec(),
    modules.TrainingCourses.find({ user: req.user.id }).exec(),
    modules.ConferencePapersEntry.find({ user: req.user.id }).exec(),
    modules.InvitedLectures.find({ user: req.user.id }).exec(),


    modules.ContributionToSyllabus.findOne({ user: req.user.id }).exec(),
    modules.MemberOfUniversityCommitte.findOne({ user: req.user.id }).exec(),
    modules.ConsultancyAssignment.findOne({ user: req.user.id }).exec(),
    modules.ExternalProjectsOrCompetition.findOne({ user: req.user.id }).exec()
    ];


