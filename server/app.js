var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

let applicationRouter = require('./routes/application');
let botsRouter = require('./routes/bots');
var bodyParser = require('body-parser');
let importAgent = require('./routes/importAgent');
let campaignRouter = require('./routes/campaign');
let integrationRouter = require('./routes/integrations');
const mediaRouter = require('./routes/media');
// const workFlowRouter = require('./routes/workflow');
const multiBotRouter = require('./routes/multibot');
const schedulerRouter = require('./routes/scheduler');
const elementRouter = require('./routes/elements');
const apiRouter = require('./routes/apimodules');
const agentChatRouter = require('./routes/agentchatmodules');
const userMessageRouter = require('./routes/userMessages');
const groupRouter = require('./routes/group');
const agentsRouter = require('./routes/agent');
const kbRouter = require('./routes/knowledgeBase');
const verifyToken = require('./middleware/verifyToken')
var app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,key');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,key');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    };
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
//app.use(express.urlencoded());
//app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(upload.array()); 

app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/application', verifyToken, applicationRouter);
app.use('/bots', verifyToken, botsRouter);
app.use('/campaigns', verifyToken, campaignRouter);
app.use('/integration', integrationRouter);
app.use('/importAgent', verifyToken, importAgent);
app.use('/media', verifyToken, mediaRouter);
// app.use('/workflow', workFlowRouter);
app.use('/multiBot', verifyToken, multiBotRouter);
app.use('/scheduler', verifyToken, schedulerRouter);
app.use('/elements', elementRouter);
app.use('/apimodules', verifyToken, apiRouter);
app.use('/agentchatmodules', verifyToken, agentChatRouter);
app.use('/messages', verifyToken, userMessageRouter)
app.use('/agents', agentsRouter);
app.use('/groups', groupRouter);
app.use('/knowledgebase', kbRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err })
});

module.exports = app;
