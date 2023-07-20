const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

router.post('/add-product', adminController.addProductDetails)

router.get('/add-product', adminController.getAddProductPage)

module.exports = router;