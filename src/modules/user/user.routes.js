const express = require('express');
const validate = require('express-validation');
const Joi = require('@hapi/joi');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

const paramValidation = {
  updateUser: {
    body: {
      email: Joi.string().required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
    },
    params: {
      userId: Joi.string().hex().required(),
    },
  },
};

router.route('/')
  /** GET /api/users - Get list of users */
  .get(userCtrl.list);/* const mongoose = require('mongoose');

/!**
 * Comment Schema
 *!/
const CommentSchema = new mongoose.Schema({

}); */


router.route('/profile')
  /** GET /api/users/profile - Get profile of logged in user */
  .get(userCtrl.getProfile);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

router.route('/usercount')
  /**  GET /api/users/usercount - Get user count */
  .get(userCtrl.getUserCount);

module.exports = router;
