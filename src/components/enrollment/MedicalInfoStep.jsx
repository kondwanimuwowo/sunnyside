import React from "react";
import Input from "@components/common/Input";
import Textarea from "@components/common/Textarea";
import { User, Phone } from "lucide-react";

const MedicalInfoStep = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Medical Information
        </h3>
        <p className="text-gray-600">
          Help us ensure your child's safety and wellbeing
        </p>
      </div>

      <Textarea
        label="Current Medications"
        name="medications"
        value={formData.medications}
        onChange={updateFormData}
        placeholder="List any medications your child is currently taking (or write 'None')"
        rows={3}
      />

      <Textarea
        label="Allergies"
        name="allergies"
        value={formData.allergies}
        onChange={updateFormData}
        placeholder="List any known allergies (food, medication, environmental, or write 'None')"
        rows={3}
      />

      <Textarea
        label="Medical Conditions"
        name="medicalConditions"
        value={formData.medicalConditions}
        onChange={updateFormData}
        placeholder="Any medical conditions we should be aware of (seizures, heart conditions, etc., or write 'None')"
        rows={3}
      />

      <div className="pt-6 border-t border-gray-100">
        <h4 className="font-bold text-gray-900 mb-4">
          Primary Doctor Information
        </h4>

        <div className="space-y-4">
          <Input
            label="Doctor's Name"
            name="doctorName"
            value={formData.doctorName}
            onChange={updateFormData}
            icon={User}
            placeholder="Dr. John Mwale"
          />

          <Input
            label="Doctor's Phone Number"
            name="doctorPhone"
            type="tel"
            value={formData.doctorPhone}
            onChange={updateFormData}
            icon={Phone}
            placeholder="0971234567"
          />
        </div>
      </div>

      <Textarea
        label="Previous Assessments or Evaluations"
        name="previousAssessments"
        value={formData.previousAssessments}
        onChange={updateFormData}
        placeholder="Have there been any developmental, psychological, or educational assessments? Please describe..."
        rows={4}
      />

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Privacy Notice:</strong> All medical information is kept
          strictly confidential and will only be shared with staff who directly
          work with your child.
        </p>
      </div>
    </div>
  );
};

export default MedicalInfoStep;
