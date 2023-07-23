const path = require('path');

const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/get-user',userController.getUser);
router.post('/add-user',userController.postAddUser);
router.post('/delete-user',userController.postDeleteUser);

module.exports = router;
