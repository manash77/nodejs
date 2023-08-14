const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const usersController = require('../controllers/users');

router.post('/signup',usersController.createUser)
router.post('/login',usersController.loginUser)
router.get('/download', auth.authenticate,usersController.downloadExpense)
router.get('/get-files', auth.authenticate,usersController.getFiles)

module.exports = router;
