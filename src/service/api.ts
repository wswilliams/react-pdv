import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3355/api/generec',
});

export default api;
