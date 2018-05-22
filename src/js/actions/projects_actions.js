import {api, baseUrlApi, authHeader} from '../api'
import linkUtils from '../util/link_utils';
import history from '../util/history';
import {handleError} from "../util/error_handler";

export const load = () => dispatch => {
    baseUrlApi.get('/projects/search/my', authHeader()).then(res => {
        dispatch({
            type: 'PROJECTS_LOADED',
            data: res.data
        });
    }).catch(handleError);
};

export const getAuthor = (project) => dispatch => {
    const url = linkUtils.linkUrl(project._links.author);
    api.get(url, authHeader()).then(res => {
        dispatch({
            type: 'AUTHOR_LOADED',
            project,
            author: res.data
        })
    }).catch(handleError);
};

export const getCurrentMember = (project) => dispatch => {
    const url = linkUtils.linkUrlWithProjection(project._links.currentMember, 'full');
    api.get(url, authHeader()).then(res => {
        dispatch({
            type: 'MEMBER_LOADED',
            project,
            member: res.data
        });
    }).catch(handleError);
};

export const selectProject = (project) => dispatch => {
    dispatch({
        type: 'PROJECT_SELECTED',
        project
    });
    history.push('/project');
};