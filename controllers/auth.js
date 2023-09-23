const asyncHandler = require('express-async-handler');
const { authenticate } = require('../utils/passport');

const User = require('../models/user');
const { generateAccessToken } = require('../utils/jwt');
const {
  createUsernameValidationChain,
  createPasswordValidationChain,
  validate,
} = require('../utils/validation');

module.exports.login = [
  createUsernameValidationChain(),
  createPasswordValidationChain(),
  validate,

  asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(422).json({
        error: {
          message: 'Validation failed',
          fields: {
            username: 'Invalid username',
          },
        },
      });
    }

    const isValidPassword = await user.isValidPassword(req.body.password);

    if (!isValidPassword) {
      return res.status(422).json({
        error: {
          message: 'Validation failed',
          fields: {
            password: 'Invalid password',
          },
        },
      });
    }

    const { token, expires } = generateAccessToken(user);

    req.token = token;
    req.expires = expires;

    return res.json({
      token: req.token,
      expires: req.expires,
    });
  }),
];

module.exports.refreshToken = [
  authenticate,
  asyncHandler(async (req, res) => {
    const { token, expires } = generateAccessToken(req.user);

    return res.json({
      token,
      expires,
    });
  }),
];
