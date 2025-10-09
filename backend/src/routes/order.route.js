import express from 'express'
import isAuth from '../middlewares/isAuth.middleware.js';
import { allOrders, placeOrder,  updateStatus, userOrders } from '../contollers/order.controller.js';

const orderRouter=express.Router();

// for users
orderRouter.post("/placeorder",isAuth,placeOrder)
// orderRouter.post("/placeorderbyrazorpay",isAuth,placeOrderRazorpay)
// orderRouter.post("/verifyrazorpay",isAuth,verifyRazorpay)
orderRouter.post("/userorders",isAuth,userOrders)


// for admin
orderRouter.get("/list",isAuth,allOrders)
orderRouter.post("/status",isAuth,updateStatus)





export default orderRouter;