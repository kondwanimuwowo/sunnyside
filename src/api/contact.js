import apiClient from "./client";

export const submitContactForm = async (formData) => {
  try {
    const response = await apiClient.post("/contact", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const subscribeToNewsletter = async (email) => {
  try {
    const response = await apiClient.post("/newsletter/subscribe", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getContactInfo = async () => {
  try {
    const response = await apiClient.get("/contact/info");
    return response.data;
  } catch (error) {
    throw error;
  }
};
