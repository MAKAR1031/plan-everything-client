const initialState = null;

export default function selectedAccount(state = initialState, action) {
    switch (action.type) {
        case 'ACCOUNT_SELECTED':
        case 'ACCOUNT_UPDATED':
            return action.account;
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};