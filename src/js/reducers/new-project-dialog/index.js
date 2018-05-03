import {combineReducers} from 'redux'

import isOpened from './is_opened';
import error from './error';

export default combineReducers({
    isOpened,
    error
})
