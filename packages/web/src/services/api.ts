import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:7520',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

