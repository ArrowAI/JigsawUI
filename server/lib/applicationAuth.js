let constants = require('../config/constants');
let ObjectId = require('mongodb').ObjectID;
let MongoClient = require('mongodb').MongoClient;
let Q = require('q');
let applicationsList = require('./applicationsList');
let applicationKey = require("./../models/applications_key");
let application = require("./../models/application");
let Users = require("./../models/users");
let applications = require("./../models/application");
let redisClient = require('../config/redis');
let tasks = {
    authenticateUserFromRedis: function (key) {
        let defer = Q.defer();
        try {
            redisClient.getByKey(key).then(function (user) {
                console.log(user);
                defer.resolve(user);
            })
        } catch (err) {
            console.log(err);
            //  defer.resolve(null);
        }
        return defer.promise;
    },

    authenticateArrowCredentials: function (key) {
        let defer = Q.defer();
        let self = this;
        try {
            let buf;
            if (typeof Buffer.from === "function") {
                // Node 5.10+
                buf = Buffer.from(key, 'base64').toString("ascii"); // Ta-da
            } else {
                // older Node versions
                buf = new Buffer(key, 'base64').toString("ascii"); // Ta-da
            }
            let userId = buf.split("+")[0];
            console.log(userId);
            // self.authenticateUserFromRedis("authenticateUser_"+userId).then(function (user) {
            //     if (!!user && user== null) {
            Users.find({
                _id: ObjectId(userId),
                key: key
            }, function (err, userCredData) {
                // console.log(JSON.stringify(userCredData));
                if (err || !userCredData) {
                    defer.resolve({ error: "Wrong Key" });
                } else {
                    // redisClient.setBykey("authenticateUser_"+userId,{ user_id: userId });
                    defer.resolve({ user_id: userId });

                }
            })
            // }
            // else{
            //     defer.resolve(user);
            // }
            // })

        } catch (err) {
            console.log(err);
            defer.reject({
                error: err
            });
        }
        return defer.promise;
    },

    getUserByToken: function (key) {
        let defer = Q.defer();
        let self = this;
        try {
            let buf;
            if (typeof Buffer.from === "function") {
                // Node 5.10+
                buf = Buffer.from(key, 'base64').toString("ascii"); // Ta-da
            } else {
                // older Node versions
                buf = new Buffer(key, 'base64').toString("ascii"); // Ta-da
            }
            let userId = buf.split("+")[0];
            MongoClient.connect(constants.DB_CONNECTION_STRING_FULL, { useNewUrlParser: true,useUnifiedTopology: true })
                .then(client => {
                    // ...
                    const db = client.db(constants.DATABASE_NAME)
                    const User = db.collection('users');
                    User.findOne({ _id: ObjectId(userId) }).then(async (userCredData) => {
                        userCredData = (JSON.parse(JSON.stringify(userCredData)));
                        console.log(userCredData);
                        if (!!userCredData) {
                            const Application = db.collection('application');

                            Application.find({ users: { "$elemMatch": { user_id: ObjectId(userId) } } }).toArray((err, applicationDef) => {
                                if (applicationDef) {
                                    const userObj = Object.assign((JSON.parse(JSON.stringify(userCredData))));
                                    let user = {
                                        id: userObj._id,
                                        username: userObj.name,
                                        password: userObj.password,
                                        email: userObj.email,
                                        accessToken: key,
                                        refreshToken: key,
                                        roles: [1], // Administrator
                                        pic: './assets/media/users/default.jpg',
                                        fullname: userObj.name,
                                        occupation: 'CEO',
                                        companyName: userObj.name,
                                        phone: userObj.phone,
                                        address: {
                                        },
                                        socialNetworks: {
                                        },
                                        applications: applicationDef,
                                        activeApplication: applicationDef[0],
                                    }
                                    // const Elements = db.collection('elements');
                                    // Elements.find({ "_id": { "$in": packages.modules } }).toArray((err, elements) => {
                                    //     resolve(elements);
                                    // })
                                    defer.resolve(user);
                                } else {

                                    defer.resolve({ error: "Wrong Key" });
                                }
                            });
                            client.close();

                            // ...
                        }
                    })
                })

            // Users.findOne({
            //         _id: ObjectId(userId),
            //         key: key
            //     }, function(err, userCredData) {

            //         if (err || !userCredData) {
            //             defer.resolve({ error: "Wrong Key" });
            //         } else {
            //             applications.find({ users: { "$elemMatch": { user_id: ObjectId(userId) } } }).then((applicationDef) => {
            //                 console.log(applicationDef);
            //                 if (applicationDef) {
            //                     const userObj = Object.assign((JSON.parse(JSON.stringify(userCredData))));
            //                     let user = {
            //                             id: userObj._id,
            //                             username: userObj.name,
            //                             password: userObj.password,
            //                             email: userObj.email,
            //                             accessToken: key,
            //                             refreshToken: key,
            //                             roles: [1], // Administrator
            //                             pic: './assets/media/users/default.jpg',
            //                             fullname: userObj.name,
            //                             occupation: 'CEO',
            //                             companyName: userObj.name,
            //                             phone: userObj.phone,
            //                             address: {

            //                             },
            //                             socialNetworks: {
            //                             },
            //                             applications: applicationDef,
            //                             activeApplication: applicationDef[0],
            //                         }
            //                         // console.log("user is", userCredData);
            //                         // redisClient.setBykey("authenticateUser_"+userId,{ user_id: userId });
            //                     defer.resolve(user);
            //                 } else {
            //                     defer.resolve();
            //                 }
            //             })


            //         }
            //     })
            // }
            // else{
            //     defer.resolve(user);
            // }
            // })

        } catch (err) {
            console.log(err);
            defer.reject({
                error: err
            });
        }
        return defer.promise;
    },
    getApplicationConfig: function (key, userId) {
        console.log("key is", userId);
        return new Promise((resolve, reject) => {
            try {
                MongoClient.connect(constants.DB_CONNECTION_STRING_FULL, { useNewUrlParser: true,useUnifiedTopology: true })
                .then(client => {
                    // ...
                    const db = client.db(constants.DATABASE_NAME)
                    const User = db.collection('users');
                    User.findOne({ _id: ObjectId(userId) }).then(async (userCredData) => {
                        userCredData = (JSON.parse(JSON.stringify(userCredData)));
                        console.log(userCredData);
                        if (!!userCredData) {
                            const Application = db.collection('application');

                            Application.find({ users: { "$elemMatch": { user_id:ObjectId(userId)  } } }).toArray((err, applicationDef) => {
                                console.log(err, applicationDef);
                                if (applicationDef) {
                                    const userObj = Object.assign((JSON.parse(JSON.stringify(userCredData))));
                                    let user = {
                                        id: userObj._id,
                                        username: userObj.name,
                                        password: userObj.password,
                                        email: userObj.email,
                                        accessToken: key,
                                        refreshToken: key,
                                        roles: [1], // Administrator
                                        pic: './assets/media/users/default.jpg',
                                        fullname: userObj.name,
                                        occupation: 'CEO',
                                        companyName: userObj.name,
                                        phone: userObj.phone,
                                        address: {
                                        },
                                        socialNetworks: {
                                        },
                                        applications: applicationDef,
                                        activeApplication: applicationDef[0],
                                    }
                                    // const Elements = db.collection('elements');
                                    // Elements.find({ "_id": { "$in": packages.modules } }).toArray((err, elements) => {
                                    //     resolve(elements);
                                    // })
                                    resolve(user);
                                } else {

                                    resolve({ error: "Wrong Key" });
                                    
                                }
                                client.close();
                            });
                            // client.close();

                            // ...
                        }
                    })
                })

            } catch (err) {
                console.log("error in connection mongoclient");
                reject({
                    error: err
                });
            }
        })
    }
};
module.exports = {
    tasks: tasks
};