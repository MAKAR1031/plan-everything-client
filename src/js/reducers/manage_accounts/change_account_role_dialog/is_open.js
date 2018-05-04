const initialState = false;

export default function isOpen(state = initialState, action) {
    switch (action.type) {
        case 'ACCOUNT_CHANGE_ROLE_DIALOG_OPENED':
            return true;
        case 'ACCOUNT_CHANGE_ROLE_DIALOG_CLOSED':
            return false;
        default:
            return state;
    }
};