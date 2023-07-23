const User = require('../models/user')

exports.getUser = (req,res,next) =>{
    User.findAll()
    .then(users => {
        return res.json(users)
    })
    .catch(err =>console.error(err))
}
exports.postAddUser = (req,res,next) =>{
    console.log(req);
  const username = req.body.username;
  const phone = req.body.phone;
  const email = req.body.email;
  
  User.create({
    username:username,
    email:email,
    phone:phone
  })
  .then(response =>{
    console.log("User added");
  }) 
  .catch(err => console.error(err))
}

exports.postDeleteUser = (req,res,next) =>{
    const prodId = req.body.userId;
  Product.findByPk(userId)
  .then(user =>{
    return user.destroy()
  })
  .then( ()=> {
    console.log('Deleted user')
  })
  .catch(err => console.error(err))
}