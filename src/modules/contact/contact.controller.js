const httpStatus = require('http-status');
const Contact = require('./contact.model');

/**
 * Get all contact
 */
function getAll(req, res, next) {
  Contact.find()
    .then(oContact => res.json(oContact))
    .catch(e => next(e));
}

/**
 * Create new contact
 */
function create(req, res) {
  const contact = Contact(req.body);
  contact.save()
    .then((oContact) => {
      if (oContact) {
        return res.status(httpStatus.OK).send({ message: 'Thank you for contact us will soon connect you our team within 48 hours.' });
      }
      return res.status(httpStatus.BAD_REQUEST).send({ messag: 'Some error accrued while connecting us please try after some time or email us email is given on contact us detail.' });
    })
    .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err }));
}

/**
 * Update Contact
 * @return message
 */
function update(req, res) {
  const contact = Contact(req.body);

  Contact.findByIdAndUpdate({ _id: req.params.contactId }, contact)
    .then((oContact) => {
      if (oContact) {
        return res.status(httpStatus.OK).send({ message: 'Contact updated successfully.' });
      }
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Some error accrued while updating contact.' });
    })
    .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err }));
}

/**
 * Delete Contact
 * @return message
 */
function remove(req, res, next) {
  Contact.findOneAndDelete({ _id: req.params.contactId })
    .then((oContact) => {
      if (oContact) {
        return res.status(httpStatus.OK).send({ message: 'Contact has been deleted successfully.' });
      }
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Some error accrued while deleting contact.' });
    })
    .catch(e => next(e));
}

module.exports = {
  create,
  remove,
  getAll,
  update,
};
