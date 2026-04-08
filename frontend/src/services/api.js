import axios from 'axios';
import { Platform } from 'react-native';

// Use environment variable if provided
// Use exact local IP address so physical devices on the same Wi-Fi can connect
const LOCAL_HOST = '10.0.70.92';
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || `http://${LOCAL_HOST}:5000`;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const loginUser = async (email, password) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

export const getBusinessProfile = async () => {
  const response = await apiClient.get('/business');
  return response.data;
};

export const getInsights = async () => {
  const response = await apiClient.get('/insights');
  return response.data;
};

export const getReviews = async () => {
  const response = await apiClient.get('/reviews');
  return response.data;
};

export default apiClient;
