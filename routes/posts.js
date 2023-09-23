const express = require('express');

const router = express.Router();

const { getPosts, createPost } = require('../controllers/posts');

router.get('/', getPosts);

router.post('/', createPost);

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
