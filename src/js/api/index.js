import axios from 'axios';
import apiConfig from './config';

export const baseUrlApi = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const api = axios.create({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const authHeader = (other) => {
    return {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        ...other
    }
};