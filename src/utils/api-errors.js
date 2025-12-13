export class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
  }
}

export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return new APIError(data.message || "Invalid request", status, data);
      case 401:
        return new APIError("Unauthorized access", status, data);
      case 403:
        return new APIError("Access forbidden", status, data);
      case 404:
        return new APIError("Resource not found", status, data);
      case 422:
        return new APIError(data.message || "Validation error", status, data);
      case 500:
        return new APIError(
          "Server error. Please try again later",
          status,
          data
        );
      default:
        return new APIError(data.message || "An error occurred", status, data);
    }
  } else if (error.request) {
    // Request made but no response
    return new APIError(
      "No response from server. Check your connection",
      0,
      null
    );
  } else {
    // Error in request setup
    return new APIError(error.message || "Request failed", 0, null);
  }
};

export const isNetworkError = (error) => {
  return !error.response && error.request;
};

export const isServerError = (error) => {
  return error.response && error.response.status >= 500;
};

export const isClientError = (error) => {
  return (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  );
};
