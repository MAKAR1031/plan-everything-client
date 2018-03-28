import api from '../api'

export const load = () => dispatch => {
    api.get('/projects').then(res => {
        dispatch({
            type: 'PROJECTS_LOADED',
            data: res.data
        });
    }).catch(reason => {
        console.log(reason);
    })
};
