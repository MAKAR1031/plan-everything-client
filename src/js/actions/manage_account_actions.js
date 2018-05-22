import {baseUrlApi, authHeader} from '../api/index';
import linkUtils from '../util/link_utils';
import alertify from 'alertify.js';
import {handleError} from "../util/error_handler";

export const loadAccounts = () => dispatch => {
    baseUrlApi.get('/accounts?projection=withRole', authHeader()).then(res => {
        dispatch({
            type: 'ACCOUNTS_LOADED',
            accounts: res.data
        })
    }).catch(handleError);
};

export const loadRoles = () => dispatch => {
    baseUrlApi.get('/accountRoles', authHeader()).then(res => {
        dispatch({
            type: 'ACCOUNT_ROLES_LOADED',
            roles: res.data
        });
    }).catch(handleError);
};

export const select = (account) => dispatch => {
    dispatch({
        type: 'ACCOUNT_SELECTED',
        account
    })
};

export const lock = (account) => dispatch => {
    const url = linkUtils.linkUrlWithProjection(account._links.lock, 'withRole');
    baseUrlApi.post(url, {}, authHeader()).then(res => {
        alertify.success(`Account ${account.login} locked`);
        dispatch({
            type: 'ACCOUNT_UPDATED',
            account: res.data
        });
    }).catch(handleError);
};

export const unlock = (account) => dispatch => {
    const url = linkUtils.linkUrlWithProjection(account._links.unlock, 'withRole');
    baseUrlApi.post(url, {}, authHeader()).then(res => {
        alertify.success(`Account ${account.login} unlocked`);
        dispatch({
            type: 'ACCOUNT_UPDATED',
            account: res.data
        });
    }).catch(handleError);
};

export const openChangeRoleDialog = () => dispatch => {
    dispatch({
        type: 'ACCOUNT_CHANGE_ROLE_DIALOG_OPENED'
    });
};

export const closeChangeRoleDialog = () => dispatch => {
    dispatch({
        type: 'ACCOUNT_CHANGE_ROLE_DIALOG_CLOSED'
    });
};

export const changeRole = (account, role) => dispatch => {
    const url = linkUtils.linkUrl(account._links.self);
    baseUrlApi.patch(url, {role}, authHeader()).then(res => {
        const selfUrl = linkUtils.linkUrlWithProjection(res.data._links.self, 'withRole');
        baseUrlApi.get(selfUrl, authHeader()).then(res => {
            alertify.success(`Role changed to: ${res.data.role.name}`);
            dispatch({
                type: 'ACCOUNT_UPDATED',
                account: res.data
            });
            dispatch({
                type: 'ACCOUNT_CHANGE_ROLE_DIALOG_CLOSED'
            });
        })
    }).catch(handleError);
};