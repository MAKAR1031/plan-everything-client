import {combineReducers} from 'redux';

import isOpen from './is_open';
import step from './step';

export default combineReducers({
    isOpen,
    step
});