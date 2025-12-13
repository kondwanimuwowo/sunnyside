import React from "react";
import Input from "@components/common/Input";
import Select from "@components/common/Select";
import Textarea from "@components/common/Textarea";
import {
  AREAS_OF_CONCERN,
  DAYS_OF_WEEK,
  TIME_PREFERENCES,
} from "@data/enrollmentOptions";
import { Calendar } from "lucide-react";

const ProgramSelectionStep = ({ formData, updateFormData, errors }) => {
  const toggleArea = (areaId) => {
    const current = formData.areasOfConcern || [];
    const updated = current.includes(areaId)
      ? current.filter((id) => id !== areaId)
      : [...current, areaId];
    updateFormData("areasOfConcern", updated);
  };

  const toggleDay = (day) => {
    const current = formData.preferredDays || [];
    const updated = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    updateFormData("preferredDays", updated);
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Program Selection
        </h3>
        <p className="text-gray-600">Help us understand your child's needs</p>
      </div>

      {/* Areas of Concern */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Areas of Concern <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Select all areas where your child needs support
        </p>

        <div className="grid md:grid-cols-2 gap-3">
          {AREAS_OF_CONCERN.map((area) => (
            <button
              key={area.id}
              type="button"
              onClick={() => toggleArea(area.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                formData.areasOfConcern?.includes(area.id)
                  ? "border-[#32cd32] bg-[rgba(50,205,50,0.05)]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{area.icon}</span>
                <span
                  className={`font-medium ${
                    formData.areasOfConcern?.includes(area.id)
                      ? "text-[#32cd32]"
                      : "text-gray-900"
                  }`}
                >
                  {area.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {errors.areasOfConcern && (
          <p className="mt-2 text-sm text-red-600">{errors.areasOfConcern}</p>
        )}
      </div>

      {/* Schedule Preferences */}
      <div className="pt-6 border-t border-gray-100">
        <h4 className="font-bold text-gray-900 mb-4">Schedule Preferences</h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred Days <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleDay(day.value)}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                    formData.preferredDays?.includes(day.value)
                      ? "border-[#32cd32] bg-[#32cd32] text-white"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
            {errors.preferredDays && (
              <p className="mt-2 text-sm text-red-600">
                {errors.preferredDays}
              </p>
            )}
          </div>

          <Select
            label="Preferred Time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={updateFormData}
            options={TIME_PREFERENCES}
            error={errors.preferredTime}
            required
          />

          <Input
            label="Preferred Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={updateFormData}
            error={errors.startDate}
            required
            icon={Calendar}
          />
        </div>
      </div>

      {/* Additional Notes */}
      <Textarea
        label="Additional Notes or Questions"
        name="additionalNotes"
        value={formData.additionalNotes}
        onChange={updateFormData}
        placeholder="Any specific concerns, questions, or information we should know about..."
        rows={4}
      />

      <div className="bg-[rgba(67,24,221,0.05)] border border-[rgba(67,24,221,0.15)] rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> We'll work with you to find the best schedule
          that meets your child's needs and your family's availability.
        </p>
      </div>
    </div>
  );
};

export default ProgramSelectionStep;
