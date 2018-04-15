import qs from 'querystring';
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
    loginApi.post('/oauth/token', data).then(res => {
        dispatch({
            type: 'AUTHORIZATION_SUCCESS',
            token: res.data.access_token
        })
    }).catch(reason => {
        console.log(reason);
    })
};