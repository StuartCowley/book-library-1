const express = require('express');

const { 
   createGenre, 
   readGenres, 
   getGenreById, 
   updateGenre, 
   deleteGenre 
} = require('../controllers/genres');

const genreRouter = express.Router();

genreRouter.route('/')
.post(createGenre)
.get(readGenres);

genreRouter.route('/:id')
.get(getGenreById)
.patch(updateGenre)
.delete(deleteGenre);

module.exports = genreRouter