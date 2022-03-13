const { expect } = require('chai');
const { Author } = require('../src/models');
const request = require('supertest');
const app = require('../src/app');

describe('/authors', () => {
   before(async () => Author.sequelize.sync());

   beforeEach(async () => {
      await Author.destroy({ where: {} })
   })

   describe('with no records in the database', () => {
        describe('POST/authors', () => {
            it('creates a new author in the database', async () => {
               const response = await request(app).post('/authors').send({ 

                  author: 'Dan Hembery'

               });
               const newAuthorRecord = await Author.findByPk(response.body.id);
               
               expect(response.status).to.equal(201);
               expect(response.body.author).to.equal('Dan Hembery');
               expect(newAuthorRecord.author).to.equal('Dan Hembery');
            });

            it('checks to see if the author exists', async () => {
               const response = await request(app).post('/authors').send({

                  author: ''

               })
               const newAuthorRecord = await Author.findByPk(response.body.id);

               expect(response.status).to.equal(400);
               expect(response.body).to.haveOwnProperty('errors');
               expect(newAuthorRecord).to.equal(null);
            });
        });
    });

   describe('with records in the database', () => {    
      let authors;
    
      beforeEach(async () => {
         authors = await Promise.all([
            Author.create({
               author: 'Disc0des'
            }),

            Author.create({ 
               author: 'Nyan Cat'
            }),

            Author.create({ 
               author: 'Manchester Codes'
            })
         ]);
      });
    
      describe('GET /authors', () => {
         it('gets all author records', async () => {
            const response = await request(app).get('/authors');
    
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(3);
    
            response.body.forEach((author) => {
                const expected = authors.find((a) => a.id === author.id);
    
                expect(author.id).to.equal(expected.id);
                expect(author.author).to.equal(expected.author);
            });
         });
      });
    
      describe('GET /authors/:id', () => {
         it('gets authors record by id', async () => {
            const author = authors[0];
            const response = await request(app).get(`/authors/${author.id}`);
    
            expect(response.status).to.equal(200);
            expect(response.body.author).to.equal(author.author);

          });
    
         it('returns a 404 if the genre does not exist', async () => {
            const response = await request(app).get('/authors/12345');
    
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The author could not be found.');
         });
      });
    
      describe('PATCH /authors/:id', () => {
         it('updates author by id', async () => {
            const author = authors[0];
            const response = await request(app)
            .patch(`/authors/${author.id}`)
            .send({ author: 'Jane Doe' });
            const updatedAuthorRecord = await Author.findByPk(author.id);
    
            expect(response.status).to.equal(200);
            expect(updatedAuthorRecord.author).to.equal('Jane Doe');
         });
    
         it('returns a 404 if the author does not exist', async () => {
            const response = await request(app)
            .patch('/authors/12345')
            .send({ author: 'Whoops' });
    
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The author could not be found.');
         });
      });
    
      describe('DELETE /authors/:id', () => {
         it('deletes author record by id', async () => {
            const author = authors[0];
            const response = await request(app).delete(`/authors/${author.id}`);
            const deletedAuthor = await Author.findByPk(author.id, { raw: true });
    
            expect(response.status).to.equal(204);
            expect(deletedAuthor).to.equal(null);
         });
    
         it('returns a 404 if the author does not exist', async () => {
            const response = await request(app).delete('/authors/12345');
            
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The author could not be found.');

         });
      });
   });
});
