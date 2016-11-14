export var Schemas = {};
SimpleSchema.messages({
    unknownId: `[label] could not be found in database`,
    unknownIdOrDuplicateId: `[label] could not be found in database or is duplicated`,
    duplicate: `[label] is duplicated`,
    endBeforeStart: `[label] must be after its start date`,
    startAfterEnd: `[label] must be before its end date`,
    timeSlotConflictDate: `Time slot can't overlap. Check time slot start and end date conflicts with all others time slots`,
    assignmentTermPeriodsConflictDate: `Assignment term periods can't overlap. Check assignment term period start and end date conflicts with all others periods for this assignment term`,
    assignmentTermsConflictDate: `Assignment terms can't overlap. Check assignment term start and end date conflicts with all others assignment terms`,
    periodStartBeforeTerm: `Period can not start before its term`,
    periodEndAfterTerm: `Period can not end after its term`,
    skillsNotFound: 'Skills not found',
    taskAssignmentNotMatching: "Task assignment do not match real assignment",
    userAssignmentNotMatching: "User assignment do not match real assignment",
    peopleNeedUserId: "If a specific user is asked, team and skill are not relevant. Please either pick a user OR a team and/or some skills.",
    peopleNeedIsEmpty: "A people need requires either a user either a team and/or some skills.",
    onePeopleNeedUserIdPerTimeSlot: "A time slot can not have more than once the same need for a user id",
    onePeopleNeedUserIdPerDateTime: "A user can not be needed more than once for the same date time",
    onePeopleNeedUserIdPerDateTimeCODE: "onePeopleNeedUserIdPerDateTimeCODE",
    updateNotAllowed: "[label] can not be updated as it has is being validated or has already been validated",
    peopleNeededUpdateNotAllowed: "[label] can not be update as task time slots are not ready for assignment",
    peopleNeedUserIdUnique: "There can ba only one people need requiring a specific user by time slot",
    availabilitiesNoInTerm: "User does not have access to any assignment terms enclosing given availability.",
    timeSlotNotWithinTerms: "Time slot dates are not within a assignment term's periods",
    userHasAssignments: "Cannot perform this action as user already has assignments.",
    userHasBeenValidatedNoSkillsUpdate: "User has been validated therefore its skills cannot be update",
    accuracyNotFound: "Accuracy value is not a valide one.",
    moreThanOneSettings: "There can be only one doc in Settings collection",
    userAccessToSkills: "User does not have access to this skills",
    availabilityOverlapAssignment: "Availability can not overlap an assignment"
});

Schemas.helpers = {};

Schemas.helpers.allTeamsOptions = function () {
    var teams = Teams.find({
        name: {
            $ne: ASSIGNMENTREADYTEAM
        }
    }).fetch();
    var result = [];
    _.each(teams, function (team) {
        result.push({
            label: team.name,
            value: team._id
        });
    });

    return result;
};

Schemas.helpers.allTaskGroupsOptions = function () {
    var taskGroups = TaskGroups.find({}).fetch();
    var result = [];
    _.each(taskGroups, function (taskGroup) {
        result.push({
            label: taskGroup.name,
            value: taskGroup._id
        });
    });

    return result;
};

Schemas.helpers.allPlacesOptions = function () {
    var places = Places.find({}).fetch();
    var result = [];
    _.each(places, function (place) {
        result.push({
            label: place.name,
            value: place._id
        });
    });

    return result;
};

Schemas.helpers.allEquipmentCategoriesOptions  = function () {
    var categories = EquipmentCategories.find({}).fetch();
    var result = [];
    _.each(categories, function (category) {
        result.push({
            label: category.name,
            value: category._id
        });
    });

    return result;
};


Schemas.helpers.allPowerSuppliesOptions  = function () {
    var list = PowerSupplies.find({}).fetch();
    var result = [];
    _.each(list, function (item) {
        result.push({
            label: item.name,
            value: item._id
        });
    });

    return result;
};


Schemas.helpers.allEquipmentStoragesOptions  = function () {
    var list = EquipmentStorages.find({}).fetch();
    var result = [];
    _.each(list, function (item) {
        result.push({
            label: item.name,
            value: item._id
        });
    });

    return result;
};


Schemas.helpers.allUsersOptions = function () {
    var users = Meteor.users.find({}).fetch();
    var result = [];
    _.each(users, function (user) {
        result.push({
            label: `${user.firstName} ${user.familyName} (${user.username}`,
            value: user._id
        });
    });

    return result;
};

Schemas.helpers.allSkillsOptions = function () {
    var skills = Skills.find({}).fetch();
    var result = [];
    _.each(skills, function (skill) {
        result.push({
            label: skill.label,
            value: skill._id
        });
    });

    return result;
};

Schemas.helpers.allEquipmentsForTaskOptions = function () {
    var query = Equipments.find({targetUsage: {
        $in: [EquipementTargetUsage.BOTH, EquipementTargetUsage.ACTIVITY]
    }}).fetch();
    var result = [];
    _.each(query, function (item) {
        result.push({
            label: item.name,
            value: item._id
        });
    });

    return result;
};

Schemas.helpers.allRolesOptions = function () {
    var skills = Meteor.roles.find({}).fetch();
    var result = [];
    _.each(skills, function (role) {
        result.push({
            label: role.name,
            value: role.name
        });
    });

    return result;
};

Schemas.helpers.allGroupRolesOptions = function () {
    var skills = GroupRoles.find({}).fetch();
    var result = [];
    _.each(skills, function (groupRole) {
        result.push({
            label: groupRole.name + " : " +groupRole.roles,
            value: groupRole._id
        });
    });

    return result;
};

Schemas.helpers.allDepartementOptions = function () {
    var items =   ["PC","TC","IF","GE","GM","GI","BIM","GCU","These"];
    var result = [];
    _.each(items, function (item) {
        result.push({
            label: item,
            value: item
        });
    });

    return result;
};


Schemas.helpers.allAnneesOptions = function () {
    var items =   ["1","2","3","4","5","doc"];
    var result = [];
    _.each(items, function (item) {
        result.push({
            label: item,
            value: item
        });
    });

    return result;
};