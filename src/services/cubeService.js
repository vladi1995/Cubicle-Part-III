const Cube = require('../models/Cube');
const accessoryService = require('./accessoryService');

exports.create = (cube) => Cube.create(cube);
exports.edit = (cubeId, cubeData) => {
    return Cube.findByIdAndUpdate(cubeId, cubeData);
}
exports.getOne = (id) => Cube.findById(id);
exports.getOneDetailed = (id) => Cube.findById(id).populate('accessories');

exports.getAll = (search = '', from = 1, to = 6) => {
    fromNumber = Number(from) || 0;
    toNumber = Number(to) || 6;

    const result = Cube.find({name: {$regex: new RegExp(search, 'i')}}).
        where('difficultyLevel').lte(toNumber).gte(fromNumber).lean();
    
    return result;
}

exports.attachAccessory = async(cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await accessoryService.getOne(accessoryId);
    
    accessory.cubes.push(cube);
    cube.accessories.push(accessory);

    await accessory.save();
    await cube.save();

    return cube;
}