const bcryt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = (sequelize, DataType) => {
    const User = sequelize.define("User", {
        name: DataType.STRING,
        email: DataType.STRING,
        password: DataType.VIRTUAL,
        password_hash: DataType.STRING,
    },{
        hooks: {
            beforeSave: async user => {
                if(user.password){
                    user.password_hash = await bcryt.hash(user.password, 8);
                } 
        }}
    });

    User.prototype.verificaPassword = function(password){
        return bcryt.compare(password, this.password_hash)
    }

    User.prototype.gerarToken = function(){
        return jwt.sign({id: this.id}, process.env.APP_SECRET)
    }

    return User;
}