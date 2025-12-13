import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  Users,
  BookOpen,
  Heart,
  FileText,
  CheckCircle,
} from "lucide-react";
import ChildInfoStep from "./ChildInfoStep";
import ParentInfoStep from "./ParentInfoStep";
import ProgramSelectionStep from "./ProgramSelectionStep";
import MedicalInfoStep from "./MedicalInfoStep";
import ConsentStep from "./ConsentStep";
import ReviewSubmitStep from "./ReviewSubmitStep";
import EnrollmentSuccess from "./EnrollmentSuccess";
import Button from "@components/common/Button";

const STORAGE_KEY = "sunnyside_enrollment_progress";

const EnrollmentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Child Info
    childFirstName: "",
    childLastName: "",
    childDOB: "",
    childGender: "",
    diagnosis: "",
    diagnosisOther: "",
    currentChallenges: "",
    previousTherapy: "",

    // Parent Info
    parent1FirstName: "",
    parent1LastName: "",
    parent1Phone: "",
    parent1Email: "",
    parent1Relationship: "",
    parent2FirstName: "",
    parent2LastName: "",
    parent2Phone: "",
    parent2Email: "",
    parent2Relationship: "",
    address: "",
    city: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",

    // Program Selection
    areasOfConcern: [],
    preferredDays: [],
    preferredTime: "",
    startDate: "",
    additionalNotes: "",

    // Medical Info
    medications: "",
    allergies: "",
    medicalConditions: "",
    doctorName: "",
    doctorPhone: "",
    previousAssessments: "",

    // Consent
    photoConsent: false,
    medicalConsent: false,
    financialAgreement: false,
    termsAgreed: false,
    referralSource: "",

    // Submission
    submitted: false,
    referenceNumber: "",
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, label: "Child Info", Icon: User, component: ChildInfoStep },
    { number: 2, label: "Parent Info", Icon: Users, component: ParentInfoStep },
    {
      number: 3,
      label: "Program",
      Icon: BookOpen,
      component: ProgramSelectionStep,
    },
    { number: 4, label: "Medical", Icon: Heart, component: MedicalInfoStep },
    { number: 5, label: "Consent", Icon: FileText, component: ConsentStep },
    {
      number: 6,
      label: "Review",
      Icon: CheckCircle,
      component: ReviewSubmitStep,
    },
  ];

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to load saved progress");
      }
    }
  }, []);

  // Auto-save progress
  useEffect(() => {
    if (currentStep > 1 && !formData.submitted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, currentStep]);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.childFirstName)
        newErrors.childFirstName = "First name is required";
      if (!formData.childLastName)
        newErrors.childLastName = "Last name is required";
      if (!formData.childDOB) newErrors.childDOB = "Date of birth is required";
      if (!formData.childGender) newErrors.childGender = "Gender is required";
      if (!formData.diagnosis)
        newErrors.diagnosis = "Please select a diagnosis";
      if (!formData.currentChallenges)
        newErrors.currentChallenges = "Please describe current challenges";
    }

    if (step === 2) {
      if (!formData.parent1FirstName)
        newErrors.parent1FirstName = "First name is required";
      if (!formData.parent1LastName)
        newErrors.parent1LastName = "Last name is required";
      if (!formData.parent1Phone) newErrors.parent1Phone = "Phone is required";
      if (!formData.parent1Email) newErrors.parent1Email = "Email is required";
      if (!formData.parent1Relationship)
        newErrors.parent1Relationship = "Relationship is required";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.emergencyContactName)
        newErrors.emergencyContactName = "Emergency contact name is required";
      if (!formData.emergencyContactPhone)
        newErrors.emergencyContactPhone = "Emergency contact phone is required";
    }

    if (step === 3) {
      if (formData.areasOfConcern.length === 0)
        newErrors.areasOfConcern = "Select at least one area of concern";
      if (formData.preferredDays.length === 0)
        newErrors.preferredDays = "Select at least one preferred day";
      if (!formData.preferredTime)
        newErrors.preferredTime = "Select a time preference";
      if (!formData.startDate) newErrors.startDate = "Select a start date";
    }

    if (step === 5) {
      if (!formData.photoConsent)
        newErrors.photoConsent = "Photo consent is required";
      if (!formData.medicalConsent)
        newErrors.medicalConsent = "Medical consent is required";
      if (!formData.financialAgreement)
        newErrors.financialAgreement = "Financial agreement is required";
      if (!formData.termsAgreed)
        newErrors.termsAgreed = "You must agree to terms";
      if (!formData.referralSource)
        newErrors.referralSource = "Please tell us how you heard about us";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

      const response = await fetch(`${API_URL}/enrollment/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          submitted: true,
          referenceNumber: data.referenceNumber,
        }));
        localStorage.removeItem(STORAGE_KEY); // Clear saved progress
      } else {
        throw new Error(data.message || "Enrollment failed");
      }
    } catch (error) {
      alert(
        "Enrollment submission failed. Please try again or contact us directly."
      );
      console.error("Enrollment error:", error);
    }
  };

  if (formData.submitted) {
    return <EnrollmentSuccess referenceNumber={formData.referenceNumber} />;
  }

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Progress Header */}
      <div className="bg-white border-b border-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, idx) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ scale: currentStep >= step.number ? 1 : 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentStep > step.number
                        ? "bg-[#32cd32] text-white"
                        : currentStep === step.number
                        ? "bg-[#32cd32] text-white shadow-sm"
                        : "bg-gray-100 text-gray-400 border border-gray-200"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.Icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <span
                    className={`text-xs mt-2 font-medium hidden sm:block transition-colors ${
                      currentStep >= step.number
                        ? "text-[#32cd32]"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      animate={{
                        width: currentStep > step.number ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-[#32cd32]"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Step {currentStep} of {steps.length}:{" "}
              {steps[currentStep - 1].label}
            </h2>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <CurrentStepComponent
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-gray-100">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                icon={ArrowLeft}
                className="flex-1"
              >
                Back
              </Button>
            )}

            {currentStep < steps.length ? (
              <Button
                onClick={handleNext}
                icon={ArrowRight}
                iconPosition="right"
                className="flex-1"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                icon={CheckCircle}
                iconPosition="right"
                className="flex-1"
              >
                Submit Enrollment
              </Button>
            )}
          </div>

          {/* Auto-save indicator */}
          <p className="text-xs text-center text-gray-500 mt-4">
            💾 Your progress is automatically saved
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;
