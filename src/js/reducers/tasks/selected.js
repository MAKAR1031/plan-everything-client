const initialState = null;

export default function selected(state = initialState, action) {
    switch (action.type) {
        case 'TASK_SELECTED':
        case 'TASK_CREATED':
            return action.task;
        case 'PROJECT_SELECTED':
        case 'START_CREATE_NEW_TASK':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};