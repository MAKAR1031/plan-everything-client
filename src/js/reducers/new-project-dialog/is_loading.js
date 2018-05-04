const initialState = false;

export default function isLoading(state = initialState, action) {
    switch (action.type) {
        case 'NEW_PROJECT_LOADING_STARTED':
            return true;
        case 'NEW_PROJECT_LOADING_COMPLETE':
            return false;
        default:
            return state;
    }
};