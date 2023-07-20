const routeDir = require('../util/path')
const path = require('path');

exports.addProductDetails =(req, res, next) => {
    console.log(req.body);
    res.redirect('/shop')
}

exports.getAddProductPage = (req, res, next) => {
    res.sendFile(path.join(routeDir, 'views', 'add-product.html'))
}