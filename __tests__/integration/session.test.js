const { User } = require('../../src/app/models')
const request = require('supertest')
const app =require('../../src/app');
const truncate = require('../utils/truncate')

const factory  = require('../factories')

describe('Authenticate', () => {
    beforeEach( async () => { 
        await truncate();
    })

    it('deve verificar se as credenciais estão validas', async () => {
        const usertest = await factory.create('User',{ password: '123456' });

        const response = await request(app)
        .post('/sessions')
        .send({
            email: usertest.email,
            password: '123456'
        })

        expect(response.status).toBe(200);
    });

    it('deve nao autenticar credenciais invalidas', async () =>{
        const usertest = await factory.create('User');

        const response = await request(app)
        .post('/sessions')
        .send({
            email: usertest.email,
            password: '123123'
        })

        expect(response.status).toBe(401);

    })

    it('deve retornar um token JWT', async () =>{   
        const usertest = await factory.create('User');

        const response = await request(app)
        .post('/sessions')
        .send({
            email: usertest.email,
            password: '123456'
        })

        expect(response.body).toHaveProperty('token');

    });

    it('deve permitir acesso privado da autenticacão', async () =>{   
        const usertest = await factory.create('User');

        const response = await request(app)
        .get('/dashboard')
        .set("Authorization", `Bearer ${usertest.gerarToken()}`)

        expect(response.status).toBe(200);

    });

    it('deve não permitir acesso se token não existe', async () =>{   
        const usertest = await factory.create('User');

        const response = await request(app)
        .get('/dashboard')

        expect(response.status).toBe(401);

    });

    it('deve não permitir acesso com token invalido', async () =>{   
        const usertest = await factory.create('User');

        const response = await request(app)
        .get('/dashboard')
        .set("Authorization", `Bearer 123456`)

        expect(response.status).toBe(401);

    });

    
});
