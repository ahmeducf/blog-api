const express = require('express');

const router = express.Router();

const {
  getPosts,
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
} = require('../controllers/posts');

router.get('/', getPosts);

router.post('/', createPost);

router.get('/:postId', getPostById);

router.put('/:postId', updatePostById);

router.delete('/:postId', deletePostById);

module.exports = router;
