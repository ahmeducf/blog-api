const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Post = require('../models/post');

const { authenticate } = require('../utils/passport');
const {
  handlePublishedQuery,
  handleCreatedFromDateQuery,
  handleCreatedToDateQuery,
  handleUpdatedFromDateQuery,
  handleUpdatedToDateQuery,
  handleSortQuery,
  handlePagination,
} = require('./helpers/posts_helpers');
const {
  validate,
  validateAuthorization,
  createCreatingPostValidationChain,
  createUpdatingPostValidationChain,
} = require('../utils/validation');

module.exports.getPosts = [
  authenticate,
  handlePublishedQuery,
  handleCreatedFromDateQuery,
  handleCreatedToDateQuery,
  handleUpdatedFromDateQuery,
  handleUpdatedToDateQuery,
  handleSortQuery,
  handlePagination,
  asyncHandler(async (req, res) => {
    const {
      sort,
      page,
      limit = 10,
      published: isPublished,
      created_from_date: createdFromDate,
      created_to_date: createdToDate,
      updated_from_date: updatedFromDate,
      updated_to_date: updatedToDate,
    } = req.query;

    const query = Post.find();

    if (isPublished !== undefined) {
      query.where({ isPublished });
    }

    if (createdFromDate) {
      query.where('createdAt').gte(createdFromDate);
    }

    if (createdToDate) {
      query.where('createdAt').lte(createdToDate);
    }

    if (updatedFromDate) {
      query.where('updatedAt').gte(updatedFromDate);
    }

    if (updatedToDate) {
      query.where('updatedAt').lte(updatedToDate);
    }

    if (sort) {
      query.sort(sort);
    }

    /*
     * Offset based pagination is not recommended for large datasets
     * but it is doing good for this use case.
     * */
    if (page && limit) {
      query.skip((page - 1) * limit).limit(limit);
    }

    const posts = await query.exec();

    res.setHeader('Content-Type', 'application/json');
    return res.json({
      posts,
    });
  }),
];

module.exports.createPost = [
  authenticate,
  validateAuthorization,
  createCreatingPostValidationChain(),
  validate,
  asyncHandler(async (req, res) => {
    const { title, content, isPublished } = req.body;

    const post = new Post({
      title,
      content,
      isPublished,
    });

    await post.save();

    return res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  }),
];

module.exports.getPostById = [
  authenticate,
  asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!mongoose.isValidObjectId(postId)) {
      return res.status(422).json({
        error: {
          message: 'Invalid post id',
        },
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: {
          message: 'Post not found',
        },
      });
    }

    if (!post.isPublished && !req.isAuthenticated()) {
      return res.status(401).json({
        error: {
          message: 'Unauthorized: No or invalid authentication token provided',
        },
      });
    }

    return res.json({
      post,
    });
  }),
];

module.exports.updatePostById = [
  authenticate,
  validateAuthorization,
  createUpdatingPostValidationChain(),
  validate,
  asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!mongoose.isValidObjectId(postId)) {
      return res.status(422).json({
        error: {
          message: 'Invalid post id',
        },
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: {
          message: 'Post not found',
        },
      });
    }

    const { title, content, isPublished } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.isPublished = isPublished || post.isPublished;

    await post.save();

    return res.json({
      message: 'Post updated successfully',
      post,
    });
  }),
];
