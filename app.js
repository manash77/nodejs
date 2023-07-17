const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/')
})

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"/><input type="number" name="size"/><button type="submit">Send</button></form>')
})
app.use('/', (req, res, next) => {
    res.send('<h1>Hello From Express</h1>')
})
app.listen(3000)  