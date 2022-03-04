const { 
  createItem, 
  getAllItems, 
  getItemById, 
  updateItem,
  deleteItem,
  } = require('./helpers');

const createBook = (req, res) => createItem(res, 'book', req.body);

const readBooks = (_, res) => getAllItems(res, 'book');

const getBookById = (req, res) => getItemById(res, 'book', req.params.id);

const updateBook = (req, res) => updateItem(res, 'book', req.body, req.params.id)

const deleteBook = (req, res) => deleteItem(res, 'book', req.params.id)

module.exports = { 
    createBook, 
    readBooks, 
    getBookById, 
    updateBook, 
    deleteBook 
};