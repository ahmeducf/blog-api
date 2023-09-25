const express = require('express');

const router = express.Router();

const {
  getPosts,
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
  partiallyUpdatePostById,
} = require('../controllers/posts');

router.get('/', getPosts);

router.post('/', createPost);

router.get('/:postId', getPostById);

router.patch('/:postId', partiallyUpdatePostById);

router.put('/:postId', updatePostById);

router.delete('/:postId', deletePostById);

module.exports = router;
