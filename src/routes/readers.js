const express = require('express');

const { createReader, readReaders, getReaderById, updateReader, deleteReader } = require('../controllers/readers');

const readerRouter = express.Router();

readerRouter.route('/').post(createReader).get(readReaders);

readerRouter.route('/:id').get(getReaderById).patch(updateReader).delete(deleteReader);

module.exports = readerRouter