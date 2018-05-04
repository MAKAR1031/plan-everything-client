const initialState = null;

export default function accounts(state = initialState, action) {
    switch (action.type) {
        case 'ACCOUNTS_LOADED':
            return action.accounts;
        case 'ACCOUNT_UPDATED':
            const accounts = state._embedded.accounts.map(account => {
                if (account.login === action.account.login) {
                    return action.account;
                } else {
                    return account;
                }
            });

            return {
                ...state,
                ...{
                    _embedded: {
                        accounts
                    }
                }
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};