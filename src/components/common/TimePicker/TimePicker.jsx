import './TimePicker.css';

const TimePicker = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`timepicker-wrapper ${className}`}>
      {label && (
        <label htmlFor={name} className="timepicker-label">
          {label}
          {required && <span className="timepicker-required">*</span>}
        </label>
      )}
      <input
        type="time"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={`timepicker-field ${error ? 'timepicker-error' : ''}`}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default TimePicker;