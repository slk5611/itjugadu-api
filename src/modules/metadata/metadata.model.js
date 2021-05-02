const mongoose = require('mongoose');

/**
 * MetaData Schema
 */
const NewsLetterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  metaTag: {
    type: String,
    required: true,
  },
  // Like Business, Technology etc.
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * @typedef MetaData
 */
module.exports = mongoose.model('MetaData', NewsLetterSchema);
