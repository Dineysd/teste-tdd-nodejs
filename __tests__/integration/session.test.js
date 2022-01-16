const { User } = require('../../src/app/models')


describe('Authenticate', () => {
    it('Salvar usuario', async () => {
        const usettest = await User.create({name: 'diney', email: 'diney@sd.com', password_hash: '123321'});

        console.log(usettest)

        expect(usettest.email).toBe('diney@sd.com');
    });
});
