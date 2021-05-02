const express = require('express');
const metadataCtrl = require('./metadata.controller');

const router = express.Router();

router.route('/')
/** GET /api/metadata - Get list of metadata */
  .get(metadataCtrl.getAll)

  /** POST /api/metadata - Create new metadata */
  .post(metadataCtrl.create);

router.route('/:metadataId')
/** Delete /api/metadata/:metadataId - Delete metadata */
  .delete(metadataCtrl.remove)

  /** Update /api/newsletters/:newsletterId - Update metadata */
  .put(metadataCtrl.update);

router.route('/posttype/:postType')
/** GET /api/metadata/type - Get metadata by type */
  .get(metadataCtrl.getMetaDataByType);

module.exports = router;
