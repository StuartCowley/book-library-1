const { Book } = require('../models');

const createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        console.log(newBook);
        res.status(201).json(newBook);
    } 
    catch (err) {
        const errorMessages = err.errors.map((e) => e.message);
        res.status(400).json({ errors: errorMessages });
    };
};

const readBooks = async (req, res) => {
    const books = await Book.findAll();
    res.status(200).json(books);
};

const getBookById = async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);

    if (!book) {
        res.status(404).json({ error: 'The book could not be found.'});
    } else {
        res.status(200).json(book);
    }
};

const updateBook = async (req, res) => {
    const bookId = req.params.id;
    const updateData = req.body;

    const [ updatedRows ] = await Book.update(updateData, { where : {id: bookId } });

    if (!updatedRows) {
        res.status(404).json({ error: 'The book could not be found.'});
    } else {
    res.status(200).send();
    }
};

const deleteBook = async (req, res) => {
    const bookId = req.params.id;
    const deletedRows = await Book.destroy({ where: { id: bookId } });

    if (!deletedRows) {
        res.status(404).json({ error: 'The book could not be found.'});
    } else {
    res.status(204).send();
    }
};

module.exports = { createBook, readBooks, getBookById, updateBook, deleteBook };

