const fs = require('fs');
const jwt = require('jsonwebtoken');

let PRIVATE_KEY;

try {
  process.chdir(process.cwd());
  PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILE, 'utf8');
} catch (error) {
  console.error(error);
}

function generateAccessToken(user) {
  const { _id } = user;
  const expiresIn = '14d';

  const payload = {
    sub: _id.toString(),
  };

  const signedToken = jwt.sign(payload, PRIVATE_KEY, {
    expiresIn,
    algorithm: 'RS256',
  });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}

module.exports = {
  generateAccessToken,
};
