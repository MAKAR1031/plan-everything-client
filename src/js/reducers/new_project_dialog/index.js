import {combineReducers} from 'redux'

import isOpened from './is_opened';
import isLoading from './is_loading';
import error from './error';

export default combineReducers({
    isOpened,
    isLoading,
    error
})
