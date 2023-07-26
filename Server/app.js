
const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

const ordersRoutes = require('./routes/order')
app.use(bodyParser.json({ extended: false }))
app.use('/orders', ordersRoutes);

sequelize
    .sync()
    .then(res => {
        // console.log(res);
        app.listen(8000);
    })
    .catch(err => console.error(err))

