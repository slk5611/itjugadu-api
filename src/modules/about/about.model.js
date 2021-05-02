const mongoose = require('mongoose');

/**
 * About Schema
 */
const AboutSchema = new mongoose.Schema({
  detail: {
    type: String,
    required: true,
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
 * @typedef About
 */
module.exports = mongoose.model('About', AboutSchema);
