import {InjectDataServerService} from "../service/InjectDataServerService"
import {InjectDataHelperServerService} from "../service/InjectDataHelperServerService"
import {SecurityServiceServer} from "../service/SecurityServiceServer"
import {ServerUserService} from "../service/ServerUserService"


Meteor.methods({
     injectData: function(){
         SecurityServiceServer.isItProd("inject data from front");
         Meteor.isStartingUp = true;
         InjectDataHelperServerService.deleteAll();
         InjectDataHelperServerService.initAccessRightData();
         Meteor.injectDataServerService.injectAllData();
         Meteor.isStartingUp = false;
     },
    updateUserName: function(userId,newUsername){
        ServerUserService.updateUserName(userId,newUsername)
    },
    updateUserEmail: function(userId,newUserEmail){
        ServerUserService.updateUserEmail(userId,newUserEmail)
    },
    sendVerificationEmail: function(userId){
        ServerUserService.sendVerificationEmail(userId)
    },
    getVersion: function () {
        var pjson = require('/package.json');
        console.log(pjson.version); // This will print the version
        return pjson.version;
    }
});

