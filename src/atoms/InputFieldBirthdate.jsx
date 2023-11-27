import React, { useState } from 'react';
import DatePicker from "react-multi-date-picker"
import styles from "./InputFieldBirthdate.module.scss"

const InputFieldBirthdate = ({ label }) => {
  const [value, setValue] = useState(null);

  function handleChange(value){
    setValue(value)
  }
  

  return (
    <div className={styles.input_container}>
      <label htmlFor="date-picker">{label}</label>
      <DatePicker value={value} onChange={handleChange} />
    </div>
  );
};

export default InputFieldBirthdate;