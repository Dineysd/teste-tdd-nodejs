const { User } = require('../../src/app/models')
const bcryt = require('bcryptjs')
const truncate = require('../utils/truncate')

describe('User',() => {
    beforeEach( async () => {
        await truncate();
    })

    it('verificar se o password foi encripitado', async () =>{
        const usertest = await User.create({name: 'diney', email: 'diney@sd.com', password: '123456'});

        const hash = await bcryt.compare('123456', usertest.password_hash);

        expect(hash).toBe(true)
    })

} )