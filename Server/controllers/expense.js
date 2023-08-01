const Expense = require('../models/expense');

exports.getAllExpense = (req,res,next) =>{
    Expense.findAll({where:{userId:req.user.id}})
    .then(expenses => {
        return res.json(expenses)
    })
    .catch(err =>console.error(err))
}
exports.postAddExpense = (req,res,next) =>{
    const {amount,description,category} = req.body;
    const userId = req.user.id;
    let totalExpense = req.user.totalExpense;
    totalExpense+=amount;
    
    Expense.create({
        amount,
        description,
        category,
        userId
    })
    .then(async () =>{
        await req.user.update({totalExpense})
        return res.json()
      }) 
      .catch(err => console.error(err))
}

exports.postDeleteExpense = (req,res,next) =>{
    const id = req.params.id;
    Expense.findByPk(id)
    .then(expnse =>{
      expnse.destroy();
      return res.json()
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