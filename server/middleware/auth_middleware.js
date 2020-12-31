const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let isAuth = async (req, res, next) => {

  const tokenFromClient = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '')

  if (tokenFromClient) {

    try {
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);

      req.decoded = decoded;

      next();
    } catch (error) {

      return res.status(401).send({
        message: 'Unauthorized.',
      });
    }
  } else {

    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}


module.exports = {
  isAuth: isAuth,
};