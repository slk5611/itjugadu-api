const httpStatus = require('http-status');
const NewsLetter = require('./newsletter.model');
const APIError = require('../../helpers/APIError');

/**
 * Get all newsletter
 */
function getAll(req, res, next) {
  NewsLetter.find()
    .then(oNewsLetter => res.json(oNewsLetter))
    .catch(e => next(e));
}

/**
 * Create new newsletter
 */
function create(req, res) {
  const newsletter = NewsLetter(req.body);
  NewsLetter.findOne({ email: newsletter.email })
    .exec()
    .then((foundPost) => {
      if (foundPost) {
        return res.status(httpStatus.OK).send({ message: 'You have already subscribed.' });
      }
      return newsletter.save()
        .then((oNewsLetter) => {
          if (oNewsLetter) {
            return res.status(httpStatus.OK).send({ message: 'Thank you for subscribe ITjugadu.' });
          }
          return res.status(httpStatus.OK).send({ message: 'Some error accrued while connecting us please try after some time or email us email is given on contact us detail.' });
        });
    })
    .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err }));
}

/**
 * Update newsletter
 */
function update(req, res) {
  const newsletter = NewsLetter(req.body);

  NewsLetter.findByIdAndUpdate({ _id: req.params.newsletterId }, newsletter)
    .then((oNewsLetter) => {
      if (oNewsLetter) {
        return res.status(httpStatus.OK).send({ message: 'Subscriber updated successfully.' });
      }
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Some error accrued while updating newsletter.' });
    })
    .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err }));
}

/**
 * Delete newsletter
 * @return message
 */
function remove(req, res, next) {
  NewsLetter.findOneAndRemove({ _id: req.params.newsletterId })
    .then((oNewsLetter) => {
      if (oNewsLetter) {
        return res.status(httpStatus.OK).send({ message: 'Subscriber deleted successfully.' });
      }
      return res.status(httpStatus.OK).send({ message: 'Some error accrued while deleting subscriber.' });
    })
    .catch(e => next(e));
}

/**
 * Get subscriber count
 * @return count
 */
function getSubscriberCount(req, res) {
  NewsLetter.countDocuments()
    .then((oSubscriber) => {
      if (oSubscriber) {
        return res.json(oSubscriber);
      }
      const err = new APIError('No such subscriber count available', httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    });
}

module.exports = {
  getAll,
  create,
  remove,
  update,
  getSubscriberCount,
};
