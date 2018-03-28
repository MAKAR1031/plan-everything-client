import axios from 'axios';
import apiConfig from './config';

const api = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;
