const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secret = 'Something';

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

exports.login = async ({username, password}) => {
    // 1. Hash password; Request if username and hashpassword exist. Hashed passwords are not EQUAL. NOT WORK!
    // 2. Get user from DB. Compare hashed password with bcrypt

    const user = await User.findOne({username});
    
    if (!user) {
        return false;
    }

    const isValid = await bcrypt.compare(password, user.password);
    
    if(!isValid) {
        return false;
    }
    
    const result = new Promise((resolve, reject) => {
        jwt.sign({_id: user._id, username: user.username}, secret, {expiresIn: '2d'}, (err, token) => {
            if (err) {
                return reject(err);
            }
    
            resolve(token);
        });
    });

    return result;
};