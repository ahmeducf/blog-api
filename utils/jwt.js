const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  const PRIVATE_KEY_PATH = path.join(process.cwd(), 'id_rsa_priv.pem');
  const PRIVATE_KEY = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');

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
