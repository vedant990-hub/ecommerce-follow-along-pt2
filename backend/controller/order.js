const express = require('express');
const router = express.Router();
const Order = require('../model/order');
const User = require('../model/userModel');

router.post('/place-order', async(req, res) => {
    try{
        const{email, orderItems, shippingAddress} = req.body;

        //Validate request data
        if(!email) {
            return res.status(400).json({message: 'Email is required'});
        }
        if(!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({message: 'Order items are required.'});
        }
        if(!shippingAddress) {
            return res.status(400).json({message: 'Shipping Address is required'});
        }

        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({message: 'User is not found.'});
        }

        const orderPromises = orderItems.map(async (item) => {
            const totalAmount = item.price*item.quantity;
            const order = new Order({
                user: user._id,
                orderItems,
                shippingAddress,
                totalAmount,
            });
            return order.save();
        });

        const orders = await Promise.all(orderPromises);

        //clear user's cart after placing the order
        await Cart.deleteMany({user: user._id});

        res.status(201).json({message: 'Orders placed and cart cleared successfully',orders})
    }
    catch(error) {
        console.error('Error placing orders:', error);
        res.status(500).json({message: error.message});
    }
});

router.get('/my-orders', async (req, res) => {
    try{
        const {email} = req.query;

        if(!email) {
            return res.status(400).json({message: 'Email is required'});
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const orders = await Order.find({user: user._id});
        res.status(200).json({orders});
    } catch(error) {
        console.error('Error fetching the order:', error);
        res.status(500).json({message: error.message});
    }
});

router.patch('/cancel-order/:orderId', async (req, res) => {
    try {
        const {orderId} = req.params;

        const order = await Order.findById(orderId);
        console.log(order);

        if(!order) {
            return res.status(404).json({message: 'Order not found'});
        }

        order.orderStatus = 'Cancelled';
        await order.save();

        res.status(200).json({message: 'Order cancelled successfully'});
    } catch(error) {
        console.error('Error cancelling the order:', error);
        res.status(500).json({message: error.message});
    }
});

module.exports = router;