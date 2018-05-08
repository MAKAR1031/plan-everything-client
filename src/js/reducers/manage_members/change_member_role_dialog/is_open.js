const initialState = false;

export default function isOpen(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_MEMBER_ROLE_DIALOG_OPENED':
            return true;
        case 'CHANGE_MEMBER_ROLE_DIALOG_CLOSED':
            return false;
        default:
            return state;
    }
};