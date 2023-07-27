const Users = require('../models/users');

exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    Users.create({
        name: name,
        email: email,
        password: password
    })
        .then((response) => {
            return res.json(response)
        })
        .catch((err) => {
            console.error(err);
        })
}