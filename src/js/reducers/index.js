import {combineReducers} from 'redux'

import projects from './projects'
import token from './authorization'

export default combineReducers({
    projects,
    token
})
