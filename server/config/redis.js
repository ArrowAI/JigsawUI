var redis = require('redis');
var q = require('q');
var constants = require("./constants");
var environment = constants.SERVER_ENV
console.log("Redis Host = " + constants.REDIS_URL_PORT);
console.log("Redis Post = " + constants.REDIS_URL_HOST);

var client = redis.createClient(constants.REDIS_URL_PORT, constants.REDIS_URL_HOST, {
    auth_pass: constants.REDIS_PASS,
    // tls: {servername: redisURLHost},
    no_ready_check: true,
    retryStrategy: function (times) {
        // console.log('Lost Redis connection, reattempting');
        return Math.min(times * 2, 2000);
    },
    retry_strategy: function (options) {
        // console.log('Lost Redis connection, reattempting retry_strategy');
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            // return new Error('The server refused the connection');
            console.log("ECONNREFUSED");
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            console.log("retry Limit increased");
            // return new Error('Retry time exhausted');
        }
        console.log(options.attempt);
        // if (options.attempt > 10) {
        // End reconnecting with built in error
        // return undefined;
        // }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    },
    reconnectOnError: function (err) {
        if (err.message.slice(0, targetError.length) === 'READONLY') {
            // When a slave is promoted, we might get temporary errors saying
            // READONLY You can't write against a read only slave. Attempt to
            // reconnect if this happens.
            console.log('ElastiCache returned a READONLY error, reconnecting');
            return 2; // `1` means reconnect, `2` means reconnect and resend
            // the failed command
        }
    },
    socket_keepalive: true
});

client.on('ready', function () {
    console.log('Redis ready');
}).on('error', function (err) {
    // You should assume here that the connection is lost, or compromised.
    console.log('Redis error', err);
});

module.exports = {
    get: function (type, id) {
        var defer = q.defer();
        console.log('> Getting from redis ' + type + ':' + id);
        client.get(environment + ":" + type + ':' + id, function (err, reply) {
            console.log(err);
            if (reply === null) {
                defer.reject();
            }
            else {
                defer.resolve(JSON.parse(reply));
            }
        });

        return defer.promise;
    },
    getByKey: function (key) {
        try {
            var defer = q.defer();
            console.log('> Getting from redis ' + key);
            client.get(`${environment}:${key}`, function (err, reply) {
                console.log(reply);
                if (reply === null) {
                    defer.resolve(null);
                }
                else {
                    defer.resolve(JSON.parse(reply));
                }
            });

            return defer.promise;
        } catch (error) {
            console.log(error);
        }

    },

    set: function (type, id, value) {
        // console.log('> Setting to redis ' + type + ':' + id + " + " + JSON.stringify(value));
        client.set(environment + ":" + type + ':' + id, JSON.stringify(value));
    },
    setBykey: function (key, value) {
        console.log('> Setting to redis ' + key + JSON.stringify(value));
        var defer = q.defer();
        client.set(`${environment}:${key}`, JSON.stringify(value), function (err, reply) {
            try {
                if (typeof (reply) !== "undefined" && reply !== null) {
                    defer.resolve(reply);
                }
                else {
                    console.log("Rejecting!");
                    resolve(reply)
                }
            }
            catch (e) {
                console.log("We caught an error!");
                console.log(e);
            }
        });
        return defer.promise;
    },
    setWithPromiss: function (key, value) {
        try {
            return new Promise(async (resolve, reject) => {
                client.set(`${environment} + ':'  ${key}`, JSON.stringify(value));
                client.get(`${environment} + ':'  ${key}`, function (err, reply) {
                    console.log(reply);
                    if (reply === null) {
                        resolve(null);
                    }
                    else {
                        resolve(JSON.parse(reply));
                    }
                });
            })

        } catch (error) {

        }

    },

    del: function (id) {
        var defer = q.defer();
        client.del(`${environment}:${id}`, function () {
            defer.resolve()
        });
        return defer.promise;
    }
};