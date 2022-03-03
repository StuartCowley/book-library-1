const express = require('express');

const readerRouter = require('./routes/readers');

const bookRouter = require('./routes/books')

const app = express();

app.use(express.json());

app.use('/readers', readerRouter);

app.use('/books', bookRouter)

module.exports = app;