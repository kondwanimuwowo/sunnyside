import Select from "@components/common/Select";
import { REFERRAL_SOURCES } from "@data/enrollmentOptions";

const ConsentStep = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Consent & Agreements
        </h3>
        <p className="text-gray-600">
          Please review and agree to the following
        </p>
      </div>

      {/* Photo/Video Consent */}
      <div className="border-2 border-gray-200 rounded-lg p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.photoConsent}
            onChange={(e) => updateFormData("photoConsent", e.target.checked)}
            className="w-5 h-5 text-[#32cd32] border-gray-300 rounded focus:ring-[#32cd32] mt-0.5"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900 mb-1">
              Photo & Video Consent <span className="text-red-500">*</span>
            </p>
            <p className="text-sm text-gray-600">
              I give permission for Sunnyside Therapy Center to take photos and
              videos of my child for internal assessment purposes and for
              sharing success stories on social media (faces may be blurred for
              privacy).
            </p>
          </div>
        </label>
        {errors.photoConsent && (
          <p className="mt-2 text-sm text-red-600 ml-8">
            {errors.photoConsent}
          </p>
        )}
      </div>

      {/* Medical Treatment Consent */}
      <div className="border-2 border-gray-200 rounded-lg p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.medicalConsent}
            onChange={(e) => updateFormData("medicalConsent", e.target.checked)}
            className="w-5 h-5 text-[#32cd32] border-gray-300 rounded focus:ring-[#32cd32] mt-0.5"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900 mb-1">
              Medical Treatment Consent <span className="text-red-500">*</span>
            </p>
            <p className="text-sm text-gray-600">
              In case of a medical emergency, I authorize Sunnyside Therapy
              Center staff to seek immediate medical attention for my child. I
              will be contacted as soon as possible.
            </p>
          </div>
        </label>
        {errors.medicalConsent && (
          <p className="mt-2 text-sm text-red-600 ml-8">
            {errors.medicalConsent}
          </p>
        )}
      </div>

      {/* Financial Agreement */}
      <div className="border-2 border-gray-200 rounded-lg p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.financialAgreement}
            onChange={(e) =>
              updateFormData("financialAgreement", e.target.checked)
            }
            className="w-5 h-5 text-[#32cd32] border-gray-300 rounded focus:ring-[#32cd32] mt-0.5"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900 mb-1">
              Financial Agreement <span className="text-red-500">*</span>
            </p>
            <p className="text-sm text-gray-600">
              I understand that fees for services will be discussed during the
              intake meeting. I agree to pay all agreed-upon fees in a timely
              manner.
            </p>
          </div>
        </label>
        {errors.financialAgreement && (
          <p className="mt-2 text-sm text-red-600 ml-8">
            {errors.financialAgreement}
          </p>
        )}
      </div>

      {/* Terms & Conditions */}
      <div className="border-2 border-gray-200 rounded-lg p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.termsAgreed}
            onChange={(e) => updateFormData("termsAgreed", e.target.checked)}
            className="w-5 h-5 text-[#32cd32] border-gray-300 rounded focus:ring-[#32cd32] mt-0.5"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900 mb-1">
              Terms & Conditions <span className="text-red-500">*</span>
            </p>
            <p className="text-sm text-gray-600">
              I have read and agree to Sunnyside Therapy Center's terms and
              conditions, privacy policy, and understand the services being
              provided.
            </p>
          </div>
        </label>
        {errors.termsAgreed && (
          <p className="mt-2 text-sm text-red-600 ml-8">{errors.termsAgreed}</p>
        )}
      </div>

      {/* Referral Source */}
      <div className="pt-6 border-t border-gray-100">
        <Select
          label="How did you hear about us?"
          name="referralSource"
          value={formData.referralSource}
          onChange={updateFormData}
          options={REFERRAL_SOURCES}
          error={errors.referralSource}
          required
        />
      </div>
    </div>
  );
};

export default ConsentStep;
