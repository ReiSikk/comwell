import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import styles from "./InputFieldBirthdate.module.scss";

const InputFieldBirthdate = ({ label }) => {
  const [value, setValue] = useState(null);

  function handleChange(value) {
    setValue(value);
  }

  const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 18);

  return (
    <div className={styles.input_container}>
      <label htmlFor="date-picker">{label}</label>
      <DatePicker value={value} onChange={handleChange} maxDate={maxDate} />
    </div>
  );
};

export default InputFieldBirthdate;
