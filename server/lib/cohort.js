let q = require("q");
let _ = require('underscore');
let ObjectId = require('mongodb').ObjectID;
let CohortUsers = require('../models/cohort_users');
// let Events = require('../models/events');
let moment = require('moment');
let CohortCondition = require("./../models/cohortCondition");
const { resolve, reject } = require("q");

let timeCal = function (name, duration, durationType) {
    let currentDate = moment();
    let exactTime;
    let obj = {};
    if (name === "inPast") {
        obj = {
            "$gt": ["$events.timestamp", moment(currentDate).subtract(duration, durationType).valueOf()]
        };
        return obj
    }
    else if (name === "today") {
        currentDate.set({hour: 0, minute: 0, second: 0, millisecond: 0});
        obj = {
            "$gt": ["$events.timestamp", moment(currentDate).valueOf()]
        };
        return obj
    }
};
let getUserOperator = function (operator) {
    if (operator === "=") {
        return "=";
    } else if (operator === "<") {
        return "$lt";
    } else if (operator === ">") {
        return "$gt";
    } else if (operator === "!=") {
        return "$neq";
    }
    else if (operator === "<=") {
        return "$lte";
    }
    else if (operator === ">=") {
        return "$gte";
    }
};
let getMongoOperator = function (operator) {
    if (operator === "=") {
        return "$eq";
    } else if (operator === "<") {
        return "$lt";
    } else if (operator === ">") {
        return "$gt";
    } else if (operator === "!=") {
        return "$neq";
    }
    else if (operator === "<=") {
        return "$lte";
    }
    else if (operator === ">=") {
        return "$gte";
    }
};

let UserCohortPaginator = function (applicationId, filters, fields, page, limit, sortBy, allFields, lookupEvents, cohortId) {
    this.applicationId = applicationId;
    this.filters = filters;
    this.fields = fields;
    this.page = page;
    this.limit = limit;
    this.sortBy = sortBy;
    this.allFields = allFields;
    this.lookupEvents = lookupEvents !== undefined ? lookupEvents : false;
    this.cohortId = cohortId || false;
};

UserCohortPaginator.prototype.setPage = function (page) {
    this.page = page;
};

UserCohortPaginator.prototype.setLimit = function (limit) {
    this.limit = limit;
};

UserCohortPaginator.prototype.setFilters = function (filters) {
    this.filters = filters;
};

UserCohortPaginator.prototype.getFiltersArray = function () {
    console.log("filter array called");
    try {


        let self = this;
        if (!!this.lookupEvents) {
            this.filters.unshift({
                lookup: {
                    from: "application_events",
                    localField: "_id",
                    foreignField: "groupId",
                    as: "events"
                }
            });
        }
        self.filters.unshift({match: {app_id: ObjectId(self.applicationId)}});


        if (this.sortBy) {
            self.filters.push({sort: this.sortBy})
        }
        if (!self.allFields) {
            self.filters.push({project: self.fields});
        }
        self.aggregate = CohortUsers.aggregate();
        self.filters.forEach(function (filter) {
            if (filter.hasOwnProperty("match")) {
                self.aggregate.match(filter.match);
            }
            if (filter.hasOwnProperty("group")) {
                self.aggregate.group(filter.group);
            }
            if (filter.hasOwnProperty("lookup")) {
                self.aggregate.lookup(filter.lookup);
            }
            if (filter.hasOwnProperty("project")) {
                self.aggregate.project(filter.project);
            }
            if (filter.hasOwnProperty("sort")) {
                self.aggregate.sort(filter.sort);
            }
            if (filter.hasOwnProperty("userWhoDidConditionList") &&
                filter.hasOwnProperty("userWhoDidNotConditionList") &&
                filter.hasOwnProperty("userPropertiesConditionList")) {
                let userWhoDidConditionList = filter["userWhoDidConditionList"],
                    userWhoDidConditionListConditionType = filter["userWhoDidNotConditionList"].conditionType || "and",
                    userWhoDidConditionListMainGroupConditions,
                    userWhoDidConditionListConditionWhere,
                    userWhoDidNotConditionList = filter["userWhoDidNotConditionList"],
                    userWhoDidNotConditionListConditionType = filter["userWhoDidNotConditionList"].conditionType || "and",
                    userWhoDidNotConditionListMainGroupConditions,
                    userPropertiesConditionList = filter["userPropertiesConditionList"],
                    userPropertiesConditionListConditionType = filter["userPropertiesConditionList"].conditionType || "and";


                let maintainObjectProject = {
                    project: {
                        "document": "$$CURRENT"
                    }
                };
                let lookupData = {
                    lookup: {
                        from: "application_events",
                        localField: "_id",
                        foreignField: "groupId",
                        as: "events"
                    }
                };
                let unwindData = {
                    unwind: "$events"
                };
                let groupData = {
                    group: {
                        _id: "$_id",
                        'eventsCount': {$sum: 1},
                        "document": {$first: "$document"},
                        'events': {$first: "$events"}
                    }
                };
                let matchData = {
                    match: {
                        "$and": []
                    }
                };

                let userPropertyMatchData = {
                    match: {
                        "$and": []
                    }
                };
                let replaceRoot = {
                    replaceRoot: {
                        newRoot: "$document"
                    }
                };

                if (userWhoDidConditionList.hasOwnProperty("conditions") && userWhoDidConditionList.conditions instanceof Array && userWhoDidConditionList.conditions.length > 0) {
                    let userWhoDidConditionCountFilterObject = {},
                        userWhoDidConditionListConditions = userWhoDidConditionList.conditions,
                        userWhoDidConditionListConditionType = userWhoDidConditionList.conditionType === "or" ? "$or" : "$and",
                        userWhoDidConditionCountFilterArray = [];

                    for (let y = 0; y < userWhoDidConditionListConditions.length; y++) {
                        let userWhoDidConditionListPipelineConditionFilters = [];

                        if (!!userWhoDidConditionListConditions[y].eventId) {
                            userWhoDidConditionListPipelineConditionFilters.push({"$eq": ['$events.eventId', userWhoDidConditionListConditions[y].eventId]})
                        }
                        if (!!userWhoDidConditionListConditions[y].eventType) {
                            userWhoDidConditionListPipelineConditionFilters.push({"$eq": ['$events.eventType', userWhoDidConditionListConditions[y].eventType]})
                        }
                        if (!!userWhoDidConditionListConditions[y].timeFilter) {
                            // userWhoDidConditionListPipelineConditionFilters.push({ "$lt": ["$events.timestamp", moment().valueOf()] })
                            if (userWhoDidConditionListConditions[y].timeFilter.name === "inPast" ||
                                userWhoDidConditionListConditions[y].timeFilter.name === "today") {
                                userWhoDidConditionListPipelineConditionFilters.push({"$lt": ["$events.timestamp", moment().valueOf()]});
                                userWhoDidConditionListPipelineConditionFilters.push(timeCal(
                                    userWhoDidConditionListConditions[y].timeFilter.name,
                                    userWhoDidConditionListConditions[y].timeFilter.duration,
                                    userWhoDidConditionListConditions[y].timeFilter.durationType
                                ))
                            }
                            if (userWhoDidConditionListConditions[y].timeFilter.name === "after") {
                                userWhoDidConditionListPipelineConditionFilters.push(
                                    {"$gt": ["$events.timestamp", moment(userWhoDidConditionListConditions[y].timeFilter.date).valueOf()]}
                                )
                            }
                            if (userWhoDidConditionListConditions[y].timeFilter.name === "before") {
                                userWhoDidConditionListPipelineConditionFilters.push(
                                    {"$lt": ["$events.timestamp", moment(userWhoDidConditionListConditions[y].timeFilter.date).valueOf()]}
                                )
                            }
                            if (userWhoDidConditionListConditions[y].timeFilter.name === "on") {
                                userWhoDidConditionListPipelineConditionFilters.push(
                                    {"$lt": ["$events.timestamp", moment(userWhoDidConditionListConditions[y].timeFilter.date).valueOf()]}
                                )
                            }
                            if (userWhoDidConditionListConditions[y].timeFilter.name === "between") {
                                userWhoDidConditionListPipelineConditionFilters.push(
                                    {"$gt": ["$events.timestamp", moment(userWhoDidConditionListConditions[y].timeFilter.from).valueOf()]}
                                );

                                userWhoDidConditionListPipelineConditionFilters.push(
                                    {"$lt": ["$events.timestamp", moment(userWhoDidConditionListConditions[y].timeFilter.to).valueOf()]}
                                )
                            }
                        }
                        ;
                        userWhoDidConditionListMainGroupConditions = {
                            $sum: {
                                "$cond": [
                                    {
                                        "$and": userWhoDidConditionListPipelineConditionFilters
                                    },
                                    1,
                                    0
                                ]
                            }
                        };
                        groupData.group["userWhoDidConditionList" + y] = userWhoDidConditionListMainGroupConditions;
                        if (!!userWhoDidConditionListConditions[y].where) {
                            let conditionCountFilter = {};
                            userWhoDidConditionListConditionWhere = userWhoDidConditionListConditions[y].where;
                            conditionCountFilter["userWhoDidConditionList" + y] = {};
                            conditionCountFilter["userWhoDidConditionList" + y][getMongoOperator(userWhoDidConditionListConditionWhere.conditions.operator)] = userWhoDidConditionListConditionWhere.value;
                            userWhoDidConditionCountFilterArray.push(conditionCountFilter);
                        }
                    }
                    let userWhoDidConditionCountTotalFilterObject = {};
                    userWhoDidConditionCountTotalFilterObject[userWhoDidConditionListConditionType] = userWhoDidConditionCountFilterArray;
                    matchData.match["$and"].push(userWhoDidConditionCountTotalFilterObject);
                }
                if (userPropertiesConditionList.hasOwnProperty("conditions") && userPropertiesConditionList.conditions instanceof Array && userPropertiesConditionList.conditions.length > 0) {
                    let userPropertyConditionListConditions = userPropertiesConditionList.conditions,
                        userPropertyConditionListConditionType = userPropertiesConditionList.conditionType === "or" ? "$or" : "$and";
                    userPropertyConditionListConditions.forEach(function (userCondtition, i) {
                        try {
                            let condtion = {};
                            if (userCondtition.hasOwnProperty('key')) {
                                if (!userPropertyMatchData.match[userPropertyConditionListConditionType]) {
                                    userPropertyMatchData.match[userPropertyConditionListConditionType] = [];
                                }
                                if (userCondtition.key == "data.integration") {
                                    condtion["data.integration." + userCondtition.value] = true;
                                }
                                else if (userCondtition.conditions.operator === "≏") {
                                    condtion[userCondtition.key] = {};
                                    condtion[userCondtition.key]['$gt'] = userCondtition.value.split('-')[0];
                                    condtion[userCondtition.key]['$lt'] = userCondtition.value.split('-')[1];
                                }
                                else {
                                    condtion[userCondtition.key] = {};
                                    condtion[userCondtition.key][getMongoOperator(userCondtition.conditions.operator)] = userCondtition.value;
                                }
                            }
                            userPropertyMatchData.match[userPropertyConditionListConditionType].push(condtion);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    })
                }
                if (userPropertiesConditionList.conditions.length) {
                    self.aggregate.match(userPropertyMatchData.match);
                }
                console.log("user condition",userWhoDidNotConditionList);
                if (userWhoDidConditionList.conditions.length || userWhoDidNotConditionList.conditions.length) {
                    self.aggregate.project(maintainObjectProject.project);
                    self.aggregate.lookup(lookupData.lookup);
                    self.aggregate.unwind(unwindData.unwind);
                    self.aggregate.group(groupData.group);
                    self.aggregate.match(matchData.match);
                    self.aggregate.append([{$replaceRoot: replaceRoot.replaceRoot}]);
                }
            }
        });
    }
    catch (ex) {
        console.log("error in getting filter user", ex);
    }

};

UserCohortPaginator.prototype.getCohortFilter = function () {
    let defer = q.defer();
    let self = this;
    //  console.log(this.cohortId);
    if (this.cohortId) {
        CohortCondition.findOne({_id: ObjectId(this.cohortId)}).then((cohortDef) => {
            console.log(cohortDef);
            if (cohortDef) {
                self.filters.push(cohortDef.filters);
                defer.resolve();
            } else {
                defer.resolve();
            }
        })
    }
    else {
        console.log("filter users")
        defer.resolve();
    }
    return defer.promise;
};

UserCohortPaginator.prototype.getPaginatedUserCohorts = function () {
    console.log("Getting paginated user cohorts! ++++++");
    let defer = q.defer();
    try {
        let self = this;
        this.getCohortFilter().then(() => {
            console.log("deffer resloved");
            self.getFiltersArray();
            console.log(JSON.stringify(self.aggregate._pipeline));
            CohortUsers.aggregatePaginate(self.aggregate, {
                page: this.page,
                limit: this.limit
            })
                .then(function (value) {
                    value.currentPage = self.page;
                    value.currentLimit = self.limit;
                    defer.resolve(value)
                })
                .catch(function (err) {
                    console.log('******', err);
                    defer.reject(err.message);
                })
        });

    } catch (e) {
        console.log(e);
        defer.reject(e);
    }
    return defer.promise;
};
UserCohortPaginator.prototype.getAllUsers = function () {
    console.log("Getting paginated user cohorts! ");
    let defer = q.defer();
    try {
        let self = this;
        this.getCohortFilter().then(() => {
            self.getFiltersArray();
            console.log(self.aggregate._pipeline);
            CohortUsers.aggregate(self.aggregate._pipeline, function (err, result) {
                if (err) {
                    defer.resolve(err)
                } else {
                    defer.resolve(result)
                }
            });
        });
    } catch (e) {
        defer.reject(e.message);
    }
    return defer.promise;
};
UserCohortPaginator.prototype.getGroupUserByGroupId=function(groupIds){
    let self=this;
    console.log(self.applicationId);
    return new Promise((resolve,reject)=>{
        CohortUsers.find({app_id:ObjectId(self.applicationId),_id: { $in:groupIds},'data.phone' : { '$exists' : true }} , function (err, result) {
            if (err) {
                resolve(err)
            } else {
                resolve(result)
            }
        });
    })
}

module.exports = UserCohortPaginator;