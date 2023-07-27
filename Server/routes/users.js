const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.post('/signup',usersController.createUser)

module.exports = router;
