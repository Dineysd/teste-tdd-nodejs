const { User } = require('../../src/app/models')
const request = require('supertest')
const app =require('../../src/app');
const { user } = require('pg/lib/defaults');
const truncate = require('../utils/truncate')

describe('Authenticate', () => {
    beforeEach( async () => {
        await truncate();
    })

    it('verificar se as credenciais estão validas', async () => {
        const usertest = await User.create({name: 'diney', email: 'diney@sd.com', password_hash: '123321'});

        const response = await request(app)
        .post('/sessions')
        .send({
            email: user.emal,
            password: '123456'
        })

        expect(response.status).toBe(200);
    });
});
