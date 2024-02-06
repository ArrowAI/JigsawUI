var express = require('express');
var router = express.Router()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ status: "success", "env": process.env.APPLICATION_ENV ||'noEnv' })

});
router.post('/',(req,res)=>{
  res.send(req.body);
})

module.exports = router;