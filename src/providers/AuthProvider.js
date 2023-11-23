import React, { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Add your login logic here
  const login = () => {
    
    setIsLoggedIn(true);
  };

  // Add your logout logic here
  const logout = () => {
    setIsLoggedIn(false);
  };

  // Provide the context values to the children components
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the context values
export const useAuth = () => {
  // Ensure the useContext hook is used within the AuthProvider's context
  const context = useContext(AuthContext);

  if (!context) {
    // Throw an error if useAuth is used outside of AuthProvider
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};