const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const contactRoutes = require('./routes/contact')
const successRoutes = require('./routes/success')
const errorController = require('./controllers/errorController')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', shopRoutes)
app.use('/admin', adminRoutes)
app.use('/contactus', contactRoutes)
app.use('/success', successRoutes)
app.use(errorController.get404)


app.listen(3000)  