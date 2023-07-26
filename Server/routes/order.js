const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant');

router.get('/get-orders', restaurantController.getAllOrders)
router.post('/add-order', restaurantController.postAddOrder)
router.post('/delete-order', restaurantController.postDeleteOrder)

module.exports = router;
