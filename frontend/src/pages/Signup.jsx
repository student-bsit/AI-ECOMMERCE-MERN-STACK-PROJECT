import React, { useState } from 'react'
import vcart from '../assets/vcart logo.png'
import google from '../assets/google.png'
import { GoEyeClosed } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const Signup = () => {
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate();
  const {serverUrl}=useContext(authDataContext)
  const {getCurrentUser}=useContext(userDataContext);

  const [show,setShow]=useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSignUp=async(e)=>{
    setLoading(true)
    e.preventDefault();
    try {
       const result=await axios.post(serverUrl+"/api/auth/signup",{name,email,password},{withCredentials:true})
       console.log(result.data);
       setName("");
       setEmail("");
       setPassword("");
       setLoading(false)
       toast.success("Signup Successfully")
       getCurrentUser();
       navigate("/")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Signup Failed")
    }
  }

  const googleSinUp=async()=>{
    try {
      const result=await signInWithPopup(auth,provider);
      const user=result.user
      const name=user.displayName;
      const email=user.email;

      const response=await axios.post(serverUrl+"/api/auth/googlelogin",{name,email},{withCredentials:true})

      console.log(response.data)
      setLoading(false);
      getCurrentUser();
       navigate("/")

    } catch (error) {
      console.log(error)
      
    }
  }
  
  return (
    <div className="w-full h-[100vh] overflow-x-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">

      <div className='w-[100%] h-[80px] flex items-center justify-start ' >
        <div className=' flex px-[30px] gap-[10px] cursor-pointer' onClick={()=>navigate("/")}>
          <img src={vcart} alt="" className='w-[40px]' />
        <h1 className='text-[22px]  font-sans'>OneCart</h1>
        </div>

      </div>

      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>

        <span className='text-[25px] font-semibold'>Registration Page</span>
        <span className='text-[16px]'>Welcome to OneCart, palce your order</span>


      </div>

      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>

        <form onSubmit={handleSignUp} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]' >

          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'onClick={googleSinUp}>
            <img src={google} alt="" className='w-[25px] rounded-full' />
            Registration with Google

          </div>

          <div className='w-[100%] h-20px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            OR
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>

          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>

            <input type="text" autoComplete="off" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'placeholder='UserName' required onChange={(e)=>setName(e.target.value)} value={name}/>

            <input type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} value={email}/>

            <input type={show?"text":"password"} autoComplete="new-password" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password}/>

            {show && <FiEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]' onClick={()=>setShow(false)}/>}
            {!show && <GoEyeClosed className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]'onClick={()=>setShow(true)}/>}

            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px]'>{loading?<Loading/>:"Create Account"}</button>

            <p className='flex gap-[10px]'>You have any account? <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>navigate("/login")}>Login</span></p>

          </div>

        </form>
      </div>

    </div>
  )
}

export default Signup




