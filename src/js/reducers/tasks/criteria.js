const initialState = null;

export default function criteria(state = initialState, action) {
    switch (action.type) {
        case 'TASK_CRITERIA_LOADED':
            return action.criteria;
        case 'TASK_SELECTED':
        case 'TASK_CREATED':
        case 'TASK_UPDATED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}