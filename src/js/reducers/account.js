const initialState = null;

export default function account(state = initialState, action) {
    switch (action.type) {
        case 'CURRENT_ACCOUNT_LOADED':
            return action.data;
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}