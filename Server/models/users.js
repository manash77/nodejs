const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalExpense: {
        type: Sequelize.DOUBLE,
        defaultValue:0
    },
    ispremiumuser: {
        type: Sequelize.BOOLEAN
    }

});

module.exports = Users;