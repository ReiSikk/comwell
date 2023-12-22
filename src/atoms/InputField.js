import React, { useState, useEffect, useRef } from "react";
import styles from "./InputField.module.scss";
import { useSignUpData } from "../providers/SignUpDataContext";

const InputField = ({ label, inputId, type, onInputChange, minLength, pattern, title, errorMessage, propValue, bookingOverviewState, setIsFormComplete, updateIsFormComplete }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [blurredInput, setBlurredInput] = useState(false);
  const [value, setValue] = useState("");
  const { signUpData, setSignUpData } = useSignUpData();
  const inputRef = useRef();

  //FOCUS AND BLUR
  const handleFocus = () => {
    setFocusedInput(inputId);
  };

  const handleBlur = () => {
    setFocusedInput(null);
    setBlurredInput(true);
  };

  // Update the local state when propValue changes
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
    <div>
      <div className={styles.input_container}>
        <div>
          <label onFocus={handleFocus} onBlur={handleBlur} className={focusedInput === inputId || value ? styles.focused : ""} htmlFor={inputId}>
            {label}
          </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={focusedInput === inputId ? styles.focused : ""}
            blurred={blurredInput.toString()}
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

          <div className={styles.error_message_container}>{blurredInput && <p className={styles.error_message}>{errorMessage}</p>}</div>
        </div>
      </div>
    </div>
  );
};
export default InputField;
