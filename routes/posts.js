const express = require('express');

const router = express.Router();

const { body, validationResult } = require('express-validator');

const createError = require('http-errors');

const Post = require('../models/post');

router.get('/', (req, res, next) => {
  res.json({
    message: 'Posts route to get all posts',
  });
});

router.post('/', (req, res, next) => {
  res.json({
    message: 'Posts route to create a post',
  });
});

router.get('/:postId', (req, res, next) => {
  res.json({
    message: `Posts route to get a post with id ${req.params.postId}`,
  });
});

router.put('/:postId', (req, res, next) => {
  res.json({
    message: `Posts route to update a post with id ${req.params.postId}`,
  });
});

router.delete('/:postId', (req, res, next) => {
  res.json({
    message: `Posts route to delete a post with id ${req.params.postId}`,
  });
});

module.exports = router;
