const path = require('path');
const express = require('express');

const router = express.Router();
const routeDir = require('../util/path')

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/shop')
})

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(routeDir, 'views', 'add-product.html'))
})

module.exports = router;