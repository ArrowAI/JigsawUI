

var winston = require('winston')
const constants = require('./config/constants');
var redis = require('redis');
// Submodules

var campaignSocket = require('./socketio/campaignSocket')
var socketServer = function (server) {
    'use strict'
    var io = require('socket.io')(server)
    const redisAdapter = require('socket.io-redis');
    // const pub = redis.createClient(constants.REDIS_URL_PORT, constants.REDIS_URL_HOST, { auth_pass: constants.REDIS_PASS });
    // const sub = redis.createClient(constants.REDIS_URL_PORT, constants.REDIS_URL_HOST, { auth_pass: constants.REDIS_PASS });
    // io.adapter(redisAdapter({ pubClient: pub, subClient: sub }));
    io.use(function (data, accept) {
        console.log('user connected');
        accept();
    })
    io.set('transports', ['polling', 'websocket'])
    io.on('connection', function (socket) {
        // Register Submodules
        campaignSocket.register(socket)
    })
    global.io = io
    winston.info('SocketServer Running')
}



module.exports = socketServer