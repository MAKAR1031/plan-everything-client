const initialState = null;

export default function projectProgress(state = initialState, action) {
    switch (action.type) {
        case 'PROJECT_PROGRESS_LOADED':
            return action.progress;
        case 'PROJECT_SELECTED':
        case 'TASK_CREATED':
        case 'TASK_UPDATED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
