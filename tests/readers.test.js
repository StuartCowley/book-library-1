const { expect } = require('chai');
const { Reader } = require('../src/models');
const request = require('supertest');
const app = require('../src/app');

describe('/readers', () => {
    before(async () => Reader.sequelize.sync());

    beforeEach(async () => {
        await Reader.destroy({ where: {} })
    })

    describe('with no records in the database', () => {
        describe('POST/readers', () => {
            it('creates a new reader in the database', async () => {
                const response = await request(app).post('/readers').send({
                    name: 'Elizabeth Bennet',
                    email: 'future_ms_darcy@gmail.com',
                    password: 'youll never guess it'
                });
                const newReaderRecord = await Reader.findByPk(response.body.id, {
                    raw: true,
                })
                expect(response.status).to.equal(201);
                expect(response.body.name).to.equal('Elizabeth Bennet');
                expect(response.body.email).to.equal('future_ms_darcy@gmail.com')
                expect(newReaderRecord.name).to.equal('Elizabeth Bennet');
                expect(newReaderRecord.email).to.equal('future_ms_darcy@gmail.com');
            });

            it('errors if any field is null', async () => {
                const response = await request(app).post('/readers').send({});
                const newReaderRecord = await Reader.findByPk(response.body.id);

                expect(response.status).to.equal(400);
                expect(response.body).to.haveOwnProperty('errors');
                expect(newReaderRecord).to.equal(null);
            })

            it('errors if email is not in the correct format', async () => {
                const response = await request(app).post('/readers').send({
                    name: 'Elizabeth Bennet',
                    email: 'Kapow.. this is a virus!',
                    password: 'youll never guess it'                
                })
                const newReaderRecord = await Reader.findByPk(response.body.id);

                expect(response.status).to.equal(400);
                expect(response.body).to.haveOwnProperty('errors');
                expect(newReaderRecord).to.equal(null);
            })

            it('errors if password is less than 8 characters long', async () => {
                const response = await request(app).post('/readers').send({
                    name: 'Elizabeth Bennet',
                    email: 'future_ms_darcy@gmail.com',
                    password: 'oops' 
                })
                const newReaderRecord = await Reader.findByPk(response.body.id);
                
                expect(response.status).to.equal(400);
                expect(response.body).to.haveOwnProperty('errors');
                expect(newReaderRecord).to.equal(null);                
            })
        });
    });

    describe('with records in the database', () => {    
        let readers;
    
        beforeEach(async () => {
          readers = await Promise.all([
            Reader.create({
                name: 'Elizabeth Bennet',
                email: 'future_ms_darcy@gmail.com',
                password: 'youll never guess it'
            }),

            Reader.create({ 
                name: 'Arya Stark', 
                email: 'vmorgul@me.com', 
                password: 'a girl stole from the man' 
            }),

            Reader.create({ 
                name: 'Lyra Belacqua', 
                email: 'darknorth123@msn.org', 
                password: 'no short passwords' }),
        ]);
    });
    
    describe('GET /readers', () => {
        it('gets all readers records', async () => {
            const response = await request(app).get('/readers');
    
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(3);
    
            response.body.forEach((reader) => {
                const expected = readers.find((a) => a.id === reader.id);
    
                expect(reader.name).to.equal(expected.name);
                expect(reader.email).to.equal(expected.email);
                expect(reader.password).to.equal(expected.undefined);

            });
        });
    });
    
    describe('GET /readers/:id', () => {
        it('gets readers record by id', async () => {
            const reader = readers[0];
            const response = await request(app).get(`/readers/${reader.id}`);
    
            expect(response.status).to.equal(200);
            expect(response.body.name).to.equal(reader.name);
            expect(response.body.email).to.equal(reader.email);

        });
    
        it('returns a 404 if the reader does not exist', async () => {
            const response = await request(app).get('/readers/12345');
    
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The reader could not be found.');
        });
    });
    
    describe('PATCH /readers/:id', () => {
        it('updates readers email by id', async () => {
            const reader = readers[0];
            const response = await request(app)
            .patch(`/readers/${reader.id}`)
            .send({ email: 'miss_e_bennet@gmail.com' });
            const updatedReaderRecord = await Reader.findByPk(reader.id, {
                raw: true,
            });
    
            expect(response.status).to.equal(200);
            expect(updatedReaderRecord.email).to.equal('miss_e_bennet@gmail.com');
        });
    
        it('returns a 404 if the reader does not exist', async () => {
            const response = await request(app)
            .patch('/readers/12345')
            .send({ email: 'some_new_email@gmail.com' });
    
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The reader could not be found.');
        });
    });
    
    describe('DELETE /readers/:id', () => {
        it('deletes reader record by id', async () => {
            const reader = readers[0];
            const response = await request(app).delete(`/readers/${reader.id}`);
            const deletedReader = await Reader.findByPk(reader.id, { raw: true });
    
            expect(response.status).to.equal(204);
            expect(deletedReader).to.equal(null);
        });
    
        it('returns a 404 if the reader does not exist', async () => {
            const response = await request(app).delete('/readers/12345');
            
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The reader could not be found.');

            });
        });
    });
});


