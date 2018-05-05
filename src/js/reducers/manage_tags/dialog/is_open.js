const initialState = false;

export default function isOpen(state = initialState, action) {
    switch (action.type) {
        case 'TAG_DIALOG_OPENED_IN_EDIT_MODE':
        case 'TAG_DIALOG_OPENED_IN_NEW_MODE':
            return true;
        case 'TAG_DIALOG_CLOSED':
            return false;
        default:
            return state;
    }
};