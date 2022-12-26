const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({ //new keyword IMPORTANT!
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
        maxLength: 120,
    },

    imageUrl: {
        type: String,
        required: true,
    },

    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },

    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory',
        }
    ]
});

cubeSchema.path('imageUrl').validate(function() {
    return this.imageUrl.startsWith('http');
}, 'Image url must start with http/https!');

const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;