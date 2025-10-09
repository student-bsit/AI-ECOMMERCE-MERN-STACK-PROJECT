import Order from "../models/order.model.js";
import User from "../models/user.mode.js"
import Razorpay from "razorpay";
import dotenv from 'dotenv';
dotenv.config();

const currency = 'pkr'

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,       // from test keys
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });



//user controllers

export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()

        }

        const newOrder = new Order(orderData);
        await newOrder.save();

        await User.findByIdAndUpdate(userId, { cartData: {} });

        return res.status(201).json({ message: "Order Placed" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Order Placed error" })

    }
}

export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId });
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "user orders error" })
    }
}

// export const placeOrderRazorpay = async (req, res) => {
//     try {
//         const { items, amount, address } = req.body;
//         const userId = req.userId;

//         const orderData = {
//             items,
//             amount,
//             userId,
//             address,
//             paymentMethod: 'Razorpay',
//             payment: false,
//             date: Date.now()

//         }

//         const newOrder = new Order(orderData);
//         await newOrder.save();

//         const options = {
//             amount: amount + 100,
//             currency: currency.toUpperCase(),
//             receipt: newOrder._id.toString()
//         }

//         await razorpayInstance.orders.create(options, (error,
//             order) => {
//             if (error) {
//                 console.log(error)
//                 return res.status(500).json(error)
//             }
//             return res.status(200).json(order)
//         })


//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Order Placed error" })

//     }
// }

// export const verifyRazorpay = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { razorpay_order_id } = req.body;
//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
//         if (orderInfo.status === 'paid') {
//             await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
//             await User.findByIdAndUpdate(useId, { cartData: {} });
//             res.status(200).json({ message: "Payment Successfull" })
//         }
//         else {
//             res.status(200).json({ message: "Payment Failed" })
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message })
//     }
// }


//admin controllers

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "admin orders error" })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await Order.findByIdAndUpdate(orderId, { status });
        return res.status(201).json({ message: "status updated" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "status updated error" })

    }
}