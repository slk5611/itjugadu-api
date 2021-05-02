const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');

/**
 * Post Schema
 */
const PostSchema = new mongoose.Schema({
  postType: {
    type: String,
    required: true,
  },
  postName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  readingTime: {
    type: Number,
    required: true,
  },
  thumbnailImage: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  blog: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  metaTag: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: true,
  },
  comment: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Methods
 */
PostSchema.method({});

/**
 * Statics
 */
PostSchema.static = {

  /**
   * Get post
   * @param {ObjectId} id - The objectId of post.
   * @return {Promise<Post, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((post) => {
        if (post) {
          return post;
        }
        const err = new APIError('No such post exists!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  /**
   * Get post by postType
   * @return {Promise<Post[]>}
   */
  getByPostType(postType) {
    this.find({ postType })
      .exec()
      .then((posts) => {
        if (posts) {
          return posts;
        }
        const err = new APIError('No such post type exists!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },
}

/**
 * @typedef Post
 */
module.exports = mongoose.model('Post', PostSchema);
