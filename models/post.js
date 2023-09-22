const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: 3,
    maxlength: 100,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: 3,
    maxlength: 1000,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

PostSchema.virtual('createdAtHumanFormat').get(function getCreatedAtHumanFormat() {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_MED);
});

PostSchema.virtual('createdAtISOFormat').get(function getCreatedAtISOFormat() {
  return DateTime.fromJSDate(this.createdAt).toISO();
});

PostSchema.virtual('updatedAtHumanFormat').get(function getUpdatedAtHumanFormat() {
  return DateTime.fromJSDate(this.updatedAt).toLocaleString(DateTime.DATETIME_MED);
});

PostSchema.virtual('updatedAtISOFormat').get(function getUpdatedAtISOFormat() {
  return DateTime.fromJSDate(this.updatedAt).toISO();
});

module.exports = mongoose.model('Post', PostSchema);
