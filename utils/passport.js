const passport = require('passport');

module.exports.authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.isAuthenticated = () => false;
    } else {
      req.isAuthenticated = () => true;
      req.user = user;
    }

    return next();
  })(req, res, next);
};
