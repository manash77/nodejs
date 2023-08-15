const Expense = require('../models/expense');
const Users = require('../models/users');
const userContorller = require('./users');
const sequelize = require('../util/database');

let ITEMS_PER_PAGE = 2;

exports.getAllExpense = async (req, res, next) => {
  try {
    const page = +req.query.page || 1;
    console.log(req.query);
    ITEMS_PER_PAGE = +req.query.numberofexpense;

    const expense = await req.user.getExpenses({
      offset: (page - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE
    })
    const totalItems = await req.user.getExpenses()
    return res.status(200).json({
      expense,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
      nextPage: page+1,
      hasPreviousPage: page > 1,
      previousPage: page-1,
      lastPage: Math.ceil(totalItems.length/ITEMS_PER_PAGE)
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err })
  }

}
exports.postAddExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { amount, description, category } = req.body;
  const userId = req.user.id;

  await Expense.create({
    amount,
    description,
    category,
    userId,
    transaction: t
  }, { transaction: t })
    .then(async () => {
      let totalExpense = Number(req.user.totalExpense) + Number(amount);
      Users.update({ totalExpense }, { where: { id: req.user.id }, transaction: t }).then(async () => {
        await t.commit()
        return res.status(201).json()
      }).catch(async (err) => {
        console.error(err)
        await t.rollback()
        return res.status(200).json({ err })

      });
    })
    .catch(async (err) => {
      console.error(err)
      await t.rollback()
    })
}

exports.postDeleteExpense = async (req, res, next) => {
  try {
    const t = await sequelize.transaction();
    const userId = req.user.id;
    const id = req.params.id;

    const expense = await Expense.findByPk(id)
    if (expense) {
      const totalExpense = Number(req.user.totalExpense) - Number(expense.amount);
      const promise1 = await req.user.update({ totalExpense }, { transaction: t })
      const promise2 = await expense.destroy({ transaction: t });

      Promise.all([promise1, promise2]).then(() => {
        t.commit()
        res.status(200).json({ success: true, message: "Expenese deleted successfully!!", token: userContorller.generateToken(userId, undefined, true) })
      }).catch((err) => {
        t.rollback();
        throw new Error(err)
      });
    } else {
      t.rollback();
      throw new Error("User Expense was not found");
    }

  } catch (error) {
    console.error(error);
  }


}
exports.getEditExpense = (req, res, next) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then(expense => {
      return res.json(expense)
    })
    .catch(err => console.error(err))
}

exports.postEditExpense = (req, res, next) => {
  const updatedAmount = req.body.amount;
  const updatedDesc = req.body.description;
  const updatedCategory = req.body.category;
  Expense.findByPk(req.body.id)
    .then(expense => {
      expense.amount = updatedAmount;
      expense.category = updatedCategory;
      expense.description = updatedDesc;
      expense.save();
      return res.json()
    })
    .catch(err => console.error(err))
}