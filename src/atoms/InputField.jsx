import React, { useState, useEffect } from "react";
import styles from "./InputField.module.scss";


const InputField = ({ label, inputId, type, onInputChange, minLength, pattern, title, errorMessage, propValue}) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [value, setValue] = useState("");


  const handleFocus = () => {
    setFocusedInput(inputId);
  };
  const handleBlur = () => {
    setFocusedInput(null);
  };

   // Update the local state when the component mounts or when propValue changes
   useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleFormChange = (event) => {
    const { value } = event.target;
    setValue(value);
    onInputChange(inputId, value);
  };



  return (
    <div className={styles.input_container}>
      <label onFocus={handleFocus} onBlur={handleBlur} className={focusedInput === inputId || value ? styles.focused : ""} htmlFor={inputId}>
        {label}
      </label>
      <input onFocus={handleFocus} onBlur={handleBlur} className={focusedInput === inputId ? styles.focused : ""} type={type} id={inputId} name={inputId} onChange={handleFormChange} value={value} minLength={minLength} pattern={pattern} title={title} required />
      <p className={styles.error_message}>{errorMessage}</p>
    </div>
  );
};
export default InputField;
