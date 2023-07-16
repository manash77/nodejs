const http = require('http');

const express = require('express');

const app = express();
app.use((req, res, next) => {
    console.log("in the middleware");
    next();
})
app.use((req, res, next) => {
    console.log("in Another middleware");
    res.send({})
})
app.listen(3000)  