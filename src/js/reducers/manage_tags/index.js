import {combineReducers} from 'redux';

import tags from './tags';
import selected from './selected_tag';
import dialog from './dialog';

export default combineReducers({
    tags,
    selected,
    dialog
});