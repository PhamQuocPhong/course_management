const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const userModel = require('../models/user.model');

const router = express.Router();

router.post('/', async function (req, res) {
  const user = await userModel.singleByUserName(req.body.username);
  if (user === null) {
    return res.json({
      authenticated: false
    });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.json({
      authenticated: false
    });
  }

  const accessToken = jwt.sign({
    userId: user.id
  }, 'SECRET_KEY', {
    expiresIn: 10 * 60 // seconds
  });

  const refreshToken = randomstring.generate();
  await userModel.updateRefreshToken(user.id, refreshToken);

  res.json({
    authenticated: true,
    accessToken,
    refreshToken
  })
})

router.post('/refresh', async function (req, res) {
  // req.body = {
  //   accessToken,
  //   refreshToken
  // }

  const { accessToken, refreshToken } = req.body;
  const { userId } = jwt.verify(accessToken, 'SECRET_KEY', {
    ignoreExpiration: true
  });

  const ret = await userModel.isValidRefreshToken(userId, refreshToken);
  if (ret === true) {
    const newAccessToken = jwt.sign({ userId }, 'SECRET_KEY', { expiresIn: 60 * 10 });
    return res.json({
      accessToken: newAccessToken
    })
  }

  res.status(400).json({
    message: 'Invalid refresh token.'
  })
})

module.exports = router;