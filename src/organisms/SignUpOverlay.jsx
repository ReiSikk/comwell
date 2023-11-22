// SignUpOverlay.jsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./SignUpOverlay.module.scss";
import InputField from "@/atoms/InputField";
import InputFieldDropdown from "@/atoms/InputFieldDropdown";
import InputFieldBirthdate from "@/atoms/InputFieldBirthdate";
import CheckboxWithText from "@/atoms/CheckboxWithText";


const SignUpOverlay = ({ onClose, closeSignUpOverlay }) => {
  const overlayRef = useRef(null);
  const [signUpData, setSignUpData] = useState({
  })

  useEffect(() => {
    // After the component has mounted, add the active class with a slight delay
    const timeoutId = setTimeout(() => {
      overlayRef.current.classList.add(styles.active);
    }, 150);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array ensures this effect runs only once after mount

  const genderOptions = ["Not defined", "Male", "Female"];

  const handleInputChange = (inputId, value) => {
    setSignUpData((prevInputValues) => ({
      ...prevInputValues,
      [inputId]: value,
    }));
    console.log(signUpData);
  };

  return (
    <div className={styles.overlay} ref={overlayRef}>
      <div className={styles.overlayContent}>
        <div className={styles.button_container}>
      <button className={styles.close_button}  onClick={closeSignUpOverlay}>
                <svg className={styles.close_icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeWidth="1.5" d="M2.62 13.38 12.99 3.01M13.38 13.38 3.01 3.01"></path></svg>
                </button>
                </div>
      <div className="container">
        <h1>Sign Up for Comwell Club</h1>
        <p className={styles.subheader}>Become a member of Comwell Club for free and earn points everytime you stay with us. You'll also receive 25 points when you sign up</p>
        </div>
       <form>
         <div className="container">
        <InputField label="Full name" inputId="full-name" type="text" onInputChange={handleInputChange} />
        <InputField label="Email" inputId="email" type="email" onInputChange={handleInputChange} />
        <InputField label="Zip code" inputId="zip-code" type="text" onInputChange={handleInputChange}/>
        <InputField label="Phone" inputId="phone" type="text" onInputChange={handleInputChange}/>
        <InputField label="Password" inputId="password" type="password"onInputChange={handleInputChange} />
        <InputField label="Confirm password" inputId="confirm-password" type="password" onInputChange={handleInputChange} />
        <InputFieldDropdown label="Gender" options={genderOptions}  />
        <InputFieldBirthdate label="Birthdate"/>
        </div>
        <div className={styles.condtitions_container}>
        <div className="container">
        <CheckboxWithText label="Accept terms and conditions for Comwell Club" />
        <CheckboxWithText label="I would like to be updated on current member offers, Comwell Club surprises and other recommendations personalized to me. I can unsubscribe again at any time. " />
        </div>
        </div>
        <div className="container_top_border">
          <div className={styles.button_styling}>
        <button type="submit">Sign up</button>
        </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpOverlay;
