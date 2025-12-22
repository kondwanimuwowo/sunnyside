import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Button from "@components/common/Button";
import { ROUTES } from "@utils/constants";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-9xl font-bold text-[#32cd32] mb-4">404</div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            icon={ArrowLeft}
          >
            Go Back
          </Button>
          <Button onClick={() => navigate(ROUTES.HOME)} icon={Home}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
