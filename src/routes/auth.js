const express = require('express');
const router = express.Router();

// use sendRequest
const {sendRequest} = require('../services/rest');

// use session
const session = require('express-session');
router.use(session({
    secret: 'powerfuel-secret',
    resave: false,
    saveUninitialized: true
}));

router.get('/login', function (req, res, next) {
    // if the user is logged in
    if (req.session.userId) {
        // redirect to the home page
        res.redirect('/');
        return;
    }

    res.render('auth/login', { title: 'Login' });
});

router.post('/login', function (req, res, next) {
    // get email and password from the request body
    const { email, password } = req.body;

    sendRequest('/User/login', 'post', { "userName" : email, "password" : password }, (data) => {
        // if the user is logged in
        if (data.token) {
            req.session.user = data;
            req.session.userId = data.id;
            req.session.token = data.token;

            // redirect to the home page
            res.redirect('/');
        } else {
            // if the user is not logged in
            // redirect to the login page
            res.redirect('/auth/login');
        }
    }, (error) => {
        console.log(error);
        // if there is an error
        // redirect to the login page
        res.redirect('/auth/login');
    });
});

// handle logout function
router.get('/logout', function (req, res, next) {
    // if the user is logged in
    if (req.session.userId) {
        // redirect to the home page
        res.redirect('/');
        return;
    }

    res.redirect('/auth/login');
});

// handle logout function
router.post('/logout', function (req, res, next) {
    // set the session loggedIn to false
    delete req.session.userId;
    delete req.session.token;

    // redirect to the login page
    res.redirect('/auth/login');
});

module.exports = router;