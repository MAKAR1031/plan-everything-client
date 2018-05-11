const initialState = null;

export default function events(state = initialState, action) {
    switch (action.type) {
        case 'TASK_EVENTS_LOADED':
            return action.events;
        case 'TASK_SELECTED':
        case 'TASK_UPDATED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};