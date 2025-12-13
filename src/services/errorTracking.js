class ErrorTracker {
  constructor() {
    this.errors = [];
    this.maxErrors = 100;
  }

  log(error, context = {}) {
    const errorLog = {
      message: error.message || "Unknown error",
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context,
    };

    this.errors.push(errorLog);

    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error("Error tracked:", errorLog);
    }

    // In production, you would send this to a service like Sentry
    // this.sendToService(errorLog);
  }

  getErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
  }

  async sendToService(errorLog) {
    // Implement sending to error tracking service (Sentry, LogRocket, etc.)
    // Example:
    // await fetch('https://your-error-service.com/log', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorLog),
    // });
  }
}

export default new ErrorTracker();
