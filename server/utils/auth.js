const jwt = require('jsonwebtoken');
exports.protect = function (req, res, next) {
  const accessToken = req.headers['x-access-token'];
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, 'BEST_SOLUTION');
      req.accessTokenPayload = decoded;
      req.role = decoded.role;
      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Invalid access token.',
      });
    }
  } else {
    return res.status(400).json({
      message: 'Access token not found.',
    });
  }
};

exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.role)) {
    return res.status(403).json({
      err_msg: `User role ${req.user.role} is not permitted to this route`,
    });
  }
  next();
};
