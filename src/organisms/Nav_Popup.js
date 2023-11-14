import React, { useState, useRef, useEffect } from "react";
import { submitLogindata } from "@/services/login_data";
import styles from "./Nav_Popup.module.scss";

function Nav_Popup({ isVisible, onClose }) {
  const popupRef = useRef(null);

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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleFormChange(event) {
    const { value, name } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    //event.preventDefault();

    console.log("handleSubmit called");

    const data = {
      email,
      password,
    };

    const response = await submitLogindata(data);
  }

  return isVisible ? (
    <form className={styles.form_login} ref={popupRef}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" placeholder="email" value={formData.email} onChange={handleFormChange} required />
      <label htmlFor="password">Password</label>
      <input type="text" name="password" placeholder="password" value={formData.password} onChange={handleFormChange} required />
      <p>Forgot your password?</p>
      <a href="/fourohfour">Reset password</a>
      <p>Dont have an account?</p>
      <a href="">Sign up for Comwell Club</a>
      <button type="submit" onClick={handleSubmit}>
        Log in
      </button>
    </form>
  ) : null;
}

export default Nav_Popup;
