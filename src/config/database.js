const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/cubicle';

exports.initializeDatabase = () => mongoose.connect(url);