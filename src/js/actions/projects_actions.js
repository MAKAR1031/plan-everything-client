import {api, baseUrlApi, authHeader} from '../api'
import linkUtils from '../util/link_utils';
import history from '../util/history';

export const load = () => dispatch => {
    baseUrlApi.get('/projects/search/my', authHeader()).then(res => {
        dispatch({
            type: 'PROJECTS_LOADED',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};

export const getAuthor = (project) => dispatch => {
    const url = linkUtils.linkUrl(project._links.author);
    api.get(url, authHeader()).then(res => {
        dispatch({
            type: 'AUTHOR_LOADED',
            project,
            author: res.data
        })
    }).catch(reason => {
        console.log(reason);
    });
};

export const getCurrentMember = (project) => dispatch => {
    const url = linkUtils.linkUrlWithProjection(project._links.currentMember, 'full');
    api.get(url, authHeader()).then(res => {
        dispatch({
            type: 'MEMBER_LOADED',
            project,
            member: res.data
        });
    }).catch(reason => {
        console.log(reason);
    });
};

export const selectProject = (project) => dispatch => {
    dispatch({
        type: 'PROJECT_SELECTED',
        project
    });
    history.push('/project');
};