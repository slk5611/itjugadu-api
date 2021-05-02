const mongoose = require('mongoose');

/**
 * Comment Schema
 */
const CommentSchema = new mongoose.Schema({
  users:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  posts:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * @typedef User
 */
module.exports = mongoose.model('Comment', CommentSchema);
