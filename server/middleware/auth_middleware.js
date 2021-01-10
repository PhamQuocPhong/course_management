const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-ptudw";
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const accessToken = req.headers['x-access-token'];
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
    return res.status(400).json({
      message: 'access token not found.'
    })
  }
}
