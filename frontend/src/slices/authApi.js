import axios from 'axios';
import api from '../utils/api';

const baseUrl = `${api}/api/auth`;

export const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${baseUrl}/register`, userData);
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await axios.get(`${baseUrl}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
