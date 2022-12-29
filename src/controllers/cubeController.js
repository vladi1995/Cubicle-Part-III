const express = require('express');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const router = express.Router();

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const cube = req.body;
    cubeService.create(cube)
    .then(() => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    })
});

router.get('/details/:id', async (req, res) => {
    const currentCube = await cubeService.getOneDetailed(req.params.id).lean();
    res.render('details', {currentCube});
});

router.get('/accessory/attach/:id', async (req, res) => {
    const currentCube = await cubeService.getOne(req.params.id).lean();
    const accessories = await accessoryService.getAllAvailable(currentCube.accessories).lean();
    res.render('./accessory/attach', {currentCube, accessories});
});

router.post('/accessory/attach/:id', async (req, res) => {
    const accessoryId = req.body.accessory;
    const cubeId = req.params.id;
    await cubeService.attachAccessory(cubeId, accessoryId);
    res.redirect('/cube/details/'+cubeId);
});

router.get('/:cubeId/edit', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    cube[`difficultyLevel${cube.difficultyLevel}`] = true;

    if (!cube) {
        return res.redirect('404');
    }
    res.render('cube/edit', {cube});
});

router.post('/:cubeId/edit', async (req, res) => {
    const modifiedCube = await cubeService.edit(req.params.cubeId, req.body);
    res.redirect('/cube/details/' + modifiedCube._id);
});

module.exports = router;