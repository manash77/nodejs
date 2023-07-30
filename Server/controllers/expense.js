const Expense = require('../models/expense');

exports.getAllExpense = (req,res,next) =>{
    Expense.findAll()
    .then(expenses => {
        return res.json(expenses)
    })
    .catch(err =>console.error(err))
}
exports.postAddExpense = (req,res,next) =>{
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    
    Expense.create({
        amount,
        description,
        category
    })
    .then(() =>{
        console.log("Expense added");
        return res.json()
      }) 
      .catch(err => console.error(err))
}

exports.postDeleteExpense = (req,res,next) =>{
    const id = req.params.id;
    Expense.findByPk(id)
    .then(expnse =>{
      console.log(expnse);
      expnse.destroy();
      return res.json()
    })
    .then( ()=> {
      console.log('Expense user')
    })
    .catch(err => console.error(err))
}
exports.getEditExpense = (req,res,next) =>{
    const id = req.params.id;
    Expense.findByPk(id)
    .then(expense =>{
      return res.json(expense)
    })
    .catch(err => console.error(err))
}

exports.postEditExpense = (req,res,next) =>{
    const updatedAmount = req.body.amount;
    const updatedDesc = req.body.description;
    const updatedCategory = req.body.category;
    Expense.findByPk(req.body.id)
    .then(expense =>{
      expense.amount = updatedAmount;
      expense.category = updatedCategory;
      expense.description = updatedDesc;
      expense.save();
      return res.json()
    })
    .catch(err => console.error(err))
}