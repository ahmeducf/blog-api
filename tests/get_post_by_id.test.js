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
let publishedPostId;
let unpublishedPostId;

beforeAll(async () => {
  mongoServer = await initDatabase();
  accessToken = await login(app);
});

afterAll(async () => {
  await closeDatabase(mongoServer);
});

describe('GET /posts/:id', () => {
  beforeAll(async () => {
    const publishedPost = await Post.create({
      title: 'Published Post',
      content: 'Published Post Content',
      isPublished: true,
    });
    publishedPostId = publishedPost._id.toString();

    const unpublishedPost = await Post.create({
      title: 'Unpublished Post',
      content: 'Unpublished Post Content',
      isPublished: false,
    });
    unpublishedPostId = unpublishedPost._id.toString();
  });

  it('it should return the published post regardless of credentials', async () => {
    const response = await request(app).get(`/api/posts/${publishedPostId}`);

    expect(response.status).toBe(200);
    expect(response.body.post._id).toBe(publishedPostId);
    expect(response.body.post.title).toBe('Published Post');
    expect(response.body.post.content).toBe('Published Post Content');
    expect(response.body.post.isPublished).toBe(true);
  });

  it('it should return the unpublished post if the user is authenticated', async () => {
    const response = await request(app)
      .get(`/api/posts/${unpublishedPostId}`)
      .auth(accessToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body.post._id).toBe(unpublishedPostId);
    expect(response.body.post.title).toBe('Unpublished Post');
    expect(response.body.post.content).toBe('Unpublished Post Content');
    expect(response.body.post.isPublished).toBe(false);
  });

  it('it should return 401 if the user is not authenticated and the post is unpublished', async () => {
    const response = await request(app).get(`/api/posts/${unpublishedPostId}`);

    expect(response.status).toBe(401);
  });

  it('it should return 404 if the post does not exist', async () => {
    const response = await request(app).get(
      '/api/posts/5f8b6f6d2c3b9f3c2c4d6e8f',
    );

    expect(response.status).toBe(404);
  });

  it('it should return 422 if the post id is invalid', async () => {
    const response = await request(app).get('/api/posts/invalid_post_id');

    expect(response.status).toBe(422);
  });
});
