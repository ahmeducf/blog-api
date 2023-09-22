#! /usr/bin/env node

console.log(
  'This script populates some test posts and an admin user to the database.',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require('mongoose');

const Post = require('./models/post');
const User = require('./models/user');

const posts = [];
const users = [];

mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

async function postCreate(
  index,
  title,
  content,
  isPublished,
  createdAt,
  updatedAt,
) {
  const post = new Post({ title, content, isPublished, createdAt, updatedAt });
  await post.save();
  posts[index] = post;
  console.log(`Added post: ${title}`);
}

async function userCreate(index, username, password) {
  const data = {
    username,
    password,
  };

  const user = new User(data);
  await user.save();
  users[index] = user;
  console.log(`Added user: ${username}`);
}

async function createPosts() {
  console.log('Adding posts');

  await Promise.all([
    postCreate(
      0,
      'Post 1',
      'Content 1',
      true,
      new Date('2023-09-30'),
      new Date('2023-11-30'),
    ),
    postCreate(
      1,
      'Post 2',
      'Content 2',
      false,
      new Date('2023-08-30'),
      new Date('2023-09-20'),
    ),
    postCreate(
      2,
      'Post 3',
      'Content 3',
      true,
      new Date('2023-09-30'),
      new Date('2023-10-30'),
    ),
  ]);
}

async function createUsers() {
  console.log('Adding users');
  await Promise.all([
    userCreate(0, 'admin', 'password'),
  ]);
}

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');

  console.log('dropping collections');
  await Post.collection.drop();
  await User.collection.drop();
  console.log('Collections dropped');

  await createPosts();
  await createUsers();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

main().catch((err) => console.log(err));
