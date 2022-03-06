const { 
   createItem, 
   getAllItems, 
   getItemById, 
   updateItem,
   deleteItem,
} = require('./helpers');
 
const createAuthor = (req, res) => createItem(res, 'author', req.body);
 
const readAuthors = (_, res) => getAllItems(res, 'author');
 
const getAuthorById = (req, res) => getItemById(res, 'author', req.params.id);
 
const updateAuthor = (req, res) => updateItem(res, 'author', req.body, req.params.id)
 
const deleteAuthor = (req, res) => deleteItem(res, 'author', req.params.id)
 
module.exports = { 
   createAuthor, 
   readAuthors, 
   getAuthorById, 
   updateAuthor, 
   deleteAuthor 
};