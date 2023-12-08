import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your server's URL

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Register error:', error.response);
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response);
    throw error.response.data;
  }
};
