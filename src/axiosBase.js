import axios from 'axios';
const API_ENDPOINT ='https://localhost:5001/api/';
const instance = axios.create({
    baseURL: API_ENDPOINT,

});
console.log('API_ENDPOINT', API_ENDPOINT);
export default instance;
  
