const Users = require('../models/users');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.showLeaderboard = async (req, res, next) => {

    try {
        const leaderboardData = await Users.findAll({
            order: [['totalExpense', 'DESC']]

        });
        return res.status(200).json(leaderboardData)
    } catch (error) {
        console.error(error);
        return res.status(500).json(error)
    }
}