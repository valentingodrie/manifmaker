import {TimeSlotService} from "../../../both/service/TimeSlotService"
import {AssignmentReactiveVars} from "../../../client/helpers-events/assignment/AssignmentReactiveVars"

Router.route('/assignment/taskToUser', function () {
        console.info("routing", '/assignment/taskToUser');

        AssignmentReactiveVars.TaskFilter.set(AssignmentReactiveVars.defaultFilter);
        AssignmentReactiveVars.TaskIndexFilter.set(AssignmentReactiveVars.noSearchFilter);
        $("#search_task_name").val("");
        AssignmentReactiveVars.UserFilter.set(AssignmentReactiveVars.noneFilter);
        AssignmentReactiveVars.CurrentAssignmentType.set(AssignmentType.TASKTOUSER);
        AssignmentReactiveVars.SelectedUser.set(null);
        AssignmentReactiveVars.SelectedTask.set(null);
        AssignmentReactiveVars.SelectedDate.set(null);

    }, {
        controller: 'AssignmentController',
        name: 'assignment.calendar.taskToUser'
    }
);

Router.route('/assignment/taskToUser/:taskId/:timeSlotId', function () {
        console.info("routing", '/assignment/taskToUser/' + this.params.taskId + '/' + this.params.timeSlotId);

        AssignmentReactiveVars.CurrentAssignmentType.set(AssignmentType.TASKTOUSER);
        AssignmentReactiveVars.SelectedTask.set({_id: this.params.taskId});
        AssignmentReactiveVars.SelectedTimeSlot.set({_id: this.params.timeSlotId});

        var task = Tasks.findOne({_id: this.params.taskId});
        var timeSlot = TimeSlotService.getTimeSlot(task, this.params.timeSlotId);

        var newFilter = {
            availabilities: {
                $elemMatch: {
                    start: {$lte: timeSlot.start},
                    end: {$gte: timeSlot.end}
                }
            }
        };

        AssignmentReactiveVars.UserFilter.set(newFilter);

    }, {
        controller: 'AssignmentController',
        name: 'assignment.calendar.taskToUser.task.timeSlot'
    }
);

Router.route('/assignment/taskToUser/:taskId', function () {
        console.info("routing", '/assignment/taskToUser/' + this.params.taskId);

        AssignmentReactiveVars.CurrentAssignmentType.set(AssignmentType.TASKTOUSER);
        AssignmentReactiveVars.SelectedTask.set({_id: this.params.taskId});
        AssignmentReactiveVars.SelectedTimeSlot.set(null);
        AssignmentReactiveVars.UserFilter.set(AssignmentReactiveVars.noneFilter);


    }, {
        controller: 'AssignmentController',
        name: 'assignment.calendar.taskToUser.task'
    }
);

