import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/auth"; // Update if hosted

// Login API request
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data; // Expected: { token, user }
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
