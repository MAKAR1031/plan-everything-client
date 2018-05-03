import {combineReducers} from 'redux'

import isAuthorized from './authorization'
import account from './account';
import projects from './projects';
import projectAuthors from './project-authors';
import currentProjectMembers from './current-project-members';
import newProjectDialog from './new-project-dialog';

export default combineReducers({
    isAuthorized,
    account,
    projects,
    projectAuthors,
    currentProjectMembers,
    newProjectDialog
});
