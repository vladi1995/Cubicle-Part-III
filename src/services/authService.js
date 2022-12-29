const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = async ({username, password, repeatPassword}) => {
    if (password !== repeatPassword) {
        return false;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const createdUser = {
        username,
        password: hashedPassword,
    }

    return User.create(createdUser);
}