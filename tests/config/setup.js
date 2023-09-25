require('dotenv').config();
const express = require('express');
const passport = require('passport');
const { jwtStrategy } = require('../../config/passport');

const postsRouter = require('../../routes/posts');
const authRouter = require('../../routes/auth');

const app = express();

app.use(express.json());

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

module.exports = app;
