const initialState = null;

export default function error(state = initialState, action) {
    switch (action.type) {
        case 'NEW_PROJECT_CREATE_FAILED':
            return action.error;
        case 'NEW_PROJECT_DIALOG_CLOSED':
            return initialState;
        default:
            return state;
    }
};