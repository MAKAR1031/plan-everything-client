const initialState = null;

export default function steps(state = initialState, action) {
    switch (action.type) {
        case 'TASK_STEPS_LOADED':
            return action.steps;
        case 'TASK_SELECTED':
        case 'TASK_UPDATED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}