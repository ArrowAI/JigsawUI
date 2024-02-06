var express = require('express');
var router = express.Router()
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
router.post('/upload', upload.single('media'), function(req, res, next) {
    try {
        res.send(req.file);
    } catch (err) {
        res.send(400);
    }
})

module.exports = router;