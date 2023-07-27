const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant');

router.get('/orders', restaurantController.getAllOrders)
//orders - all data - get 
router.post('/orders', restaurantController.postAddOrder)
//orders - create order - post 
router.delete('/orders/:id', restaurantController.postDeleteOrder)

module.exports = router;
