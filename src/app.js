const express = require('express');

const readerRouter = require('./routes/readers');

const bookRouter = require('./routes/books');

const authorRouter = require('./routes/authors');

const genreRouter = require('./routes/genres');

const app = express();

app.use(express.json());

app.use('/readers', readerRouter);

app.use('/books', bookRouter)

app.use('/authors', authorRouter)

app.use('/genres', genreRouter)

module.exports = app;