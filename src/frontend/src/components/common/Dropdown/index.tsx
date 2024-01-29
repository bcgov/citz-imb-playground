import './styles.css';
import React, { useState, ChangeEvent } from 'react';
import { DownArrowIcon } from 'components/icons';

type DropdownProps = {
  options: { value: string; label: string }[]; // Array of options with value and label
  placeholder?: string; // Optional placeholder for the dropdown
  onChange?: Function;
};

export const Dropdown = (props: DropdownProps) => {
  const { options, placeholder, onChange = () => {} } = props;
  const [selectedValue, setSelectedValue] = useState<string>('');

  // Handler for when an option is selected
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event);
  };

  return (
    <div className="dropdown-container">
      <select value={selectedValue} onChange={handleChange} className="dropdown">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <DownArrowIcon className="dropdown-icon" />
    </div>
  );
};
