import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = "left",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variants = {
    // Lime Green (Primary)
    primary:
      "bg-[#32cd32] text-white hover:bg-[#22a722] focus:ring-[#32cd32] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-150",

    // Deep Blue (Accent)
    accent:
      "bg-[#3731bb] text-white hover:bg-[#3311bb] focus:ring-[#4318dd] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-150",

    // Teal
    teal: "bg-[#1ba397] text-white hover:bg-[#158a80] focus:ring-[#1ba397] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-150",

    // Outline
    outline:
      "border-2 border-[#32cd32] text-[#32cd32] hover:bg-[rgba(50,205,50,0.12)] focus:ring-[#32cd32] disabled:opacity-50 transition-all duration-150",

    // Ghost
    ghost:
      "text-[#32cd32] hover:bg-[rgba(50,205,50,0.12)] focus:ring-[#32cd32] disabled:opacity-50 transition-all duration-150",

    // White/Secondary
    white:
      "bg-white text-gray-700 border-2 border-gray-300 hover:border-[#32cd32] focus:ring-[#32cd32] disabled:opacity-50 transition-all duration-150",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {!loading && Icon && iconPosition === "left" && (
        <Icon className="w-5 h-5 mr-2" />
      )}
      {children}
      {!loading && Icon && iconPosition === "right" && (
        <Icon className="w-5 h-5 ml-2" />
      )}
    </button>
  );
};

export default Button;
