const express = require('express');
const path = require('path');

const createError = require('http-errors');
const passport = require('passport');

const compression = require('compression');
const helmet = require('helmet');
const limiter = require('./utils/rate_limit');

const setSettings = require('./config/settings');
const connectDatabase = require('./config/database');
const { jwtStrategy } = require('./config/passport');
const cors = require('./config/cors');
const logger = require('./utils/logger');

const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

require('dotenv').config();

connectDatabase();

const app = express();

setSettings(app);

app.use(logger());

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(compression());
app.use(helmet());
app.use(limiter);

app.use(cors);

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
    error: {
      message,
      ...error,
    },
  });
});

module.exports = app;
