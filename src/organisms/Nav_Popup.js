import React, { useState, useRef, useEffect } from "react";
import { submitLogindata } from "@/services/login_data";
import styles from "./Nav_Popup.module.scss";

function Nav_Popup({ isVisible, onClose }) {
  const popupRef = useRef(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [content, setContent] = useState("login");

  const handleFocus = (inputId) => {
    setFocusedInput(inputId);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isVisible, onClose]);

  function handleFormChange(event) {
    const { value, name } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }


  async function handleSubmit(event) {
    event.preventDefault();
    setContent("loggedin");

    const data = {
      email: formData.email,
      password: formData.password,
    };

    //const response = await submitLoginData(data);

    //if (response.success) {
      // Change content to something else when login is successful
      //setContent("loggedin");
    //} else {
      // Handle login failure
    //}
  }

  const handleLogout = () => {
    // Handle logout logic
    // You might want to clear user data, reset form, etc.
    setContent("login"); // Change content back to login after logout
  };


  const renderContent = () => {
    switch (content) {
      case "login":
        return (
          <>
    <form className={styles.form_login} ref={popupRef}>
      <div className={styles.container}>
        <div className={styles.input_container}>
          <label className={focusedInput === "email" || formData.email != "" ? styles.focused : ""} htmlFor="email">
            Email
          </label>
          <input className={focusedInput === "email" ? styles.focused : ""} id="email" type="email" name="email" value={formData.email} onChange={handleFormChange} onFocus={() => handleFocus("email")} required />
        </div>
        <div className={styles.input_container}>
          <label className={focusedInput === "password" || formData.password != "" ? styles.focused : ""} htmlFor="password">
            Password
          </label>
          <input className={focusedInput === "password" ? styles.focused : ""} type="text" id="password" name="password" value={formData.password} onChange={handleFormChange} onFocus={() => handleFocus("password")} required />
        </div>
        <p>Forgot your password?</p>
        <a href="/fourohfour">Reset password</a>
        <p>Dont have an account?</p>
        <a href="">Sign up for Comwell Club</a>
      </div>
      <div className={styles.container_button}>
        <button type="submit" onClick={handleSubmit}>
          Log in
        </button>
      </div>
    </form>
          </>
        );
      case "loggedin":
        return (
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
              <div className={styles.container_button}>
              <button onClick={handleLogout}>Sign out</button>
              </div>
            </form>
          </>
        );
      default:
        return null;
    }
  };

  return isVisible ? (
    <>
  {renderContent()}
    </>
  ) : null;

  return isVisible ? (
    <form className={styles.form_login} ref={popupRef}>
      <div className={styles.container}>
        <div className={styles.input_container}>
          <label className={focusedInput === "email" || formData.email != "" ? styles.focused : ""} htmlFor="email">
            Email
          </label>
          <input className={focusedInput === "email" ? styles.focused : ""} id="email" type="email" name="email" value={formData.email} onChange={handleFormChange} onFocus={() => handleFocus("email")} required />
        </div>
        <div className={styles.input_container}>
          <label className={focusedInput === "password" || formData.password != "" ? styles.focused : ""} htmlFor="password">
            Password
          </label>
          <input className={focusedInput === "password" ? styles.focused : ""} type="text" id="password" name="password" value={formData.password} onChange={handleFormChange} onFocus={() => handleFocus("password")} required />
        </div>
        <p>Forgot your password?</p>
        <a href="/fourohfour">Reset password</a>
        <p>Dont have an account?</p>
        <a href="">Sign up for Comwell Club</a>
      </div>
      <div className={styles.container_button}>
        <button type="submit" onClick={handleSubmit}>
          Log in
        </button>
      </div>
    </form>
  ) : null;
}

export default Nav_Popup;
