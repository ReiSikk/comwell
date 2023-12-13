import React, { useState, useEffect, useRef } from "react";
import styles from "./InputField.module.scss";
import { useSignUpData } from "../providers/SignUpDataContext";

const InputField = ({ label, inputId, type, onInputChange, minLength, pattern, title, errorMessage, propValue, bookingOverviewState, setIsFormComplete, updateIsFormComplete, setShowPasswordError }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [value, setValue] = useState("");
  const { signUpData, setSignUpData } = useSignUpData();
  const inputRef = useRef();

  const handleFocus = () => {
    setFocusedInput(inputId);
  };
  const handleBlur = () => {
    setFocusedInput(null);
    if (inputId === "confirmPassword") {
      setShowPasswordError(true);
    }
  };

  // Update the local state when the component mounts or when propValue changes
  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleFormChange = (event) => {
    const { value, validity, id } = event.target;
    setValue(value);
    onInputChange(inputId, value);
    setSignUpData((prevInputValues) => ({
      ...prevInputValues,
      [inputId]: value,
    }));
  };

  return (
    <div className={styles.input_container}>
      <label onFocus={handleFocus} onBlur={handleBlur} className={focusedInput === inputId || value ? styles.focused : ""} htmlFor={inputId}>
        {label}
      </label>
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={focusedInput === inputId ? styles.focused : ""}
        type={type}
        id={inputId}
        name={inputId}
        onChange={handleFormChange}
        value={value}
        minLength={minLength}
        pattern={pattern}
        title={title}
        required
        ref={inputRef}
      />
   {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
    </div>
  );
};
export default InputField;
