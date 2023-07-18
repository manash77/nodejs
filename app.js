const path = require('path');

const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/loginRoute');
const messageRoutes = require('./routes/messageRoute')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(loginRoutes)
app.use(messageRoutes)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})


app.listen(3000)  