const bcryt = require('bcryptjs')
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

    return User;
}