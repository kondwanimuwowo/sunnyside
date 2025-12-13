import apiClient from "./client";

export const createDonation = async (donationData) => {
  try {
    const response = await apiClient.post("/donations", donationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDonations = async (params = {}) => {
  try {
    const response = await apiClient.get("/donations", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDonationById = async (id) => {
  try {
    const response = await apiClient.get(`/donations/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDonationStatus = async (id, status) => {
  try {
    const response = await apiClient.patch(`/donations/${id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDonationStats = async () => {
  try {
    const response = await apiClient.get("/donations/stats");
    return response.data;
  } catch (error) {
    throw error;
  }
};
