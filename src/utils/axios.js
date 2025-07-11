// src/utils/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Or your deployed server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
