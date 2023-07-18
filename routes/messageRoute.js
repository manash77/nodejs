const fs = require('fs');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    fs.readFile('message.txt', { encoding: 'utf-8' }, (err, data) => {

        if (err) console.log(err)
        res.send('<html>' +
            '<body><form action="/" method="POST"' +
            'onsubmit="document.getElementById(\'username\').value=localStorage.getItem(\'username\')">' +
            '<input type="hidden" name="username" id="username"/>' +
            '<input type="text" name="message" id="message"/>' +
            '<button type="submit">Send</button></form></body>' +
            `<h3>${data}<h3>` +
            '</html>')
    })
})

router.post('/', (req, res, next) => {
    const data = `${req.body.username}:${req.body.message}`;
    console.log(`body : ${req.body.username}  message: ${req.body.message}`);
    fs.writeFile('message.txt', JSON.stringify(data), (err) => err && console.error(err));
    res.redirect('/')
})



module.exports = router;