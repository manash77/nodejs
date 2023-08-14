const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UserFiles = sequelize.define('userfiles',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    fileurl:{ type:Sequelize.STRING},
});

module.exports = UserFiles;