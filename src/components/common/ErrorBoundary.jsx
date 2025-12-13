import React from "react";
import errorTracker from "@services/errorTracking";
import { AlertTriangle } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    errorTracker.log(error, { errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-[var(--color-danger-alpha)] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-[var(--color-danger)]" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h2>

            <p className="text-gray-600 mb-6">
              Try refreshing the page. If the issue continues, it’s likely on
              our end.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-lg font-semibold text-white
                         bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]
                         transition-all shadow-md hover:shadow-lg"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
