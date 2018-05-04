const initialState = null;

export default function authError(state = initialState, action) {
    switch (action.type) {
        case 'AUTHORIZATION_FAILED':
            return action.error;
        case 'AUTHORIZATION_SUCCESS':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};