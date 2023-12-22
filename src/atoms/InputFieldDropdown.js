import React, { useState } from "react";
import styles from "./InputFieldDropdown.module.scss";
const InputFieldDropdown = ({ label, options, selectId }) => {
  const [selectedOption, setSelectedOption] = useState("Not defined");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.dropdown_container}>
      <label htmlFor="dropdown">{label}</label>
      <select name="dropdown" id={selectId} value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option} value={option.value}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputFieldDropdown;
