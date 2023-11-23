import React, { createContext, useContext, useState } from "react";

export const SignUpDataContext = createContext();

export const SignUpDataProvider = ({ children }) => {
  const [signUpData, setSignUpData] = useState({});

  return (
    <SignUpDataContext.Provider value={{ signUpData, setSignUpData }}>
      {children}
    </SignUpDataContext.Provider>
  );
};

export const useSignUpData = () => {
  const context = useContext(SignUpDataContext);
  if (!context) {
    throw new Error("useSignUpData must be used within a SignUpDataProvider");
  }
  return context;
};