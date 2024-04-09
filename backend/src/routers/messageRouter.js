const express = require('express')
const router = express.Router();
const addMessage = require('../controllers/addMessage');
const getMsg = require('../controllers/getMsg');


router.post('/addmessage',addMessage);

router.post('/getmessage',getMsg)

module.exports  = router