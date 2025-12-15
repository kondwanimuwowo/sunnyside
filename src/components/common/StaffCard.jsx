import React from "react";

interface StaffCardProps {
  name: string;
  role: string;
  experience: string;
  bio: string;
  color: string;
  specialties?: string[];
  icon?: React.ReactNode;
}

const StaffCard: React.FC<StaffCardProps> = ({
  name,
  role,
  experience,
  bio,
  color,
  specialties = [],
  icon,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full">
      {/* Color header */}
      <div className={`h-2 ${color}`}></div>

      <div className="p-6">
        {/* Name and Role */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          <p className="text-[#32cd32] font-semibold">{role}</p>
          <p className="text-gray-500 text-sm mt-1">{experience} experience</p>
        </div>

        {/* Bio */}
        <p className="text-gray-700 mb-6">{bio}</p>

        {/* Specialties */}
        {specialties.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Passion indicator */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-sm">
            Passionate about working with children
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
