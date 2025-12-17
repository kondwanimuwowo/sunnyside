import React from "react";

const Loader = ({
  size = "lg",
  fullScreen = false,
  text = "",
  className = "",
}) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const loader = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 border-2 border-[#32cd32]/30 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-[#32cd32] rounded-full border-t-transparent animate-spin"></div>
      </div>
      {text && <p className="mt-4 text-gray-600 text-sm">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;
