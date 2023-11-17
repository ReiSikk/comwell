// SignUpOverlay.jsx
import React, { useEffect, useRef } from "react";
import styles from "./SignUpOverlay.module.scss";
import InputField from "@/atoms/InputField";

const SignUpOverlay = ({ onClose, closeSignUpOverlay }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    // After the component has mounted, add the active class with a slight delay
    const timeoutId = setTimeout(() => {
      overlayRef.current.classList.add(styles.active);
    }, 150);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array ensures this effect runs only once after mount

  return (
    <div className={styles.overlay} ref={overlayRef}>
      <div className={styles.overlayContent}>
      <button onClick={closeSignUpOverlay}>Close</button>
        <h1>Sign Up for Comwell Club</h1>
        <p>Become a member of Comwell Club for free and earn points everytime you stay with us. You'll also receive 25 points when you sign up</p>
       
       <form className={styles.form_container}>
        <InputField label="Full name" inputId="full-name" type="text" />
        <InputField label="Email" inputId="email" type="email" />
        <InputField label="Zip code" inputId="zip-code" type="text" />
        <InputField label="Phone" inputId="phone" type="text" />
        <InputField label="Password" inputId="password" type="text" />
        <InputField label="Confirm password" inputId="confirm-password" type="text" />
        <InputField label="Gender" inputId="gender" type="text" />
        <InputField label="Birthdate" inputId="birthdate" type="text" />
        </form>
      </div>
    </div>
  );
};

export default SignUpOverlay;
