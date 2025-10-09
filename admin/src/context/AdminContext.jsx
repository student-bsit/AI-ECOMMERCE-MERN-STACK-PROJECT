import React, { createContext } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { authDataContext } from './AuthContext';

export const adminDataContext = createContext();

const AdminContext = ({ children }) => {
    const {serverUrl}=useContext(authDataContext)
    const [adminData,setAdminData]=useState("");

  async function getAdmin(){
    try {
        const result=await axios.get(serverUrl+"/api/user/getadmin",{withCredentials:true});
        console.log(result.data);
        setAdminData(result.data)
    } catch (error) {
        setAdminData("");
        console.log(error)
    }
  }

  useEffect(()=>{
    getAdmin();
  },[])

  let val = {
    adminData,setAdminData,getAdmin
  };

  return (
    <adminDataContext.Provider value={val}>
      {children}
    </adminDataContext.Provider>
  );
};

export default AdminContext;
