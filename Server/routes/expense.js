const express = require('express');
const expenseController = require('../controllers/expense');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/get-expense', auth.authenticate, expenseController.getAllExpense);
router.post('/add-expense', auth.authenticate, expenseController.postAddExpense);
router.delete('/delete-expense/:id', auth.authenticate, expenseController.postDeleteExpense);
router.get('/edit-expense/:id', expenseController.getEditExpense);

router.patch('/edit-expense', auth.authenticate, expenseController.postEditExpense);

module.exports = router;