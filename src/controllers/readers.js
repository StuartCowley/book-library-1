const { Reader } = require('../models');

const createReader = async (req, res) => {
    try {
        const newReader = await Reader.create(req.body);
        console.log(newReader);
        res.status(201).json(newReader);
    } 
    catch (err) {
        console.error(err);
        res.status(500);
    };
};

const readReaders = async (req, res) => {
    const readers = await Reader.findAll();
    res.status(200).json(readers);
};

const getReaderById = async (req, res) => {
    const readerId = req.params.id;
    const reader = await Reader.findByPk(readerId);

    if (!reader) {
        res.status(404).json({ error: 'The reader could not be found.'});
    } else {
        res.status(200).json(reader);
    }
};

const updateReader = async (req, res) => {
    const readerId = req.params.id;
    const updateData = req.body;

    const [ updatedRows ] = await Reader.update(updateData, { where : {id: readerId } });

    if (!updatedRows) {
        res.status(404).json({ error: 'The reader could not be found.'});
    } else {
    res.status(200).send();
    }
};

const deleteReader = async (req, res) => {
    const readerId = req.params.id;
    const deletedRows = await Reader.destroy({ where: { id: readerId } });

    if (!deletedRows) {
        res.status(404).json({ error: 'The reader could not be found.'});
    } else {
    res.status(204).send();
    }
};

module.exports = { createReader, readReaders, getReaderById, updateReader, deleteReader };

