const { User } = require('../../src/app/models')
const request = require('supertest')
const app =require('../../src/app');
const { user } = require('pg/lib/defaults');
const truncate = require('../utils/truncate')

describe('Authenticate', () => {
    beforeEach( async () => {
        await truncate();
    })

    it('deve verificar se as credenciais estão validas', async () => {
        const usertest = await User.create({name: 'diney', email: 'diney@sd.com', password: '123456'});

        const response = await request(app)
        .post('/sessions')
        .send({
            email: usertest.email,
            password: '123456'
        })

        expect(response.status).toBe(200);
    });

    it('deve nao autenticar credenciais invalidas', async () =>{
        const usertest = await User.create({name: 'diney', email: 'diney@sd.com', password: '123456'});

        const response = await request(app)
        .post('/sessions')
        .send({
            email: usertest.email,
            password: '123123'
        })

        expect(response.status).toBe(401);

    })

    it('deve retornar um token JWT', async () =>{   
        const usertest = await User.create({name: 'diney', email: 'diney@sd.com', password: '123456'});

        const response = await request(app)
        .post('/sessions')
        .send({
            email: usertest.email,
            password: '123456'
        })

        expect(response.body).toHaveProperty('token');

    });
});
