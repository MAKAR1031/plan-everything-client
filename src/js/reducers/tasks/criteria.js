const initialState = null;

export default function criteria(state = initialState, action) {
    switch (action.type) {
        case 'TASK_CRITERIA_LOADED':
            return action.criteria;
        case 'TASK_SELECTED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}