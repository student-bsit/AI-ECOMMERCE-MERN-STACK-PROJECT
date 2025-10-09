import React, { createContext } from 'react';

export const authDataContext = createContext();

const AuthContext = ({ children }) => {
  let serverUrl = "http://localhost:8000";

  let val = {
    serverUrl,
  };

  return (
    <authDataContext.Provider value={val}>
      {children}
    </authDataContext.Provider>
  );
};

export default AuthContext;
