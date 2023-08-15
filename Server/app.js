
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const Helmet = require('helmet');
const Morgan = require('morgan');
require('dotenv').config();

const app = express();

const accessFileStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

app.use(cors());
app.use(Helmet());
app.use(Morgan('combined',{stream:accessFileStream}));


const Expense = require('./models/expense');
const Users = require('./models/users');
const Order = require('./models/order');
const UserFiles = require('./models/userfiles');
const Forgotpassword = require('./models/forgotpassword');

Users.hasMany(Expense);
Expense.belongsTo(Users);

Users.hasMany(Order);
Order.belongsTo(Users);

Users.hasMany(Forgotpassword);
Forgotpassword.belongsTo(Users);

Users.hasMany(UserFiles);
UserFiles.belongsTo(Users);

const usersRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');

app.use(bodyParser.json({ extended: false }))

app.use('/users',usersRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',passwordRoutes);



sequelize
    .sync()
    .then(res => {
        // console.log(res);
        app.listen(8000);
    })
    .catch(err => console.error(err))

