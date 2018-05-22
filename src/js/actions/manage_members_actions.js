import {baseUrlApi, authHeader} from "../api";
import linkUtils from '../util/link_utils';
import {handleError} from "../util/error_handler";
import alertify from 'alertify.js';

export const load = (project) => dispatch => {
    const url = linkUtils.linkUrlWithProjection(project._links.members, 'full');
    baseUrlApi.get(url, authHeader()).then(res => {
        dispatch({
            type: 'MEMBERS_LOADED',
            members: res.data
        })
    }).catch(handleError);
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
    }).catch(handleError);
};

export const addAccountToProject = (project, accountUrl) => dispatch => {
    const data = {
        project: linkUtils.linkUrl(project._links.self),
        account: accountUrl
    };
    baseUrlApi.post('/members', data, authHeader()).then(res => {
        const newMemberUrl = linkUtils.linkUrlWithProjection(res.data._links.self, 'full');
        baseUrlApi.get(newMemberUrl, authHeader()).then(res => {
            const member = res.data;
            alertify.success(`${member.account.fullName} added to project members`);
            dispatch({
                type: 'MEMBER_ADDED',
                member
            })
        });
    }).catch(handleError);
};

export const exclude = (member) => dispatch => {
    const url = linkUtils.linkUrl(member._links.exclude);
    baseUrlApi.delete(url, authHeader()).then(() => {
        alertify.success('Member excluded');
        dispatch({
            type: 'MEMBER_EXCLUDED',
            member
        })
    }).catch(handleError);
};

export const openChangeRoleDialog = () => dispatch => {
    dispatch({
        type: 'CHANGE_MEMBER_ROLE_DIALOG_OPENED'
    });
};

export const closeChangeRoleDialog = () => dispatch => {
    dispatch({
        type: 'CHANGE_MEMBER_ROLE_DIALOG_CLOSED'
    });
};

export const loadRoles = () => dispatch => {
    baseUrlApi.get('/memberRoles', authHeader()).then(res => {
        dispatch({
            type: 'MEMBER_ROLES_LOADED',
            roles: res.data
        })
    }).catch(handleError);
};

export const changeRole = (member, role) => dispatch => {
    const url = linkUtils.linkUrl(member._links.changeRole);
    baseUrlApi.patch(url, {role}, authHeader()).then(res => {
        const selfUrl = linkUtils.linkUrlWithProjection(res.data._links.self, 'full');
        baseUrlApi.get(selfUrl, authHeader()).then(res => {
            alertify.success(`Role changed to: ${res.data.role.name}`);
            dispatch({
                type: 'MEMBER_UPDATED',
                member: res.data
            });
            dispatch({
                type: 'CHANGE_MEMBER_ROLE_DIALOG_CLOSED'
            });
        })
    }).catch(handleError);
};