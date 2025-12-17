import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET
export const fetchData = async (endpoint: string, params?: object) => {
  const response = await api.get(endpoint, { params });
  return response.data;
};

// POST
export const postData = async (endpoint: string, data: object) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

export default api;
