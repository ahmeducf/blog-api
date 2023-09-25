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


describe('PATCH /posts/:id', () => { 
  beforeAll(async () => {
    const post = await Post.create({
      title: 'Post',
      content: 'Post Content',
      isPublished: true,
    });
    postId = post._id.toString();
  });

  afterEach(async () => {
    await Post.findOneAndUpdate(
      { _id: postId },
      {
        title: 'Post',
        content: 'Post Content',
        isPublished: true,
      },
    );
  });

  it('should return 200 and update the post if the user is authenticated', async () => {
    const response = await request(app)
      .patch(`/api/posts/${postId}`)
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'Updated Post',
        content: 'Updated Post Content',
        isPublished: false,
      });

    expect(response.status).toBe(200);
  });

  it('should return the updated post', async () => {
    const response = await request(app)
      .patch(`/api/posts/${postId}`)
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'Updated Post',
        content: 'Updated Post Content',
        isPublished: false,
      });

    expect(response.body.post.title).toBe('Updated Post');
    expect(response.body.post.content).toBe('Updated Post Content');
    expect(response.body.post.isPublished).toBe(false);
  });

  it('should be able to update only some fields', async () => {
    const response = await request(app)
      .patch(`/api/posts/${postId}`)
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'Updated Post',
      });

    expect(response.body.post.title).toBe('Updated Post');
    expect(response.body.post.content).toBe('Post Content');
    expect(response.body.post.isPublished).toBe(true);
  });

  it('should return 401 if the user is not authenticated', async () => {
    const response = await request(app).patch(`/api/posts/${postId}`);

    expect(response.status).toBe(401);
  });

  it('should return 422 if post id is invalid', async () => {
    const response = await request(app)
      .patch('/api/posts/1')
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'Updated Post',
        content: 'Updated Post Content',
        isPublished: false,
      });

    expect(response.status).toBe(422);
  });

  it('should return 422 if a field is invalid', async () => {
    const response = await request(app)
      .patch(`/api/posts/${postId}`)
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'Updated Post',
        content: 'Updated Post Content',
        isPublished: 'invalid',
      });

    expect(response.status).toBe(422);
  });

  it('should return 404 if post is not found', async () => {
    const response = await request(app)
      .patch('/api/posts/5f0a0f6a3b7d9e0e0c3f0d6a')
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'Updated Post',
        content: 'Updated Post Content',
        isPublished: false,
      });

    expect(response.status).toBe(404);
  });

});