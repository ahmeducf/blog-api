const passport = require('passport');

module.exports.authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        error: {
          message: 'Unauthorized: No or invalid token is provided',
        },
      });
    }

    req.user = user;

    return next();
  })(req, res, next);
};
