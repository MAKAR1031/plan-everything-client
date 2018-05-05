import {combineReducers} from 'redux';

import isOpen from './is_open';
import isEditMode from './edit_mode';

export default combineReducers({
    isOpen,
    isEditMode
});