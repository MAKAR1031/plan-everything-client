import {baseUrlApi, authHeader} from "../api";
import linkUtils from '../util/link-utils';
import alertify from "alertify.js";

alertify.logPosition("bottom right");

export const loadTasks = (project) => dispatch => {
    const url = linkUtils.linkUrlWithProjection(project._links.tasks, 'full');
    baseUrlApi.get(url, authHeader()).then(res => {
        dispatch({
            type: 'TASKS_LOADED',
            tasks: res.data
        });
    }).catch(reason => {
        alertify.error('Error while loading tasks');
        console.log('Error while loading tasks: ', reason);
    })
};

export const select = (task) => dispatch => {
    dispatch({
        type: 'TASK_SELECTED',
        task
    })
};