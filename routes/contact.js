const path = require('path');
const express = require('express');

const router = express.Router();
const routeDir = require('../util/path')

router.get('/', (req, res, next) => {
    res.sendFile(path.join(routeDir, 'views', 'contact.html'))
})

module.exports = router;