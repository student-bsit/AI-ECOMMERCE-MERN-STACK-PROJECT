import React, { useState } from 'react'
import vcart from '../assets/logo.png'
import { GoEyeClosed } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import axios from 'axios'
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function Login() {
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate();
  const {serverUrl}=useContext(authDataContext)
  const {getAdmin}=useContext(adminDataContext)

  const [show,setShow]=useState(false);

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
  
    const adminLogin=async(e)=>{
      setLoading(true)
      e.preventDefault();
      try {
         const result=await axios.post(serverUrl+"/api/auth/adminlogin",{email,password},{withCredentials:true})
         console.log(result.data);
         setLoading(false)
         toast.success("AdminLogin Successfully")
         setEmail("");
         setPassword("");
         getAdmin();
         navigate("/")
      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error("AdminLogin Failed")
      }
    }


  return (
    <div className="w-full h-[100vh] overflow-x-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">

      <div className='w-[100%] h-[80px] flex items-center justify-start ' >
        <div className=' flex px-[30px] gap-[10px] cursor-pointer'>
          <img src={vcart} alt="" className='w-[40px]' />
        <h1 className='text-[22px]  font-sans'>OneCart</h1>
        </div>

      </div>

      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>

        <span className='text-[25px] font-semibold'>Registration Page</span>
        <span className='text-[16px]'>Welcome to OneCart, Apply to Admin Login</span>


      </div>

      <div className='max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>

        <form onSubmit={adminLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]' >
          

          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>

            <input type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'placeholder='Email' required onChange={(e)=>setEmail(e.target.value)}/>

            <input type={show?"text":"password"} autoComplete="new-password" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'placeholder='Password' required onChange={(e)=>setPassword(e.target.value)}/>

            {!show && <FiEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]' onClick={()=>setShow(true)}/>}
            {show && <GoEyeClosed className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]'onClick={()=>setShow(false)}/>}

            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px]'>{loading?<Loading/>:"Login"}</button>


          </div>

        </form>
      </div>

    </div>
  )
}

export default Login
