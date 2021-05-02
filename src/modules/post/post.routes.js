const express = require('express');
const postCtrl = require('./post.controller');

const router = express.Router();

router.route('/')
  /** GET /api/posts - Get list of posts */
  .get(postCtrl.list)

  /** POST /api/posts - Create new post */
  .post(postCtrl.create);

router.route('/:postId')

  /** Delete /api/posts/:postId - Delete post */
  .delete(postCtrl.remove)

  /** GET /api/posts/:postId - Get post */
  .get(postCtrl.findById)

  /** PUT /api/posts/:postId - Update post */
  .put(postCtrl.update);

router.route('/postType/:postType')
  /** GET /api/posts/postType/:postType - Get post */
  .get(postCtrl.getByPostType);

router.route('/randompost')
  /** GET /api/posts/randompost - Get post */
  .get(postCtrl.getRandomPost);

router.route('/mostviewed')
  /** GET /api/posts/mostviewed - Get post */
  .get(postCtrl.getMostViewed);

router.route('/detailpost/:id')
  /** GET /api/posts/detailpost/:id - Get post */
  .get(postCtrl.getByPostDetailById);

router.route('/author/:author')
  /** Get /api/posts/author/:author - Get post by author */
  .get(postCtrl.getAllPostByAuthor);

router.route('/recommended/:recommended')
  /** Get /api/posts/recommended/:recommended - Get post by postType what user now reading */
  .get(postCtrl.getRecommendedPost);

router.route('/postcount')
  /** Get /api/posts/postcount */
  .get(postCtrl.getPostCount);
module.exports = router;
