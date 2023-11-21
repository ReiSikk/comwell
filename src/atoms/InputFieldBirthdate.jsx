import React, { useState } from 'react';
import DatePicker from "react-multi-date-picker"
import styles from "./InputFieldBirthdate.module.scss"

const InputFieldBirthdate = ({ label }) => {

  return (
    <div className={styles.input_container}>
      <label htmlFor="date-picker">{label}</label>
      <DatePicker />
    </div>
  );
};

export default InputFieldBirthdate;