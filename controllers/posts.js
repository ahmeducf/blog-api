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

    return res.json({
      posts,
    });
  }),
];
