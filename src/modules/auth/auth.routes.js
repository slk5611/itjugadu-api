const express = require('express');
const authCtrl = require('./auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(authCtrl.login);

/** POST /api/auth/register - Register a new user */
router.route('/register')
  .post(authCtrl.register);

module.exports = router;
