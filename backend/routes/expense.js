const express = require('express')
const expenseController = require('../controllers/expense')
const router = express.Router();


router.get('/get-expense', expenseController.getAllExpense);
router.post('/add-expense', expenseController.postAddExpense);
router.post('/delete-expense', expenseController.postDeleteExpense);
router.post('/edit-expense', expenseController.postEditExpense);

module.exports = router;