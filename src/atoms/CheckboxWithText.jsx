import React, { useState } from 'react';
import styles from "./CheckboxWithText.module.scss"


const CheckboxWithText = ({ label, id, onCheckboxChange, errorMessage }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    // Call the callback function with the updated checkbox state
    onCheckboxChange(!isChecked);
  };



  return (
    <div className={styles.checkbox_container}>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={styles.checkbox}
      />
      <label htmlFor="checkbox">{label}</label>
      <p className={styles.error_message}>{errorMessage}</p>    
      </div>
  );
};

export default CheckboxWithText;
