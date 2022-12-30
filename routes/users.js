var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users/list', { title: 'Users List', users: [] });
});

/* GET users listing. */
router.get('/list', function (req, res, next) {
  res.render('users/list', { title: 'Users List', users: [] });
});

/* GET add user types. */
router.get('/add-types', function (req, res, next) {
  res.render('users/add-types', { title: 'Add User Types', users: [] });
});

/* GET add users. */
router.get('/add', function (req, res, next) {
  res.render('users/add', { title: 'Add Users', users: [] });
});


module.exports = router;
