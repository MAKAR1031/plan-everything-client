const initialState = null;

export default function accounts(state = initialState, action) {
    switch (action.type) {
        case 'ACCOUNTS_TO_ADD_MEMBERS_LOADED':
            return action.accounts;
        case 'ADD_MEMBERS_DIALOG_CLOSED':
            return initialState;
        default:
            return state;
    }
};