const express = require('express');

const { 
   createAuthor, 
   readAuthors, 
   getAuthorById, 
   updateAuthor, 
   deleteAuthor 
} = require('../controllers/authors');

const authorRouter = express.Router();

authorRouter.route('/')
.post(createAuthor)
.get(readAuthors);

authorRouter.route('/:id')
.get(getAuthorById)
.patch(updateAuthor)
.delete(deleteAuthor);

module.exports = authorRouter