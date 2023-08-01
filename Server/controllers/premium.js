const Users = require('../models/users');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.showLeaderboard = async (req, res, next) => {

    try {

        const leaderboard = await Users.findAll({
            attributes: ['id', 'name',[sequelize.fn('sum', sequelize.col('expenseS.amount')), 'totalcost']],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group: ['users.id'],
            order: [['totalcost', 'DESC']]

        });


        return res.status(200).json(leaderboard)
    } catch (error) {
        console.error(error);
    }

    // expenses.forEach(expense => {
    //      if (userAggregatedExpenses[expense.userId]) {
    //         userAggregatedExpenses[expense.userId] += expense.amount;
    //      }else{
    //         userAggregatedExpenses[expense.userId] = expense.amount;
    //      }
    // });
    // console.log(expenses);
    // var leaderboardDeatils = [];
    // users.forEach(user => {
    //     leaderboardDeatils.push({name:user.name,totalcost:userAggregatedExpenses[user.id]})
    // })
    // leaderboardDeatils.sort( (a,b) => b.totalcost - a.totalcost)
    // console.log(leaderboardDeatils);
}