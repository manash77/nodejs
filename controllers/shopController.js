const routeDir = require('../util/path')
const path = require('path');

exports.getShopPage = (req, res, next) => {
    res.sendFile(path.join(routeDir, 'views', 'shop.html'))
}
