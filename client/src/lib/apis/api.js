

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://goldenairwaybackend-2.onrender.com/api', // Replace with your backend API base URL
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if needed
  },
});

export default api;
