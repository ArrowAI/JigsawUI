var express = require('express');
var router = express.Router();

/* GET all user list. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/add', function (req, res, next) {
    res.send('respond with a resource');
});
router.put('/update', function (req, res, next) {
    res.send('respond with a resource');
});
router.delete('/delete', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/filterUser', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
