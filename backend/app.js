const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const app = express();
app.use(cors())

const appointmentRoutes = require('./routes/appointment');
app.use(bodyParser.json({extended:false}));
app.use('/user',appointmentRoutes);

sequelize
  .sync()
  .then(res =>{
    // console.log(res);
    app.listen(8000);
  }) 
  .catch(err => console.log(err))

