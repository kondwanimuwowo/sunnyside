import React from "react";

const Card = ({
  children,
  variant = "default",
  padding = "default",
  hover = false,
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-white shadow-lg",
    outlined: "bg-white border-2 border-gray-200",
    gradient:
      "bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200",
    dark: "bg-gray-900 text-white",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  };

  const hoverClass = hover
    ? "hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    : "";

  return (
    <div
      className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
