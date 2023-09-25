const request = require('supertest');

const app = require('./config/setup');

const {
  initDatabase,
  closeDatabase,
} = require('./config/database_config_testing');
const { login } = require('./helpers/auth_helpers');
const User = require('../models/user');

let mongoServer;

beforeAll(async () => {
  mongoServer = await initDatabase();
});

afterAll(async () => {
  await closeDatabase(mongoServer);
});

describe('POST /auth/login', () => {
  afterAll(async () => {
    await User.deleteMany();
  });

  it('it should return 200 if the credentials are valid', async () => {
    await User.create({
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD,
    });

    const response = await request(app).post('/api/auth/login').send({
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD,
    });

    expect(response.status).toBe(200);
  });

  it('it should return the access token and duration before expiration', async () => {
    const response = await request(app).post('/api/auth/login').send({
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD,
    });

    expect(response.body.token).toBeDefined();
    expect(response.body.expires).toBeDefined();
  });

  it('it should return 422 if the credentials are invalid', async () => {
    const response = await request(app).post('/api/auth/login').send({
      username: process.env.TEST_USERNAME,
      password: 'wrong_password',
    });

    expect(response.status).toBe(422);
  });

  it('it should return 422 if a field is missing', async () => {
    const response = await request(app).post('/api/auth/login').send({
      username: process.env.TEST_USERNAME,
    });

    expect(response.status).toBe(422);
  });
});

describe('POST /auth/refresh_token', () => {
  let accessToken;
  beforeAll(async () => {
    accessToken = await login(app);
  });

  it('should return 200 if the access token is valid', async () => {
    const response = await request(app)
      .post('/api/auth/refresh_token')
      .auth(accessToken, { type: 'bearer' });

    expect(response.status).toBe(200);
  });

  it('should return the new access token and duration before expiration', async () => {
    const response = await request(app)
      .post('/api/auth/refresh_token')
      .auth(accessToken, { type: 'bearer' });

    expect(response.body.token).toBeDefined();
    expect(response.body.expires).toBeDefined();
    expect(response.body.token).not.toBe(accessToken);
  });

  it('should return 401 if the access token is invalid', async () => {
    const response = await request(app)
      .post('/api/auth/refresh_token')
      .auth('invalid_token', { type: 'bearer' });

    expect(response.status).toBe(401);
  });
});
