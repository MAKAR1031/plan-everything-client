import {combineReducers} from 'redux'

import isAuthorized from './authorization'
import signUpStatus from './sign_up';
import accountManagement from './manage_accounts';
import account from './account';
import projects from './projects';
import currentProject from './current_project';
import projectAuthors from './project_authors';
import currentProjectMembers from './current_project_members';
import newProjectDialog from './new_project_dialog';

export default combineReducers({
    isAuthorized,
    signUpStatus,
    accountManagement,
    account,
    projects,
    currentProject,
    projectAuthors,
    currentProjectMembers,
    newProjectDialog
});
