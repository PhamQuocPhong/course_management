
const express = require('express');
const model = require('../models/user.model');
const router = express.router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { route } = require('./motel.route');
const randomstr = require('randomstring');
const userModel = require('../models/user.model');


module.exports = router;