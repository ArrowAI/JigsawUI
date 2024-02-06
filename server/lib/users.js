let users = require("./../models/users");
let cohortCondition = require("./../models/cohortCondition");
let q = require("q");
let request = require("request")
var constants = require("../config/constants");
let ObjectId = require('mongodb').ObjectID;
let helperObj = {
    getUserWithEmailId: function (email) {
        let defer = q.defer();
        try {
            users.findOne({ "email": email }).then((user) => {
                console.log(user);
                defer.resolve(user);
            })
        } catch (error) {
            console.log(error);
        }

        return defer.promise;
    },
    addUserToDB: function (newUser) {
        let defer = q.defer();
        try {

            let user = new users(newUser)
            user.save(function (error, result) {
                console.log(error);
                console.log(result);
                defer.resolve(result);
            })
        } catch (error) {
            console.log(error);
        }


        return defer.promise;
    },
    generateNewApiKeyForUser: function (userId) {
        // console.log(userId);

        let defer = q.defer();
        try {
            let userString = userId + "+" + Math.floor(new Date().getTime() / 1000);

            let apiKey;
            if (typeof Buffer.from === "function") {
                // Node 5.10+
                apiKey = Buffer.from(userString).toString("base64"); // Ta-da
            } else {
                // older Node versions
                apiKey = new Buffer(userString).toString("base64"); // Ta-da
            }
            // $userString = $userId."+".time();
            // console.log(apiKey);
            // $apiKey = base64_encode($userString);
            users.updateOne({ _id: ObjectId(userId) }, { $push: { key: apiKey } }).then((user) => {
                defer.resolve(apiKey)
            })
        } catch (error) {
            console.log(error);
        }

        return defer.promise;
    },
    verifyAndGetUserCredential: function (email, password, isSocial) {
        var defer = q.defer();
        users.find({ "email": { $in: [email] } }).then((user) => {
            console.log(user);
            if (user.length) {
                if (!!isSocial) {
                    defer.resolve((JSON.parse(JSON.stringify(user))))
                }
                else {
                    let encriptedPassword;
                    if (typeof Buffer.from === "function") {
                        // Node 5.10+
                        encriptedPassword = Buffer.from(password).toString("base64"); // Ta-da
                    } else {
                        // older Node versions
                        encriptedPassword = new Buffer(password).toString("base64"); // Ta-da
                    }
                    if (encriptedPassword == ((JSON.parse(JSON.stringify(user[0]))).password)) {
                        defer.resolve((JSON.parse(JSON.stringify(user))))
                    } else {
                        defer.resolve([])
                    }
                }
            } else {
                defer.resolve([]);
            }
        })
        return defer.promise
    }
}
let userReturnObject = {
    addNewUser: function (newUser) {
        let defer = q.defer();
        try {
            helperObj.getUserWithEmailId(newUser.email).then((userExists) => {
                console.log(userExists);
                if (userExists != null) {
                    // console.log(userExists);
                    defer.resolve({ "success": 0, "message": "Email Already Registered" })
                } else {
                    let encriptedPassword;
                    if (typeof Buffer.from === "function") {
                        // Node 5.10+
                        encriptedPassword = Buffer.from(newUser.password).toString("base64"); // Ta-da
                    } else {
                        // older Node versions
                        encriptedPassword = new Buffer(newUser.password).toString("base64"); // Ta-da
                    }
                    console.log(encriptedPassword);
                    let userObj = {
                        "_id": new ObjectId,
                        "name": newUser.name,
                        "email": newUser.email,
                        "phone": newUser.phone,
                        "password": encriptedPassword,
                        "key": [],
                        "createdAt": new Date()
                    }
                    helperObj.addUserToDB(userObj).then((registeredUser) => {
                        // console.log(registeredUser);
                        try {

                            helperObj.generateNewApiKeyForUser(registeredUser._id).then((apiKey) => {
                                console.log(apiKey);
                                let resObj = registeredUser;
                                resObj.key = apiKey;
                                resObj.processKey = apiKey;
                                console.log(resObj);
                                defer.resolve(resObj);

                            })
                        } catch (error) {
                            console.log(error);
                        }


                    })
                }
            })
        } catch (error) {
            console.log(error);
        }

        return defer.promise;

    },
    authenticateUser: function (user) {
        console.log(user);
        let defer = q.defer();
        try {
            helperObj.verifyAndGetUserCredential(user.email, user.password,user.isSocial).then((loggedInUser) => {
                if (loggedInUser.length) {
                    helperObj.generateNewApiKeyForUser(loggedInUser[0]._id).then((key) => {
                        loggedInUser[0].key = key;
                        loggedInUser[0]["processKey"] = key;
                        loggedInUser[0]["dreamFactoryKey"] = key;
                        defer.resolve(loggedInUser[0])
                    })


                } else {
                    defer.resolve({})
                }


            })
        } catch (error) {
            defer.resolve({ error: error.toString() })
            console.log(error);
        }

        return defer.promise;

    },
    getCohortList: function (applicationId) {
        let defer = q.defer();
        cohortCondition.find({ "app_id": applicationId }).then(function (cohortList) {
            defer.resolve({ "resource": cohortList })
        })
        return defer.promise;
    },

};

module.exports = userReturnObject