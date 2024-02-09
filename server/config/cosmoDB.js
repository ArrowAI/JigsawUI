var constants = require("./constants");
const { MONGO_DB_URL, MONGO_USER, MONGO_PASS } = constants
const Mongoose = require("mongoose").Mongoose;
console.log("connecting to cosmo db");
let cosmoMongoose = new Mongoose()
 cosmoMongoose.set('useCreateIndex', true);
cosmoMongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false
}).then(() => console.log('connection successful'), (err) => console.log(err))
    .catch((err) => console.error(err));
cosmoMongoose.set('debug', true);
cosmoMongoose.connection.once('open', function () {
    console.log('CosmoDB event open');
    console.log('CosmoDB connected');

    cosmoMongoose.connection.on('connected', function () {
        console.log('CosmoDB event connected');
    });

    cosmoMongoose.connection.on('disconnected', function () {
        console.log('CosmoDB event disconnected');
    });

    cosmoMongoose.connection.on('reconnected', function () {
        console.log('CosmoDB event reconnected');
    });

    cosmoMongoose.connection.on('error', function (err) {
        logger.error('CosmoDB event error: ' + err);
    });

    // return resolve();
    // return server.start();
});


module.exports = cosmoMongoose;