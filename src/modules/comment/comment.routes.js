const express = require('express');
const commentCtrl = require('./comment.controller');

const router = express.Router();

router.route('/')
  /** POST /api/comments - Create new comment */
  .post(commentCtrl.create);

router.route('/:postId')

  /** GET /api/comments/:postId - get comments by postId */
  .get(commentCtrl.getCommentByPost);


router.route('/recentcomment/comment')

/** Get /api/comments/recentcomment - get recentcomment */
  .get(commentCtrl.getRecentComment);

router.route('/:commentId')

  /** DELETE /api/comments/:commentId - delete comments by commentId */
  .delete(commentCtrl.deleteComment);

module.exports = router;
