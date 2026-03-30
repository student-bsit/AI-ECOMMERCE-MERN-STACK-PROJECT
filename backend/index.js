import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.config.js';
import authRouter from './src/routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRouter from './src/routes/user.route.js';
import productRouter from './src/routes/product.route.js';
import cartRouter from './src/routes/cart.route.js';
import orderRouter from './src/routes/order.route.js';
dotenv.config();

const app=express();

const port=process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:["http://localhost:5173","http://localhost:5174"],
  credentials:true
}))

app.get("/",(req,res)=>{
  res.send("server is deploy")
})

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.listen(port,()=>{
  connectDB();
  console.log("server is started")
})