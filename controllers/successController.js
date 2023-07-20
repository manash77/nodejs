const routeDir = require('../util/path')
const path = require('path');

exports.getSuccessPage =(req, res, next) => {
    res.sendFile(path.join(routeDir, 'views', 'success.html'))
}
