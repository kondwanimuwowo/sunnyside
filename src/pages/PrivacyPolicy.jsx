import React from "react";
import SEO from "@components/common/SEO";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Sunnyside Therapy Center privacy policy"
      />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-lg">
            <p className="text-gray-600">Last updated: December 2024</p>
            <p>
              Your privacy is important to us. This policy outlines how we
              collect, use, and protect your information.
            </p>
            {/* Add full privacy policy content here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
