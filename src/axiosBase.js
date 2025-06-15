import axios from 'axios';

//const baseURL = 'http://localhost:5000/api/';
const baseURL = 'https://localhost:5001/api/';
console.log('API_ENDPOINT:', baseURL);

const instance = axios.create({
  baseURL,
});

export default instance;

