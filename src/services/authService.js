const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = (userData) => {
    return User.create(userData);
}