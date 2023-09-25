const request = require('supertest');

const app = require('./config/setup');

const {
  initDatabase,
  closeDatabase,
} = require('./config/database_config_testing');
const { login } = require('./helpers/auth_helpers');

let mongoServer;
let accessToken;

beforeAll(async () => {
  mongoServer = await initDatabase();
  accessToken = await login(app);
});

afterAll(async () => {
  await closeDatabase(mongoServer);
});

describe('POST /posts', () => {
  it('it should return 201 and create the post if the user is authenticated', async () => {
    const response = await request(app)
      .post('/api/posts')
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'New Post',
        content: 'New Post Content',
        isPublished: true,
      });

    expect(response.status).toBe(201);
  });

  it('it should return the created post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'New Post',
        content: 'New Post Content',
        isPublished: true,
      });

    expect(response.body.post.title).toBe('New Post');
    expect(response.body.post.content).toBe('New Post Content');
    expect(response.body.post.isPublished).toBe(true);
  });

  it('it should return 401 if the user is not authenticated', async () => {
    const response = await request(app).post('/api/posts');

    expect(response.status).toBe(401);
  });

  it('it should return 422 if a field is missing', async () => {
    const response = await request(app)
      .post('/api/posts')
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'New Post',
        isPublished: true,
      });

    expect(response.status).toBe(422);
  });

  it('it should return 422 if a field is invalid', async () => {
    const response = await request(app)
      .post('/api/posts')
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'New Post',
        content: 'New Post Content',
        isPublished: 'invalid',
      });

    expect(response.status).toBe(422);
  });
});
