import React, { useEffect, useRef, useState } from "react";
import styles from "./SignUpOverlay.module.scss";
import InputField from "@/atoms/InputField";
import InputFieldDropdown from "@/atoms/InputFieldDropdown";
import InputFieldBirthdate from "@/atoms/InputFieldBirthdate";
import CheckboxWithText from "@/atoms/CheckboxWithText";
import { useSignUpData } from "@/providers/SignUpDataContext";


const SignUpOverlay = ({ closeSignUpOverlay }) => {
  const overlayRef = useRef(null);
  const {signUpData, setSignUpData} = useSignUpData();
  const [passwordData, setPasswordData] = useState();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receiveNewsletter, setReceiveNewsletter] = useState(false);
  const [showErrorMessages, setShowErrorMessages] = useState(false);
  const [showServerErrorMessages, setServerErrorMessages] = useState(false);
  const [signedUp, setSignedUp] = useState(false);


  const handleAcceptTermsChange = (newState) => {
    setAcceptTerms(newState);
  };

  const handleReceiveNewsletterChange = (newState) => {
    setReceiveNewsletter(newState);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      overlayRef.current.classList.add(styles.active);
    }, 150);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); 

  const genderOptions = ["Not defined", "Male", "Female"];

  const handleInputChange = (inputId, value) => {
    setSignUpData((prevInputValues) => ({
      ...prevInputValues,
      [inputId]: value,
    }));
  };

  const handlePassword = (inputId, value) => {
    setPasswordData((prevInputValues) => ({
      ...prevInputValues,
      [inputId]: value,
    }));
  };



  async function handleSubmit(event) {
    event.preventDefault();


if (acceptTerms & (passwordData.signupPassword === passwordData.confirmPassword)) {
  //sending the request
  callSignUpBackend();
} else {
  setShowErrorMessages(true);
}


  }

  async function callSignUpBackend() {
    console.log("callSignUpBackend called");
    const signUpEndpoint = "http://127.0.0.1:3005/auth/signup"

    const response =  await fetch(signUpEndpoint, {
     method: "POST",
     body: JSON.stringify({
            fullName: signUpData.fullName,
            phone: signUpData.phone,
            username: signUpData.username,
            password: passwordData.signupPassword,
     }),
     headers: {
       "Content-Type": "application/json",
     },
   });

   if (response.ok) {
     const data =  await response.json();
     setSignedUp(true);

   } else {
     console.error("Error sending data to the server.");
     setServerErrorMessages(true);
   }
  }


  return !signedUp ? (

    <div className={styles.overlay} ref={overlayRef}>
      <div className={styles.overlayContent}>
        <div className={styles.button_container}>
      <button className={styles.close_button}  onClick={closeSignUpOverlay}>
                <svg className={styles.close_icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeWidth="1.5" d="M2.62 13.38 12.99 3.01M13.38 13.38 3.01 3.01"></path></svg>
                </button>
                </div>
      <div className="container">
        <h1>Sign Up for Comwell Club</h1>
        <p className={styles.subheader}>Become a member of Comwell Club for free and earn points everytime you stay with us. You&apos;ll also receive 25 points when you sign up</p>
        </div>
       <form onSubmit={handleSubmit}>
         <div className="container">
        <InputField label="Full name" inputId="fullName" type="text" onInputChange={handleInputChange} pattern="^[A-Za-z]+(\s[A-Za-z]+)+$" title="Please provide first and last name" />
        <InputField label="Email" inputId="username" type="email" onInputChange={handleInputChange} errorMessage={showServerErrorMessages && !signedUp ? "This email cannot be used" : null}/>
        <InputField label="Zip code" inputId="zipCode" onInputChange={handleInputChange} type="text" pattern="^[0-9+]+$" minLength={2}/>
        <InputField label="Phone" inputId="phone" type="text" onInputChange={handleInputChange} pattern="^[0-9]+$" minLength={5} title="You can only use digits"/>
        <InputField label="Password" inputId="signupPassword" type="password" onInputChange={handlePassword} minLength={8} />
        <InputField label="Confirm password" inputId="confirmPassword" type="password" onInputChange={handlePassword} errorMessage={showErrorMessages && (passwordData.signupPassword !== passwordData.confirmPassword) ? "Your password don't match" : null}  />
        <InputFieldDropdown label="Gender" selectId="gender" options={genderOptions}  />
        <InputFieldBirthdate label="Birthdate"/>
        </div>
        <div className={styles.condtitions_container}>
        <div className="container">
        <CheckboxWithText label="Accept terms and conditions for Comwell Club *" id="conditions-checkbox" onCheckboxChange={handleAcceptTermsChange} errorMessage={showErrorMessages && !acceptTerms ? "Please accept the terms and conditions." : null} />
        <CheckboxWithText label="I would like to be updated on current member offers, Comwell Club surprises and other recommendations personalized to me. I can unsubscribe again at any time. " id="newsletter-checkbox"   onCheckboxChange={handleReceiveNewsletterChange} />
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
  ) :   <div className={styles.overlay} ref={overlayRef}>
  <div className={styles.overlayContent}>
    <div className={styles.button_container}>
  <button className={styles.close_button}  onClick={closeSignUpOverlay}>
            <svg className={styles.close_icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeWidth="1.5" d="M2.62 13.38 12.99 3.01M13.38 13.38 3.01 3.01"></path></svg>
            </button>
            </div>
  <div className="container">
    <h1>You&apos;ve signed up succesfully</h1>
    <p className={styles.subheader}>Please log-in now</p>
    </div>
  
  </div>
</div>
};

export default SignUpOverlay;
