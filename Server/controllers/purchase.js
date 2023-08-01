const razorpay = require('razorpay');
const Order = require('../models/order');
const userContorller = require('./users');


const purchasePremium = (req, res) => {
    try {
        var rzp = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_KEY
        })

        const amount = 5000;
        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING' }).then(() => {
                return res.status(201).json({ order, key_id: rzp.key_id })
            }).catch((err) => {
                throw new Error(err)
            });
        })
    } catch (error) {
        console.error(error);
    }
}

const updateStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const { order_id, payment_id,status } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } })
        const promise1 = order.update({ paymentid: payment_id, status: status })
        const promise2 = req.user.update({ ispremiumuser: true })

        Promise.all([promise1, promise2]).then(() => {
            res.status(202).json({ success: true, message: "transactrion successful!!", token:userContorller.generateToken(userId,undefined,true) })
        }).catch((err) => {
            throw new Error(err)
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { purchasePremium, updateStatus }