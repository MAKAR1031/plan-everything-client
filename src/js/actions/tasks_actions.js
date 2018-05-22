import {authHeader, baseUrlApi} from "../api";
import linkUtils from '../util/link_utils';
import history from '../util/history';
import alertify from "alertify.js";
import {handleError} from "../util/error_handler";

export const loadTasks = (project) => dispatch => {
    const url = linkUtils.linkUrlWithProjection(project._links.tasks, 'full');
    baseUrlApi.get(url, authHeader()).then(res => {
        dispatch({
            type: 'TASKS_LOADED',
            tasks: res.data
        });
    }).catch(handleError);
};

export const select = (task) => dispatch => {
    dispatch({
        type: 'TASK_SELECTED',
        task
    });
};

export const open = () => () => {
    history.push('/task');
};

export const loadUpdateInfo = (task) => dispatch => {
    const updateInfoUrl = linkUtils.linkUrl(task._links.updateInfo);
    baseUrlApi.get(updateInfoUrl, authHeader()).then(res => {
        dispatch({
            type: 'TASK_UPDATE_INFO_LOADED',
            info: res.data
        })
    }).catch(handleError);
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
    loadSteps(task)(dispatch);
    loadCriteria(task)(dispatch);
};

export const loadSteps = (task) => dispatch => {
    const url = linkUtils.linkUrl(task._links.steps);
    baseUrlApi.get(url, authHeader()).then(res => {
        dispatch({
            type: 'TASK_STEPS_LOADED',
            steps: res.data
        });
    }).catch(handleError);
};

export const loadCriteria = (task) => dispatch => {
    const url = linkUtils.linkUrl(task._links.criteria);
    baseUrlApi.get(url, authHeader()).then(res => {
        dispatch({
            type: 'TASK_CRITERIA_LOADED',
            criteria: res.data
        });
    }).catch(handleError);
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
                } else {
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
                });
                history.push('/task');
            });
        }).catch(handleError);
        removedSteps.forEach(step => {
            const stepUrl = step.url;
            baseUrlApi.delete(stepUrl, authHeader()).then(() => {
                alertify.success('Step removed');
            }).catch(handleError);
        });
        removedCriteria.forEach(criterion => {
            const criterionUrl = criterion.url;
            baseUrlApi.delete(criterionUrl, authHeader()).then(() => {
                alertify.success('Criterion removed');
            }).catch(handleError);
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
        }).catch(handleError);
    }
};

export const deleteTask = (task) => dispatch => {
    const url = linkUtils.linkUrl(task._links.delete);
    baseUrlApi.delete(url, authHeader()).then(() => {
        dispatch({
            type: 'TASK_DELETED',
            task
        });
        alertify.success('Task deleted');
        history.push('/project');
    }).catch(handleError);
};

export const openAssignDialog = () => dispatch => {
    dispatch({
        type: 'ASSIGN_TASK_DIALOG_OPENED'
    });
};

export const closeAssignDialog = () => dispatch => {
    dispatch({
        type: 'ASSIGN_TASK_DIALOG_CLOSED'
    });
};

export const assign = (task, memberId) => dispatch => {
    const url = linkUtils.linkUrlWithProjection(task._links.assign, 'full');
    baseUrlApi.put(url, memberId, authHeader()).then(res => {
        dispatch({
            type: 'TASK_UPDATED',
            task: res.data
        });
        alertify.success('Task assigned');
    }).catch(handleError);
};

export const start = (task) => dispatch => {
    const url = linkUtils.linkUrlWithProjection(task._links.start, 'full');
    baseUrlApi.put(url, {}, authHeader()).then(res => {
        dispatch({
            type: 'TASK_UPDATED',
            task: res.data
        });
        alertify.success('Task started');
    }).catch(handleError);
};

export const completeStep = (step, report) => dispatch => {
    const url = linkUtils.linkUrl(step._links.complete);
    const data = report ? JSON.stringify(report) : '';
    baseUrlApi.put(url, data, authHeader()).then(res => {
        const taskUrl = linkUtils.linkUrlWithProjection(res.data._links.task, 'full');
        baseUrlApi.get(taskUrl, authHeader()).then(res => {
            dispatch({
                type: 'TASK_UPDATED',
                task: res.data
            });
            alertify.success(`Step ${step.name} completed`);
        });
    }).catch(handleError);
};

export const openReportDialog = (step) => dispatch => {
    dispatch({
        type: 'TASK_STEP_REPORT_DIALOG_OPENED',
        step
    });
};

export const closeReportDialog = () => dispatch => {
    dispatch({
        type: 'TASK_STEP_REPORT_DIALOG_CLOSED'
    });
};

export const openEstimateDialog = () => dispatch => {
    dispatch({
        type: 'TASK_ESTIMATE_DIALOG_OPENED'
    });
};

export const closeEstimateDialog = () => dispatch => {
    dispatch({
        type: 'TASK_ESTIMATE_DIALOG_CLOSED'
    });
};

export const estimateTask = (task, criteria) => dispatch => {
    let counter = 0;
    criteria.forEach(c => {
        const url = linkUtils.linkUrl(c._links.self);
        const data = {
            actualValue: c.actualValue.value
        };
        baseUrlApi.patch(url, data, authHeader()).then(() => {
            counter++;
            if (counter === criteria.length) {
                const estimateUrl = linkUtils.linkUrlWithProjection(task._links.estimate, 'full');
                baseUrlApi.put(estimateUrl, {}, authHeader()).then(res => {
                    dispatch({
                        type: 'TASK_UPDATED',
                        task: res.data
                    });
                    dispatch({
                        type: 'TASK_ESTIMATE_DIALOG_CLOSED'
                    });
                });
            }
        }).catch(handleError);
    });
};

export const loadEvents = (task) => dispatch => {
    const url = linkUtils.linkUrlWithProjection(task._links.events, 'withFullName');
    baseUrlApi.get(url, authHeader()).then(res => {
        dispatch({
            type: 'TASK_EVENTS_LOADED',
            events: res.data
        });
    }).catch(handleError);
};

export const openEditTagsDialog = () => dispatch => {
    dispatch({
        type: 'TASK_EDIT_TAGS_DIALOG_OPENED',
    });
};

export const closeEditTagsDialog = () => dispatch => {
    dispatch({
        type: 'TASK_EDIT_TAGS_DIALOG_CLOSED'
    });
};

export const loadTags = (task) => dispatch => {
    const url = linkUtils.linkUrl(task._links.tags);
    baseUrlApi.get(url, authHeader()).then(res => {
        dispatch({
            type: 'TASK_TAGS_LOADED',
            tags: res.data
        });
    }).catch(handleError);
};

export const updateTags = (task, tags) => dispatch => {
    const url = linkUtils.linkUrl(task._links.self);
    const data = {
        tags: tags.map(t => linkUtils.linkUrl(t._links.self))
    };
    baseUrlApi.patch(url, data, authHeader()).then(() => {
        const taskUrl = linkUtils.linkUrlWithProjection(task._links.self, 'full');
        baseUrlApi.get(taskUrl, authHeader()).then(res => {
            dispatch({
                type: 'TASK_UPDATED',
                task: res.data
            });
            dispatch({
                type: 'TASK_EDIT_TAGS_DIALOG_CLOSED'
            });
            alertify.success('Tags updated');
        });
    }).catch(handleError);
};