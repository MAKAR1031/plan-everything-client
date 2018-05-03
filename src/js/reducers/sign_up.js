const initialState = null;

export default function signUpStatus(state = initialState, action) {
    switch (action.type) {
        case 'SIGN_UP_SUCCESSFUL':
            return true;
        case 'SIGN_UP_FAILED':
            return false;
        case 'SIGN_UP_STATUS_RESET':
            return initialState;
        default:
            return state;
    }
}