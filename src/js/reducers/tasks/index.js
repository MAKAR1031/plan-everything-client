import {combineReducers} from 'redux';

import list from './list';
import selected from './selected';
import isEditMode from './is_edit_mode';
import steps from './steps';
import criteria from './criteria';

export default combineReducers({
    list,
    selected,
    isEditMode,
    steps,
    criteria
});