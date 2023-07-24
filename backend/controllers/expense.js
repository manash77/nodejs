const Expense = require('../models/Expense');

exports.getAllExpense = (req,res,next) =>{
    Expense.findAll()
    .then(expnses => {
        return res.json(expnses)
    })
    .catch(err =>console.error(err))
}
exports.postAddExpense = (req,res,next) =>{
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    
    Expense.create({
        amount:amount,
        description:description,
        category:category
    })
    .then(response =>{
        console.log("Expense added");
        return res.json()
      }) 
      .catch(err => console.error(err))
}
exports.postDeleteExpense = (req,res,next) =>{}
exports.postEditExpense = (req,res,next) =>{}