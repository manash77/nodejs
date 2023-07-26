const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Order = sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false},
    table:{
        type:Sequelize.STRING,
        allowNull:false},
    dish:{
        type:Sequelize.STRING,
        allowNull:false}
});

module.exports = Order;