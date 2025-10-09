import express from 'express'
import { adminLogin, googleLogin, login,logout, signup } from '../contollers/auth.controller.js';

const authRouter=express.Router();

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.post("/googlelogin",googleLogin)
authRouter.post("/adminlogin",adminLogin)

export default authRouter;