const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-ptudw";
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const accessToken = req.headers['x-access-token'] || req.body.token || req.query.token;
  if (accessToken) {
    try {

      const decoded = jwt.verify(accessToken, accessTokenSecret);
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
