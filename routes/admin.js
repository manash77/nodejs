const express = require('express');

const router = express.Router();

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/shop')
})

router.get('/add-product', (req, res, next) => {
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"/><input type="number" name="size"/><button type="submit">Send</button></form>')
})

module.exports = router;