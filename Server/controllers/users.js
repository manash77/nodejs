const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (name == '' || password == '' || email == '') {
        return res.status(400).json({ err: "Bad parameters Something is missing" });
    }

    bcrypt.hash(password, saltRounds, async (err, password) => {
        console.error(err);
        const [user, created] = await Users.findOrCreate({
            where: { email: email },
            defaults: {
                name,
                email,
                password
            }
        });
        if (created) {
            return res.status(201).json(user)
        } else {
            return res.json({ userExists: true })
        }
    });

}

exports.generateToken = (id, name,ispremiumuser) => {
    return jwt.sign({ userId: id, username: name, ispremiumuser }, process.env.SECRET_KEY)
}
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (password == '' || email == '') {
        return res.status(400).json({ err: "Bad parameters Something is missing" });
    }

    const user = await Users.findOne({ where: { email: email } })
    if (!user) {
        return res.status(404).json({ err: "User Not Found" })
    }
    bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
            return res.status(200).json({ token: generateToken(user.id, user.name, user.ispremiumuser), success: "User Logged In Successfully!!" })
        }
        else if (error) {
            return res.status(500).json({ err: "hash error" })
        }
        else {
            return res.status(401).json({ err: "Password is incorrect!!" })
        }

    });
}