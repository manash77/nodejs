const express = require('express');
const purchaseController = require('../controllers/purchase');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/premium', auth.authenticate, purchaseController.purchasePremium);
router.post('/updatestatus', auth.authenticate, purchaseController.updateStatus);


module.exports = router;