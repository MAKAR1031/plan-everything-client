const initialState = null;

export default function tags(state = initialState, action) {
    switch (action.type) {
        case 'TASK_TAGS_LOADED':
            return action.tags;
        case 'PROJECT_SELECTED':
        case 'TASK_CREATED':
        case 'TASK_SELECTED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};