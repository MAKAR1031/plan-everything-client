import {baseUrlApi, authHeader} from "../api";
import linkUtils from '../util/link-utils';
import history from '../util/history';
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

export const startCreateNewTask = () => dispatch => {
    dispatch({
        type: 'START_CREATE_NEW_TASK'
    });
    history.push('/editTask');
};

export const startEditTask = (task) => dispatch => {
    dispatch({
        type: 'START_EDIT_TASK'
    });
    history.push('/editTask');
    const stepsUrl = linkUtils.linkUrl(task._links.steps);
    const criteriaUrl = linkUtils.linkUrl(task._links.criteria);
    baseUrlApi.get(stepsUrl, authHeader()).then(res => {
        dispatch({
            type: 'TASK_STEPS_LOADED',
            steps: res.data
        });
    });
    baseUrlApi.get(criteriaUrl, authHeader()).then(res => {
        dispatch({
            type: 'TASK_CRITERIA_LOADED',
            criteria: res.data
        });
    });
};

export const saveTask = (task, steps, criteria, removedSteps, removedCriteria) => dispatch => {
    if (task.url) {
        const taskUrl = task.url;
        delete task.url;
        baseUrlApi.patch(taskUrl, task, authHeader()).then(res => {
            steps.forEach(step => {
                if (step.url) {
                    const stepUrl = step.url;
                    delete step.url;
                    baseUrlApi.patch(stepUrl, step, authHeader()).then(() => {
                        alertify.success('Step updated');
                    });
                } else {
                    baseUrlApi.post('/taskSteps', {...step, task: taskUrl}, authHeader()).then(() => {
                        alertify.success('Step created');
                    });
                }
            });
            criteria.forEach(criterion => {
                if (criterion.url) {
                    const criterionUrl = criterion.url;
                    delete criterion.url;
                    baseUrlApi.patch(criterionUrl, criterion, authHeader()).then(() => {
                        alertify.success('Criterion updated');
                    });
                } else  {
                    baseUrlApi.post('/criteria', {...criterion, task: taskUrl}, authHeader()).then(() => {
                        alertify.success('Criterion created');
                    });
                }
            });
            baseUrlApi.get(linkUtils.linkUrlWithProjection(res.data._links.self, 'full'), authHeader()).then(res => {
                alertify.success('Task updated');
                dispatch({
                    type: 'TASK_UPDATED',
                    task: res.data
                })
            });
        }).catch(reason => {
            alertify.error('Error while save task');
            console.log('Error while save task: ', reason);
        });
        removedSteps.forEach(step => {
            const stepUrl = step.url;
            baseUrlApi.delete(stepUrl, authHeader()).then(() => {
                alertify.success('Step removed');
            });
        });
        removedCriteria.forEach(criterion => {
            const criterionUrl = criterion.url;
            baseUrlApi.delete(criterionUrl, authHeader()).then(() => {
                alertify.success('Criterion removed');
            });
        });
    } else {
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
                });
                history.push('/task');
            });
        }).catch(reason => {
            alertify.error('Error while save task');
            console.log('Error while save task: ', reason);
        });
    }
};