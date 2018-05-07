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

export const loadNonProjectAccounts = (project) => dispatch => {
    const url = '/accounts/search/nonInProject?project=' + linkUtils.linkUrl(project._links.self);
    baseUrlApi.get(url, authHeader()).then(res => {
        dispatch({
            type: 'ACCOUNTS_TO_ADD_MEMBERS_LOADED',
            accounts: res.data
        });
    }).catch(reason => {
        alertify.error('Error while loadings accounts to add members');
        console.log('Error while loadings accounts to add members: ', reason.response);
    });
};