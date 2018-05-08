import {combineReducers} from 'redux'

import isAuthorized from './authorization'
import authError from './auth_error'
import signUpStatus from './sign_up';
import accountManagement from './manage_accounts';
import account from './account';
import projects from './projects';
import currentProject from './current_project';
import tasks from './tasks';
import projectAuthors from './project_authors';
import currentProjectMembers from './current_project_members';
import newProjectDialog from './new_project_dialog';
import tagsManagement from './manage_tags';
import membersManagement from './manage_members';

export default combineReducers({
    isAuthorized,
    authError,
    signUpStatus,
    accountManagement,
    account,
    projects,
    currentProject,
    tasks,
    projectAuthors,
    currentProjectMembers,
    newProjectDialog,
    tagsManagement,
    membersManagement
});
