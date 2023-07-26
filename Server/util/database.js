const Sequelize = require('sequelize');

const sequelize = new Sequelize('restaurant','root','root',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize;
