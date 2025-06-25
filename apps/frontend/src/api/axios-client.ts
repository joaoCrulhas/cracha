import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
