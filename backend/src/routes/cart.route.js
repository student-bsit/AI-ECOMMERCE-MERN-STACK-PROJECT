import express from 'express'
import { addToCart, getUserCart, updateCart } from '../contollers/cart.controller.js';
import isAuth from '../middlewares/isAuth.middleware.js';

const cartRouter=express.Router();

cartRouter.post("/get",isAuth,getUserCart)
cartRouter.post("/add",isAuth,addToCart)
cartRouter.post("/update",isAuth,updateCart)



export default cartRouter;