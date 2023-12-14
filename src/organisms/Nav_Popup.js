import React, { useState, useRef, useEffect } from "react";
import { submitLoginData } from "../services/login_data.js";
import styles from "./Nav_Popup.module.scss";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import SignUpOverlay from "./SignUpOverlay";
import InputField from "@/atoms/InputField";
import Link from "next/link";

function Nav_Popup({ isVisible, onClose }) {
  const popupRef = useRef(null);
  const { isLoggedIn, login, logout } = useAuth();
  const [showSignUpOverlay, setShowSignUpOverlay] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //OVERLAY
  const handleSignUpClick = () => {
    setShowSignUpOverlay(true);
  };

  const closeSignUpOverlay = () => {
    console.log("closing overlay");
    setShowSignUpOverlay(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!showSignUpOverlay) {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
          onClose();
        }
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isVisible, onClose, showSignUpOverlay]);

  const handleInputChange = (inputId, value) => {
  
    setFormData((prevInputValues) => ({
      ...prevInputValues,
      [inputId]: value,
    }));
    
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      username: formData.email,
      password: formData.password,
    };

    console.log("handleSubmit called with:", data)
    
      try {
        const response = await submitLoginData(data);
        console.log(response, "response from submitLoginData");

    
        if (response.success === true) {
          // Handle login success
          const user = { 
            user: response.user,
            email: response.email,
            phone: response.phone,
           };
          login(user);
        } else {
          // Handle login failure
          alert("Login failed");
        }
      } catch (error) {
        console.error(error);
      }
    
}

  const handleLogout = () => {
    logout();
    // Handle logout logic
  };

  return isVisible ? (
    <>
      {!isLoggedIn ? (
        <>
          <form className={styles.form_login} ref={popupRef} onSubmit={handleSubmit}>
            <div className="container">
              <InputField label="Email" inputId="email" type="email" errorMessage="Please use a valid email address" onInputChange={handleInputChange} />
              <InputField label="Password" inputId="password" type="password" errorMessage="Your password needs to be at least 8 characters" onInputChange={handleInputChange} minLength={8} />
              <p>Forgot your password?</p>
              <Link href="/fourohfour">Reset password</Link>
              <p>Dont have an account?</p>
              <Link href="#" onClick={handleSignUpClick}>
                Sign up for Comwell Club
              </Link>
            </div>
            <div className="container_top_border">
              <button type="submit">
                Log in
              </button>
            </div>
          </form>
          {showSignUpOverlay && <SignUpOverlay onClose={onClose} closeSignUpOverlay={closeSignUpOverlay} />}
        </>
      ) : (
        <>
          <form className={styles.form_loggedin} ref={popupRef}>
            <div className={styles.container}>
              <a href="#">Comwell Club</a>
              <a href="#">Frequently Asked Questions</a>
              <a href="#">Club offers</a>
            </div>
            <div className={styles.container}>
              <a href="#">Notifications</a>
              <a href="#">Profile Settings</a>
            </div>
            <div className="container">
              <button onClick={handleLogout}>Sign out</button>
            </div>
          </form>
        </>
      )}
    </>
  ) : null;
}

export default Nav_Popup;
