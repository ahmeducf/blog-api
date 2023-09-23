const { body, validationResult } = require('express-validator');

const createUsernameValidationChain = () =>
  body('username')
    .exists()
    .withMessage('username is required')
    .bail()
    .isString()
    .withMessage('username must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('username is required')
    .bail()
    .escape()
    .toLowerCase();

const createPasswordValidationChain = () =>
  body('password')
    .exists()
    .withMessage('password is required')
    .bail()
    .isString()
    .withMessage('password must be a string')
    .bail()
    .escape();

const createDateValidationChain = (check, date) => check(date).isISO8601();

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
  } else {
    next();
  }
};

const createCreatingPostValidationChain = () => [
  body('title')
    .exists()
    .withMessage('Title is required')
    .bail()
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')
    .bail()
    .escape(),
  body('content')
    .exists()
    .withMessage('Content is required')
    .bail()
    .isString()
    .withMessage('Content must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .bail()
    .isLength({ min: 3, max: 1000 })
    .withMessage('Content must be between 3 and 1000 characters')
    .bail()
    .escape(),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean'),
];

const createUpdatingPostValidationChain = () => [
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')
    .bail()
    .escape(),
  body('content')
    .optional()
    .isString()
    .withMessage('Content must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .bail()
    .isLength({ min: 3, max: 1000 })
    .withMessage('Content must be between 3 and 1000 characters')
    .bail()
    .escape(),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean'),
];

const validateAuthorization = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: 'Unauthorized: No or invalid authentication token provided',
  });
};

module.exports = {
  createUsernameValidationChain,
  createPasswordValidationChain,
  createDateValidationChain,
  createCreatingPostValidationChain,
  createUpdatingPostValidationChain,
  validate,
  validateAuthorization,
};
