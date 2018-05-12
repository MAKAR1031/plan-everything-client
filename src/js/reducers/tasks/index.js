import {combineReducers} from 'redux';

import list from './list';
import selected from './selected';
import isEditMode from './is_edit_mode';
import steps from './steps';
import criteria from './criteria';
import updateInfo from './update_info';
import events from './events';
import tags from './tags';
import assignDialog from './assign_dialog';
import reportDialog from './step_report_dialog';
import estimateDialog from './estimate_dialog';
import editTagsDialog from './edit_tags_dialog';

export default combineReducers({
    list,
    selected,
    isEditMode,
    steps,
    criteria,
    updateInfo,
    events,
    tags,
    assignDialog,
    reportDialog,
    estimateDialog,
    editTagsDialog
});