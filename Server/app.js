
const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());

const Expense = require('./models/expense');
const Users = require('./models/users');
const Order = require('./models/order');

Users.hasMany(Expense);
Expense.belongsTo(Users);

Users.hasMany(Order);
Order.belongsTo(Users);

const usersRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
app.use(bodyParser.json({ extended: false }))
app.use('/users',usersRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/premium',premiumRoutes);



sequelize
    .sync()
    .then(res => {
        // console.log(res);
        app.listen(8000);
    })
    .catch(err => console.error(err))

