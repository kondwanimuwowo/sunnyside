import React from "react";

const Select = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  error,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur && onBlur(name)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border-2 rounded-lg transition-colors appearance-none cursor-pointer
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-orange-500"
          }
          focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
