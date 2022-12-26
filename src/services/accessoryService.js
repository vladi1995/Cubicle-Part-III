const Accessory = require('../models/Accessory');

exports.create = (accessory) => Accessory.create(accessory);
exports.getOne = (id) => Accessory.findById(id);
exports.getAllAvailable = (ids) => Accessory.find({_id: {$nin: ids}});
