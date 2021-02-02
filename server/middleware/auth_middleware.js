const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-ptudw";
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

  const tokenFromClient = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '')

  if (tokenFromClient) {
    try {

      const decoded = jwt.verify(tokenFromClient, accessTokenSecret);
      req.decoded = decoded;

      next();
    } catch (err) {
      // console.log(err);
      return res.status(401).json({
        message: 'Invalid access token.'
      });
    }
  } else {

    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}
