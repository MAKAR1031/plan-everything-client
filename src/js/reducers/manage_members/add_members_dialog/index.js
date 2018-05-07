import {combineReducers} from 'redux';

import isOpen from './is_open';
import accounts from './accounts';

export default combineReducers({
    isOpen,
    accounts
});