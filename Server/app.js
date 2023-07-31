
const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

const Expense = require('./models/expense');
const Users = require('./models/users');

Users.hasMany(Expense);
Expense.belongsTo(Users);

const usersRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expense');
app.use(bodyParser.json({ extended: false }))
app.use('/users',usersRoutes);
app.use('/expense',expenseRoutes);



sequelize
    .sync()
    .then(res => {
        // console.log(res);
        app.listen(8000);
    })
    .catch(err => console.error(err))

