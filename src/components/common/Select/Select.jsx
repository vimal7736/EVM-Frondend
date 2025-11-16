import { ChevronsUpDown } from 'lucide-react';
import './Select.css';

const Select = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  error,
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  className = '',
  multiple = false,
}) => {
  return (
    <div className={`select-wrapper ${className}`}>
      {label && (
        <label htmlFor={name} className="select-label">
          {label}
          {required && <span className="select-required">*</span>}
        </label>
      )}
      <div className="select-input-wrapper">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          multiple={multiple}
          className={`select-field ${error ? 'select-error' : ''}`}
        >
          {!multiple && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {!multiple && (
          <ChevronsUpDown 
            className="select-icon" 
            size={14}
            strokeWidth={1.5}
          />
        )}
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Select;