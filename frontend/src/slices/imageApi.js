import axios from 'axios';
import api  from '../utils/api';


const baseUrl = `${api}/api/images`;

const getToken = () => {
  return localStorage.getItem('token');
};

export const fetchImages = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
export const fetchImageDetail = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  }

export const deleteImage = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const createImage = async (imageData) => {
  const response = await axios.post(baseUrl, imageData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const updateImage = async (imageData) => {
  const response = await axios.put(`${baseUrl}/${imageData._id}`, imageData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};
