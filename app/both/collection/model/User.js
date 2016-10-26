import {Schemas} from './SchemasHelpers'
import {TimeSlotService} from "../../../both/service/TimeSlotService"

//order matters !
Schemas.UserAvailabilities = new SimpleSchema({
    start: {
        type: Date,
        label: "User Availabilities Start Date",
        custom: function () {
            if (new moment(this.value).isAfter(new moment(this.field(this.key.replace("start", "") + "end").value)))
                return "startAfterEnd";

            var userTeams = Users.findOne(this.docId).teams;
            var start = this.value;

            if (!AssignmentTerms.findOne({
                    teams: {
                        $elemMatch: {
                            $in: userTeams
                        }
                    },
                        start: {
                            $lte: start
                        }
                })
            )
                return "availabilitiesNoInTerm"

        },
        autoform: {
            type: "datetime-local",
        }
    },
    end: {
        type: Date,
        label: "User Availabilities End Date",
        custom: function () {
            if (new moment(this.value).isSame(new moment(this.field(this.key.replace("end", "") + "start").value)))
                return "endBeforeStart"

            var userTeams = Users.findOne(this.docId).teams;
            var end = this.value;

            if (!AssignmentTerms.findOne({
                    teams: {
                        $elemMatch: {
                            $in: userTeams
                        }
                    },
                    end: {
                        $gte: end
                    }
                })
            )
                return "availabilitiesNoInTerm"
        },
        autoform: {
            type: "datetime-local",
        }
    }
});

Schemas.UserAssignment = new SimpleSchema({
    taskName: {
        type: String,
        label: "User assignment User Name"
    },
    start: {
        type: Date,
        label: "User Assignment Start Date"
    },
    end: {
        type: Date,
        label: "User Assignment End Date"
    },
    assignmentId: {
        type: SimpleSchema.RegEx.Id,
        label: "User assignment assignment id",
        custom: function () { //validate data is same as the real assignment
            var assignment = Assignments.findOne(this.value);
            if (!assignment)
                return "unknownId"
            var timeSlot = TimeSlotService.getTimeSlot(assignment.taskId,assignment.timeSlotId);
            if (Tasks.findOne(assignment.taskId).name !== this.field(this.key.replace("assignmentId", "") + "taskName").value
                || !new moment(timeSlot.start).isSame(new moment(this.field(this.key.replace("assignmentId", "") + "start").value))
                || !new moment(timeSlot.end).isSame(new moment(this.field(this.key.replace("assignmentId", "") + "end").value)))
                return "userAssignmentNotMatching"
        }
    }
});

Schemas.Users = new SimpleSchema({
    name: {
        type: String,
        label: "Users Name",
        max: 100
    },
    firstName: {
        type: String,
        label: "User first name",
        max: 100,
        optional: true,
        defaultValue: null
    },
    familyName: {
        type: String,
        label: "User family name",
        max: 100,
        optional: true,
        defaultValue: null
    },
    phoneNumber:{
        type: SimpleSchema.RegEx.Phone,
        label: "User phone",
        optional: true,
        defaultValue: null
    },
    birthDate: {
        type: Date,
        label: "User birth date",
        optional: true,
        defaultValue: null
    },
    loginUserId: {
        label: "User login link to collection managed by Account package",
        type: SimpleSchema.RegEx.Id,
        optional: true
    },
    isReadyForAssignment: {
        label: "User assignment ready state",
        type: Boolean,
        defaultValue: false,
        custom: function () {
            if(this.isUpdate)
            if(this.value === false){
                if(Users.findOne(this.docId).assignments && Users.findOne(this.docId).assignments.length !== 0){
                    return "userHasAssignments"
                }
            }
        }
    },
    groupRoles: {
        label: "User roles to gain a set of less or more data and features",
        type: [SimpleSchema.RegEx.Id],
        optional: true,
        custom: function () {
            this.value = _.compact(this.value);
            if(GroupRoles.find({_id:{$in:this.value}}).fetch().length !== this.value.length)
                return "unknownIdOrDuplicateId"
        }
    },
    'groupRoles.$': {
        autoform: {
            afFieldInput: {
                options: Schemas.helpers.allGroupRolesOptions
            }
        }
    },
    teams: {
        label: "User teams",
        type: [SimpleSchema.RegEx.Id],
        optional: true,
        custom: function () {
            this.value = _.compact(this.value);
            if(Teams.find({_id:{$in:this.value}}).fetch().length !== this.value.length)
                return "unknownIdOrDuplicateId"
        },
        autoValue: function () {
            if (this.isInsert) {
                //trick pour les filtres, tous les users appartiennement au moins à l'équipe ASSIGNMENTREADYTEAM
                var assignmentReadyTeam = Teams.findOne({name: ASSIGNMENTREADYTEAM});
                if(!this.value)
                    this.value = [];
                else if (!_.contains(this.value,assignmentReadyTeam._id)) //we don't add it we it already have it (when autoform do the check several times)
                    this.value.push(assignmentReadyTeam._id);
                return this.value;
            }
        },
    },
    'teams.$': {
        autoform: {
            afFieldInput: {
                options: Schemas.helpers.allTeamsOptions
            }
        }
    },
    skills: {
        label: "User Skills",
        type: [SimpleSchema.RegEx.Id],
        optional: true,
        defaultValue: [],
        custom: function () {
            this.value = _.compact(this.value);
            if(Skills.find({_id:{$in:this.value}}).fetch().length !== this.value.length)
                return "unknownIdOrDuplicateId"

            if(this.isUpdate && Users.findOne(this.docId).isReadyForAssignment && Users.findOne(this.docId).isReadyForAssignment === true)
                return "userHasBeenValidatedNoSkillsUpdate"
        }
    },
    'skills.$': {
        autoform: {
            afFieldInput: {
                options: Schemas.helpers.allSkillsOptions
            }
        }
    },
    availabilities: {
        type: [Schemas.UserAvailabilities],
        label: "User availabilities",
        optional: true,
        defaultValue: []
    },
    assignments: {
        type: [Schemas.UserAssignment],
        label: "User assignments",
        defaultValue: [],
        optional: true,
        autoform: {
            type: "hidden",
        }
    }
});