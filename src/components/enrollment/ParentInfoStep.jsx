import React from "react";
import Input from "@components/common/Input";
import Select from "@components/common/Select";
import { RELATIONSHIPS } from "@data/enrollmentOptions";
import { User, Phone, Mail, MapPin, AlertCircle } from "lucide-react";

const ParentInfoStep = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Parent/Guardian Information
        </h3>
        <p className="text-gray-600">Primary contact information</p>
      </div>

      {/* Parent 1 */}
      <div className="space-y-4">
        <h4 className="font-bold text-gray-900 flex items-center gap-2">
          <span className="w-6 h-6 bg-[#32cd32] text-white rounded-full flex items-center justify-center text-sm">
            1
          </span>
          Primary Parent/Guardian
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="parent1FirstName"
            value={formData.parent1FirstName}
            onChange={updateFormData}
            error={errors.parent1FirstName}
            required
            icon={User}
          />

          <Input
            label="Last Name"
            name="parent1LastName"
            value={formData.parent1LastName}
            onChange={updateFormData}
            error={errors.parent1LastName}
            required
            icon={User}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            name="parent1Phone"
            type="tel"
            value={formData.parent1Phone}
            onChange={updateFormData}
            error={errors.parent1Phone}
            required
            icon={Phone}
            placeholder="0971234567"
          />

          <Input
            label="Email Address"
            name="parent1Email"
            type="email"
            value={formData.parent1Email}
            onChange={updateFormData}
            error={errors.parent1Email}
            required
            icon={Mail}
            placeholder="[email protected]"
          />
        </div>

        <Select
          label="Relationship to Child"
          name="parent1Relationship"
          value={formData.parent1Relationship}
          onChange={updateFormData}
          options={RELATIONSHIPS}
          error={errors.parent1Relationship}
          required
        />
      </div>

      {/* Parent 2 (Optional) */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <h4 className="font-bold text-gray-900 flex items-center gap-2">
          <span className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm">
            2
          </span>
          Second Parent/Guardian (Optional)
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="parent2FirstName"
            value={formData.parent2FirstName}
            onChange={updateFormData}
            icon={User}
          />

          <Input
            label="Last Name"
            name="parent2LastName"
            value={formData.parent2LastName}
            onChange={updateFormData}
            icon={User}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            name="parent2Phone"
            type="tel"
            value={formData.parent2Phone}
            onChange={updateFormData}
            icon={Phone}
            placeholder="0971234567"
          />

          <Input
            label="Email Address"
            name="parent2Email"
            type="email"
            value={formData.parent2Email}
            onChange={updateFormData}
            icon={Mail}
          />
        </div>

        <Select
          label="Relationship to Child"
          name="parent2Relationship"
          value={formData.parent2Relationship}
          onChange={updateFormData}
          options={RELATIONSHIPS}
        />
      </div>

      {/* Address */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <h4 className="font-bold text-gray-900">Home Address</h4>

        <Input
          label="Street Address"
          name="address"
          value={formData.address}
          onChange={updateFormData}
          error={errors.address}
          required
          icon={MapPin}
          placeholder="123 Main Street"
        />

        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={updateFormData}
          error={errors.city}
          required
          icon={MapPin}
          placeholder="Lusaka"
        />
      </div>

      {/* Emergency Contact */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <h4 className="font-bold text-gray-900 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-[#32cd32]" />
          Emergency Contact
        </h4>
        <p className="text-sm text-gray-600 -mt-2">
          Someone we can reach if parents are unavailable
        </p>

        <Input
          label="Full Name"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={updateFormData}
          error={errors.emergencyContactName}
          required
          icon={User}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            name="emergencyContactPhone"
            type="tel"
            value={formData.emergencyContactPhone}
            onChange={updateFormData}
            error={errors.emergencyContactPhone}
            required
            icon={Phone}
            placeholder="0971234567"
          />

          <Input
            label="Relationship"
            name="emergencyContactRelationship"
            value={formData.emergencyContactRelationship}
            onChange={updateFormData}
            icon={User}
            placeholder="e.g., Aunt, Uncle, Friend"
          />
        </div>
      </div>
    </div>
  );
};

export default ParentInfoStep;
