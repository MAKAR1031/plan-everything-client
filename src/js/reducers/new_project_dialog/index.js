import {combineReducers} from 'redux'

import isOpen from './is_open';
import isLoading from './is_loading';
import error from './error';

export default combineReducers({
    isOpen,
    isLoading,
    error
})
