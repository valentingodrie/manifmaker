import {TimeSlotService} from "../../../both/service/TimeSlotService"

class ExportUserAssignmentComponent extends BlazeComponent {

    constructor() {
        super();
    }

    template() {
        return "exportUserAssignmentComponent";
    }

    sortedAssignments(){
        return _.sortBy(Assignments.find({userId: this.data()._id}).fetch(), function(assigment){
           return TimeSlotService.getTimeSlot(Tasks.findOne(assigment.taskId), assigment.timeSlotId).start
        });
    }

    task(){
        return Tasks.findOne(this.currentData().taskId)
    }

    timeSlot(){
        return TimeSlotService.getTimeSlot(this.task(), this.currentData().timeSlotId)
    }

    displayUserInfo(userId){
        var user = Meteor.users.findOne(userId);
        var phone = (!user.profile.phoneNumber)?  " (" + user.profile.phoneNumber + ")":"";
        return user.name + phone;
    }
    place(placeId){
        return Places.findOne(placeId).name;
    }

    displayEquipment (equipmentObject){
        var quantity = equipmentObject.quantity;
        var equipmentName = Equipments.findOne(equipmentObject.equipmentId).name;
        if (quantity  = 1){
            return equipmentName;
        }else if(quantity>1){
            return String(quantity) + " " + equipmentName;
        }

    }
}

ExportUserAssignmentComponent.register('ExportUserAssignmentComponent');
