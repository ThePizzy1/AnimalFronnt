import axios from 'axios';

//const baseURL = 'http://ec2-44-204-148-98.compute-1.amazonaws.com:5000/api/';
const baseURL = 'https://localhost:5001/api/';
console.log('API_ENDPOINT:', baseURL);

const instance = axios.create({
  baseURL,
});

export default instance;

