import {combineReducers} from 'redux';

import list from './list';
import selected from './selected';

export default combineReducers({
    list,
    selected
});