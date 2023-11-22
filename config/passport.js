const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const fs = require('fs');
require('dotenv').config();

const User = require('../models/user');

let PUB_KEY;

try {
  process.chdir(process.cwd());
  PUB_KEY = fs.readFileSync(process.env.JWT_PUBLIC_KEY_FILE, 'utf8');
} catch (error) {
  console.error(error);
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

const verifyCallback = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

module.exports.jwtStrategy = new JwtStrategy(jwtOptions, verifyCallback);
