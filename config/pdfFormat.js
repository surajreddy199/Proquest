const modules = require('./modules');

    var loads = [modules.TeachingLoad.findOne({ user: req.user.id }).exec(),
    

    modules.Leave.findOne({ user: req.user.id }).exec(),

    modules.TeachingContribution.findOne({ user: req.user.id }).exec(),
    modules.LecturesExcess.findOne({ user: req.user.id }).exec(),
    modules.AdditionalResources.findOne({ user: req.user.id }).exec(),
    modules.InnovativeTeaching.findOne({ user: req.user.id }).exec(),
    modules.ExaminationDuties.findOne({ user: req.user.id }).exec(),

    modules.TimeTable.findOne({ user: req.user.id }).exec(),

    modules.PapersPublishedNationalConf.findOne({ user: req.user.id }).exec(),
    modules.PapersPublishedInternationalConf.findOne({ user: req.user.id }).exec(),
    modules.PapersPublishedJournals.findOne({ user: req.user.id }).exec(),
    // modules.Moocs.findOne({ user: req.user.id }).exec(),
    // modules.Swayam.findOne({ user: req.user.id }).exec(),
    modules.ShortTermTraining.findOne({ user: req.user.id }).exec(),
    modules.Seminars.findOne({ user: req.user.id }).exec(),

    modules.ResourcePerson.findOne({ user: req.user.id }).exec(),
    modules.ContributionToSyllabus.findOne({ user: req.user.id }).exec(),
    modules.MemberOfUniversityCommitte.findOne({ user: req.user.id }).exec(),
    modules.ConsultancyAssignment.findOne({ user: req.user.id }).exec(),
    modules.ExternalProjectsOrCompetition.findOne({ user: req.user.id }).exec()
    ];


