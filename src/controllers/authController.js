const router = require('express').Router();
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    let createdUser = await authService.register(req.body); //Mongoose validates it
    
    if (createdUser) {
        res.redirect('/auth/login');
    } else {
        res.redirect('404');
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    let token = await authService.login(req.body);

    if(!token) {
        res.redirect('404');
        return;
    }

    res.cookie('session', token);
    res.redirect('/');
});


module.exports = router;