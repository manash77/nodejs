const Expense = require('../models/expense');

exports.getAllExpense = (req,res,next) =>{
    Expense.findAll()
    .then(expnses => {
        return res.json(expnses)
    })
    .catch(err =>console.error(err))
}
