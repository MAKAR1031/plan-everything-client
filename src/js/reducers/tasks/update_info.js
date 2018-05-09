const initialState = null;

export default function updateInfo(state = initialState, action) {
    switch (action.type) {
        case 'TASK_UPDATE_INFO_LOADED':
            return action.info;
        case 'TASK_SELECTED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}