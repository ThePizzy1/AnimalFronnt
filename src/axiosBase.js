import axios from 'axios';

const baseURL = process.env.VUE_APP_API_ENDPOINT || 'http://localhost:5000/api/';

console.log('API_ENDPOINT:', baseURL);

const instance = axios.create({
  baseURL,
});

export default instance;

