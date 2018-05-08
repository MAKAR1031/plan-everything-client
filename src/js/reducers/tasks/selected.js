const initialState = null;

export default function selected(state = initialState, action) {
    switch (action.type) {
        case 'TASK_SELECTED':
            return action.task;
        case 'PROJECT_SELECTED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};