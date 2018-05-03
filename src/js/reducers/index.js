import {combineReducers} from 'redux'

import isAuthorized from './authorization'
import signUpStatus from './sign_up';
import account from './account';
import projects from './projects';
import projectAuthors from './project-authors';
import currentProjectMembers from './current-project-members';
import newProjectDialog from './new-project-dialog';

export default combineReducers({
    isAuthorized,
    signUpStatus,
    account,
    projects,
    projectAuthors,
    currentProjectMembers,
    newProjectDialog
});
