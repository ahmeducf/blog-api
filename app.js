const express = require('express');
const path = require('path');

const createError = require('http-errors');

const connectDatabase = require('./config/database');
const logger = require('./utils/logger');

const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

require('dotenv').config();

const app = express();

connectDatabase();

app.use(logger());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  const { message } = err;
  const error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  res.json({
    message,
    error,
  });
});

module.exports = app;
