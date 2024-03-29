const jwt = require("jsonwebtoken");

let generateToken = (userId, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {

    jwt.sign( {userId: userId}, secretSignature, {expiresIn: tokenLife, }, (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
    });
  });
}


let verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
}
module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};


