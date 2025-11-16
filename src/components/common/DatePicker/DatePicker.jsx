import './DatePicker.css';

const DatePicker = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  min,
  max,
  className = '',
}) => {
  return (
    <div className={`datepicker-wrapper ${className}`}>
      {label && (
        <label htmlFor={name} className="datepicker-label">
          {label}
          {required && <span className="datepicker-required">*</span>}
        </label>
      )}
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        max={max}
        disabled={disabled}
        required={required}
        className={`datepicker-field ${error ? 'datepicker-error' : ''}`}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default DatePicker;