import {combineReducers} from 'redux';

import selectedAccount from './selected_account';
import accounts from './accounts';
import roles from './roles';
import changeRoleDialog from './change_account_role_dialog';

export default combineReducers({
    selectedAccount,
    accounts,
    roles,
    changeRoleDialog
});