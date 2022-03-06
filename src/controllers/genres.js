const { 
   createItem, 
   getAllItems, 
   getItemById, 
   updateItem,
   deleteItem,
} = require('./helpers');
 
const createGenre = (req, res) => createItem(res, 'genre', req.body);
 
const readGenres = (_, res) => getAllItems(res, 'genre');
 
const getGenreById = (req, res) => getItemById(res, 'genre', req.params.id);
 
const updateGenre = (req, res) => updateItem(res, 'genre', req.body, req.params.id)
 
const deleteGenre = (req, res) => deleteItem(res, 'genre', req.params.id)
 
module.exports = { 
   createGenre, 
   readGenres, 
   getGenreById, 
   updateGenre, 
   deleteGenre 
};