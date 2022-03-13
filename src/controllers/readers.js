const { 
    createItem, 
    getAllItems, 
    getItemById, 
    updateItem,
    deleteItem, 
} = require('./helpers');

const createReader = (req, res) => createItem(res, 'reader', req.body);

const readReaders = (_, res) => getAllItems(res, 'reader');

const getReaderById = (req, res) => getItemById(res, 'reader', req.params.id);

const updateReader = (req, res) => updateItem(res, 'reader', req.body, req.params.id)

const deleteReader = (req, res) => deleteItem(res, 'reader', req.params.id)

module.exports = { 
    createReader, 
    readReaders, 
    getReaderById, 
    updateReader, 
    deleteReader 
};