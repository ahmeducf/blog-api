const request = require('supertest');

const app = require('./config/setup');

const {
  initDatabase,
  closeDatabase,
} = require('./config/database_config_testing');
const { login } = require('./helpers/auth_helpers');
const Post = require('../models/post');

let mongoServer;
let accessToken;
let postId;

beforeAll(async () => {
  mongoServer = await initDatabase();
  accessToken = await login(app);
});

afterAll(async () => {
  await closeDatabase(mongoServer);
});

describe('DELETE /posts/:id', () => {
  beforeAll(async () => {
    const post = await Post.create({
      title: 'Post',
      content: 'Post Content',
      isPublished: true,
    });
    postId = post._id.toString();
  });

  it('should return 204 and delete the post if the user is authenticated', async () => {
    const response = await request(app)
      .delete(`/api/posts/${postId}`)
      .auth(accessToken, { type: 'bearer' });

    expect(response.status).toBe(204);
  });

  it('should return 404 if the post does not exist', async () => {
    const response = await request(app)
      .delete(`/api/posts/${postId}`)
      .auth(accessToken, { type: 'bearer' });

    expect(response.status).toBe(404);
  });

  it('should return 401 if the user is not authenticated', async () => {
    const response = await request(app).delete(`/api/posts/${postId}`);

    expect(response.status).toBe(401);
  });
});
