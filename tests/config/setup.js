require('dotenv').config();
const express = require('express');
const passport = require('passport');
const { jwtStrategy } = require('../../config/passport');

const app = express();

app.use(express.json());

passport.use(jwtStrategy);
app.use(passport.initialize());

module.exports = app;
