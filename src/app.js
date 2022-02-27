const express = require('express');

const app = express();

const readersController = require('./controllers/readers')

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

app.post('/readers', readersController.create)


module.exports = app