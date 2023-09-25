const request = require('supertest');
const User = require('../../models/user');

module.exports.login = async (app) => {
  await User.create({
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
  });

  const res = await request(app).post('/api/auth/login').send({
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
  });

  const [, accessToken] = res.body.token.split(' ');

  return accessToken;
};
