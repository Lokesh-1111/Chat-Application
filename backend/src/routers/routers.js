const express = require('express');
const register = require('../controllers/register');
const login = require('../controllers/login')
const setAvatar = require('../controllers/setAvatar')
const getUsers = require('../controllers/getUsers')
const router = express.Router();


router.post('/register',register);

router.post('/login',login)

router.post('/setavatar/:id',setAvatar);

router.get('/allusers/:id',getUsers)


module.exports = router;