// src/apis/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://goldenairwaybackend-2.onrender.com/api', // Adjust the base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
