const express = require('express');
const path = require('path');

const createError = require('http-errors');

const connectDatabase = require('./config/database');
const logger = require('./utils/logger');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();

connectDatabase();

app.use(logger());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  const { message } = err;
  const error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  res.json({
    message,
    error,
  });
});

module.exports = app;
