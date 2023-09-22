const { body, validationResult } = require('express-validator');

const createUsernameValidationChain = () =>
  body('username')
    .exists()
    .withMessage('username is required')
    .bail()
    .isString()
    .withMessage('username must be a string')
    .escape();

const createPasswordValidationChain = () =>
  body('password')
    .exists()
    .withMessage('password is required')
    .bail()
    .isString()
    .withMessage('password must be a string')
    .escape();

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.formatWith(({ msg }) => msg).mapped();

    res.status(422).json({
      error: {
        message: 'Validation failed',
        fields: errorMessages,
      },
    });
  }

  next();
};

module.exports = {
  createUsernameValidationChain,
  createPasswordValidationChain,
  validate,
};
