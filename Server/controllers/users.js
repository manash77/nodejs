const Users = require('../models/users');

exports.createUser = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const [user, created] = await Users.findOrCreate({
        where: { email:email },
        defaults: {
            name,
            email,
            password
        }
    });

    console.log(created);
    if (created) {
       return res.status(201).json(user)
    } else {
        return res.json({userExists:true})
    }

    // Users.findOne({ where: { email: email } })
    //     .then((user) => {
    //         console.log(typeof user.email);
    //         if (user.email == email) {
    //             console.log("if works ");
    //             res.status = 409;
    //             return res.json()
    //         }
    //     })
    //     .catch((err) => {
    //         return res.json(err)
    //     })
    //     .then(() => {
    //         Users.create({
    //             name,
    //             email,
    //             password
    //         })
    //             .then((response) => {
    //                 return res.json(response)
    //             })
    //             .catch((err) => {
    //                 return res.json(err)
    //             })
    //     })


}