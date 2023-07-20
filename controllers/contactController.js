const routeDir = require('../util/path')
const path = require('path');

exports.getContactPage = (req, res, next) => {
    res.sendFile(path.join(routeDir, 'views', 'contact.html'))
}