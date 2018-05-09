import {combineReducers} from 'redux';

import list from './list';
import selected from './selected';
import isEditMode from './is_edit_mode';
import steps from './steps';
import criteria from './criteria';
import updateInfo from './update_info';

export default combineReducers({
    list,
    selected,
    isEditMode,
    steps,
    criteria,
    updateInfo
});