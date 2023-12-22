import { React, useState, useEffect } from "react";
import styles from "./CheckboxWithText.module.scss";

const CheckboxWithText = ({ label, id, onCheckboxChange, errorMessage, checked }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    // Call the callback function with the updated checkbox state
    onCheckboxChange(!isChecked);
  };

  return (
    <div className={styles.checkbox_container}>
      <input type="checkbox" id={id} checked={isChecked} onChange={handleCheckboxChange} className={styles.checkbox} />
      <label htmlFor="checkbox">{label}</label>
      <p className={styles.error_message}>{errorMessage}</p>
    </div>
  );
};

export default CheckboxWithText;
