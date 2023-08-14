const UserServices = require('../Services/userservices')
const S3Services = require('../Services/s3services')
const Users = require('../models/users');
const UserFiles = require('../models/userfiles');
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

exports.generateToken = (id, name, ispremiumuser) => {
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
            return res.status(200).json({ token: this.generateToken(user.id, user.name, user.ispremiumuser), success: "User Logged In Successfully!!" })
        }
        else if (error) {
            return res.status(500).json({ err: "hash error" })
        }
        else {
            return res.status(401).json({ err: "Password is incorrect!!" })
        }

    });
}

exports.downloadExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await UserServices.getExpenses(req);
        const stringifiedExpense = JSON.stringify(expenses)
        const filename = `Expense-${userId}-${new Date()}.txt`;
        const fileUrl = await S3Services.uploadToS3(stringifiedExpense, filename)
        const userFiles = await req.user.createUserfile({fileurl:fileUrl})
        res.status(200).json({ fileUrl, success: true })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ fileUrl: '', success: false, err })
    }
}

exports.getFiles = async (req,res) =>{
    try {
        const userfiles = await UserServices.getFiles(req)
        if (userfiles) {
            return res.status(200).json({userfiles})
        } else {
            throw new Error("User Doesnt have Any Files");
        }
        
    } catch (error) {
        return res.status(500).json({ fileUrl: '', success: false, err })
    }
}

