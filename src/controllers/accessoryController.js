const express = require('express');
const accessoryService = require('../services/accessoryService');
const router = express.Router();

router.get('/create', (req, res) => {
    res.render('accessory/create');
});

router.post('/create', (req, res) => {
    const accessory = req.body;
    accessoryService.create(accessory)
    .then(() => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;