import {combineReducers} from 'redux';

import members from './members';
import selected from './selected';

export default combineReducers({
    members,
    selected
});