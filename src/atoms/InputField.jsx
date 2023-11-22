import React, { useState } from "react";
import styles from "./InputField.module.scss";

const InputField = ({ label, inputId, type, onInputChange, minLength }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [value, setValue] = useState("");

  const handleFocus = () => {
    setFocusedInput(inputId);
  };
  const handleBlur = () => {
    setFocusedInput(null);
  };
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
      <input onFocus={handleFocus} onBlur={handleBlur} className={focusedInput === inputId ? styles.focused : ""} type={type} id={inputId} name={inputId} onChange={handleFormChange} value={value} minLength={minLength} required />
    </div>
  );
};
export default InputField;
