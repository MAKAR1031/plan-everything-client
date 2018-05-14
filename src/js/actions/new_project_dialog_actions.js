import {baseUrlApi, authHeader} from '../api';
import alertify from 'alertify.js';

export const open = () => dispatch => {
    dispatch({
        type: 'NEW_PROJECT_DIALOG_OPENED'
    });
};

export const close = () => dispatch => {
    dispatch({
        type: 'NEW_PROJECT_DIALOG_CLOSED'
    });
};

export const createProject = (name, description) => dispatch => {
    dispatch({
        type: 'NEW_PROJECT_LOADING_STARTED'
    });
    baseUrlApi.post('/projects', {name, description}, authHeader()).then(res => {
        alertify.success('Project created successfully');
        dispatch({
            type: 'NEW_PROJECT_LOADING_COMPLETE'
        });
        dispatch({
            type: 'NEW_PROJECT_DIALOG_CLOSED'
        });
        dispatch({
            type: 'NEW_PROJECT_CREATED',
            project: res.data
        })
    }).catch(reason => {
        dispatch({
            type: 'NEW_PROJECT_LOADING_COMPLETE'
        });
        dispatch({
            type: 'NEW_PROJECT_CREATE_FAILED',
            error: reason.response.data.message
        })
    })
};
