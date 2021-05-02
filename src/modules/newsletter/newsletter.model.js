const mongoose = require('mongoose')

/**
 * NewsLetter Schema
 */
const NewsLetterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * @typedef NewsLetter
 */
module.exports = mongoose.model('NewsLetter', NewsLetterSchema);
