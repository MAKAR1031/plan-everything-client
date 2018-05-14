import {baseUrlApi, authHeader} from "../api";
import linkUtils from '../util/link-utils';
import alertify from 'alertify.js';

export const load = (project) => dispatch => {
    const url = linkUtils.linkUrl(project._links.tags);
    baseUrlApi.get(url, authHeader()).then(res => {
        dispatch({
            type: 'TAGS_LOADED',
            tags: res.data
        })
    }).catch(reason => {
        alertify.error('Error while loadings tags');
        console.log('Error while loadings tags: ', reason.response);
    })
};

export const select = (tag) => dispatch => {
    dispatch({
        type: 'TAG_SELECTED',
        tag
    })
};

export const openNewDialog = () => dispatch => {
    dispatch({
        type: 'TAG_DIALOG_OPENED_IN_NEW_MODE'
    });
};

export const openEditDialog = () => dispatch => {
    dispatch({
        type: 'TAG_DIALOG_OPENED_IN_EDIT_MODE',
    });
};

export const closeDialog = () => dispatch => {
    dispatch({
        type: 'TAG_DIALOG_CLOSED'
    });
};

export const createTag = (project, tag) => dispatch => {
    const data = {
        ...tag,
        project: linkUtils.linkUrl(project._links.self)
    };
    baseUrlApi.post('/tags', data, authHeader()).then(res => {
        alertify.success('Tag created');
        dispatch({
            type: 'TAG_CREATED',
            tag: res.data
        });
        dispatch({
            type: 'TAG_DIALOG_CLOSED'
        });
    }).catch(reason => {
        alertify.error('Error while creating tag');
        console.log('Error while creating tag: ', reason);
    })
};

export const editTag = (project, tag, newTag) => dispatch => {
    const url = linkUtils.linkUrl(tag._links.self);
    const data = {
        ...newTag,
        project: linkUtils.linkUrl(project._links.self)
    };
    baseUrlApi.patch(url, data, authHeader()).then(res => {
        alertify.success('Tag edited');
        dispatch({
            type: 'TAGS_UPDATED',
            tag: res.data
        });
        dispatch({
            type: 'TAG_DIALOG_CLOSED'
        });
    }).catch(reason => {
        alertify.error('Error while edit tag');
        console.log('Error while edit tag: ', reason);
    })
};

export const deleteTag = (tag) => dispatch => {
    const url = linkUtils.linkUrl(tag._links.self);
    baseUrlApi.delete(url, authHeader()).then(() => {
        alertify.success('Tag removed');
        dispatch({
            type: 'TAG_REMOVED',
            tag
        });
        dispatch({
            type: 'TAG_DIALOG_CLOSED'
        });
    }).catch(reason => {
        alertify.error('Error while delete tag');
        console.log('Error while delete tag: ', reason);
    })
};