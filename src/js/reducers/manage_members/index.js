import {combineReducers} from 'redux';

import members from './members';
import selected from './selected';
import roles from './roles';
import addMembersDialog from './add_members_dialog';
import changeMemberRoleDialog from './change_member_role_dialog';

export default combineReducers({
    members,
    selected,
    roles,
    addMembersDialog,
    changeMemberRoleDialog
});