import React, { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    user: "",
    email: "",
    phone: 0,
    role: "",
  });
  const [isDashBoardVisible, setDashBoardVisible] = useState(false)




  // Add your login logic here
  const login = (user) => {
    console.log('login called with:', user);
    setIsLoggedIn(true);
    setUser({user: user.user, email: user.email, phone: user.phone, role: user.role});
  };

  // Add your logout logic here
  const logout = () => {
    setIsLoggedIn(false);
    // Reset user info
    setUser({user: "", email: "", phone: 0, role: ""});
  };

  // Provide the context values to the children components
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, isDashBoardVisible, setDashBoardVisible }}>
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