const express = require('express');
const contactCtrl = require('./contact.controller');

const router = express.Router();

router.route('/')
  /** GET /api/contacts - get all contact */
  .get(contactCtrl.getAll)

  /** POST /api/contacts - Create new contact */
  .post(contactCtrl.create);

router.route('/:contactId')

  /** Delete /api/contacts/:contactId - Delete contact */
  .delete(contactCtrl.remove)

  /** Put /api/contacts/:contactId - Update contact */
  .put(contactCtrl.update);

module.exports = router;
