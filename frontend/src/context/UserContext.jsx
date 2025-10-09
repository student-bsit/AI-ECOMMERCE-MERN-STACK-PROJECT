import React, { createContext } from 'react';
import { useContext } from 'react';
import { authDataContext } from './authContext';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export const userDataContext = createContext();

const UserContext = ({ children }) => {
    const {serverUrl}=useContext(authDataContext)
    const [userData,setUserData]=useState("");

  async function getCurrentUser(){
    try {
        const result=await axios.get(serverUrl+"/api/user/get",{withCredentials:true});
        console.log(result.data);
        setUserData(result.data)
    } catch (error) {
        setUserData("");
        console.log(error)
    }
  }

  useEffect(()=>{
    getCurrentUser();
  },[])

  let val = {
    userData,setUserData,getCurrentUser
  };

  return (
    <userDataContext.Provider value={val}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
