import axios from 'axios';

import environment from './env';

const api = axios.create({
  baseURL: environment.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
});

export default api;
