/**
 * @memberOf Enum
 * @summary Usable role to filter access right
 * @enum {string}
 * @readonly
 * @locus Anywhere
 */
RolesEnum = {
    /** global */
    MANIFMAKER: "MANIFMAKER",

    /** task */
    TASKREAD: "TASKREAD",
    /** task */
    TASKWRITE: "TASKWRITE",
    /** task */
    TASKDELETE: "TASKDELETE",
    /** task */
    EQUIPMENTVALIDATION: "EQUIPMENTVALIDATION",
    /** task */
    ASSIGNMENTVALIDATION: "ASSIGNMENTVALIDATION",

    /** group task **/
    TASKGROUPREAD: "TASKGROUPREAD",
    /** group task **/
    TASKGROUPWRITE: "TASKGROUPWRITE",
    /** group task **/
    TASKGROUPDELETE: "TASKGROUPDELETE",

    /** activity */
    ALLACTIVITY: "ALLACTIVITY",
    /** activity */
    ACTIVITYREAD: "ACTIVITYREAD",
    /** activity */
    ACTIVITYWRITE: "ACTIVITYWRITE",
    /** activity */
    ACTIVITYDELETE: "ACTIVITYDELETE",
    /** activity */
    ACTIVITYGENERALVALIDATION: "ACTIVITYGENERALVALIDATION",
    /** activity */
    ACCESSPASSVALIDATION: "ACCESSPASSVALIDATION",

    /** assignment */
    ASSIGNMENTTASKUSER: "ASSIGNMENTTASKUSER",

    /** user */
    USERREAD: "USERREAD",
    /** user */
    USERWRITE: "USERWRITE",
    /** user */
    USERDELETE: "USERDELETE",

    /** conf */
    CONFMAKER: "CONFMAKER",
    /** conf */
    ROLE: "ROLE"
};