import {combineReducers} from 'redux';

import selectedAccount from './selected_account';
import accounts from './accounts';
import roles from './roles';

export default combineReducers({
    selectedAccount,
    accounts,
    roles
});