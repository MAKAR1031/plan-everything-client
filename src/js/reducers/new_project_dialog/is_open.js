const initialState = false;

export default function isOpen(state = initialState, action) {
    switch (action.type) {
        case 'NEW_PROJECT_DIALOG_OPENED':
            return true;
        case 'NEW_PROJECT_DIALOG_CLOSED':
            return false;
        default:
            return state;
    }
};