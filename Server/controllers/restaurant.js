const Order = require('../models/order')

exports.getAllOrders = (req,res,next)=>{
    console.log("called"); 
    Order.findAll()
    .then(order =>{
        return res.json(order)
    })
    .catch((err)=>{
        console.error(err);
    })
}

exports.postAddOrder = (req,res,next)=>{
    const price = req.body.price;
    const dish = req.body.dish;
    const table = req.body.table;
    
    Order.create({
        price:price,
        dish:dish,
        table:table
    })
    .then(() =>{
        console.log("Order added");
        return res.json()
      }) 
      .catch(err => console.error(err))
}

exports.postDeleteOrder = (req,res,next)=>{
    const id = req.params.id;
    console.log(id);
    Order.findByPk(id)
    .then(order =>{
      order.destroy();
      return res.json()
    })
    .then( ()=> {
      console.log('Expense user')
    })
    .catch(err => console.error(err))
}