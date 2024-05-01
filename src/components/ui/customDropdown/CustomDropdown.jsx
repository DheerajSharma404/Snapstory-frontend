/* eslint-disable react/prop-types */
import React from "react";
import styles from "./CustomDropdown.module.css";

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownWrapper}>
      <div className={styles.selectedOption} >
        {value}
        <div className={styles.arrow} onClick={handleToggleDropdown} >
          <img src='/assets/icons/down-chevron.svg' alt='Dropdown arrow' />
        </div>
      </div>
      {isOpen && (
        <ul className={`${styles.optionsList}`}>
          {options?.map((option) => (
            <li
              key={option}
              className={styles.option}
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
