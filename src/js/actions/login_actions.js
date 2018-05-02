import qs from 'querystring';
import {baseUrlApi, authHeader} from '../api';
import apiConfig from '../api/config';
import axios from "axios";

const loginApi = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
        username: apiConfig.client.id,
        password: apiConfig.client.secret
    }
});

export const login = (username, password) => dispatch => {
    const data = qs.stringify({username, password, grant_type: 'password'});
    loginApi.post('/oauth/token', data, authHeader()).then(res => {
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        dispatch({
            type: 'AUTHORIZATION_SUCCESS'
        });
        baseUrlApi.get('/accounts/me', authHeader()).then(res => {
            dispatch({
                type: 'CURRENT_ACCOUNT_LOADED',
                data: res.data
            })
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    dispatch({
        type: 'LOGOUT'
    })
};

export const loadAccount = () => dispatch => {
    baseUrlApi.get('/accounts/me', authHeader()).then(res => {
        dispatch({
            type: 'CURRENT_ACCOUNT_LOADED',
            data: res.data
        })
    });
};