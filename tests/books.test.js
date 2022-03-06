const { expect } = require('chai');
const { Book, Genre, Author } = require('../src/models');
const request = require('supertest');
const app = require('../src/app');

describe('/books', () => {
    let dummyGenre;
    let dummyAuthor;

    before(async () => Book.sequelize.sync());

    beforeEach(async () => {
        await Book.destroy({ where: {} });
        await Genre.destroy({ where: {} });
        await Author.destroy({ where: {} });
        dummyGenre = await Genre.create({ genre: 'Fiction' });
        dummyAuthor = await Author.create({ author: 'Dan Hembery' });

    })

    describe('with no records in the database', () => {
        describe('POST/books', () => {
            it('creates a new book in the database', async () => {
                const response = await request(app).post('/books').send({
                    title: 'Guide to Backend',
                    author: dummyAuthor.id,
                    genre: dummyGenre.id,
                    ISBN: '123456'
                });
                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true,
                })
                expect(response.status).to.equal(201);
                expect(response.body.title).to.equal('Guide to Backend');
                expect(newBookRecord.title).to.equal('Guide to Backend');
            });

            it('checks to see if the title exists', async () => {
                const response = await request(app).post('/books').send({
                    title: '',
                    author: dummyAuthor,
                    genre: dummyGenre,
                    ISBN: '123456'
                })
                const newBookRecord = await Book.findByPk(response.body.id);

                expect(response.status).to.equal(400);
                expect(response.body).to.haveOwnProperty('errors');
                expect(newBookRecord).to.equal(null);
            });
        });
    });

    describe('with records in the database', () => {    
        let books;

    
        beforeEach(async () => {
            await Book.destroy({ where: {} });

            const authorOne = Author.create({
                author: 'Dan Hembery'
            });
    
            const authorTwo = Author.create({
                author: 'Nyan Cat'
            });
    
            const authorThree = Author.create({
                author: 'Manchester Codes'
            });
    
            const genreOne = Genre.create({
                genre: 'Fiction'
            });
    
            const genreTwo = Genre.create({
                genre: 'Feline Fantasy'
            });
    
            const genreThree = Genre.create({
                genre: 'Non Fiction'
            });    

            books = await Promise.all([
                Book.create({
                    title: 'Full of Toblerone',
                    author: authorOne.id,
                    genre: genreOne.id,
                    ISBN: '123456'
                }),

                Book.create({ 
                    title: 'Big Book of Cats',
                    author: authorTwo.id,
                    genre: genreTwo.id,
                    ISBN: '789' 
                }),

                Book.create({ 
                    title: 'REST Principles',
                    author: authorThree.id,
                    genre: genreThree.id,
                    ISBN: '112233'
                })
            ]);
        });
    
    describe('GET /books', () => {
        it('gets all books records', async () => {
            const response = await request(app).get('/books');
    
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(3);
    
            response.body.forEach((book) => {
                const expected = books.find((a) => a.id === book.id);
    
                expect(book.title).to.equal(expected.title);
                expect(book.ISBN).to.equal(expected.ISBN);
            });
        });
    });
    
    describe('GET /books/:id', () => {
        it('gets books record by id', async () => {
            const book = books[0];
            const response = await request(app).get(`/books/${book.id}`);
    
            expect(response.status).to.equal(200);
            expect(response.body.title).to.equal(book.title);

        });
    
        it('returns a 404 if the book does not exist', async () => {
            const response = await request(app).get('/books/12345');
    
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The book could not be found.');
        });
    });
    
    describe('PATCH /books/:id', () => {
        it('updates books ISBN by id', async () => {
            const book = books[0];
            const response = await request(app)
            .patch(`/books/${book.id}`)
            .send({ ISBN: '1.2.3.4' });
            const updatedBookRecord = await Book.findByPk(book.id, {
                raw: true,
            });
    
            expect(response.status).to.equal(200);
            expect(updatedBookRecord.ISBN).to.equal('1.2.3.4');
        });
    
        it('returns a 404 if the book does not exist', async () => {
            const response = await request(app)
            .patch('/books/12345')
            .send({ author: 'Disc0des' });
    
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The book could not be found.');
        });
    });
    
    describe('DELETE /books/:id', () => {
        it('deletes book record by id', async () => {
            const book = books[0];
            const response = await request(app).delete(`/books/${book.id}`);
            const deletedBook = await Book.findByPk(book.id, { raw: true });
    
            expect(response.status).to.equal(204);
            expect(deletedBook).to.equal(null);
        });
    
        it('returns a 404 if the reader does not exist', async () => {
            const response = await request(app).delete('/books/12345');
            
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The book could not be found.');

            });
        });
    });
});
