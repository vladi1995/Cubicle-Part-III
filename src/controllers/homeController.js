const express = require('express');
const router = express.Router();
const cubeService = require('../services/cubeService');

router.get('/', async (req, res) => {
    const queryString = req.query;
    const {search, from, to} = queryString;
    const cubes = await cubeService.getAll(search, from, to);
    console.log(cubes);
    res.render('index', {cubes, search, from, to});
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;