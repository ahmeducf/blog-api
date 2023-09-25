const request = require('supertest');

const app = require('./config/setup');
const postsRouter = require('../routes/posts');
const authRouter = require('../routes/auth');

const {
  initDatabase,
  closeDatabase,
} = require('./config/database_config_testing');
const { login } = require('./helpers/auth_helpers');
const Post = require('../models/post');

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

let mongoServer;
let accessToken;

beforeAll(async () => {
  mongoServer = await initDatabase();
  accessToken = await login(app);
});

afterAll(async () => {
  await closeDatabase(mongoServer);
});

describe('GET /api/posts', () => {
  beforeAll(async () => {
    const posts = [
      {
        title: 'Post 1',
        content: 'Content 1',
        isPublished: true,
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      },
      {
        title: 'Post 2',
        content: 'Content 2',
        isPublished: false,
        createdAt: new Date('2020-01-02'),
        updatedAt: new Date('2020-01-02'),
      },
    ];

    await Post.insertMany(posts);
  });

  it('should return only published posts when no credentials are provided', async () => {
    const res = await request(app).get('/api/posts');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.posts.length).toBe(1);
  });

  it('should return all posts when credentials are provided', async () => {
    const res = await request(app)
      .get('/api/posts')
      .auth(accessToken, { type: 'bearer' });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.posts.length).toBe(2);
  });

  it('should return published posts when query param isPublished is true', async () => {
    const res = await request(app).get('/api/posts').query({
      isPublished: true,
    });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.posts.length).toBe(1);
  });

  it('should return only published even when query param isPublished is false if credentials are not provided', async () => {
    const res = await request(app).get('/api/posts').query({
      isPublished: false,
    });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.posts.length).toBe(1);
  });

  it('should return all posts when query param isPublished is false if credentials are provided', async () => {
    const res = await request(app)
      .get('/api/posts')
      .query({
        isPublished: false,
      })
      .auth(accessToken, { type: 'bearer' });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.posts.length).toBe(2);
  });

  it('should return posts in descending order of createdAt', async () => {
    const res = await request(app)
      .get('/api/posts')
      .query({
        sort: '-createdAt',
      })
      .auth(accessToken, { type: 'bearer' });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.posts[0].title).toBe('Post 2');
    expect(res.body.posts[1].title).toBe('Post 1');
  });

  it('should return posts in ascending order of updatedAt', async () => {
    const res = await request(app)
      .get('/api/posts')
      .query({
        sort: '+updatedAt',
      })
      .auth(accessToken, { type: 'bearer' });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.posts[0].title).toBe('Post 1');
    expect(res.body.posts[1].title).toBe('Post 2');
  });

  it('should return posts in created before the given date', async () => {
    const res = await request(app)
      .get('/api/posts')
      .query({
        created_to_date: '2020-01-01',
      })
      .auth(accessToken, { type: 'bearer' });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.posts.length).toBe(1);
    expect(res.body.posts[0].title).toBe('Post 1');
  });

  it('should work with multiple query params', async () => {
    const res = await request(app)
      .get('/api/posts')
      .query({
        isPublished: false,
        sort: '-createdAt',
        created_to_date: '2020-01-02',
      })
      .auth(accessToken, { type: 'bearer' });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.posts.length).toBe(2);
    expect(res.body.posts[0].title).toBe('Post 2');
  });

  it('should apply pagination', async () => {
    const res = await request(app)
      .get('/api/posts')
      .query({
        sort: '+createdAt',
        limit: 1,
        page: 2,
      })
      .auth(accessToken, { type: 'bearer' });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.posts.length).toBe(1);
    expect(res.body.posts[0].title).toBe('Post 2');
  });
});
