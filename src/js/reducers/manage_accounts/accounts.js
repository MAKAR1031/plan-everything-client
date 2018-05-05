const initialState = null;

export default function accounts(state = initialState, action) {
    switch (action.type) {
        case 'ACCOUNTS_LOADED':
            return action.accounts;
        case 'ACCOUNT_UPDATED':
            return {
                ...state,
                ...{
                    _embedded: {
                        accounts: state._embedded.accounts.map(a =>
                            a.login === action.account.login ? action.account : a)
                    }
                }
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};