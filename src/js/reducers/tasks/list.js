const initialState = null;

export default function tasks(state = initialState, action) {
    switch (action.type) {
        case 'TASKS_LOADED':
            return action.tasks;
        case 'PROJECT_SELECTED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}