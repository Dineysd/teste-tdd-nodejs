const {User} = require('../models')

class SessionController {
    async store(req, res){
        const { email, password } = req.body;

        const user = await User.findOne({ where:{ email: email }});

        if(!user){
            return res.status(401).json({message: 'Usuario Não encontrado!'});
        }

        if(!(await user.verificaPassword(password))){
            return res.status(401).json({message: 'Senha Invalida!'});
        }
        return res.json({ 
            user, 
            token: user.gerarToken()
        });
    }
}

module.exports = new SessionController();