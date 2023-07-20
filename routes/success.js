const express = require('express');
const router = express.Router();
const successController = require('../controllers/successController');

router.get('/', successController.getSuccessPage)

module.exports = router;