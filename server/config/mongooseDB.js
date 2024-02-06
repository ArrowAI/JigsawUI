const constants = require("./constants");
const Mongoose = require("mongoose").Mongoose;
console.log("connecting to mongo db",constants.DB_CONNECTION_STRING);
let mainMongoose = new Mongoose();
mainMongoose.set('useNewUrlParser', true);
mainMongoose.set('useFindAndModify', false);
mainMongoose.set('useCreateIndex', true);
mainMongoose.set('debug', true);
mainMongoose.connect(
    constants.DB_CONNECTION_STRING, {
        auth: {
            username:constants.DB_CONNECTION_USER,
            password: constants.DB_CONNECTION_PASSWORD
          },
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useUnifiedTopology: true
        // retryWrites: false
    }
);
// mainMongoose.set('bufferCommands', false);
mainMongoose.connection.once('open', function () {
    console.log('MongoDB event open');
    console.log('MongoDB connected');

    mainMongoose.connection.on('connected', function () {
        console.log('MongoDB event connected');
    });

    mainMongoose.connection.on('disconnected', function () {
        console.log('MongoDB event disconnected');
    });

    mainMongoose.connection.on('reconnected', function () {
        console.log('MongoDB event reconnected');
    });

    mainMongoose.connection.on('error', function (err) {
        logger.error('MongoDB event error: ' + err);
    });

    // return resolve();
    // return server.start();
});


module.exports = mainMongoose;