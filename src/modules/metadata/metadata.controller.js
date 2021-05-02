const httpStatus = require('http-status');
const MetaData = require('./metadata.model');

/**
 * Create new metadata
 */
function create(req, res) {
  const metaData = MetaData(req.body);
  return metaData.save()
    .then((oMetaData) => {
      if (oMetaData) {
        return res.status(httpStatus.OK).send({ message: 'Metadata added successfully.' });
      }
      return res.status(httpStatus.OK).send({ message: 'Some error accrued while creating metadata' });
    })
    .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err }));
}

/**
 * Update metadata
 */
function update(req, res) {
  const metaData = MetaData(req.body);

  MetaData.findByIdAndUpdate({ _id: req.params.metadataId }, metaData)
    .then((oMetaData) => {
      if (oMetaData) {
        return res.status(httpStatus.OK).send({ message: 'Metadata updated successfully.' });
      }
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Some error accrued while updating Metadata.' });
    })
    .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err }));
}


/**
 * Delete metadata
 * @return message
 */
function remove(req, res, next) {
  MetaData.findOneAndRemove({ _id: req.params.metadataId })
    .then((oMetaData) => {
      if (oMetaData) {
        return res.status(httpStatus.OK).send({ message: 'Metadata deleted successfully.' });
      }
      return res.status(httpStatus.OK).send({ message: 'Some error accrued while deleting Metadata.' });
    })
    .catch(e => next(e));
}

/**
 * Get all metadata
 */
function getAll(req, res, next) {
  MetaData.find()
    .then(oMetaData => res.json(oMetaData))
    .catch(e => next(e));
}

function getMetaDataByType(req, res) {
  MetaData.find({ type: req.params.postType })
    .then((oMetaData) => {
      if (oMetaData) {
        return res.json(oMetaData);
      }
      return res.status(httpStatus.OK).send({ message: 'No such Metadata exist.' });
    })
    .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err }));
}

module.exports = {
  create,
  remove,
  update,
  getAll,
  getMetaDataByType,
};
