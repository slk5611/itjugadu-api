const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const User = require('../user/user.model');
const config = require('../../config');

/**
 * Returns jwt token and user details if valid email and password are provided
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {token, User}
 */
function login(req, res, next) {
  User.getByEmail(req.body.email)
    .then((foundUser) => {
      if (!foundUser.validPassword(req.body.password)) {
        return res.json({ statusCode: httpStatus.UNAUTHORIZED, message: 'User email and password combination do not match.' });
      }
      const token = jwt.sign(foundUser.safeModel(), config.jwtSecret, {
        expiresIn: config.jwtExpiresIn,
      });
      return res.json({
        statusCode: httpStatus.OK,
        message: 'Login successfully.',
        token,
        user: foundUser.safeModel(),
      });
    })
    .catch(err => next(res.json({ statusCode: httpStatus.UNAUTHORIZED, message: 'No such user exist! Please register.', err })));
}

/**
 * Register a new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.firstName - The firstName of user.
 * @property {string} req.body.lastName - The lastName of user.
 * @returns {User}
 */
function register(req, res, next) {
  const user = new User(req.body);
  User.findOne({ email: req.body.email })
    .exec()
    .then((foundUser) => {
      if (foundUser) {
        return res.json({ statusCode: httpStatus.CONFLICT, message: 'Email must be unique.' });
      }
      user.password = user.generatePassword(req.body.password);
      return user.save();
    })
    .then((savedUser) => {
      const token = jwt.sign(savedUser.safeModel(), config.jwtSecret, {
        expiresIn: config.jwtExpiresIn,
      });
      return res.json({
        message: 'You have successfully registered.',
        token,
        user: savedUser.safeModel(),
      });
    })
    .catch(e => next(e));
}

module.exports = { login, register };
