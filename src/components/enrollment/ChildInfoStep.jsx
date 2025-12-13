import React from "react";
import Input from "@components/common/Input";
import Select from "@components/common/Select";
import Textarea from "@components/common/Textarea";
import { DIAGNOSES, GENDER_OPTIONS } from "@data/enrollmentOptions";
import { User, Calendar } from "lucide-react";

const ChildInfoStep = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Child's Information
        </h3>
        <p className="text-gray-600">
          Tell us about the child who will be enrolling
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="childFirstName"
          value={formData.childFirstName}
          onChange={updateFormData}
          error={errors.childFirstName}
          required
          icon={User}
          placeholder="John"
        />

        <Input
          label="Last Name"
          name="childLastName"
          value={formData.childLastName}
          onChange={updateFormData}
          error={errors.childLastName}
          required
          icon={User}
          placeholder="Doe"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Date of Birth"
          name="childDOB"
          type="date"
          value={formData.childDOB}
          onChange={updateFormData}
          error={errors.childDOB}
          required
          icon={Calendar}
        />

        <Select
          label="Gender"
          name="childGender"
          value={formData.childGender}
          onChange={updateFormData}
          options={GENDER_OPTIONS}
          error={errors.childGender}
          required
        />
      </div>

      <Select
        label="Diagnosis (if any)"
        name="diagnosis"
        value={formData.diagnosis}
        onChange={updateFormData}
        options={DIAGNOSES}
        error={errors.diagnosis}
        required
      />

      {formData.diagnosis === "other" && (
        <Input
          label="Please specify diagnosis"
          name="diagnosisOther"
          value={formData.diagnosisOther}
          onChange={updateFormData}
          placeholder="Enter diagnosis"
        />
      )}

      <Textarea
        label="Current Challenges"
        name="currentChallenges"
        value={formData.currentChallenges}
        onChange={updateFormData}
        error={errors.currentChallenges}
        required
        placeholder="Please describe the main challenges or concerns you're experiencing with your child..."
        rows={4}
      />

      <Textarea
        label="Previous Therapy or Educational Support"
        name="previousTherapy"
        value={formData.previousTherapy}
        onChange={updateFormData}
        placeholder="Has your child received any therapy or special education services? Please describe..."
        rows={3}
      />

      <div className="bg-[rgba(50,205,50,0.05)] border border-[rgba(50,205,50,0.15)] rounded-lg p-4 mt-6">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> All information provided is confidential and
          will only be used to create the best support plan for your child.
        </p>
      </div>
    </div>
  );
};

export default ChildInfoStep;
