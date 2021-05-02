const express = require('express');
const newsletterCtrl = require('./newsletter.controller');

const router = express.Router();

router.route('/')
  /** GET /api/newsletters - Get list of newsletters */
  .get(newsletterCtrl.getAll)

  /** POST /api/newsletters - Create new newsletter */
  .post(newsletterCtrl.create);

router.route('/:newsletterId')
  /** Delete /api/newsletters/:newsletterId - Delete post */
  .delete(newsletterCtrl.remove)

  /** Update /api/newsletters/:newsletterId - Update post */
  .put(newsletterCtrl.update);

router.route('/newsletterscount')
  /** GET /api/newsletters/newsletterscount - Get list of newsletters */
  .get(newsletterCtrl.getSubscriberCount);

module.exports = router;
