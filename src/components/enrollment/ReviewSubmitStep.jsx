const ReviewSubmitStep = ({ formData }) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Review Your Information
        </h3>
        <p className="text-gray-600">
          Please review all information before submitting
        </p>
      </div>

      {/* Child Info */}
      <div className="bg-gray-50 rounded-lg p-5">
        <h4 className="font-bold text-gray-900 mb-3">Child Information</h4>
        <dl className="space-y-2 text-sm">
          <div className="flex">
            <dt className="font-medium w-32">Name:</dt>
            <dd className="text-gray-600">
              {formData.childFirstName} {formData.childLastName}
            </dd>
          </div>
          <div className="flex">
            <dt className="font-medium w-32">DOB:</dt>
            <dd className="text-gray-600">{formData.childDOB}</dd>
          </div>
          <div className="flex">
            <dt className="font-medium w-32">Gender:</dt>
            <dd className="text-gray-600">{formData.childGender}</dd>
          </div>
          <div className="flex">
            <dt className="font-medium w-32">Diagnosis:</dt>
            <dd className="text-gray-600">{formData.diagnosis}</dd>
          </div>
        </dl>
      </div>

      {/* Parent Info */}
      <div className="bg-gray-50 rounded-lg p-5">
        <h4 className="font-bold text-gray-900 mb-3">Primary Contact</h4>
        <dl className="space-y-2 text-sm">
          <div className="flex">
            <dt className="font-medium w-32">Name:</dt>
            <dd className="text-gray-600">
              {formData.parent1FirstName} {formData.parent1LastName}
            </dd>
          </div>
          <div className="flex">
            <dt className="font-medium w-32">Phone:</dt>
            <dd className="text-gray-600">{formData.parent1Phone}</dd>
          </div>
          <div className="flex">
            <dt className="font-medium w-32">Email:</dt>
            <dd className="text-gray-600">{formData.parent1Email}</dd>
          </div>
          <div className="flex">
            <dt className="font-medium w-32">Address:</dt>
            <dd className="text-gray-600">
              {formData.address}, {formData.city}
            </dd>
          </div>
        </dl>
      </div>

      {/* Program Selection */}
      <div className="bg-gray-50 rounded-lg p-5">
        <h4 className="font-bold text-gray-900 mb-3">Program Selection</h4>
        <dl className="space-y-2 text-sm">
          <div className="flex">
            <dt className="font-medium w-32">Areas:</dt>
            <dd className="text-gray-600">
              {formData.areasOfConcern?.length || 0} selected
            </dd>
          </div>
          <div className="flex">
            <dt className="font-medium w-32">Preferred Days:</dt>
            <dd className="text-gray-600">
              {formData.preferredDays?.join(", ")}
            </dd>
          </div>
          <div className="flex">
            <dt className="font-medium w-32">Time:</dt>
            <dd className="text-gray-600">{formData.preferredTime}</dd>
          </div>
          <div className="flex">
            <dt className="font-medium w-32">Start Date:</dt>
            <dd className="text-gray-600">{formData.startDate}</dd>
          </div>
        </dl>
      </div>

      {/* Consent Summary */}
      <div className="bg-[rgba(50,205,50,0.05)] border border-[rgba(50,205,50,0.15)] rounded-lg p-5">
        <h4 className="font-bold text-gray-900 mb-3">Consents</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 bg-[#32cd32] rounded-full flex items-center justify-center text-white text-xs">
              ✓
            </span>
            Photo & Video Consent
          </li>
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 bg-[#32cd32] rounded-full flex items-center justify-center text-white text-xs">
              ✓
            </span>
            Medical Treatment Consent
          </li>
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 bg-[#32cd32] rounded-full flex items-center justify-center text-white text-xs">
              ✓
            </span>
            Financial Agreement
          </li>
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 bg-[#32cd32] rounded-full flex items-center justify-center text-white text-xs">
              ✓
            </span>
            Terms & Conditions
          </li>
        </ul>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Important:</strong> By submitting this enrollment, you confirm
          that all information provided is accurate. You will receive a
          confirmation email with next steps.
        </p>
      </div>
    </div>
  );
};

export default ReviewSubmitStep;
