import {api, baseUrlApi, authHeader} from '../api'

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
    api.get(project._links.author.href, authHeader()).then(res => {
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
    api.get(project._links.currentMember.href.replace(/{\?.+}/g, '') + '?projection=full', authHeader()).then(res => {
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
    })
};