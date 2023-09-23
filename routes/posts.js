const express = require('express');

const router = express.Router();

const { getPosts, createPost, getPostById } = require('../controllers/posts');

router.get('/', getPosts);

router.post('/', createPost);

router.get('/:postId', getPostById);

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
