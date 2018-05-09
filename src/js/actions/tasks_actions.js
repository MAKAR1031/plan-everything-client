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

export const createTask = (task, steps, criteria) => dispatch => {
    baseUrlApi.post('/tasks', task, authHeader()).then(res => {
        const taskUrl = linkUtils.linkUrl(res.data._links.self);
        steps.forEach(step => {
            baseUrlApi.post('/taskSteps', {...step, task: taskUrl}, authHeader()).then(() => {
                alertify.success('Step created');
            });
        });
        criteria.forEach(criterion => {
            baseUrlApi.post('/criteria', {...criterion, task: taskUrl}, authHeader()).then(() => {
                alertify.success('Criterion created');
            });
        });
        baseUrlApi.get(linkUtils.linkUrlWithProjection(res.data._links.self, 'full'), authHeader()).then(res => {
            alertify.success('Task created');
            dispatch({
                type: 'TASK_CREATED',
                task: res.data
            })
        });
    }).catch(reason => {
        alertify.error('Error while createTask task');
        console.log('Error while createTask task: ', reason);
    });
};