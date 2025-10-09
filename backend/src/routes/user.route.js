import express from 'express'
import { getAdmin, getCurrentUser } from '../contollers/user.controller.js';
import isAuth from '../middlewares/isAuth.middleware.js'
import adminAuth from '../middlewares/adminAuth.js';
const userRouter=express.Router();

userRouter.get("/get",isAuth,getCurrentUser)
userRouter.get("/getadmin",adminAuth,getAdmin)


export default userRouter;