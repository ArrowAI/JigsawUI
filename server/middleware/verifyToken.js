var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = {
  'secret': 'supersecret'
}; // get our config file

function verifyToken(req, res, next) {
  // console.log(req.headers.key);
  // check header or url parameters or post parameters for token
  var token = req.headers['key'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything is good, save to request for use in other routes
    req.body.userId = decoded.id;
    console.log(req.body.userId);
    next();
  });

}

module.exports = verifyToken;