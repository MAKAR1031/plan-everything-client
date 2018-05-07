import {baseUrlApi, authHeader} from "../api";
import linkUtils from '../util/link-utils';
import alertify from 'alertify.js';

alertify.logPosition("bottom right");

export const load = (project) => dispatch => {
    const url = linkUtils.linkUrlWithProjection(project._links.members, 'full');
    baseUrlApi.get(url, authHeader()).then(res => {
        dispatch({
            type: 'MEMBERS_LOADED',
            members: res.data
        })
    }).catch(reason => {
        alertify.error('Error while loadings members');
        console.log('Error while loadings members: ', reason.response);
    });
};

export const select = (member) => dispatch => {
    dispatch({
        type: 'MEMBER_SELECTED',
        member
    });
};

export const openAddMembersDialog = () => dispatch => {
    dispatch({
        type: 'ADD_MEMBERS_DIALOG_OPENED'
    });
};

export const closeAddMembersDialog = () => dispatch => {
    dispatch({
        type: 'ADD_MEMBERS_DIALOG_CLOSED'
    });
};