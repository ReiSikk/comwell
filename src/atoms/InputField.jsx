import React, { useState } from "react";
import styles from "./InputField.module.scss";

const InputField = ({ label, inputId, type }) => {
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
  };

  return (
    <div className={styles.input_container}>
      <label onFocus={handleFocus} onBlur={handleBlur} className={focusedInput === inputId || value ? styles.focused : ""} htmlFor={inputId}>
        {label}
      </label>
      <input onFocus={handleFocus} onBlur={handleBlur} className={focusedInput === inputId ? styles.focused : ""} type={type} id={inputId} name={inputId} onChange={handleFormChange} required />
    </div>
  );
};
export default InputField;
