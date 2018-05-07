import {combineReducers} from 'redux';

import members from './members';
import selected from './selected';
import addMembersDialog from './add_members_dialog';

export default combineReducers({
    members,
    selected,
    addMembersDialog
});