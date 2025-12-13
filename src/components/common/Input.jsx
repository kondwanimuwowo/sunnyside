import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  disabled = false,
  icon: Icon,
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

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}

        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur && onBlur(name)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border-2 rounded-lg transition-colors
            ${Icon ? "pl-10" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-orange-500"
            }
            focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed
          `}
          {...props}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
