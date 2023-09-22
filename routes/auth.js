const express = require('express');

const router = express.Router();

const { body, validationResult } = require('express-validator');

const createError = require('http-errors');
const User = require('../models/user');

router.post('/login', (req, res, next) => {
  res.json({
    message: 'Login route',
  });
});

module.exports = router;
