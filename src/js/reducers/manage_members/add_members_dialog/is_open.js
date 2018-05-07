const initialState = false;

export default function isOpen(state = initialState, action) {
    switch (action.type) {
        case 'ADD_MEMBERS_DIALOG_OPENED':
            return true;
        case 'ADD_MEMBERS_DIALOG_CLOSED':
            return false;
        default:
            return state;
    }
};