import React, { useState } from 'react';
import styles from "./CheckboxWithText.module.scss"


const CheckboxWithText = ({ label, id }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
    </div>
  );
};

export default CheckboxWithText;
