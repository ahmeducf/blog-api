const RateLimit = require('express-rate-limit');

// set up rate limiter: maximum of 10000 requests per 15 minutes
module.exports = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // limit each IP to 10000 requests per windowMs
});
