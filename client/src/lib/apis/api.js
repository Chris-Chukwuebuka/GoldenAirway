// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://goldenairwaybackend-2.onrender.com/', // Replace with your backend API base URL
});

export default api;
