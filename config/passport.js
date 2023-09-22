const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const fs = require('fs');
const path = require('path');

const User = require('../models/user');

const PUBLIC_KEY_PATH = path.join(process.cwd(), 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(PUBLIC_KEY_PATH, 'utf8');

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
