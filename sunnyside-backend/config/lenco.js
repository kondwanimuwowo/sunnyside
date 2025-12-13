const axios = require("axios");

const LENCO_BASE_URL =
  process.env.LENCO_API_URL || "https://api.lenco.co/access/v2";
const LENCO_SECRET_KEY = process.env.LENCO_SECRET_KEY;

if (!LENCO_SECRET_KEY) {
  console.error("❌ LENCO_SECRET_KEY is missing in .env file!");
}

const lencoClient = axios.create({
  baseURL: LENCO_BASE_URL,
  headers: {
    Authorization: `Bearer ${LENCO_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request interceptor
lencoClient.interceptors.request.use(
  (config) => {
    console.log(`📤 Lenco ${config.method?.toUpperCase()}: ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
lencoClient.interceptors.response.use(
  (response) => {
    console.log(`✅ Lenco Response: ${response.status}`);
    return response;
  },
  (error) => {
    console.error(
      `❌ Lenco Error: ${error.response?.data?.message || error.message}`
    );
    return Promise.reject(error);
  }
);

module.exports = lencoClient;
