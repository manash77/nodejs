const express = require('express');
const premiumController = require('../controllers/premium');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/showleaderboard', auth.authenticate, premiumController.showLeaderboard);

module.exports = router;